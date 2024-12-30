import { createSlice } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../theme";

const PRIMARY_COLOR = String(localStorage.getItem("colorTheme"));

const isDarkMode = Boolean(localStorage.getItem("isDarkMode"))

const initialState = {
    isDarkMode,
    colorPrimary: PRIMARY_COLOR,
    theme: isDarkMode ? darkTheme : lightTheme,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            state.theme = state.isDarkMode ? darkTheme : lightTheme;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
        },
        setPrimaryColor: (state, action) => {
            state.colorPrimary = action.payload;
            localStorage.setItem("colorTheme", JSON.stringify(state.colorPrimary));
        },
    },
});

export const { toggleTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;