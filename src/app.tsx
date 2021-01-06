import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DefaultTheme, ThemeProvider as StyledThemeProvider} from 'styled-components';
import {createMuiTheme, Theme, ThemeProvider, Typography} from '@material-ui/core';
import {red} from "@material-ui/core/colors";
import colors from "./utils/styles/colors";
import Layout from "./components/Layout/Layout";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[900],
        },
        secondary: {
            main: '#ffffff',
        },
    },
});


const styledTheme: DefaultTheme = {
    palette: {
        primary: {
            main: red[900],
        },
        secondary: {
            main: '#ffffff',
        },
    },
    transition: '0.3s ease-in-out',
    colors,
};

function render() {
    ReactDOM.render(<ThemeProvider<Theme> theme={theme}>
        <StyledThemeProvider theme={styledTheme}>
            <Layout />
        </StyledThemeProvider>
    </ThemeProvider>, document.body);
}

render();