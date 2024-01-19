import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'phosphor-react';
import { parseISO } from 'date-fns';
import { ButtonWrapper, Form, Select } from './styles';
import userImg from '../../../../assets/image-user.png';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import 'react-datepicker/dist/react-datepicker.css';
import { Step } from '../..';

registerLocale('ptBR', ptBR);

const genderOptions = [
  { value: 'female', label: 'Feminino' },
  { value: 'male', label: 'Masculino' },
  { value: 'other', label: 'Outro' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Solteiro' },
  { value: 'married', label: 'Casado' },
  { value: 'separate', label: 'Separado' },
  { value: 'divorced', label: 'Divorciado' },
  { value: 'widower', label: 'Viúvo' },
];

const patientSchema = z.object({
  name: z.string().trim(),
  rg: z.string().trim(),
  document: z.string().length(11).trim(),
  nickname: z.string().trim(),
  email: z.string().trim(),
  nationality: z.string().trim(),
  dateOfBirth: z.string(),
  gender: z.string().trim(),
  maritalStatus: z.string().trim(),
  additionalObservations: z.string().optional(),
});

type PatientSchema = z.infer<typeof patientSchema>;

interface Props {
  handleChangeStep: (step: Step) => void
}

export function PatientBasicInfo({ handleChangeStep }: Props) {
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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = () => {
    handleChangeStep(Step.CONTACT);
  };

  useEffect(() => {
    if (gender) {
      setValue('gender', gender);
    }
    if (maritalStatus) {
      setValue('maritalStatus', maritalStatus);
    }
    if (dateOfBirth) {
      setValue('dateOfBirth', dateOfBirth.toString());
    }
  }, [gender, maritalStatus, dateOfBirth]);

  return (
    <div>
      <img src={userImg} alt="User" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Paciente:
            <input
              type="text"
              placeholder="Digite"
              {...register('name')}
              required
              defaultValue={currentPatient?.name ?? ''}
            />
          </label>
          <label>
            Apelido:
            <input
              type="text"
              placeholder="Digite"
              {...register('nickname')}
              required
              defaultValue={currentPatient?.nickname ?? ''}
            />
          </label>
          <label>
            Nacionalidade:
            <input
              type="text"
              placeholder="Digite"
              {...register('nationality')}
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
              {...register('document')}
              required
              defaultValue={currentPatient?.document ?? ''}
            />
          </label>
          <label>
            RG:
            <input
              type="text"
              placeholder="Digite"
              {...register('rg')}
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
              {...register('email')}
              required
              defaultValue={currentPatient?.email ?? ''}
            />
          </label>
        </div>

        <label style={{ width: '100%' }}>
          Informações adicionais
          <textarea
            placeholder="Digite"
            {...register('additionalObservations')}
            defaultValue={currentPatient?.additionalObservations ?? ''}
          />
        </label>

        <ButtonWrapper>
          <button type="submit" disabled={isSubmitting}>Próximo</button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}
