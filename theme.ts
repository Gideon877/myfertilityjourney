
"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true },
    // breakpoints: {
    //     values: {
    //         xs: 432,
    //         sm: 576,
    //         md: 768,
    //         lg: 992,
    //         xl: 1200,
    //         // xxl: 1400, 'xxl' does not exist in
    //     },
    // },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                   color: '#578388 !important',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontWeight: '400',
                },
            },
        },
    },
});

export default theme;
