import gestaoDSImg from '../../assets/logo-gestao-ds.png';
import { Patients } from '../../components/Patients';
import { HomeContainer } from './styles';

export function Home() {
  return (
    <HomeContainer>
      <img src={gestaoDSImg} alt="Logo Gestão DS" />

      <Patients />
    </HomeContainer>
  );
}
