import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  background: linear-gradient(140deg, rgba(12, 30, 75, 0.08), rgba(39, 194, 163, 0.12));
`;

const Heading = styled.div`
  max-width: 760px;
  margin: 0 auto clamp(2.5rem, 6vw, 3.5rem);
  text-align: center;
  display: grid;
  gap: 0.85rem;
`;

const Title = styled.h2`
  font-size: clamp(2.1rem, 3vw, 2.6rem);
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.5rem, 4vw, 2.75rem);
`;

const Card = styled.article`
  position: relative;
  padding: clamp(1.85rem, 3vw, 2.5rem);
  border-radius: clamp(1.5rem, 3vw, 1.9rem);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: var(--shadow-md);
  display: grid;
  gap: 1rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(12, 30, 75, 0.2);
  }
`;

const Accent = styled.span`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  background: rgba(12, 30, 75, 0.08);
  color: var(--color-primary);
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
`;

const CardBody = styled.p`
  font-size: 0.98rem;
`;

const features = [
  {
    icon: '🎯',
    title: 'Precision overlays',
    description: 'Spot active lines, highlight exchanges, and view station clusters using refined, purposeful visuals.'
  },
  {
    icon: '🌐',
    title: 'Bilingual ready',
    description: 'Switch between English, French, and Arabic effortlessly while keeping the visual language consistent.'
  },
  {
    icon: '🔔',
    title: 'Service awareness',
    description: 'Surface important alerts, planned works, and delays in a dedicated stream before you start your trip.'
  },
  {
    icon: '📱',
    title: 'Mobile-first controls',
    description: 'Bottom sheets and fluid FAB interactions ensure the entire network is still at your fingertips on the go.'
  }
];

const FeatureHighlights = () => {
  return (
    <Section id="features">
      <Heading>
        <Title>Crafted for clarity, speed, and everyday use.</Title>
        <Subtitle>
          Every surface of SirWay is thoughtfully composed — from the glassmorphism control panels to the animated map markers.
        </Subtitle>
      </Heading>

      <Grid>
        {features.map((feature) => (
          <Card key={feature.title}>
            <Accent aria-hidden>{feature.icon}</Accent>
            <CardTitle>{feature.title}</CardTitle>
            <CardBody>{feature.description}</CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default FeatureHighlights;
