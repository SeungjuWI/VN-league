import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { CommunityPreview } from "@/components/landing/community-preview";
import { Footer } from "@/components/landing/footer";
import { CursorGlow } from "@/components/landing/cursor-glow";

export default function LandingPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <CommunityPreview />
      </main>
      <Footer />
    </>
  );
}
