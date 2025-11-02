import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f9f9f9;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>Welcome to SirWay</Title>
        <Subtitle>Explore the tram networks of Rabat, Salé, and Casablanca with ease.</Subtitle>
        <CTAButton>Get Started</CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
