// components/Header.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCity } from '../context/CityContext';
import SirWayLogo from '../logoIcon.png';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background: rgba(244, 245, 247, 0.85);
  border-bottom: 1px solid rgba(12, 30, 75, 0.08);
  padding: 0.85rem clamp(1.25rem, 4vw, 3.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease;
`;

const BrandBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--color-primary);
  font-size: clamp(1.15rem, 2vw, 1.4rem);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-muted);
  position: relative;
  padding: 0.35rem 0;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: var(--color-primary);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, var(--color-primary), #274D9C);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Selector = styled.select`
  appearance: none;
  border: 1px solid rgba(12, 30, 75, 0.15);
  border-radius: 999px;
  padding: 0.45rem 1.25rem;
  background: rgba(255, 255, 255, 0.75);
  color: var(--color-text);
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(12, 30, 75, 0.15);
  }
`;

const DesktopNav = styled(Nav)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopControls = styled(Controls)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(12, 30, 75, 0.15);
  background: rgba(255, 255, 255, 0.75);
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  span,
  &::before,
  &::after {
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 999px;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  &::before {
    position: absolute;
    top: 14px;
  }

  &::after {
    position: absolute;
    bottom: 14px;
  }

  span {
    position: absolute;
  }

  &[aria-expanded='true']::before {
    transform: translateY(7px) rotate(45deg);
  }

  &[aria-expanded='true']::after {
    transform: translateY(-7px) rotate(-45deg);
  }

  &[aria-expanded='true'] span {
    opacity: 0;
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(12, 30, 75, 0.15);
  }

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(12, 30, 75, 0.35);
  backdrop-filter: blur(3px);
  z-index: 999;
`;

const MobileSheet = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 82%);
  height: 100vh;
  background: rgba(244, 245, 247, 0.96);
  box-shadow: -12px 0 35px rgba(12, 30, 75, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  z-index: 1000;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.75rem;
`;

const MobileLink = styled(NavLink)`
  font-size: 1.05rem;
  color: var(--color-primary);
  &::after {
    display: none;
  }
`;

const MobileControls = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const MobileSelectorLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

const MobileSelector = styled(Selector)`
  width: 100%;
  padding: 0.55rem 1rem;
`;

const Header = () => {
  const { currentCity, setCurrentCity } = useCity();
  const [language, setLanguage] = useState('EN');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cityOptions = ['Casablanca', 'Rabat', 'Salé'];

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const handleCityChange = (value) => {
    setCurrentCity(value);
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setIsMenuOpen(false);
  };

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <HeaderBar>
      <BrandBlock>
        <span role="img" aria-label="tram">
        <img src={SirWayLogo} alt="SirWay Logo" style={{ height: '40px', width: 'auto' }} />
        </span>
        SirWay
      </BrandBlock>

      <DesktopNav>
        <NavLink href="#hero">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#map">Map</NavLink>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </DesktopNav>

      <DesktopControls>
        <Selector
          aria-label="Select city"
          value={currentCity}
          onChange={(event) => handleCityChange(event.target.value)}
        >
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Selector>
        <Selector
          aria-label="Select language"
          value={language}
          onChange={(event) => handleLanguageChange(event.target.value)}
        >
          <option value="EN">EN</option>
          <option value="FR">FR</option>
          <option value="AR">AR</option>
        </Selector>
      </DesktopControls>

      <MenuButton
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
      </MenuButton>

      {isMenuOpen && (
        <>
          <MobileOverlay onClick={() => setIsMenuOpen(false)} />
          <MobileSheet>
            <div>
              <MobileNav>
                <MobileLink href="#hero" onClick={handleNavClick}>Home</MobileLink>
                <MobileLink href="#about" onClick={handleNavClick}>About</MobileLink>
                <MobileLink href="#map" onClick={handleNavClick}>Map</MobileLink>
                <MobileLink href="#features" onClick={handleNavClick}>Features</MobileLink>
                <MobileLink href="#contact" onClick={handleNavClick}>Contact</MobileLink>
              </MobileNav>
            </div>

            <MobileControls>
              <MobileSelectorLabel>
                City
                <MobileSelector
                  value={currentCity}
                  onChange={(event) => handleCityChange(event.target.value)}
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </MobileSelector>
              </MobileSelectorLabel>

              <MobileSelectorLabel>
                Language
                <MobileSelector
                  value={language}
                  onChange={(event) => handleLanguageChange(event.target.value)}
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                  <option value="AR">AR</option>
                </MobileSelector>
              </MobileSelectorLabel>
            </MobileControls>
          </MobileSheet>
        </>
      )}
    </HeaderBar>
  );
};

export default Header;