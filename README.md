Sistema de Gerenciamento de Clientes
Este é um sistema simples de gerenciamento de clientes com frontend em React, backend em Node.js e PostgreSQL como banco de dados.

Pré-requisitos
Node.js instalado
PostgreSQL instalado e em execução
Configuração
Clone este repositório:

bash
Copy code
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Configurar o backend:

Navegue até o diretório backend:

bash
Copy code
cd backend
Instale as dependências:

bash
Copy code
npm install
Crie um arquivo .env baseado no .env.example e configure suas variáveis de ambiente, como a URL do banco de dados.

Execute as migrações para criar as tabelas no banco de dados:

bash
Copy code
npx sequelize-cli db:migrate
Inicie o servidor:

bash
Copy code
npm start
Configurar o frontend:

Navegue até o diretório frontend/cliente-app:

bash
Copy code
cd frontend/cliente-app
Instale as dependências:

bash
Copy code
npm install
Inicie o aplicativo React:

bash
Copy code
npm start
Acesse o aplicativo no navegador:

O frontend estará disponível em http://localhost:3000. Certifique-se de que o backend esteja em execução para permitir a comunicação entre o frontend e o backend.

Uso
Abra o navegador e acesse http://localhost:3000 para usar o sistema de gerenciamento de clientes.