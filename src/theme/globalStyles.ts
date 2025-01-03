import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        background: ${localStorage.getItem("isDarkMode") === "true" ? "#383838" : "#f5f5f5"}
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        border-radius: 0;
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.15);
    }

    ::-webkit-scrollbar-track {
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0);
    }
`;

export default GlobalStyles;