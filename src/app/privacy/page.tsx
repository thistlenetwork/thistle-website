import type { Metadata } from "next";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";
import { EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How The Thistle Network collects, uses and protects your personal information.",
};

/** Moved across unchanged from the old privacy.html. Update the "last updated" date when you change it. */
export default function PrivacyPage() {
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;
  return (
    <>
      <PageHeader eyebrow="Legal" header="Privacy notice" description="How The Thistle Network collects, uses, and protects your personal information, and the choices you have.">
        <p className="note">Last updated: 30/08/2026</p>
      </PageHeader>
      <section className="band">
        <article className="wrap prose">
          <h2>Who we are</h2>
          <p>The Thistle Network (&quot;we&quot;, &quot;us&quot;) is the data controller for personal information described in this notice.</p>
          <p>Email: {mail}</p>

          <h2>What this notice covers</h2>
          <p>This notice explains how we collect and use personal information when you:</p>
          <ul>
            <li>Visit our website or contact us</li>
            <li>Receive an invitation to one of our events</li>
            <li>Register for and attend an event</li>
            <li>Sign up to our network or mailing list</li>
            <li>Partner or collaborate with us</li>
          </ul>

          <h2>Information we collect</h2>
          <p><strong>From you directly:</strong> name, job title, organisation, work email, phone number (if provided), dietary and accessibility requirements, and any information you include in messages to us.</p>
          <p><strong>From publicly available business sources:</strong> corporate contact details we use to invite employers to relevant events, sourced from professional networks, corporate websites, and our existing employer relationships.</p>
          <p><strong>Automatically:</strong> limited technical information when you visit our website.</p>

          <h2>How we use your information and our lawful basis</h2>
          <h3>Inviting employers to events</h3>
          <p>We use business contact details to invite organisations to events relevant to their work. <strong>Lawful basis:</strong> legitimate interests in connecting our network with employers active in early careers and Scottish apprenticeships.</p>
          <h3>Managing event registration and attendance</h3>
          <p>Once you confirm attendance, we use your details to register you, communicate logistics, and cater appropriately. <strong>Lawful basis:</strong> legitimate interests in running the event you&apos;ve agreed to attend. Dietary and accessibility information that reveals health or religious data is processed on the basis of your explicit consent (given when you submit the registration form).</p>
          <h3>Sharing delegate lists with event co-hosts</h3>
          <p>Where an event is co-hosted, we share a delegate list with the co-host after the event (typically name, job title, organisation, and work email). The co-host acts as an independent controller. <strong>Lawful basis:</strong> legitimate interests in supporting joint event partners. We tell you who the co-host is and link to their privacy notice at the point of registration, and you can object before the list is shared.</p>
          <h3>Network updates and marketing</h3>
          <p>If you&apos;ve subscribed to our updates, we send occasional emails about events and the network. <strong>Lawful basis:</strong> consent. You can unsubscribe at any time using the link in any email.</p>
          <h3>Responding to enquiries and managing partnerships</h3>
          <p><strong>Lawful basis:</strong> legitimate interests in operating the network and responding to those who contact us.</p>
          <h3>Legal and compliance obligations</h3>
          <p>Where we need to comply with the law. <strong>Lawful basis:</strong> legal obligation.</p>

          <h2>Who we share information with</h2>
          <ul>
            <li><strong>Service providers acting as our processors</strong>, for example our form and email providers, and storage providers. They process data only on our instructions and under contract.</li>
            <li><strong>Event co-hosts and partners</strong>, for joint events, as described above. These act as independent controllers.</li>
            <li><strong>Authorities or advisers</strong>, where required by law or to protect our legal rights.</li>
          </ul>
          <p>We do not sell personal information.</p>

          <h2>International transfers</h2>
          <p>We aim to keep personal data within the UK and EU. Where any provider processes data outside this region, we put appropriate safeguards in place (such as the UK International Data Transfer Agreement or EU Standard Contractual Clauses).</p>

          <h2>How long we keep information</h2>
          <ul>
            <li>Event registration data: 12 months after the event</li>
            <li>Email correspondence: up to 3 years from last contact</li>
            <li>Mailing list subscriptions: until you unsubscribe</li>
            <li>Partnership and contractual records: 7 years (for legal and accounting reasons)</li>
          </ul>

          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Have inaccurate information corrected</li>
            <li>Have your information deleted in certain circumstances</li>
            <li>Restrict or object to our processing</li>
            <li>Receive your information in a portable format</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p>To exercise any right, email {mail}. We&apos;ll respond within one month.</p>

          <h2>Changes to this notice</h2>
          <p>We may update this notice from time to time. The &quot;last updated&quot; date at the top shows when it was last changed. Material changes will be communicated where appropriate.</p>

          <h2>Contact us</h2>
          <p>Questions about this notice or how we handle your information? Email {mail}.</p>
        </article>
      </section>
      <Footer />
    </>
  );
}
