import { createMuiTheme } from '@material-ui/core/styles';
import { RED, PURPLE } from '../UI/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Raleway', 'Helvetica Neue', Arial, sans-serif`
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: PURPLE
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: RED
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00'
    },
    dark: {
      main: '#333333'
    }
    // error: will use the default color
  }
});

export default theme;
