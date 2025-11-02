import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  padding: clamp(4rem, 10vw, 6.5rem) clamp(1.5rem, 6vw, 6rem);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(2rem, 6vw, 4.5rem);
  background: radial-gradient(circle at top right, rgba(39, 194, 163, 0.25), transparent 45%),
              var(--color-background);
  overflow: hidden;
`;

const CopyBlock = styled.div`
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
  z-index: 1;

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    text-align: center;
    align-items: center;
  }
`;

const PreHeading = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
`;

const Heading = styled.h1`
  font-size: clamp(2.7rem, 5vw, 3.6rem);
  line-height: 1.1;
  color: var(--color-primary);
`;

const Subheading = styled.p`
  max-width: 36ch;
  color: var(--color-text-muted);
  font-size: clamp(1rem, 1.35vw, 1.15rem);

  @media (max-width: 1024px) {
    max-width: 48ch;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const PrimaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.9rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-primary), #274D9C);
  color: #FFF;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 55px rgba(12, 30, 75, 0.22);
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.9rem;
  border-radius: 999px;
  border: 1px solid rgba(12, 30, 75, 0.18);
  color: var(--color-primary);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.75);
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-dark);
  }
`;

const VisualBlock = styled.div`
  position: relative;
  grid-column: 7 / span 6;
  min-height: clamp(300px, 45vw, 440px);

  &::before {
    content: '';
    position: absolute;
    inset: 12%;
    background: linear-gradient(180deg, rgba(12, 30, 75, 0.08), rgba(39, 194, 163, 0.2));
    border-radius: 32px;
    filter: blur(45px);
  }

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    min-height: clamp(260px, 50vw, 360px);
    order: -1;
  }
`;

const Illustration = styled.div`
  position: relative;
  height: 100%;
  border-radius: clamp(1.5rem, 4vw, 2rem);
  background: linear-gradient(145deg, rgba(12, 30, 75, 0.95), rgba(12, 30, 75, 0.35)),
              url('https://images.unsplash.com/photo-1549923746-1235c53d61f6?auto=format&fit=crop&w=1400&q=80') center/cover;
  box-shadow: 0 45px 85px rgba(12, 30, 75, 0.25);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: clamp(1.5rem, 4vw, 2.5rem);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(120deg, rgba(39, 194, 163, 0.15), transparent 55%);
  }
`;

const MetricBadge = styled.div`
  position: relative;
  z-index: 1;
  padding: 1rem 1.5rem;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px);
  color: var(--color-primary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: var(--shadow-md);
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
`;

const HeroSection = () => {
  return (
    <Wrapper id="hero">
      <CopyBlock>
        <PreHeading>Morocco Tramway Intelligence</PreHeading>
        <Heading>Navigate Rabat, Salé & Casablanca with confidence.</Heading>
        <Subheading>
          SirWay brings every tram line, station insight, and route planner into one seamless platform designed for daily riders and curious explorers alike.
        </Subheading>
        <CTAGroup>
          <PrimaryCTA href="#map">Explore the map</PrimaryCTA>
          <SecondaryCTA href="#about">Learn more</SecondaryCTA>
        </CTAGroup>
      </CopyBlock>

      <VisualBlock>
        <Illustration>
          <MetricBadge>
            <Dot />
            Live coverage across 38km of tram lines
          </MetricBadge>
        </Illustration>
      </VisualBlock>
    </Wrapper>
  );
};

export default HeroSection;
