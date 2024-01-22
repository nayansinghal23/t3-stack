import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { api } from "~/utils/api";

interface HeartButtonProps {
  likedByMe: boolean | undefined;
  likeCount: number;
  tweetId: string;
  setTweets: any;
}

const HeartButton = ({
  likedByMe = false,
  likeCount,
  tweetId,
  setTweets,
}: HeartButtonProps) => {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  const getTweets = api.tweet.infiniteFeed.useMutation();
  const toggleLikeApi = api.tweet.toggleLike.useMutation({
    onSuccess: async () => {
      const allTweets = await getTweets.mutateAsync();
      setTweets(allTweets);
    },
  });
  const handleLikeTweet = () => {
    toggleLikeApi.mutate({ id: tweetId });
  };

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      className={`group flex items-center gap-1 self-start transition-colors duration-200 ${likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}
      `}
      onClick={handleLikeTweet}
      disabled={toggleLikeApi.isLoading || getTweets.isLoading}
    >
      <HeartIcon
        className={`transition-colors duration-200 ${likedByMe ? "fill-red-500" : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"}`}
      />
      <span>{likeCount}</span>
    </button>
  );
};

export default HeartButton;
