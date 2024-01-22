import { FormikContextType, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import toast from 'react-hot-toast';
import { Form } from './styles';
import { PatientSchema } from '../../../../lib/formik/Patient/validationSchema';
import cepService from '../../../../api/cepService';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import { useMask } from '../../../../hooks/useMask';

export function Contact() {
  const {
    currentPatient,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );
  const [isFetchingAddressData, setIsFetchingAddressData] = useState(false);
  const formik: FormikContextType<PatientSchema> = useFormikContext();

  const {
    maskedValue: maskedPostalCode,
    cleanedValue: cleanedPostalCode,
  } = useMask('postalCode', formik.values.contact.postalCode);

  const fetchAddress = async () => {
    try {
      setIsFetchingAddressData(true);
      const address = await cepService.get(cleanedPostalCode);
      formik.setFieldValue('contact.city', address.localidade);
      formik.setFieldValue('contact.uf', address.uf);
      formik.setFieldValue('contact.address', address.logradouro);
      formik.setFieldValue('contact.neighborhood', address.bairro);
      if (currentPatient?.contact?.postalCode !== formik.values.contact.postalCode) {
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
  };

  useEffect(() => {
    const isValidPostalCode = cleanedPostalCode.length >= 5;
    if (!isValidPostalCode) {
      return;
    }
    const timeout = setTimeout(() => {
      fetchAddress();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [formik.values.contact.postalCode]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          CEP:
          <input
            name="contact.postalCode"
            type="text"
            placeholder="Digite"
            value={maskedPostalCode}
            onChange={e => formik.setFieldValue('contact.postalCode', e.target.value.replace(/\D/g, ''))}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
        <label>
          Cidade:
          <input
            name="contact.city"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.city}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
        <label>
          UF:
          <input
            name="contact.uf"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.uf}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
        <label>
          Endereço:
          <input
            name="contact.address"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.address}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Número:
          <input
            name="contact.number"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.number}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
        <label>
          Bairro:
          <input
            name="contact.neighborhood"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.neighborhood}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
        <label>
          Complemento:
          <input
            name="contact.complement"
            type="text"
            placeholder="Digite"
            value={formik.values.contact.complement}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting || isFetchingAddressData}
          />
        </label>
      </div>
      <footer>
        <button disabled={formik.isSubmitting} type="submit">Salvar</button>
      </footer>
    </Form>
  );
}
