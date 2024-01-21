import { useEffect, useState } from "react";
import InfiniteTweetList from "./InfiniteTweetList";
import { api } from "~/utils/api";

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

const RecentTweets = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const getTweets = api.tweet.infiniteFeed.useMutation();

  useEffect(() => {
    getTweets
      .mutateAsync()
      .then((data: any) => {
        setTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <InfiniteTweetList tweets={tweets} />;
};

export default RecentTweets;
