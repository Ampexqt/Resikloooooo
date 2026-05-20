import React from 'react';
import { Hero } from '../components/landing/Hero';
import { DarkIntro } from '../components/landing/DarkIntro';
import { PhonePractice } from '../components/landing/PhonePractice';
import { StatsWall } from '../components/landing/StatsWall';
import { Resources } from '../components/landing/Resources';
import { PartnersVoices } from '../components/landing/PartnersVoices';
import { MailingCTA } from '../components/landing/MailingCTA';
export function Landing() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <DarkIntro />
      <PhonePractice />
      <StatsWall />
      <Resources />
      <PartnersVoices />
      <MailingCTA />
    </div>);

}