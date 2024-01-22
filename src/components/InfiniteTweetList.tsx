import TweetCard from "./TweetCard";

interface InfiniteTweetListProps {
  tweets: ITweet[];
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

const InfiniteTweetList = ({ tweets }: InfiniteTweetListProps) => {
  console.log(tweets);

  return (
    <ul>
      {tweets.map((tweet: ITweet) => (
        <TweetCard tweet={tweet} key={tweet.id} />
      ))}
    </ul>
  );
};

export default InfiniteTweetList;
