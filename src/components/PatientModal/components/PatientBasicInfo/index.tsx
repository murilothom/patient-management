import { useContextSelector } from 'use-context-selector';
import { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'phosphor-react';
import { parseISO } from 'date-fns';
import { FormikContextType, useFormikContext } from 'formik';
import { ButtonWrapper, Form, Input, Select, Textarea, DatePicker } from './styles';
import userImg from '../../../../assets/image-user.png';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import 'react-datepicker/dist/react-datepicker.css';
import { PatientSchema } from '../../../../lib/formik/Patient/validationSchema';
import { useMask } from '../../../../hooks/useMask';
import { ErrorMessage } from '../ErrorMessage';

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
            <Input
              name="name"
              type="text"
              placeholder="Digite"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              $error={!!formik.touched?.name && !!formik.errors?.name}
            />
            {formik.touched?.name && formik.errors?.name && (
              <ErrorMessage message={formik.errors.name} />
            )}
          </label>
          <label>
            Apelido:
            <Input
              name="nickname"
              type="text"
              placeholder="Digite"
              value={formik.values.nickname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              $error={!!formik.touched?.nickname && !!formik.errors?.nickname}
            />
            {formik.touched?.nickname && formik.errors?.nickname && (
              <ErrorMessage message={formik.errors.nickname} />
            )}
          </label>
          <label>
            Nacionalidade:
            <Input
              name="nationality"
              type="text"
              placeholder="Digite"
              value={formik.values.nationality}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              $error={!!formik.touched?.nationality && !!formik.errors?.nationality}
            />
            {formik.touched?.nationality && formik.errors?.nationality && (
              <ErrorMessage message={formik.errors.nationality} />
            )}
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
              $error={!!formik.touched?.dateOfBirth && !!formik.errors?.dateOfBirth}
            />
            {formik.touched?.dateOfBirth && formik.errors?.dateOfBirth && (
              <ErrorMessage message={formik.errors.dateOfBirth as string} />
            )}
          </label>
          <label>
            CPF:
            <Input
              name="document"
              type="text"
              placeholder="Digite"
              value={maskedDocument}
              onBlur={formik.handleBlur}
              onChange={e => formik.setFieldValue('document', e.target.value.replace(/\D/g, ''))}
              $error={!!formik.touched?.document && !!formik.errors?.document}
            />
            {formik.touched?.document && formik.errors?.document && (
              <ErrorMessage message={formik.errors.document} />
            )}
          </label>
          <label>
            RG:
            <Input
              name="rg"
              type="text"
              placeholder="Digite"
              value={formik.values.rg}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              $error={!!formik.touched?.rg && !!formik.errors?.rg}
            />
            {formik.touched?.rg && formik.errors?.rg && (
              <ErrorMessage message={formik.errors.rg} />
            )}
          </label>
          <label>
            Gênero:
            <Select
              name="gender"
              value={formik.values.gender}
              onBlur={formik.handleBlur}
              options={genderOptions}
              placeholder="Sem filtro"
              onChange={(option) => formik.setFieldValue('gender', option.value)}
              $error={!!formik.touched?.gender && !!formik.errors?.gender}
            />
            {formik.touched?.gender && formik.errors?.gender && (
              <ErrorMessage message={formik.errors.gender} />
            )}
          </label>
          <label>
            Estado civil:
            <Select
              name="maritalStatus"
              value={formik.values.maritalStatus}
              onBlur={formik.handleBlur}
              options={maritalStatusOptions}
              placeholder="Sem filtro"
              onChange={(option) => formik.setFieldValue('maritalStatus', option.value)}
              $error={!!formik.touched?.maritalStatus && !!formik.errors?.maritalStatus}
            />
            {formik.touched?.maritalStatus && formik.errors?.maritalStatus && (
              <ErrorMessage message={formik.errors.maritalStatus} />
            )}
          </label>
          <label>
            E-mail:
            <Input
              name="email"
              type="email"
              placeholder="Digite"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              $error={!!formik.touched?.email && !!formik.errors?.email}
            />
            {formik.touched?.email && formik.errors?.email && (
              <ErrorMessage message={formik.errors.email} />
            )}
          </label>
        </div>

        <label style={{ width: '100%' }}>
          Informações adicionais
          <Textarea
            name="additionalObservations"
            placeholder="Digite"
            value={formik.values.additionalObservations}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            $error={!!formik.touched?.additionalObservations && !!formik.errors?.additionalObservations}
          />
          {formik.touched?.additionalObservations && formik.errors?.additionalObservations && (
            <ErrorMessage message={formik.errors.additionalObservations} />
          )}
        </label>

        <ButtonWrapper>
          <button type="submit" disabled={formik.isSubmitting}>Próximo</button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}
