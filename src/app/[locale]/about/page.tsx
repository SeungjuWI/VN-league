import { Navbar } from "@/components/landing/navbar";
import { OverviewSection } from "@/components/landing/overview-section";
import { ProgramsSection } from "@/components/landing/programs-section";
import { ScheduleSection } from "@/components/landing/schedule-section";
import { VenueSection } from "@/components/landing/venue-section";
import { CompaniesSection } from "@/components/landing/companies-section";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import { CursorGlow } from "@/components/landing/cursor-glow";

export default function AboutPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-14">
        <OverviewSection />
        <ProgramsSection />
        <ScheduleSection />
        <VenueSection />
        <CompaniesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
