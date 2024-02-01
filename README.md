# Sistema de Gerenciamento de Clientes

Este é um sistema simples de gerenciamento de clientes com frontend em React, backend em Node.js e PostgreSQL como banco de dados.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) instalado e em execução

## Configuração

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# Configurar o backend
cd backend
npm install
# Crie um arquivo .env baseado no .env.example e configure suas variáveis de ambiente, como a URL do banco de dados.
npx sequelize-cli db:migrate
npm start

# Configurar o frontend
cd ../frontend/cliente-app
npm install
npm start

Uso
Abra o navegador e acesse http://localhost:3000 para usar o sistema de gerenciamento de clientes.