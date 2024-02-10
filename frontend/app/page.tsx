"use client";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import ChatBot from "@/components/ChatBot";

import { Inter } from "@next/font/google";
import GenerateSectionOne from "@/components/Generate/GenerateSectionOne";
import AboutSectionOne from "@/components/About/AboutSectionOne";
// import GenerateSectionTwo from "@/components/Generate/GenerateSectionTwo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video /> */}
      {/* <Brands /> */}
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      <Pricing />
      {/* <Blog /> */}
      <Contact />
      <ChatBot />
    </>
  );
}
