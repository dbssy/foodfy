<p align="center">
  <img src="./.github/foodfy.svg" width="25%">
</p>

## 💻 Sobre o projeto

Uma plataforma completa para você enviar suas receitas de família e conhecer outras receitas para adquirir novos sabores ou despertar memórias! Dentro da aplicação você pode: criar sua conta, fazer login, criar, editar e deletar receitas e caso você seja um administrador, pode editar os usuários e suas receitas também.

<br>

## 👨‍💻 Tecnologias
Essas foram as tecnologias utilizadas neste projeto!

<br>

Backend:
- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)
- [Multer](https://www.npmjs.com/package/multer)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

<br>

Frontend:
- [React](https://reactjs.org/)
- [React DOM](https://reactjs.org/docs/react-dom.html)
- [React Router DOM](https://reactrouter.com/en/main)
- [JWT Decode](https://www.npmjs.com/package/jwt-decode)
- [Phosphor React](https://www.npmjs.com/package/phosphor-react)
- [Radix UI](https://www.npmjs.com/package/@radix-ui/primitive)
- [Prop Types](https://www.npmjs.com/package/prop-types)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)

<br>

## 🚀 Execução

**Atenção:** Instale o NodeJS e o Docker localmente em sua máquina antes de continuar com a instação!

<br>

Faça um clone desse repositório e acesse o diretório.
```bash
# Clone o Repositório
$ git clone https://github.com/dbssy/foodfy.git
$ cd foodfy
```

<br>

Instale os pacotes necessários para rodar o projeto, que estão dentro de suas respectivas pastas (server e web).
```bash
$ npm install
```

<br>

Rode os comandos abaixos para instalar a imagem do Postgres no Docker.
```bash
# Baixar a imagem
$ docker pull postgres

# Criar o container
$ docker run --name foodfy -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

# Caso não tenha iniciado automaticamente, rode:
$ docker start foodfy

# Para verificar se o container está rodando, rode:
$ docker ps
```

<br>

Após colocar o container para rodar, você precisará criar o Banco de Dados e as tabelas manualmente.
```bash
# Acesse o banco de dados
$ docker exec -it pg bash

# Entre no usuário que você criou, no caso, criamos o root
$ psql -U root

# Para criar o banco de dados, cole a instrução abaixo
$ CREATE DATABASE foodfy;

# Acesse o banco recém criado
$ \c foodfy

# Dentro do arquivo schema.sql, você encontrará o restante das instruções 
# para criar as tabelas necessárias da nossa aplicação
```

<br>

Com todas as dependências instaladas e o docker rodando, acesse as respectivas pastas (server e web) e execute o comando abaixo para rodar a aplicação.
```bash
$ npm run dev
```
<br>

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.