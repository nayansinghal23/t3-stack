import React, { SetStateAction, useEffect } from "react";
import InfiniteTweetList from "./InfiniteTweetList";
import { api } from "~/utils/api";

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

interface RecentTweetsProps {
  tweets: ITweet[];
  setTweets: React.Dispatch<SetStateAction<ITweet[]>>;
}

const RecentTweets = ({ tweets, setTweets }: RecentTweetsProps) => {
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

  if (getTweets.isLoading) {
    return <p className="text-center text-2xl font-bold">Loading...</p>;
  }

  return <InfiniteTweetList tweets={tweets} setTweets={setTweets} />;
};

export default RecentTweets;
