import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Home } from "./pages/Home"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DeletePatientModalProvider } from "./contexts/DeletePatientModalContext";
import { PatientsProvider } from "./contexts/PatientsContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <PatientsProvider>
        <DeletePatientModalProvider>
        <Home />
        </DeletePatientModalProvider>
      </PatientsProvider>

      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
