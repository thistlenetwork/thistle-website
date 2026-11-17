import Image from "next/image";
import { withBase } from "@/lib/base-path";

type ThistleLogoProps = {
  /** "auto" follows the theme; "on-dark" is for always-dark areas such as the footer. */
  tone?: "auto" | "on-dark";
  className?: string;
  priority?: boolean;
};

const WORDMARK = { width: 953, height: 299 };

/**
 * The thistle network wordmark. Two versions of the artwork exist: dark purple text for light
 * backgrounds and lighter colours for dark ones. CSS shows the right one for the theme.
 */
export default function ThistleLogo({ tone = "auto", className, priority = false }: ThistleLogoProps) {
  const classes = (extra: string) => ["logo-img", extra, className].filter(Boolean).join(" ");
  if (tone === "on-dark") {
    return <Image className={classes("")} src={withBase("/brand/wordmark-dark.png")} alt="Thistle Network" {...WORDMARK} priority={priority} />;
  }
  return (
    <>
      <Image className={classes("theme-light-only")} src={withBase("/brand/wordmark-light.png")} alt="Thistle Network" {...WORDMARK} priority={priority} />
      <Image className={classes("theme-dark-only")} src={withBase("/brand/wordmark-dark.png")} alt="Thistle Network" {...WORDMARK} priority={priority} />
    </>
  );
}

/** The thistle on its own, in light or dark artwork to match the theme. */
export function ThistleEmblem({ className }: { className?: string }) {
  return (
    <>
      <Image className={["theme-light-only", className].filter(Boolean).join(" ")} src={withBase("/brand/emblem-light.png")} alt="" width={375} height={411} />
      <Image className={["theme-dark-only", className].filter(Boolean).join(" ")} src={withBase("/brand/emblem-dark.png")} alt="" width={252} height={279} />
    </>
  );
}
