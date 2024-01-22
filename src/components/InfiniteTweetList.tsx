import TweetCard from "./TweetCard";

interface InfiniteTweetListProps {
  tweets: ITweet[];
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

const InfiniteTweetList = ({ tweets, setTweets }: InfiniteTweetListProps) => {
  console.log(tweets);

  return (
    <ul>
      {tweets.map((tweet: ITweet) => (
        <TweetCard tweet={tweet} key={tweet.id} setTweets={setTweets} />
      ))}
    </ul>
  );
};

export default InfiniteTweetList;
