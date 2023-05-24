import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '@/styles/themes/default';
import GlobalStyles from '@/styles/global';
import { Container } from '@/styles/App.styles';

import AuthProvider from '@/context/AuthContext';

import Header from '@/components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <GlobalStyles />

          <Container>
            <Header />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
