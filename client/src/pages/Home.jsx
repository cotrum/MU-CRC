import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Section id="about" title="About the CRC" bg="white">
        <p>The Cybersecurity Research Center (CRC) at Monmouth University provides a collaborative environment for students and faculty to research, develop, and advance cybersecurity technologies and education.</p>
      </Section>
      <Section id="research" title="Research & Initiatives" bg="blue-50">
        <p>Explore our cutting-edge research projects and initiatives in cybersecurity.</p>
      </Section>
      <Section id="events" title="Upcoming Events" bg="white">
        <p>Join us for workshops, seminars, and conferences on cybersecurity topics.</p>
      </Section>
      <Section id="sponsorship" title="Partner With Us" bg="blue-50">
        <p>Collaborate with us to advance cybersecurity research and education.</p>
      </Section>
      <Footer />
    </div>
  );
};

export default Home;