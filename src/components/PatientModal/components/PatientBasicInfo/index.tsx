import { useContextSelector } from 'use-context-selector';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'phosphor-react';
import { parseISO } from 'date-fns';
import { FormikContextType, useFormikContext } from 'formik';
import { ButtonWrapper, Form, Select } from './styles';
import userImg from '../../../../assets/image-user.png';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import 'react-datepicker/dist/react-datepicker.css';
import { PatientSchema } from '../../../../lib/formik/Patient/validationSchema';
import { useMask } from '../../../../hooks/useMask';

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

enum Step {
  INFO = 1,
  CONTACT = 2,
}

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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    currentPatient ? parseISO(currentPatient.dateOfBirth.toString()) : null,
  );

  const formik: FormikContextType<PatientSchema> = useFormikContext();

  const { maskedValue: maskedDocument } = useMask('cpf', formik.values.document);

  const onSubmit = () => {
    handleChangeStep(Step.CONTACT);
  };

  useEffect(() => {
    if (formik.values.dateOfBirth) {
      setDateOfBirth(new Date(formik.values.dateOfBirth));
    }
  }, [formik.values.dateOfBirth]);

  return (
    <div>
      <img src={userImg} alt="Imagem do Usuário" />
      <Form onSubmit={onSubmit}>
        <div>
          <label>
            Paciente:
            <input
              name="name"
              type="text"
              placeholder="Digite"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </label>
          <label>
            Apelido:
            <input
              name="nickname"
              type="text"
              placeholder="Digite"
              value={formik.values.nickname}
              onChange={formik.handleChange}
            />
          </label>
          <label>
            Nacionalidade:
            <input
              name="nationality"
              type="text"
              placeholder="Digite"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            />
          </label>
          <label>
            Nascimento:
            <DatePicker
              name="dateOfBirth"
              showIcon
              dateFormat="dd/MM/yyyy"
              locale="ptBR"
              selected={dateOfBirth}
              onChange={(date: Date) => formik.setFieldValue('dateOfBirth', date)}
              icon={
                <Calendar color="#136CDC" size={40} weight="bold" />
              }
            />
          </label>
          <label>
            CPF:
            <input
              name="document"
              type="text"
              placeholder="Digite"
              value={maskedDocument}
              onChange={e => formik.setFieldValue('document', e.target.value.replace(/\D/g, ''))}
            />
          </label>
          <label>
            RG:
            <input
              name="rg"
              type="text"
              placeholder="Digite"
              value={formik.values.rg}
              onChange={formik.handleChange}
            />
          </label>
          <label>
            Gênero:
            <Select
              name="gender"
              value={formik.values.gender}
              options={genderOptions}
              placeholder="Sem filtro"
              onChange={(option) => formik.setFieldValue('gender', option.value)}
            />
          </label>
          <label>
            Estado civil:
            <Select
              name="maritalStatus"
              value={formik.values.maritalStatus}
              options={maritalStatusOptions}
              placeholder="Sem filtro"
              onChange={(option) => formik.setFieldValue('maritalStatus', option.value)}
            />
          </label>
          <label>
            E-mail:
            <input
              name="email"
              type="email"
              placeholder="Digite"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </label>
        </div>

        <label style={{ width: '100%' }}>
          Informações adicionais
          <textarea
            name="additionalObservations"
            placeholder="Digite"
            value={formik.values.additionalObservations}
            onChange={formik.handleChange}
          />
        </label>

        <ButtonWrapper>
          <button type="submit" disabled={formik.isSubmitting}>Próximo</button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}
