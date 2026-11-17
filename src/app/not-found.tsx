import Button from "@/components/ui/Button";
import Footer from "@/layout/Footer";
import PageHeader from "@/layout/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" header="This page has wandered off." description="The link may be old, or the page may have moved.">
        <Button href="/">Back to the homepage</Button>
      </PageHeader>
      <Footer />
    </>
  );
}
