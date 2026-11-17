import type { Metadata } from "next";
import { ThistleEmblem } from "@/components/brand/ThistleLogo";
import Breakdown from "@/components/stats/Breakdown";
import CopyEmail from "@/components/ui/CopyEmail";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { EMAIL } from "@/content/site";
import { formatLongDate } from "@/lib/format";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "About",
  description: "Who runs Thistle Network, who's in it, and how employers can get involved.",
};

const AIMS: [string, string][] = [
  ["Fewer lonely starts", "Many apprentices are the only one their age in the team. We make sure you know people in the same boat from your first week."],
  ["More confidence", "Peer advice on everything from your first appraisal to your first payslip, from people a year or two ahead of you."],
  ["Stronger networks", "Friends across employers and sectors now become the professional network you lean on for the rest of your career."],
  ["A stronger early-career Scotland", "Help more young people find the right apprenticeship, and help employers find them."],
];

const TEAM: [string, string][] = [
  ["Events", "Plans the socials, trips and workshops"],
  ["Partnerships", "Works with employers, providers and public bodies"],
  ["Communications", "Runs our socials and tells apprentices what's on"],
  ["Community", "Approves members and looks after the groups"],
];

export default async function AboutPage() {
  const stats = await getStats();
  const graduate = stats.routes.find(([route]) => route === "Graduate")?.[1] ?? 0;
  return (
    <>
      <PageHeader
        eyebrow="About the network"
        header="Run by apprentices who've been where you are."
        description="Scottish, cross-industry, and open to every route: school, college, university and training provider. Built by Scottish apprentices for Scottish apprentices."
      />

      <section className="band" id="aims">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our aims</span>
            <h2>Make apprenticeships feel connected, not isolated.</h2>
          </div>
          <div className="aims">
            {AIMS.map(([title, text]) => (
              <div className="aim reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="numbers">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Who&apos;s in the network</span>
            <h2>{stats.members} apprentices. {stats.employers} employers. One group chat away.</h2>
            <p>Everyone who has registered since {new Date(`${stats.since}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })}.</p>
          </div>
          <div className="card-grid two">
            <div className="card"><span className="eyebrow">By sector</span><Breakdown rows={stats.sectors} /></div>
            <div className="card">
              <span className="eyebrow">Where they&apos;re based</span>
              <Breakdown rows={stats.topPlaces} tone="green" />
              <p className="note">Members live in {stats.places} towns and cities in total.</p>
            </div>
            <div className="card">
              <span className="eyebrow">Apprenticeship route</span>
              <div className="big">{stats.graduateShare}%</div>
              <p>are on a Graduate Apprenticeship, studying for a degree while they work.</p>
              <div className="split-bar" aria-hidden="true">
                {stats.routes.map(([route, n]) => (
                  <div key={route} style={{ width: `${(n / stats.members) * 100}%` }}>
                    {route} · {Math.round((n / stats.members) * 100)}%
                  </div>
                ))}
              </div>
              <p className="visually-hidden">{graduate} Graduate apprentices out of {stats.members} members.</p>
            </div>
            <div className="card">
              <span className="eyebrow">Where they study</span>
              <Breakdown rows={stats.topProviders} />
              <p className="note">Out of {stats.providers} universities, colleges and training providers.</p>
            </div>
          </div>
          <p className="note">Updated automatically from our sign-up forms. Latest sign-up: {formatLongDate(stats.updated)}.</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The team</span>
            <h2>Volunteers, plus mentors from Scottish industry.</h2>
            <p>Everyone on the team is a current or recent apprentice, giving their time alongside their job.</p>
          </div>
          <div className="card-grid four">
            {TEAM.map(([area, job]) => (
              <div className="card reveal" key={area}>
                <span className="eyebrow">{area}</span>
                <h3>{job}</h3>
              </div>
            ))}
          </div>
          <p className="note">Our mentor pool is made up of apprentices and professionals who give aspiring apprentices application feedback and mock interviews.</p>
        </div>
      </section>

      <section className="band" id="employers">
        <div className="wrap split">
          <div className="section-head">
            <span className="eyebrow">For employers</span>
            <h2>Meet the next intake before they apply.</h2>
            <p>Support Scotland&apos;s apprentices and get your name in front of motivated young people.</p>
          </div>
          <div className="card-grid">
            <div className="card reveal"><h3>Host an insight day</h3><p>Open your doors to aspiring apprentices for a day. We bring the group and handle sign-ups.</p></div>
            <div className="card reveal"><h3>Sponsor an event</h3><p>Back a social, a trip or a workshop series, and help keep events free for apprentices.</p></div>
            <div className="card reveal"><h3>Take a stall</h3><p>Meet apprentices and applicants face to face at our larger events.</p></div>
          </div>
        </div>
      </section>

      <section className="band" id="contact">
        <div className="wrap">
          <div className="cta-panel">
            <div>
              <h2>Say hello.</h2>
              <p>Questions, ideas, partnerships, or you just want to help out.</p>
              <CopyEmail email={EMAIL} />
            </div>
            <div className="cta-emblem" aria-hidden="true">
              <ThistleEmblem />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
