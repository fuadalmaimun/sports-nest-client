import PopularSports from "@/components/sections/home/popular-sports";
import WhyChoose from "@/components/sections/home/why-choose";
import Testimonials from "@/components/sections/home/testimonials";
import Cta from "@/components/sections/home/cta";
import Footer from "@/components/sections/home/footer";
import { HeroBanner } from "@/components/landing";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <PopularSports />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}
