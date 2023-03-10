import ReactDOM from 'react-dom/client';
import Start from './Start';
import theme from './theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Start />
  </ThemeProvider>
);
