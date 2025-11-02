import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  background: #ffffff;
`;

const HeadingBlock = styled.div`
  max-width: 720px;
  margin: 0 auto clamp(2.5rem, 6vw, 3.5rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 3vw, 2.6rem);
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.125rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
`;

const Card = styled.article`
  padding: clamp(1.75rem, 3vw, 2.25rem);
  border-radius: 1.5rem;
  background: rgba(244, 245, 247, 0.7);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(12, 30, 75, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IconBadge = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(39, 194, 163, 0.12);
  color: var(--color-accent);
  font-size: 1.35rem;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
`;

const CardBody = styled.p`
  font-size: 0.98rem;
`;

const aboutItems = [
  {
    icon: '🗺️',
    title: 'City-wide awareness',
    body: 'Stay on top of every tram line between Rabat, Salé, and Casablanca with curated overlays and intelligent zoom states.'
  },
  {
    icon: '⚡',
    title: 'Real-time responsiveness',
    body: 'Experience fluid map interactions, instant route previews, and smart station search built for commuters.'
  },
  {
    icon: '🧭',
    title: 'Route intelligence',
    body: 'Plan trips with confidence thanks to detailed station insights, interchange visibility, and dynamic travel metrics.'
  }
];

const AboutSection = () => {
  return (
    <Section id="about">
      <HeadingBlock>
        <Title>Designed to elevate Morocco’s tram journey.</Title>
        <Description>
          SirWay fuses modern cartography, adaptive UI, and comprehensive data to craft a travel companion that feels as intuitive as it is powerful.
        </Description>
      </HeadingBlock>

      <Grid>
        {aboutItems.map((item) => (
          <Card key={item.title}>
            <IconBadge aria-hidden>{item.icon}</IconBadge>
            <CardTitle>{item.title}</CardTitle>
            <CardBody>{item.body}</CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default AboutSection;
