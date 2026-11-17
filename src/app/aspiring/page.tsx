import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Checklist from "@/components/paths/Checklist";
import RouteTabs from "@/components/paths/RouteTabs";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { FORMS } from "@/content/site";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Aspiring apprentices",
  description: "Insight days, mentoring and mock interviews for anyone thinking about an apprenticeship in Scotland.",
};

export default async function AspiringPage() {
  const stats = await getStats();
  return (
    <>
      <PageHeader
        eyebrow="Aspiring apprentices"
        header="Get application-ready."
        description="Thinking about an apprenticeship? Meet the people already doing one, see inside Scottish employers, and walk into your interview prepared."
      >
        <p className="proof">
          Learn from <b>{stats.members}</b> apprentices at <b>{stats.employers}</b> employers.
        </p>
        <Button href={FORMS.aspiring}>Join as an aspiring apprentice</Button>
      </PageHeader>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What you get</span>
            <h2>Advice from people one step ahead of you.</h2>
          </div>
          <div className="card-grid two">
            <div className="card reveal"><h3>Insight days</h3><p>Go inside Scottish employers, see what the work looks like day to day, and ask the questions you can&apos;t ask at interview.</p></div>
            <div className="card reveal"><h3>Mentoring and mock interviews</h3><p>Current apprentices read your application, run practice interviews and tell you what they wish they&apos;d known.</p></div>
            <div className="card reveal"><h3>Routes and providers</h3><p>Foundation, Modern or Graduate? College or university route? We explain the options in plain language.</p></div>
            <div className="card reveal"><h3>Workshops all year</h3><p>In-person sessions, online workshops and masterclasses, spread through the year so there&apos;s always one coming up.</p></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Know your options</span>
            <h2>Scotland&apos;s three apprenticeship routes</h2>
            <p>Pick one to see how it works.</p>
          </div>
          <RouteTabs />
        </div>
      </section>

      <section className="band">
        <div className="wrap split">
          <div className="section-head">
            <span className="eyebrow">Readiness checklist</span>
            <h2>How ready are you?</h2>
            <p>Tick off what you&apos;ve done. Your progress is saved in this browser, so come back to it as you go. Stuck on one? That&apos;s what our mentors are for.</p>
          </div>
          <Checklist />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="cta-panel">
            <div>
              <h2>Start with a short form.</h2>
              <p>Tell us where you are and what you&apos;re interested in. We&apos;ll match you with sessions and a mentor.</p>
            </div>
            <Button href={FORMS.aspiring}>Register as aspiring</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
