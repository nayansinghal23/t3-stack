import { useSession } from "next-auth/react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { ITweetContext, TweetContext } from "~/context/TweetContext";
import { api } from "~/utils/api";

interface DeleteButtonProps {
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

const DeleteButton = ({ tweet, setTweets }: DeleteButtonProps) => {
  const { setIsDeleteLoading, setDeletedTweetId } = useContext(
    TweetContext,
  ) as ITweetContext;
  const session = useSession();
  const getTweets = api.tweet.infiniteFeed.useMutation();
  const deleteTweetApi = api.tweet.deleteTweet.useMutation({
    onSuccess: async () => {
      const allTweets = await getTweets.mutateAsync();
      setTweets(allTweets);
      setIsDeleteLoading(false);
      setDeletedTweetId("");
    },
  });

  const handleDeleteTweet = () => {
    setDeletedTweetId(tweet.id);
    setIsDeleteLoading(true);
    deleteTweetApi
      .mutateAsync({ id: tweet.id })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (session.status !== "authenticated") return null;
  return (
    <span className="hover:cursor-pointer" onClick={handleDeleteTweet}>
      <MdDelete />
    </span>
  );
};

export default DeleteButton;
