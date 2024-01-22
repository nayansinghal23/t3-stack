import { useState } from "react";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";

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

export default function Home() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm setTweets={setTweets} />
      <RecentTweets tweets={tweets} setTweets={setTweets} />
    </>
  );
}
