import { FormikContextType, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Form } from './styles';
import { PatientSchema } from '../../../../lib/formik/Patient/validationSchema';
import cepService from '../../../../api/cepService';

export function Contact() {
  const formik: FormikContextType<PatientSchema> = useFormikContext();

  const fetchAddress = async () => {
    if (!formik.values.contact.postalCode?.length) return;
    const address = await cepService.get(formik.values.contact.postalCode);

    formik.setFieldValue('contact.city', address.localidade);
    formik.setFieldValue('contact.uf', address.uf);
    formik.setFieldValue('contact.address', address.logradouro);
    formik.setFieldValue('contact.neighborhood', address.bairro);
    formik.setFieldValue('contact.number', '');
    formik.setFieldValue('contact.complement', '');
  };

  useEffect(() => {
    if (formik.values.contact.postalCode?.length === 8) {
      fetchAddress();
    }
  }, [formik.values.contact.postalCode]);

  // TODO: fazer o fetch pelo cep
  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          CEP:
          <input
            name="contact.postalCode"
            type="text"
            placeholder="Digite"
            required
            value={formik.values.contact.postalCode}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Cidade:
          <input
            name="contact.city"
            type="text"
            placeholder="Digite"
            required
            value={formik.values.contact.city}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          UF:
          <input
            name="contact.uf"
            type="text"
            placeholder="Digite"
            required
            value={formik.values.contact.uf}
            onChange={formik.handleChange}
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
            required
            value={formik.values.contact.number}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Bairro:
          <input
            name="contact.neighborhood"
            type="text"
            placeholder="Digite"
            required
            value={formik.values.contact.neighborhood}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Complemento:
          <input
            name="contact.complement"
            type="text"
            placeholder="Digite"
            required
            value={formik.values.contact.complement}
            onChange={formik.handleChange}
          />
        </label>
      </div>
      <footer>
        <button disabled={formik.isSubmitting} type="submit">Salvar</button>
      </footer>
    </Form>
  );
}
