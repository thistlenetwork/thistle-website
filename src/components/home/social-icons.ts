import type { SocialPlatform } from "@/types/common";
import type { IconName } from "@/components/ui/icons";

/** Icon for the labelled social buttons in the homepage contact band. */
export function socialButtonIcon(platform: SocialPlatform): IconName | null {
  switch (platform) {
    case "linkedin":
      return "socialLinkedinBtn";
    case "instagram":
      return "socialInstagramBtn";
    case "tiktok":
      return "socialTiktokBtn";
    default:
      return null;
  }
}

/** Icon for the round social links in the footer. */
export function socialIcon(platform: SocialPlatform): IconName | null {
  switch (platform) {
    case "email":
      return "socialMail";
    case "linkedin":
      return "socialLinkedin";
    case "instagram":
      return "socialInstagram";
    case "tiktok":
      return "newsSocialTiktok";
    default:
      return null;
  }
}
