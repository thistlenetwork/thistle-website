import type { ReactNode } from "react";
import { ThistleEmblem } from "@/components/brand/ThistleLogo";

type PageHeaderProps = {
  eyebrow?: string;
  header: string;
  description?: string;
  children?: ReactNode;
};

/** The title block at the top of every page except the homepage. */
export default function PageHeader({ eyebrow, header, description, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-emblem" aria-hidden="true">
        <ThistleEmblem />
      </div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{header}</h1>
      {description && <p className="page-intro">{description}</p>}
      {children}
    </header>
  );
}
