export interface ThemeInterface {
    palette: {
        mode: string;
        background: {
            default: string;
            paper: string;
        };
        primary: {
            main: string;
            light: string;
        }
        text: {
            primary: string;
            secondary: string;
        };
        divider: string;
    }
}

export const darkTheme: ThemeInterface = {
    palette: {
        mode: 'dark',
        background: { default: '#282828', paper: '#383838' },
        primary: { main: '#fff', light: '#AAAAAA' },
        text: { primary: '#fff', secondary: '#ffffff80' },
        divider: '#ffffff33',
    },
};

export const lightTheme: ThemeInterface = {
    palette: {
        mode: 'light',
        background: { default: '#fff', paper: '#f5f5f5' },
        primary: { main: '#0d0d0d', light: '#606060' },
        text: { primary: '#0d0d0d', secondary: '#606060'},
        divider: '#00000033',
    },
};

export const primaryColors = [
    {
        name: 'Blue',
        color: '#81BFDA',
    },
    {
        name: 'Pink',
        color: '#D180D9',
    },
    {
        name: 'Orange',
        color: '#D9AF80',
    },
    {
        name: 'Green',
        color: '#A9D980',
    },
    {
        name: "Purple",
        color: "#9F8CDC",
    }
]