import type { Metadata } from "next";
import { Hero } from "@/components/template/hero";
import { Houses } from "@/components/template/houses";
import { Features } from "@/components/template/features";
import { Faculty } from "@/components/template/faculty";
import { About } from "@/components/template/core";
import { Testimonials } from "@/components/template/testimonials";
import { CTA } from "@/components/template/admission-process";
import { SpecialOffers } from "@/components/template/offer";
import { BackgroundGradientAnimationDemo } from "@/components/template/ready";
import Footer from "@/components/template/footer";
import LetsWorkTogether from "@/components/template/lets-work-together";
import Newsletter from "@/components/template/newsletter";
import { NewComers } from "@/components/template/new-comers";
import EventCard from "@/components/template/event";
import FAQs from "@/components/template/faqs";
import LogoCloud from "@/components/template/logo-cloud";

export const metadata: Metadata = {
  title: "Hogwarts School of Witchcraft and Wizardry",
  description: "Welcome to Hogwarts School of Witchcraft and Wizardry. Discover the magic of learning in our enchanted halls.",
  keywords: ["Hogwarts", "magic", "wizardry", "education", "school"],
  openGraph: {
    title: "Hogwarts School of Witchcraft and Wizardry",
    description: "Welcome to Hogwarts School of Witchcraft and Wizardry. Discover the magic of learning in our enchanted halls.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hogwarts School of Witchcraft and Wizardry",
    description: "Welcome to Hogwarts School of Witchcraft and Wizardry. Discover the magic of learning in our enchanted halls.",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Houses />
      <Features />
      <About />
      <Faculty />
      <Testimonials />
      <CTA />
      <SpecialOffers />
      <LogoCloud />
      <EventCard />
      <LetsWorkTogether />
      <BackgroundGradientAnimationDemo />
      <Newsletter />
      <FAQs />
      <NewComers />
      <Footer />
    </main>
  );
}
