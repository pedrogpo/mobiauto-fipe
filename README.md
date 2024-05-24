https://github.com/pedrogpo/mobiauto-challenge-next/assets/50748006/32012409-a06a-4a5c-afca-61c8c85547fa

## Features

- Escolher tipo de veículo, marca, modelo e ano para consulta de detalhes da fipe
- Histórico de consultas
- Validação de ponta a ponta do formulário
- Data Fetching com caching e revalidate
- Rota dinamica de consulta da fipe com time based revalidation
- Custom HTTP/Error Handler
- Testes E2E com Cypress e Unitários com Jest

## Tech Stack

- Next.js 14 - App folder
- TypeScript
- Material UI
- MobX / Mobx-Persist-Store
- React Hook Form
- Zod
- Jest
- Cypress

## Deploy

Deploy do projeto -> [Clique aqui](https://mobiauto-challenge-next.vercel.app/)

## Executar o projeto

1. Clone o repositório: `git clone https://github.com/pedrogpo/mobiauto-challenge-next`
2. Navegue para o diretório do projeto: `cd mobiauto-challenge-next`
3. Instale as depêndencias: `yarn i ou npm i`
4. Executar o app: `yarn dev`

## Executar os testes

1. Instale as depêndencias: `yarn i ou npm i`
2. Rodar os testes: `yarn test`
3. Lembre-se de executar o projeto em dev para o funcionamento do cypress ser como o esperado

## Alguns pontos sobre o desafio

- Utilizei as práticas recomendadas pelo Next para a busca de dados, implementando técnicas como cacheamento de dados e revalidação dos dados cacheados com Time-based Revalidation (ISR), garantindo os dados de forma performática, sempre atualizados e entregando as páginas de forma otimizada (SSG) com os dados vindo direto do servidor já cacheados;

- Implementei a geração dinâmica de metadata do lado do servidor para otimizar o SEO de forma performática;

- Realizei a validação de ponta a ponta dos formulários, recalculando os valores conforme os campos são alterados, ou seja, isso previne bugs e melhora a experiência do usuário ao fornecer feedback imediato e prevenir erros antes do formulário ser enviado;

- Usei MobX para gerenciamento de estado, garantindo uma gestão eficiente e também o MobX-Persist-Store para persistir os dados do histórico de consulta;

- Implementei manipuladores de erros personalizados para facilitar a forma de tratativa de erros HTTP e garantir que não passe erros despercebidos sem essa tratativa;

- Embora a documentação da API não ser tão clara sobre as exceções, implementei mecanismos para garantir que a experiência do usuário não seja afetada;

- Realizei testes E2E com Cypress e testes unitários com Jest para garantir que componentes e fluxos principais do aplicativo funcionem corretamente.
