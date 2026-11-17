import Hero from "@/components/home/Hero";
import Registration from "@/components/home/Registration";
import Events from "@/components/home/Events";
import About from "@/components/home/About";
import FAQ from "@/components/home/FAQ";
import PathCards from "@/components/paths/PathCards";
import EmployerStrip from "@/components/stats/EmployerStrip";
import NumbersBand from "@/components/stats/NumbersBand";
import Footer from "@/layout/Footer";
import { home } from "@/content/home";
import { getEvents, getHeroPhotos } from "@/lib/content";
import { getStats } from "@/lib/stats";

/** The homepage, top to bottom. Copy lives in src/content/home.ts. */
export default async function HomePage() {
  const stats = await getStats();
  return (
    <>
      <Hero content={home} photos={getHeroPhotos()} />
      <EmployerStrip stats={stats} />
      <NumbersBand stats={stats} />
      <Registration content={home.registration} />
      <section className="band paths-band" aria-labelledby="paths-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Two paths, one network</span>
            <h2 id="paths-title">Where are you on the road?</h2>
          </div>
          <PathCards />
        </div>
      </section>
      <Events content={home.eventsSection} events={getEvents()} />
      <section id="about" aria-label="About Thistle Network">
        <div className="container">
          <About content={home.about} />
          <FAQ content={home.faq} />
        </div>
      </section>
      <Footer contact={home.contact} />
    </>
  );
}
