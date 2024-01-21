import Image from "next/image";
import DiscordImage from "~/assets/disc.webp";

interface ProfileImageProps {
  src?: string | null;
  className?: string;
}

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      <Image
        src={src ? src : DiscordImage}
        alt="profile"
        quality={100}
        fill
        sizes="max-with: auto"
        priority
      />
    </div>
  );
};

export default ProfileImage;
