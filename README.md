# Gestão de Pacientes

Projeto criado com o objetivo de ser robusto e escalável, utilizei grande parte do meu conhecimento que adquiri ao longo de meus estudos e trabalho e mesmo assim consegui aprender muito ao longo da finalização do projeto.

## Como utilizar

Instale as dependências

```bash
$ npm install
```

Para rodar a aplicação

```bash
$ npm run dev
```

Por padrão estará sendo executado na porta `5173`

## Tecnologias utilizadas

### React + Typescript + Vite
Projeto criado com Vite tendo um ótimo desempenho em desenvolvimento (e em produção)

### Styled-Components
Utilizado com o objetivo de facilitar e aumentar as possibilidades de estilização de forma simples com o uso de CSS-in-JS

### Formik + Yup
Optei pelo Formik e Yup para lidar com formulários por eu ter mais familiaridade

### Phosphor-React
Para utilização de ícones SVG

### PrimeReact
Utilizado os componentes Dialog e Dropdown

### React Hot Toast
Para notificações de erro e sucesso

### React Images Uploading
Utilizado o componente de upload de imagens para os pacientes

## Importante

Caso esteja utilizando a API criada para o projeto, vá no arquivo `src/services/patients-service.ts` e mude:

```js
const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient'; /* URL Caso API NÃO estiver sendo executada localmente */
// const baseURL = 'http://localhost:3000/patient'; /* URL Caso API estiver sendo executada localmente */
```

para:

```js
// const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient'; /* URL Caso API NÃO estiver sendo executada localmente */
const baseURL = 'http://localhost:3000/patient'; /* URL Caso API estiver sendo executada localmente */
```

E se não estiver utilizando a API localmente, basta acessar <a href="https://github.com/murilothom/patient-management-api" target="_blank">Patient Management Api</a> e seguir os passos para a instalação
