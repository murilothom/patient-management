import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Home } from './pages/home';
import { ModalProvider } from './contexts/modal-context';
import { PatientsProvider } from './contexts/patients-context';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster position="top-right" />

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
