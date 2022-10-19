import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
 border-spacing: 0;
}
*{
    box-sizing: border-box;
    
}

.swal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

.swal-modal {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
    border-radius: 5px;
}

.swal-title {
    font-family: "Passion One", cursive;
    margin: 0px;
    font-size: 50px;
    line-height: 50px;
    letter-spacing: 0.05em;
    margin-bottom: 30px;
    color: #000000;
}

.swal-text {
  font-family: "Lato", sans-serif;
  color: #000000;
  margin-top: 10px;
  text-align: center;
}

.swal-button {
  border-radius: 2px;
  background-color: #1877f2;
  font-size: 15px;
  font-family: "Oswald", sans-serif;
}
`;

export default GlobalStyle;
