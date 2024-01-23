import Link from "next/link";
import ProfileImage from "./ProfileImage";
import HeartButton from "./HeartButton";
import DeleteButton from "./DeleteButton";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ITweetContext, TweetContext } from "~/context/TweetContext";

interface TweetCardProps {
  tweet: ITweet;
  setTweets: any;
}

interface Likes {
  tweetId: string;
  userId: string;
}

interface ITweet {
  content: string;
  createdAt: Date;
  id: string;
  likes?: Likes[];
  _count: {
    likes: number;
  };
  user: {
    id: string;
    name: string;
    image: string;
  };
}

const TweetCard = ({ tweet, setTweets }: TweetCardProps) => {
  const session = useSession();
  const { isDeleteLoading, deletedTweetId } = useContext(
    TweetContext,
  ) as ITweetContext;
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${tweet.user?.id}`}>
        <ProfileImage src={tweet.user?.image} />
      </Link>
      <div
        className={`flex flex-grow flex-col ${isDeleteLoading && tweet.id === deletedTweetId && "text-slate-300"}`}
      >
        <div className="flex gap-1">
          <Link
            href={`/profiles/${tweet.user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {tweet.user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(tweet.createdAt)}
          </span>
        </div>
        <p className="whitespcae-pre-wrap">{tweet.content}</p>
        <div className="flex items-center gap-4">
          <HeartButton
            likedByMe={tweet.likes?.length === 0 ? false : true}
            likeCount={tweet._count.likes}
            tweetId={tweet.id}
            setTweets={setTweets}
          />
          {tweet.user.id === session.data?.user.id && (
            <DeleteButton tweet={tweet} setTweets={setTweets} />
          )}
        </div>
        {isDeleteLoading && tweet.id === deletedTweetId && (
          <p className="text-center text-xl font-bold text-black">
            Deleting Tweet...
          </p>
        )}
      </div>
    </li>
  );
};

export default TweetCard;
