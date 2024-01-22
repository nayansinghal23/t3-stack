import Link from "next/link";
import ProfileImage from "./ProfileImage";
import HeartButton from "./HeartButton";
import { useSession } from "next-auth/react";

interface TweetCardProps {
  tweet: ITweet;
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

const TweetCard = ({ tweet }: TweetCardProps) => {
  const session = useSession();
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${tweet.user?.id}`}>
        <ProfileImage src={tweet.user?.image} />
      </Link>
      <div className="flex flex-grow flex-col">
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
        <HeartButton
          likedByMe={tweet.likes?.length === 0 ? false : true}
          likeCount={tweet._count.likes}
          tweetId={tweet.id}
        />
      </div>
    </li>
  );
};

export default TweetCard;
