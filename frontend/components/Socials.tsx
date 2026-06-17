import Discord from "@/assets/socials/discord.svg";
import Email from "@/assets/socials/email.svg";
import GitHub from "@/assets/socials/github.svg";
import Telegram from "@/assets/socials/telegram.svg";
import LinkedIn from "@/assets/socials/linkedin.svg";
import Instagram from "@/assets/socials/instagram.svg";
import AppStore from "@/assets/socials/app-store.svg";
import Desktop from "@/assets/socials/desktop.svg";
import PlayStore from "@/assets/socials/play-store.svg";
import Web from "@/assets/socials/web.svg";

import { SocialType } from "@/constants/social";

type SocialsType = {
  platform: SocialType;
  width?: number;
  height?: number;
};

export default function Socials({
  platform,
  width = 20,
  height = 15,
}: SocialsType) {
  const fill = "rgb(224, 242, 255)";

  switch (platform) {
    case "discord":
      return <Discord width={width} height={height} fill={fill} />;
    case "email":
      return <Email width={width} height={height} fill={fill} />;
    case "github":
      return <GitHub width={width} height={height} fill={fill} />;
    case "telegram":
      return <Telegram width={width} height={height} fill={fill} />;
    case "linkedin":
      return <LinkedIn width={width} height={height} fill={fill} />;
    case "instagram":
      return <Instagram width={width} height={height} fill={fill} />;
    case "app-store":
      return <AppStore width={width} height={height} fill={fill} />;
    case "desktop":
      return <Desktop width={width} height={height} fill={fill} />;
    case "play-store":
      return <PlayStore width={width} height={height} fill={fill} />;
    case "web":
      return <Web width={width} height={height} fill={fill} />;
    default:
      return <Email width={width} height={height} fill={fill} />;
  }
}
