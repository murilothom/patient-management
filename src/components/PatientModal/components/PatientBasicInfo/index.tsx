import { useContextSelector } from 'use-context-selector';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'phosphor-react';
import { parseISO } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { ButtonWrapper, Form, Select } from './styles';
import userImg from '../../../../assets/image-user.png';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import 'react-datepicker/dist/react-datepicker.css';
import { Step } from '../..';
import { PatientSchema } from '../../../../types/PatientSchema';

registerLocale('ptBR', ptBR);

const genderOptions = [
  { value: 'female', label: 'Feminino' },
  { value: 'male', label: 'Masculino' },
  { value: 'other', label: 'Outro' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Solteiro(a)' },
  { value: 'married', label: 'Casado(a)' },
  { value: 'separate', label: 'Separado(a)' },
  { value: 'divorced', label: 'Divorciado(a)' },
  { value: 'widower', label: 'Viúvo(a)' },
];

interface Props {
  handleChangeStep: (step: Step) => void
  form: UseFormReturn<PatientSchema>
}

export function PatientBasicInfo({ handleChangeStep, form }: Props) {
  const {
    currentPatient,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );
  const [gender, setGender] = useState(currentPatient?.gender ?? '');
  const [maritalStatus, setMaritalStatus] = useState(currentPatient?.maritalStatus ?? '');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    currentPatient ? parseISO(currentPatient.dateOfBirth.toString()) : null,
  );

  const onSubmit = () => {
    handleChangeStep(Step.CONTACT);
  };

  useEffect(() => {
    if (gender) {
      form.setValue('gender', gender);
    }
    if (maritalStatus) {
      form.setValue('maritalStatus', maritalStatus);
    }
    if (dateOfBirth) {
      form.setValue('dateOfBirth', dateOfBirth.toString());
    }
  }, [gender, maritalStatus, dateOfBirth]);

  return (
    <div>
      <img src={userImg} alt="User" />
      <Form onSubmit={onSubmit}>
        <div>
          <label>
            Paciente:
            <input
              type="text"
              placeholder="Digite"
              {...form.register('name')}
              required
              defaultValue={currentPatient?.name ?? ''}
            />
          </label>
          <label>
            Apelido:
            <input
              type="text"
              placeholder="Digite"
              {...form.register('nickname')}
              required
              defaultValue={currentPatient?.nickname ?? ''}
            />
          </label>
          <label>
            Nacionalidade:
            <input
              type="text"
              placeholder="Digite"
              {...form.register('nationality')}
              required
              defaultValue={currentPatient?.nationality ?? ''}
            />
          </label>
          <label>
            Nascimento:
            <DatePicker
              showIcon
              dateFormat="dd/MM/yyyy"
              locale="ptBR"
              selected={dateOfBirth}
              onChange={(date: Date) => setDateOfBirth(date)}
              icon={
                <Calendar color="#136CDC" size={40} weight="bold" />
              }
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              placeholder="Digite"
              {...form.register('document')}
              required
              defaultValue={currentPatient?.document ?? ''}
            />
          </label>
          <label>
            RG:
            <input
              type="text"
              placeholder="Digite"
              {...form.register('rg')}
              required
              defaultValue={currentPatient?.rg ?? ''}
            />
          </label>
          <label>
            Gênero:
            <Select
              value={gender}
              options={genderOptions}
              placeholder="Sem filtro"
              onChange={(option) => setGender(option.value)}
            />
          </label>
          <label>
            Estado civil:
            <Select
              value={maritalStatus}
              options={maritalStatusOptions}
              placeholder="Sem filtro"
              onChange={(option) => setMaritalStatus(option.value)}
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              placeholder="Digite"
              {...form.register('email')}
              required
              defaultValue={currentPatient?.email ?? ''}
            />
          </label>
        </div>

        <label style={{ width: '100%' }}>
          Informações adicionais
          <textarea
            placeholder="Digite"
            {...form.register('additionalObservations')}
            defaultValue={currentPatient?.additionalObservations ?? ''}
          />
        </label>

        <ButtonWrapper>
          <button type="submit" disabled={form.formState.isSubmitting}>Próximo</button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}
