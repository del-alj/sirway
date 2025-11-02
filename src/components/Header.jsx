// components/Header.jsx
import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background: rgba(244, 245, 247, 0.85);
  border-bottom: 1px solid rgba(12, 30, 75, 0.08);
  padding: 0.85rem clamp(1.5rem, 4vw, 3.5rem);
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

const Header = () => {
  return (
    <HeaderBar>
      <BrandBlock>
        <span role="img" aria-label="tram">🚊</span>
        SirWay
      </BrandBlock>

      <Nav>
        <NavLink href="#hero">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#map">Map</NavLink>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Nav>

      <Controls>
        <Selector aria-label="Select city" defaultValue="casablanca">
          <option value="casablanca">Casablanca</option>
          <option value="rabat">Rabat</option>
          <option value="sale">Salé</option>
        </Selector>
        <Selector aria-label="Select language" defaultValue="en">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </Selector>
      </Controls>
    </HeaderBar>
  );
};

export default Header;