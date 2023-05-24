import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '@/styles/themes/default';
import GlobalStyles from '@/styles/global';
import { Container } from '@/styles/App.styles';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          Hello World
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
