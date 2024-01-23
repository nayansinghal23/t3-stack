import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

// protectedProcedure -> means you must be authenticated

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newTweet = await ctx.db.tweet.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
      return newTweet;
    }),
  // infiniteFeed: publicProcedure
  //   .input(
  //     z.object({
  //       limit: z.number().optional(),
  //       cursor: z
  //         .object({
  //           id: z.string(),
  //           createdAt: z.date(),
  //         })
  //         .optional(),
  //     }),
  //   )
  //   .query(async ({ input: { limit = 10, cursor }, ctx }) => {
  //     const currentUserId = ctx.session?.user.id;
  //     const tweets = await ctx.db.tweet.findMany({
  //       take: limit + 1,
  //       cursor: cursor ? { createdAt_id: cursor } : undefined,
  //       orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  //       select: {
  //         id: true,
  //         content: true,
  //         createdAt: true,
  //         _count: {
  //           select: {
  //             likes: true,
  //           },
  //         },
  //         likes:
  //           currentUserId === null
  //             ? false
  //             : {
  //                 where: {
  //                   userId: currentUserId,
  //                 },
  //               },
  //         user: {
  //           select: {
  //             name: true,
  //             id: true,
  //             image: true,
  //           },
  //         },
  //       },
  //     });
  //     let nextCursor: typeof cursor | undefined;
  //     if(tweets.length > limit) {
  //       const nextItem = tweets.pop();
  //       if(nextItem !== null) {
  //         nextCursor = { id: String(nextItem?.id), createdAt: (nextItem?.createdAt) }
  //       }
  //     }
  //     return {tweets, nextCursor};
  //   }),
  infiniteFeed: publicProcedure.mutation(async ({ ctx }) => {
    const currentUserId = ctx.session?.user.id;
    const tweets = await ctx.db.tweet.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        _count: {
          select: {
            likes: true,
          },
        },
        likes: !currentUserId
          ? false
          : {
              where: {
                userId: currentUserId,
              },
            },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return tweets;
  }),
  toggleLike: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = {
        userId: ctx.session.user.id,
        tweetId: input.id,
      };
      const existingLike = await ctx.db.like.findUnique({
        where: {
          userId_tweetId: data,
        },
      });
      if (existingLike === null) {
        await ctx.db.like.create({
          data,
        });
        return { addedLike: true };
      }
      await ctx.db.like.delete({
        where: {
          userId_tweetId: data,
        },
      });
      return { addedLike: false };
    }),
  deleteTweet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const deletedTweet = await ctx.db.tweet.delete({
        where: {
          id: input.id,
        },
      });
      return deletedTweet;
    }),
});
