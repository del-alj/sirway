import React, { useContext, useMemo, useState, useEffect } from 'react';
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
  grid-template-columns: minmax(300px, 380px) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0 clamp(1.5rem, 5vw, 6rem);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  position: relative;
  padding: clamp(1.5rem, 3vw, 2.6rem);
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

const LineSelector = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const LineButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.95rem;
  border-radius: 1rem;
  border: 1px solid ${({ active }) => (active ? 'rgba(39, 194, 163, 0.55)' : 'rgba(255, 255, 255, 0.12)')};
  background: ${({ active }) => (active ? 'rgba(39, 194, 163, 0.18)' : 'rgba(255, 255, 255, 0.08)')};
  color: #fff;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(39, 194, 163, 0.45);
  }
`;

const LineMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const ColorSwatch = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
`;

const CountBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
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
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const StationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StationLines = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const DistanceTag = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
`;

const PlannerCard = styled.div`
  display: grid;
  gap: 0.9rem;
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

const AutocompleteWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
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

const SuggestionList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 0.35rem);
  list-style: none;
  margin: 0;
  padding: 0.4rem;
  border-radius: 0.85rem;
  background: rgba(8, 18, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.25);
  max-height: 220px;
  overflow-y: auto;
  z-index: 5;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.65rem;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(39, 194, 163, 0.18);
  }
