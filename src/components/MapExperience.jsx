import React, { useContext, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import MapView from './MapView';
import { useCity } from '../context/CityContext';
import { TramNetworkContext } from '../context/TramNetworkContext';

const pulse = keyframes`
  0% { transform: scale(0.92); opacity: 0.85; }
  70% { transform: scale(1.12); opacity: 0.45; }
  100% { transform: scale(0.92); opacity: 0.85; }
`;

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 7vw, 5rem) 0;
  background: linear-gradient(160deg, rgba(12, 30, 75, 0.95), rgba(12, 30, 75, 0.72));
  color: #fff;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0 clamp(1.5rem, 5vw, 6rem);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  position: relative;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: clamp(1.25rem, 3vw, 1.75rem);
  background: rgba(8, 18, 42, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 28px 55px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PanelTitle = styled.h2`
  font-size: 1.7rem;
  color: #fff;
`;

const PanelSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
`;

const CitySwitcher = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const CityButton = styled.button`
  border: none;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  background: ${({ active }) => (active ? 'rgba(39, 194, 163, 0.25)' : 'rgba(255, 255, 255, 0.12)')};
  color: ${({ active }) => (active ? '#ffffff' : 'rgba(255, 255, 255, 0.75)')};
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(39, 194, 163, 0.35);
    color: #ffffff;
  }
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const MetricLabel = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;

const MetricValue = styled.span`
  font-size: 1.35rem;
  font-weight: 600;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.4rem;
  border-radius: 999px;
`;

const TabButton = styled.button`
  flex: 1;
  border: none;
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.24)' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
`;

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const ColorBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: ${({ color }) => color};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const PlannerCard = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1.15rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const InputGroup = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.7);
`;

const Input = styled.input`
  border: none;
  border-radius: 0.8rem;
  padding: 0.65rem 0.9rem;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 0.95rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  &:focus-visible {
    outline: 2px solid rgba(39, 194, 163, 0.45);
  }
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 0.85rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, var(--color-accent), #58d6bb);
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 35px rgba(39, 194, 163, 0.25);
  }
`;

const MapShell = styled.div`
  position: relative;
  margin: clamp(0rem, 1.5vw, 1rem) clamp(1.5rem, 5vw, 6rem) clamp(1.5rem, 4vw, 3rem);
  margin-left: 0;

  @media (max-width: 960px) {
    margin: 0 clamp(1.5rem, 5vw, 6rem);
  }
`;

const MapViewport = styled.div`
  position: relative;
  border-radius: clamp(1.5rem, 3vw, 2rem);
  overflow: hidden;
  box-shadow: 0 45px 85px rgba(0, 0, 0, 0.35);
  height: clamp(480px, 60vw, 640px);

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const Fab = styled.button`
  position: absolute;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1.5rem, 4vw, 2.5rem);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: var(--color-accent);
  color: var(--color-primary);
  font-size: 1.35rem;
  display: grid;
  place-items: center;
  box-shadow: 0 28px 45px rgba(39, 194, 163, 0.35);
  animation: ${pulse} 2.4s infinite;
`;

const MapExperience = () => {
  const { currentCity, setCurrentCity } = useCity();
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [activeTab, setActiveTab] = useState('lines');

  const metrics = useMemo(() => ({
    lines: lines.length,
    stations: stations.length,
  }), [lines.length, stations.length]);

  const lineItems = useMemo(() => lines.slice(0, 5), [lines]);
  const stationItems = useMemo(() => stations.slice(0, 5), [stations]);

  return (
    <Section id="map">
      <Container>
        <Panel>
          <PanelHeader>
            <PanelTitle>Interactive network atlas</PanelTitle>
            <PanelSubtitle>
              Switch cities, explore tram lines, and plan journeys with real-time responsiveness.
            </PanelSubtitle>

            <CitySwitcher>
              {['Casablanca', 'Rabat', 'Salé'].map((city) => (
                <CityButton
                  key={city}
                  type="button"
                  active={currentCity === city}
                  onClick={() => setCurrentCity(city)}
                >
                  {city}
                </CityButton>
              ))}
            </CitySwitcher>

            <MetricsRow>
              <MetricCard>
                <MetricLabel>Total lines</MetricLabel>
                <MetricValue>{loading ? '—' : metrics.lines}</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>Stations mapped</MetricLabel>
                <MetricValue>{loading ? '—' : metrics.stations}</MetricValue>
              </MetricCard>
            </MetricsRow>
          </PanelHeader>

          <div>
            <Tabs>
              {['lines', 'stations', 'planner'].map((tab) => (
                <TabButton
                  key={tab}
                  type="button"
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabButton>
              ))}
            </Tabs>

            <TabPanel>
              {activeTab === 'lines' && (
                <List>
                  {lineItems.map((line) => (
                    <ListItem key={line.id}>
                      <ColorBadge color={line.color}>{line.name}</ColorBadge>
                      <span>Route {line.id}</span>
                    </ListItem>
                  ))}
                  {!lineItems.length && <PanelSubtitle>No lines available for this city.</PanelSubtitle>}
                </List>
              )}

              {activeTab === 'stations' && (
                <List>
                  {stationItems.map((station) => (
                    <ListItem key={station.id}>
                      <div>
                        <strong>{station.name}</strong>
                        <PanelSubtitle as="span">
                          {station.lines.map((line) => line.id).join(', ') || 'Line info coming soon'}
                        </PanelSubtitle>
                      </div>
                      <span>{station.directions?.[0] || 'No direction data'}</span>
                    </ListItem>
                  ))}
                  {!stationItems.length && <PanelSubtitle>No stations available yet.</PanelSubtitle>}
                </List>
              )}

              {activeTab === 'planner' && (
                <PlannerCard>
                  <InputGroup>
                    <Label htmlFor="start">Start station</Label>
                    <Input id="start" placeholder="Type a station name" />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="end">Destination</Label>
                    <Input id="end" placeholder="Where do you want to go?" />
                  </InputGroup>
                  <SubmitButton type="button">Preview route</SubmitButton>
                  <PanelSubtitle>
                    Smart routing is in development — expect travel times, line transfers, and interchange insights soon.
                  </PanelSubtitle>
                </PlannerCard>
              )}
            </TabPanel>
          </div>
        </Panel>

        <MapShell>
          <MapViewport>
            <MapView />
          </MapViewport>
          <Fab type="button" aria-label="Locate me">⌖</Fab>
        </MapShell>
      </Container>
    </Section>
  );
};

export default MapExperience;
