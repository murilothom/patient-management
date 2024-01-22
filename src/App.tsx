import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Home } from './pages/Home';
import { ModalProvider } from './contexts/ModalContext';
import { PatientsProvider } from './contexts/PatientsContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster position='top-right' />

      <PatientsProvider>
        <ModalProvider>
          <Home />
        </ModalProvider>
      </PatientsProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
