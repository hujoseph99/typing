import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";

export const theme = responsiveFontSizes(createMuiTheme({
	palette: {
		type: 'dark',
		primary: cyan,
		text: {
			primary: '#fafafa', // mui grey 50
			secondary: '#e0e0e0' // mui grey 300
		}
	},
	typography: {
		h1: {
			fontFamily: [
				'"Proxima Nova"',
				'"Helvetica"',
				'-apple-system',
				'Arial',
				'sans-serif',
			].join(','),
		},
		h2: {
			fontFamily: [
				'"Proxima Nova"',
				'"Helvetica"',
				'-apple-system',
				'Arial',
				'sans-serif',
			].join(','),
		},
		h3: {
			fontFamily: [
				'"Proxima Nova"',
				'"Helvetica"',
				'-apple-system',
				'Arial',
				'sans-serif',
			].join(','),
		},
		h4: {
			fontFamily: [
				'"Proxima Nova"',
				'"Helvetica"',
				'-apple-system',
				'Arial',
				'sans-serif',
			].join(','),
		},
		h5: {
			fontFamily: [
				'"Proxima Nova"',
				'"Helvetica"',
				'-apple-system',
				'Arial',
				'sans-serif',
			].join(','),
		},
		fontFamily: [
			'"Helvetica Neue"',
			'-apple-system',
			'Arial',
			'sans-serif',
		].join(','),
	},
}));
