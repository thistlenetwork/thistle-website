import Image from "next/image";
import { withBase } from "@/lib/base-path";
import ThistleLogo from "@/components/brand/ThistleLogo";
import JoinModal from "./JoinModal";
import HeroParallaxFallback from "./HeroParallaxFallback";
import HeroPhotoScatter from "./HeroPhotoScatter";
import type { HeroPhoto, HomePageContent } from "@/types/home";

type HeroProps = {
  content: HomePageContent;
  photos: HeroPhoto[];
};

/**
 * The scrapbook hero: scattered photos around a central "island" with the logo, tagline,
 * headline and the join button. Parallax is CSS (see globals.css), with
 * HeroParallaxFallback as the JavaScript path for older browsers.
 */
export default function Hero({ content, photos }: HeroProps) {
  const { hero, joinModal } = content;
  const scrapPhotos = [photos[6], photos[7]].filter(Boolean);

  return (
    <section id="hero" aria-label="Thistle Network introduction">
      <div className="hero-wrapper">
        <div className="decor thistle-sticker">
          <Image className="thistle-icon" src={withBase("/brand/emblem-light.png")} alt="" width={375} height={411} />
        </div>

        <svg className="decor doodle-star" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
        </svg>
        <svg className="decor doodle-squiggle" viewBox="0 0 100 20" fill="none" stroke="var(--mono)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 15 Q 15 5, 25 15 T 45 15 T 65 15 T 85 15 T 95 15" />
        </svg>
        <svg className="decor paperclip" viewBox="0 0 24 24" fill="none" stroke="var(--mono)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M8 4v12a4 4 0 0 0 8 0V6a2 2 0 0 0-4 0v10a1 1 0 0 0 2 0V6" />
        </svg>

        <HeroPhotoScatter photos={photos} />

        <div className="mobile-scraps" aria-hidden="true">
          {scrapPhotos.map((photo, index) => (
            <div key={photo.id} className={`mobile-scrap ${index === 0 ? "mobile-scrap-top-right" : "mobile-scrap-bottom-left"}`}>
              <Image src={photo.image.url} alt="" width={photo.image.width ?? 240} height={photo.image.height ?? 300} />
            </div>
          ))}
        </div>

        <header className="hero-island">
          <div className="island-tape tape-top-center" aria-hidden="true" />
          <div className="island-tape tape-bottom-left" aria-hidden="true" />
          <div className="logo-lockup">
            <ThistleLogo priority />
          </div>
          <p className="tagline">{hero.tagLine}</p>
          <h1>{hero.header}</h1>
          <p className="description">{hero.description}</p>
          <JoinModal content={joinModal} ctaText={hero.primaryCtaText} />
        </header>
      </div>
      <HeroParallaxFallback />
    </section>
  );
}
