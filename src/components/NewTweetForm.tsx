import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import { api } from "~/utils/api";

interface NewTweetFormProps {
  setTweets: any;
}

const NewTweetForm = ({ setTweets }: NewTweetFormProps) => {
  const session = useSession();
  const user = session.data?.user;
  const [inputValue, setInputValue] = useState<string>("");
  const getTweets = api.tweet.infiniteFeed.useMutation();
  const tweetApi = api.tweet.create.useMutation({
    onSuccess: async () => {
      const allTweets = await getTweets.mutateAsync();
      setTweets(allTweets);
    },
  });

  const handleSubmit = () => {
    if (!inputValue) return;
    tweetApi
      .mutateAsync({ content: inputValue })
      .then((data) => {
        // console.log(data);
        setInputValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (session.status !== "authenticated") return;

  return (
    <form
      className="flex flex-col gap-2 border-b px-4 py-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {tweetApi.isLoading && (
        <p className="text-center text-2xl font-bold">Tweeting...</p>
      )}
      <div className="flex gap-4">
        <ProfileImage src={user?.image} />
        <textarea
          rows={4}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="What's happening?"
        />
      </div>
      <Button text="Tweet" className="self-end" disabled={tweetApi.isLoading} />
    </form>
  );
};

export default NewTweetForm;
