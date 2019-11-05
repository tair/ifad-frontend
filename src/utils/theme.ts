import { red, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { AnnotationCategory } from '../components/WGS/store';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;

export const COLORS: {[key in AnnotationCategory]: string} = {
    'EXP': '#0088FE',
    'OTHER': '#00C49F',
    'UNKNOWN': '#FFBB28',
    'UNANNOTATED': '#FF8042'
};