import { FormikContextType, useFormikContext } from 'formik';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import toast from 'react-hot-toast';
import { Form, Input } from './styles';
import { PatientSchema } from '../../../../lib/formik/Patient/validationSchema';
import cepService from '../../../../api/cepService';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import { useMask } from '../../../../hooks/useMask';
import { ErrorMessage } from '../ErrorMessage';

export function Contact() {
  const {
    currentPatient,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );
  const formik: FormikContextType<PatientSchema> = useFormikContext();
  const [isFetchingAddressData, setIsFetchingAddressData] = useState(false);
  const postalCode = useMemo(() => formik.values.contact.postalCode, [formik.values.contact.postalCode]);

  const { maskedValue: maskedPostalCode } = useMask('postalCode', formik.values.contact.postalCode);

  const fetchAddress = useCallback(async () => {
    try {
      setIsFetchingAddressData(true);
      const address = await cepService.get(postalCode);
      formik.setFieldValue('contact.city', address.localidade);
      formik.setFieldValue('contact.uf', address.uf);
      formik.setFieldValue('contact.address', address.logradouro);
      formik.setFieldValue('contact.neighborhood', address.bairro);
      if (currentPatient?.contact?.postalCode !== postalCode) {
        formik.setFieldValue('contact.number', '');
        formik.setFieldValue('contact.complement', '');
      } else {
        formik.setFieldValue('contact.number', currentPatient.contact.number);
        formik.setFieldValue('contact.complement', currentPatient.contact.complement);
      }
    } catch (error) {
      toast.error('Verifique o CEP inserido.');
    } finally {
      setIsFetchingAddressData(false);
    }
  }, [postalCode]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (Object.keys(formik.errors).length) {
      toast.error('Por favor, verifique todos os campos antes de enviar o formulário.');
    }
    formik.handleSubmit(e);
  };

  useEffect(() => {
    const isValidPostalCode = !!postalCode && postalCode.length === 8;
    if (!isValidPostalCode) {
      return;
    }
    const timeout = setTimeout(() => {
      fetchAddress();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [postalCode]);

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label>
          CEP:
          <Input
            name="contact.postalCode"
            type="text"
            placeholder="Digite"
            value={maskedPostalCode}
            onBlur={formik.handleBlur}
            onChange={e => formik.setFieldValue('contact.postalCode', e.target.value.replace(/\D/g, ''))}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.postalCode && !!formik.errors?.contact?.postalCode}
          />
          {formik.touched?.contact?.postalCode && formik.errors?.contact?.postalCode && (
            <ErrorMessage message={formik.errors.contact.postalCode} />
          )}
        </label>
        <label>
          Cidade:
          <Input
            name="contact.city"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.city && !!formik.errors?.contact?.city}
          />
          {formik.touched?.contact?.city && formik.errors?.contact?.city && (
            <ErrorMessage message={formik.errors.contact.city} />
          )}
        </label>
        <label>
          UF:
          <Input
            name="contact.uf"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.uf}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.uf && !!formik.errors?.contact?.uf}
          />
          {formik.touched?.contact?.uf && formik.errors?.contact?.uf && (
            <ErrorMessage message={formik.errors.contact.uf} />
          )}
        </label>
        <label>
          Endereço:
          <Input
            name="contact.address"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            $error={!!formik.touched?.contact?.address && !!formik.errors?.contact?.address}
          />
          {formik.touched?.contact?.address && formik.errors?.contact?.address && (
            <ErrorMessage message={formik.errors.contact.address} />
          )}
        </label>
        <label>
          Número:
          <Input
            name="contact.number"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.number}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.address && !!formik.errors?.contact?.address}
          />
          {formik.touched?.contact?.number && formik.errors?.contact?.number && (
            <ErrorMessage message={formik.errors.contact.number} />
          )}
        </label>
        <label>
          Bairro:
          <Input
            name="contact.neighborhood"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.neighborhood}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.number && !!formik.errors?.contact?.number}
          />
          {formik.touched?.contact?.neighborhood && formik.errors?.contact?.neighborhood && (
            <ErrorMessage message={formik.errors.contact.neighborhood} />
          )}
        </label>
        <label>
          Complemento:
          <Input
            name="contact.complement"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.complement}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
            $error={!!formik.touched?.contact?.neighborhood && !!formik.errors?.contact?.neighborhood}
          />
          {formik.touched?.contact?.complement && formik.errors?.contact?.complement && (
            <ErrorMessage message={formik.errors.contact.complement} />
          )}
        </label>
      </div>
      <footer>
        <button disabled={formik.isSubmitting} type="submit">Salvar</button>
      </footer>
    </Form>
  );
}
