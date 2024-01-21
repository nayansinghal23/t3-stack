import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
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
});
