import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '@/styles/themes/default';
import GlobalStyles from '@/styles/global';
import { Container } from '@/styles/App.styles';

import AuthProvider from '@/contexts/AuthContext';

import ToastContainer from '@/components/Toast/ToastContainer';
import Header from '@/components/Header';

import Router from '@/routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <GlobalStyles />
          <ToastContainer />

          <Container>
            <Header />
            <Router />
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
