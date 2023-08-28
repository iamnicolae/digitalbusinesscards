import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */
    html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
  }

  /* Variables */
    :root {
    --font: 'Jost', sans-serif;
    //--font2: 'Abril Fatface', cursive;
    --color-primary: #4e00ff;
    --color-secondary: #e52e2e;
    --color-lightPrimary: #ffffff;
    --color-lightSecondary: #d0d0e1;
    --color-darkPrimary: #222222;
    --color-darkSecondary: #2e2e2e;
    --color-darkTertiary: #1a1a1a;
    --color-accent: #201e24;
  }
	
  /* General Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  fieldset {
    border: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      box-shadow: 0 0 0 30px white inset !important;
  }

  textarea:focus, 
  input:focus, 
  textarea:focus, 
  select:focus,
  button:focus {
    outline: none;
  }

  html {
    font-size: 10px;
  }

  body {
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background: var(--color-lightPrimary);
  }

  body:has(.requires-no-scroll) {
    overflow: hidden;
  }

  body, 
  button,
  input,
  select,
  textarea {
    font-size: 1.7rem;
    font-weight: 400;
    font-family: var(--font);
    color: var(--color-darkPrimary);
  }

  a {
    text-decoration: none;
    color: var(--color-darkTertiary);
  }

  button {
    cursor: pointer;
    border: none;
    padding: 9px 12px;
    font-size: 1.7rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.1;
  }
`

export default GlobalStyle