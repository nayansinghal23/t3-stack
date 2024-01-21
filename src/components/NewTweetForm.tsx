import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useEffect, useRef, useState } from "react";

// function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
//   if(textArea === null) return;
//   textArea?.style.height = "0";
//   textArea?.style.height = `${textArea?.scrollHeight}px`;
// }

const NewTweetForm = () => {
  const session = useSession();
  const user = session.data?.user;
  const [inputValue, setInputValue] = useState<string>("");

  if (session.status !== "authenticated") return;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={user?.image} />
        <textarea
          rows={4}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="What's happening?"
        />
      </div>
      <Button text="Tweet" className="self-end" />
    </form>
  );
};

export default NewTweetForm;
