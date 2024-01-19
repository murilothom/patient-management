import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Home } from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from './contexts/ModalContext';
import { PatientsProvider } from './contexts/PatientsContext';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <PatientsProvider>
        <ModalProvider>
          <Home />
        </ModalProvider>
      </PatientsProvider>

      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
