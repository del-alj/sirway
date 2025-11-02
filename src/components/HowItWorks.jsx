import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  background: radial-gradient(circle at left top, rgba(12, 30, 75, 0.12), transparent 55%),
              var(--color-background);
`;

const Heading = styled.div`
  max-width: 680px;
  margin: 0 auto clamp(2.5rem, 6vw, 3.25rem);
  text-align: center;
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 3vw, 2.5rem);
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
`;

const Timeline = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(1.5rem, 4vw, 3rem);
`;

const Step = styled.li`
  position: relative;
  padding: clamp(1.75rem, 3vw, 2.25rem);
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(12, 30, 75, 0.06);
  display: grid;
  gap: 1rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const StepNumber = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary);
  background: rgba(12, 30, 75, 0.1);
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
`;

const StepDescription = styled.p`
  font-size: 0.95rem;
`;

const steps = [
  {
    title: 'Select your city',
    description: 'Toggle swiftly between Casablanca, Rabat, and Salé to tailor the entire map experience to your current network.'
  },
  {
    title: 'Focus on key lines',
    description: 'Filter lines, inspect live color-coded routes, and spot interchange stations at a glance.'
  },
  {
    title: 'Plan with clarity',
    description: 'Enter start and destination stations to preview transfers, travel times, and accessibility info (coming soon).'
  },
  {
    title: 'Ride confidently',
    description: 'Stay informed with real-time adjustments, future service alerts, and intuitive station details.'
  }
];

const HowItWorks = () => {
  return (
    <Section>
      <Heading>
        <Title>How SirWay guides your journey.</Title>
        <Subtitle>
          Built for both daily riders and first-time explorers, the interface keeps you in control every step of the way.
        </Subtitle>
      </Heading>

      <Timeline>
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepNumber>{index + 1}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Step>
        ))}
      </Timeline>
    </Section>
  );
};

export default HowItWorks;
