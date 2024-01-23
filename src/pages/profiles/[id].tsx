import Head from "next/head";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";
import ProfileImage from "~/components/ProfileImage";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error";

const UserProfile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile } = api.tweet.getById.useQuery({ id });
  const getPlural = (number: number, singular: string, plural: string) => {
    const pluralRules = new Intl.PluralRules();
    return pluralRules.select(number) === "one" ? singular : plural;
  };

  if (profile === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{profile?.name} Profile Page</title>
      </Head>
      <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
        <Link href=".." className="mr-2">
          <VscArrowLeft className="h-6 w-6" />
        </Link>
        <ProfileImage src={profile?.image} className="flex-shirnk-0" />
        <div className="ml-2 flex-grow">
          <h1 className="text-lg font-bold">{profile?.name}</h1>
          <div className="text-gray-500">
            {profile?.tweetsCount}{" "}
            {getPlural(
              !profile?.tweetsCount ? 0 : profile.tweetsCount,
              "Tweet",
              "Tweets",
            )}{" "}
          </div>
        </div>
      </header>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  const id = context.params?.id;
  if (!id) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.tweet.getById.prefetch({ id });
  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
};

export default UserProfile;
