import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { OverviewSection } from "@/components/landing/overview-section";
import { ProgramsSection } from "@/components/landing/programs-section";
import { ScheduleSection } from "@/components/landing/schedule-section";
import { VenueSection } from "@/components/landing/venue-section";
import { CompaniesSection } from "@/components/landing/companies-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OverviewSection />
        <ProgramsSection />
        <ScheduleSection />
        <VenueSection />
        <CompaniesSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
