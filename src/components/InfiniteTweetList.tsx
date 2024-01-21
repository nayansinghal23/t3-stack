import TweetCard from "./TweetCard";

interface InfiniteTweetListProps {
  tweets: ITweet[];
}

interface ITweet {
  content: string;
  createdAt: Date;
  id: string;
  likes?: string[];
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
  return (
    <ul>
      {tweets.map((tweet: ITweet) => (
        <TweetCard tweet={tweet} key={tweet.id} />
      ))}
    </ul>
  );
};

export default InfiniteTweetList;
