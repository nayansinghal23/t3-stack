import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <span className="flex items-center gap-4">
              <VscHome className="h-8 w-8" />
              <span className="hidden text-lg md:inline">Home</span>
            </span>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <span className="flex items-center gap-4">
                <VscAccount className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Profiles</span>
              </span>
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button
              onClick={() => {
                signOut();
              }}
            >
              <span className="flex items-center gap-4">
                <VscSignOut className="h-8 w-8 fill-green-700" />
                <span className="hidden text-lg text-green-700 md:inline">
                  Logout
                </span>
              </span>
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={() => {
                signIn();
              }}
            >
              <span className="flex items-center gap-4">
                <VscSignIn className="h-8 w-8 fill-green-700" />
                <span className="hidden text-lg text-green-700 md:inline">
                  Login
                </span>
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
