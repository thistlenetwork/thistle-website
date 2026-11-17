import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PayCalculator, { TAX_YEAR } from "@/components/paths/PayCalculator";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { FORMS } from "@/content/site";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Current apprentices",
  description: "WhatsApp groups by sector and area, socials, trips and money sessions for apprentices across Scotland.",
};

const ADVENTURES: [string, string][] = [
  ["Food, games & grub", "A relaxed night to meet your group"],
  ["Go-karting", "A night on the track"],
  ["Hiking", "A day in the hills, all levels"],
  ["A lodge up north", "A weekend away in the Highlands"],
  ["Top Golf", "No golf skills needed"],
  ["Cinema night", "A film, then food after"],
  ["Laser tag", "Sector against sector"],
];

export default async function CurrentPage() {
  const stats = await getStats();
  return (
    <>
      <PageHeader
        eyebrow="Current apprentices"
        header="Find your people."
        description="You might be the only apprentice in your team. You shouldn't be the only one you know. Meet apprentices in your sector and area, then get out and do something."
      >
        <p className="proof">
          <b>{stats.members}</b> apprentices in <b>{stats.places}</b> towns and cities are already here.
        </p>
        <Button href={FORMS.current}>Join as a current apprentice</Button>
      </PageHeader>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What&apos;s inside</span>
            <h2>Groups, trips and grown-up money stuff.</h2>
          </div>
          <div className="card-grid three">
            <div className="card reveal"><h3>Industry and regional groups</h3><p>WhatsApp groups matched to your sector and where you live, so the advice fits your job and meet-ups are close by.</p></div>
            <div className="card reveal"><h3>Socials, trips and meet-ups</h3><p>Food, games and grub nights, plus bigger days out. Turn up on your own and leave knowing people.</p></div>
            <div className="card reveal"><h3>Financial literacy</h3><p>Sessions for early earners on payslips, tax, pensions and saving, from people who started where you are.</p></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">On the list</span>
            <h2>What would get you out the door?</h2>
            <p>Ideas for upcoming socials. Vote in your WhatsApp group when we run the next poll.</p>
          </div>
          <div className="tiles">
            {ADVENTURES.map(([name, note]) => (
              <div className="tile reveal" key={name}>
                <b>{name}</b>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap split">
          <div className="section-head">
            <span className="eyebrow">First payslip</span>
            <h2>What will actually land in your account?</h2>
            <p>Your salary isn&apos;t your take-home. Put in your yearly pay to see roughly what&apos;s left after Scottish income tax, National Insurance and a workplace pension.</p>
            <p className="note">An estimate using {TAX_YEAR} Scottish rates and a standard tax code (1257L). Your payslip may differ.</p>
          </div>
          <PayCalculator />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="cta-panel">
            <div>
              <h2>Get matched to your group.</h2>
              <p>Register, get approved, and we&apos;ll send your WhatsApp invite for your sector and area.</p>
            </div>
            <Button href={FORMS.current}>Register as current</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
