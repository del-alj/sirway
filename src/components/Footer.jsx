import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  background: #333;
  color: #fff;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 SirWay. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