`;

const SuggestionMeta = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
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

const PlannerFeedback = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
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

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (km) => {
  if (km == null || Number.isNaN(km)) return '—';
  if (km < 1) {
    const metres = Math.round(km * 1000);
    return `${metres} m`;
  }
  return `${km.toFixed(1)} km`;
};

const enrichStations = (stations, userPosition) => stations.map((station) => {
  if (!userPosition) {
    return { ...station, distance: null };
  }

  const [lat, lng] = station.coordinates;
  const distance = haversineDistance(userPosition.lat, userPosition.lng, lat, lng);
  return { ...station, distance };
});

const sortStations = (stations) =>
  stations.sort((a, b) => {
    if (a.distance == null && b.distance == null) {
      return a.name.localeCompare(b.name);
    }
    if (a.distance == null) return 1;
    if (b.distance == null) return -1;
    return a.distance - b.distance;
  });

const MapExperience = () => {
  const { currentCity, setCurrentCity, userPosition } = useCity();
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [activeTab, setActiveTab] = useState('lines');
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');
  const [startFocused, setStartFocused] = useState(false);
  const [endFocused, setEndFocused] = useState(false);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [plannerFeedback, setPlannerFeedback] = useState('');

  useEffect(() => {
    if (!lines.length) {
      setSelectedLineId(null);
      return;
    }

    setSelectedLineId((prev) => {
      const hasExisting = prev && lines.some((line) => line.id === prev);
      return hasExisting ? prev : lines[0].id;
    });
  }, [lines, currentCity]);

  const stationsByLine = useMemo(() => {
    const map = new Map();

    lines.forEach((line) => {
      map.set(line.id, []);
    });

    stations.forEach((station) => {
      station.lines?.forEach((lineInfo) => {
        if (!map.has(lineInfo.id)) {
          map.set(lineInfo.id, []);
        }
        map.get(lineInfo.id).push(station);
      });
    });

    return map;
  }, [lines, stations]);

  const lineSummaries = useMemo(
    () =>
      lines.map((line) => ({
        line,
        stationCount: (stationsByLine.get(line.id) || []).length,
      })),
    [lines, stationsByLine]
  );

  const selectedLineStations = useMemo(() => {
    if (!selectedLineId) return [];
    const base = stationsByLine.get(selectedLineId) || [];
    return sortStations(enrichStations(base, userPosition)).slice(0, 12);
  }, [selectedLineId, stationsByLine, userPosition]);

  const nearestStations = useMemo(() => {
    if (!stations.length) return [];
    return sortStations(enrichStations(stations, userPosition)).slice(0, 10);
  }, [stations, userPosition]);

  const makeSuggestions = (query) => {
    const enriched = enrichStations(stations, userPosition);
    if (!query.trim()) {
      return sortStations(enriched).slice(0, 8);
    }

    const normalised = query.trim().toLowerCase();
    const filtered = enriched.filter((station) => station.name.toLowerCase().includes(normalised));
    return sortStations(filtered).slice(0, 8);
  };

  const startSuggestions = useMemo(() => makeSuggestions(startQuery), [startQuery, stations, userPosition]);
  const endSuggestions = useMemo(() => makeSuggestions(endQuery), [endQuery, stations, userPosition]);

  const metrics = useMemo(
    () => ({
      lines: lines.length,
      stations: stations.length,
    }),
    [lines.length, stations.length]
  );

  const handleSelectCity = (city) => {
    setCurrentCity(city);
    setPlannerFeedback('');
  };

  const handleSelectLine = (lineId) => {
    setSelectedLineId(lineId);
    setPlannerFeedback('');
  };

  const handleSelectStart = (station) => {
    setStartStation(station);
    setStartQuery(station.name);
    setStartFocused(false);
    setPlannerFeedback('');
  };

  const handleSelectEnd = (station) => {
    setEndStation(station);
    setEndQuery(station.name);
    setEndFocused(false);
    setPlannerFeedback('');
  };

  const handlePreviewRoute = () => {
    if (!startStation || !endStation) {
      setPlannerFeedback('Choose both a start and destination station to preview your journey.');
      return;
    }

    if (startStation.id === endStation.id) {
      setPlannerFeedback('Pick different start and destination stations.');
      return;
    }

    setPlannerFeedback('Smart routing preview is on the roadmap — you are all set once it ships.');
  };

  return (
    <Section id="map">
      <Container>
        <Panel>
          <PanelHeader>
            <PanelTitle>Interactive network atlas</PanelTitle>
            <PanelSubtitle>
              Switch cities, drill into individual lines, and discover nearby stations with precision.
            </PanelSubtitle>

            <CitySwitcher>
              {['Casablanca', 'Rabat', 'Salé'].map((city) => (
                <CityButton
                  key={city}
                  type="button"
                  active={currentCity === city}
                  onClick={() => handleSelectCity(city)}
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
                <>
                  <PanelSubtitle>
                    Choose a line to list its stations — sorted from closest to farthest based on your location.
                  </PanelSubtitle>

                  <LineSelector>
                    {lineSummaries.map(({ line, stationCount }) => (
                      <LineButton
                        key={line.id}
                        type="button"
                        active={line.id === selectedLineId}
                        onClick={() => handleSelectLine(line.id)}
                      >
                        <LineMeta>
                          <ColorSwatch color={line.color} />
                          <span>{line.name}</span>
                        </LineMeta>
                        <CountBadge>{stationCount}</CountBadge>
                      </LineButton>
                    ))}
                    {!lineSummaries.length && <PanelSubtitle>No lines available for this city.</PanelSubtitle>}
                  </LineSelector>

                  {selectedLineId && selectedLineStations.length > 0 ? (
                    <List>
                      {selectedLineStations.map((station) => (
                        <ListItem key={`${selectedLineId}-${station.id}`}>
                          <StationDetails>
                            <strong>{station.name}</strong>
                            <StationLines>
                              Lines: {station.lines?.map((line) => line.id).join(', ') || '—'}
                            </StationLines>
                          </StationDetails>
                          <DistanceTag>{formatDistance(station.distance)}</DistanceTag>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <PanelSubtitle>No stations linked to this line yet.</PanelSubtitle>
                  )}
                </>
              )}

              {activeTab === 'stations' && (
                <>
                  <PanelSubtitle>
                    Your nearest stops across the network. Zoom the map for even richer context.
                  </PanelSubtitle>
                  <List>
                    {nearestStations.map((station) => (
                      <ListItem key={`nearest-${station.id}`}>
                        <StationDetails>
                          <strong>{station.name}</strong>
                          <StationLines>
                            Lines: {station.lines?.map((line) => line.id).join(', ') || '—'}
                          </StationLines>
                        </StationDetails>
                        <DistanceTag>{formatDistance(station.distance)}</DistanceTag>
                      </ListItem>
                    ))}
                    {!nearestStations.length && <PanelSubtitle>No nearby stations detected yet.</PanelSubtitle>}
                  </List>
                </>
              )}

              {activeTab === 'planner' && (
                <PlannerCard>
                  <PanelSubtitle as="span">
                    Start typing to quickly locate any station. Suggestions update instantly based on your input.
                  </PanelSubtitle>

                  <InputGroup>
                    <Label htmlFor="start">Start station</Label>
                    <AutocompleteWrapper>
                      <Input
                        id="start"
                        placeholder="Type a station name"
                        value={startQuery}
                        onChange={(event) => {
                          setStartQuery(event.target.value);
                          setStartStation(null);
                          setPlannerFeedback('');
                        }}
                        onFocus={() => setStartFocused(true)}
                        onBlur={() => setStartFocused(false)}
                        autoComplete="off"
                      />
                      {startFocused && startSuggestions.length > 0 && (
                        <SuggestionList>
                          {startSuggestions.map((station) => (
                            <SuggestionItem
                              key={`start-suggestion-${station.id}`}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                handleSelectStart(station);
                              }}
                            >
                              <span>{station.name}</span>
                              <SuggestionMeta>{formatDistance(station.distance)}</SuggestionMeta>
                            </SuggestionItem>
                          ))}
                        </SuggestionList>
                      )}
                    </AutocompleteWrapper>
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="end">Destination</Label>
                    <AutocompleteWrapper>
                      <Input
                        id="end"
                        placeholder="Where do you want to go?"
                        value={endQuery}
                        onChange={(event) => {
                          setEndQuery(event.target.value);
                          setEndStation(null);
                          setPlannerFeedback('');
                        }}
                        onFocus={() => setEndFocused(true)}
                        onBlur={() => setEndFocused(false)}
                        autoComplete="off"
                      />
                      {endFocused && endSuggestions.length > 0 && (
                        <SuggestionList>
                          {endSuggestions.map((station) => (
                            <SuggestionItem
                              key={`end-suggestion-${station.id}`}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                handleSelectEnd(station);
                              }}
                            >
                              <span>{station.name}</span>
                              <SuggestionMeta>{formatDistance(station.distance)}</SuggestionMeta>
                            </SuggestionItem>
                          ))}
                        </SuggestionList>
                      )}
                    </AutocompleteWrapper>
                  </InputGroup>

                  <SubmitButton type="button" onClick={handlePreviewRoute}>
                    Preview route
                  </SubmitButton>

                  {plannerFeedback && <PlannerFeedback>{plannerFeedback}</PlannerFeedback>}
                  {!plannerFeedback && (
                    <PlannerFeedback>
                      Route timing and transfers are coming soon — today you can stage your trip selections here.
                    </PlannerFeedback>
                  )}
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
