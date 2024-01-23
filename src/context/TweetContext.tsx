import React, { SetStateAction, createContext, useState } from "react";

export interface ITweetContext {
  deletedTweetId: string;
  setDeletedTweetId: React.Dispatch<SetStateAction<string>>;
  isDeleteLoading: boolean;
  setIsDeleteLoading: React.Dispatch<SetStateAction<boolean>>;
}

interface TweetContextProviderProps {
  children: React.ReactNode;
}

export const TweetContext = createContext<ITweetContext | null>(null);

const TweetContextProvider = ({ children }: TweetContextProviderProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [deletedTweetId, setDeletedTweetId] = useState<string>("");

  return (
    <TweetContext.Provider
      value={{
        isDeleteLoading,
        setIsDeleteLoading,
        deletedTweetId,
        setDeletedTweetId,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
