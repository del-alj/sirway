import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');

  :root {
    --color-primary: #0C1E4B;
    --color-primary-dark: #071437;
    --color-accent: #27C2A3;
    --color-warning: #F5A623;
    --color-text: #1A202C;
    --color-text-muted: #4A4A68;
    --color-muted: #9191A6;
    --color-surface: #FFFFFF;
    --color-background: #F4F5F7;
    --shadow-lg: 0 25px 55px rgba(12, 30, 75, 0.18);
    --shadow-md: 0 18px 35px rgba(12, 30, 75, 0.12);
    --shadow-sm: 0 8px 18px rgba(12, 30, 75, 0.08);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    background: var(--color-background);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--color-primary);
    margin: 0;
  }

  p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;

export default GlobalStyle;
