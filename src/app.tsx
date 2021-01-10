import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DefaultTheme, ThemeProvider as StyledThemeProvider} from 'styled-components';
import {createMuiTheme, Theme, ThemeProvider, Typography} from '@material-ui/core';
import {red} from "@material-ui/core/colors";
import colors from "./utils/styles/colors";
import './index.css';
import Layout from "./components/Layout/Layout";
import { Provider } from "react-redux";
import store from './redux/store';
import {saveStoreToFile} from "./utils/utls";
import throttle from 'lodash.throttle';

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
    ReactDOM.render(<Provider store={store}>
            <ThemeProvider<Theme> theme={theme}>
        <StyledThemeProvider theme={styledTheme}>
            <Layout />
        </StyledThemeProvider>
    </ThemeProvider>
    </Provider>, document.body);
}

store.subscribe(throttle(() => {
    saveStoreToFile(store.getState().project.projects)
}, 1000))

render();