import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    }

    html {
        //Defines 1 rem = 10px (10px/16px)
        font-size: 62.5% 
    }

    body {
        box-sizing:border-box;
        font-family: var(--font-family--text);
        line-height:1.4;

        
        
        
    }
`

export default GlobalStyle;
