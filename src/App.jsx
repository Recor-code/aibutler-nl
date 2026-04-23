import React, { useEffect } from "react";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Architecture from "./components/architecture";
import Features from "./components/features";
import UseCases from "./components/usecases";
import Demo from "./components/demo";
import Compare from "./components/compare";
import Testimonial from "./components/testimonial";
import { Waitlist, FAQ, Footer } from "./components/final";

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Architecture />
      <Features />
      <UseCases />
      <Demo />
      <Compare />
      <Testimonial />
      <Waitlist />
      <FAQ />
      <Footer />
    </>
  );
}
