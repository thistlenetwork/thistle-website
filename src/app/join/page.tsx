import type { Metadata } from "next";
import Link from "next/link";
import PathCards from "@/components/paths/PathCards";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { home } from "@/content/home";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Register to join",
  description: "Join Thistle Network: a free community for current and aspiring apprentices across Scotland.",
};

export default async function JoinPage() {
  const stats = await getStats();
  return (
    <>
      <PageHeader eyebrow="Register to join" header="Find your way in." description="Pick your path. It takes a couple of minutes and it's free.">
        <p className="proof">
          <b>{stats.members}</b> apprentices from <b>{stats.employers}</b> employers are already in.
        </p>
      </PageHeader>
      <section className="band">
        <div className="wrap">
          <PathCards links="forms" />
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What happens next</span>
            <h2>{home.registration.header}</h2>
          </div>
          <ol className="journey">
            {home.registration.steps.map((step) => (
              <li key={step.id}>
                <span className="dot">{step.stepNumber.slice(0, 2)}</span>
                <div>
                  <h3>{step.stepHeader}</h3>
                  <p>{step.stepDescription}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="note">
            Questions first? <Link href="/#faq">Read the FAQ</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
