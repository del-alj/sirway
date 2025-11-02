import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { CityProvider } from './context/CityContext';
import { TramNetworkProvider } from './context/TramNetworkContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MapExperience from './components/MapExperience';
import HowItWorks from './components/HowItWorks';
import FeatureHighlights from './components/FeatureHighlights';
import Footer from './components/Footer';

const AppShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-background);
`;

function App() {
  return (
    <CityProvider>
      <TramNetworkProvider>
        <>
          <GlobalStyle />
          <AppShell>
            <Header />
            <main>
              <HeroSection />
              <AboutSection />
              <MapExperience />
              <HowItWorks />
              <FeatureHighlights />
            </main>
            <Footer />
          </AppShell>
        </>
      </TramNetworkProvider>
    </CityProvider>
  );
}

export default App;