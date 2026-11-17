"use client";

import { useState } from "react";

/** Shows the email address as text (so it can always be selected) with a copy button. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address stays selectable */
    }
  };
  return (
    <div className="copy-row">
      <a className="copy-email" href={`mailto:${email}`}>{email}</a>
      <button type="button" className="btn btn-outline" onClick={copy}>
        {copied ? "Copied" : "Copy email"}
      </button>
    </div>
  );
}
