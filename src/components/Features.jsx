import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 4rem 2rem;
  background: #fff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
`;

const Features = () => {
  return (
    <FeaturesContainer>
      <Title>Features</Title>
      <FeaturesGrid>
        <FeatureCard>
          <FeatureTitle>Interactive Map</FeatureTitle>
          <FeatureDescription>View tram lines and stations on an interactive map.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Real-Time Updates</FeatureTitle>
          <FeatureDescription>Get real-time updates on tram schedules and delays.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Route Planning</FeatureTitle>
          <FeatureDescription>Plan your journey and find the best route to your destination.</FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </FeaturesContainer>
  );
};

export default Features;
