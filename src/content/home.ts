import type { HomePageContent } from "@/types/home";
import { EMAIL, FORMS, socials } from "./site";

/** Homepage copy. Edit the text here; the layout lives in src/components/home. */
export const home: HomePageContent = {
  hero: {
    tagLine: "Scotland · Apprentice-led community",
    header: "Connecting apprentices across Scotland.",
    description:
      "Join a community of current and aspiring apprentices across Scotland. Build your network, find mentors, and make friends along the way.",
    primaryCtaText: "Join the network",
  },
  joinModal: {
    modalTitle: "Which path are you on?",
    modalDescription: "Pick your stage so we can match you to the right WhatsApp groups and sessions.",
    options: [
      {
        id: "current",
        optionTitle: "Current apprentice",
        optionDescription: "I'm already on the job and want to meet people in my sector and area.",
        optionLink: FORMS.current,
        audienceKey: "current",
      },
      {
        id: "aspiring",
        optionTitle: "Aspiring apprentice",
        optionDescription: "I'm at school or college and exploring apprenticeship routes.",
        optionLink: FORMS.aspiring,
        audienceKey: "aspiring",
      },
    ],
  },
  registration: {
    eyebrow: "Getting involved",
    header: "Registration comes first. Here's why.",
    steps: [
      { id: "step-1", stepNumber: "01 / Register", stepHeader: "Tell us about you", stepDescription: "A short form: your role, where you're based, and your employer or training provider, so we can point you to the right group." },
      { id: "step-2", stepNumber: "02 / Get approved", stepHeader: "We check your details", stepDescription: "Every registration is checked before access is given, so our groups stay safe, relevant and apprentice-only." },
      { id: "step-3", stepNumber: "03 / Join WhatsApp", stepHeader: "Get your invite", stepDescription: "Once approved, you get a WhatsApp invite matched to your sector and area. You can't join directly without registering first." },
    ],
  },
  eventsSection: {
    eyebrow: "Thistle Network / Community diary",
    header: "What's coming up, and what just happened.",
    description: "Food nights, hikes and days out bringing Scotland's apprentice community together.",
  },
  about: {
    eyebrow: "Who we are",
    header: "Built by Scottish apprentices, for Scottish apprentices.",
    description:
      "Thistle Network is a Scottish apprentice community focused on connection, growth and shared opportunity. We bridge the gap between school, the workplace, and the social side often lost by not going to university.",
    aboutCta: { text: "See the latest updates →", link: "/news" },
    cards: [
      {
        id: "offer",
        title: "What we offer",
        description:
          "Industry and regional WhatsApp groups, socials and trips, financial literacy sessions and insight days with employers, so apprentices can thrive personally and professionally.",
        cta: { text: "Partner with us", link: "/about#employers" },
      },
      {
        id: "involved",
        title: "How to get involved",
        description:
          "Whether you're exploring apprenticeship routes or already on the job and looking for your people, registering is the first step to joining the network.",
        cta: { text: "Register to join", link: "/join" },
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    header: "Frequently asked questions",
    description: "Everything you need to know before you join or partner with the network.",
    items: [
      { id: "who", question: "Who can join?", answer: "Any current or aspiring apprentice in Scotland aged 16 to 25: Foundation, Modern or Graduate, in any sector. Employers and training providers can get involved through our partnerships." },
      { id: "free", question: "Is it free?", answer: "Yes. Joining the network and the WhatsApp groups is free. Some events have a small ticket cost to cover the venue, and we always say so up front." },
      { id: "whatsapp", question: "Why can't I join the WhatsApp directly?", answer: "Registering lets us check who's joining and match you to the right group by sector and area, which keeps the groups safe and relevant for everyone in them." },
      { id: "school", question: "I'm still at school. Is this for me?", answer: "Yes. The aspiring path is built for you, with insight days, mentoring and mock interviews from current apprentices." },
      { id: "employers", question: "Can employers get involved?", answer: `Yes: host an insight day, sponsor an event or take a stall. Email ${EMAIL} and we'll set up a call.` },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    mailLink: EMAIL,
    socials,
  },
};
