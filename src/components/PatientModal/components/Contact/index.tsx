import { useContextSelector } from 'use-context-selector';
import { UseFormReturn } from 'react-hook-form';
import { Form } from './styles';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { PatientSchema } from '../../../../types/PatientSchema';
import { Step } from '../..';

interface Props {
  handleChangeStep: (step: Step) => void
  form: UseFormReturn<PatientSchema>
}

export function Contact({ form, handleChangeStep }: Props) {
  const {
    handleClosePatientModal,
  } = useContextSelector(
    ModalContext,
    (context) => context,
  );

  const {
    currentPatient,
    fetchPatients,
    onSubmit,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  const onSubmitData = async (data: PatientSchema) => {
    await onSubmit(data);
    fetchPatients();
    handleChangeStep(Step.INFO);
    handleClosePatientModal();
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmitData)}>
      <div>
        <label>
          CEP:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.postalCode')}
            required
            defaultValue={currentPatient?.contact.postalCode ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.city')}
            required
            defaultValue={currentPatient?.contact.city ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.uf')}
            required
            defaultValue={currentPatient?.contact.uf ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.address')}
            required
            defaultValue={currentPatient?.contact.address ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.number')}
            required
            defaultValue={currentPatient?.contact.number ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.neighborhood')}
            required
            defaultValue={currentPatient?.contact.neighborhood ?? ''}
          />
        </label>
        <label>
          Apelido:
          <input
            type="text"
            placeholder="Digite"
            {...form.register('contact.complement')}
            required
            defaultValue={currentPatient?.contact.complement ?? ''}
          />
        </label>
      </div>
      <footer>
        <button disabled={form.formState.isSubmitting} type="submit">Salvar</button>
      </footer>
    </Form>
  );
}
