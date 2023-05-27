## Rotas

Abaixo estão as principais rotas disponíveis na API:

### Cadastro de Usuário

- Descrição: Rota para cadastrar um novo usuário.
- Método: POST
- URL: `/signup`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Corpo da requisição:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "password": "password123"
  }
  ```
- Exemplo de resposta:
  ```json
  {
    "user": {
      "id": "a14505a5-8c2e-44e2-9de8-0d087411be51",
      "name": "John Doe",
      "email": "john.doe@gmail.com",
      "admin": false,
      "avatar_url": "defaultAvatar.png"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMTQ1MDVhNS04YzJlLTQ0ZTItOWRlOC0wZDA4NzQxMWJlNTEiLCJpYXQiOjE2ODQ4ODU1ODIsImV4cCI6MTY4NDk3MTk4Mn0.04W3n3OXmNt6SFUv7ADS1eoqx5Z0ZGD64y7g1bV9Y_A"
  }
  ```

### Login de Usuário

- Descrição: Rota para fazer login de um usuário.
- Método: POST
- URL: `/signin`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Corpo da requisição:
  ```json
  {
    "email": "john.doe@gmail.com",
    "password": "password123"
  }
  ```
- Exemplo de resposta:
  ```json
  {
    "user": {
      "id": "a14505a5-8c2e-44e2-9de8-0d087411be51",
      "name": "John Doe",
      "email": "john.doe@gmail.com",
      "admin": false,
      "avatar_url": "defaultAvatar.png"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMTQ1MDVhNS04YzJlLTQ0ZTItOWRlOC0wZDA4NzQxMWJlNTEiLCJpYXQiOjE2ODQ4ODU1ODIsImV4cCI6MTY4NDk3MTk4Mn0.04W3n3OXmNt6SFUv7ADS1eoqx5Z0ZGD64y7g1bV9Y_A"
  }
  ```

### Logout de Usuário

- Descrição: Rota para fazer logout de um usuário autenticado.
- Método: DELETE
- URL: `/signout`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Exemplo de resposta:
  ```json
  {
    "mensagem": "Você foi desconectado com sucesso"
  }
  ```

### Listar Usuários

- Descrição: Rota para listar todos os usuários cadastrados.
- Método: GET
- URL: `/`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Exemplo de resposta:
  ```json
  [
    {
      "id": "a25af278-b3a7-439c-b40f-443c94bd5ba6",
      "name": "John",
      "email": "john@mail.com",
      "admin": false,
      "avatar_url": "1684885401226-john.jpg",
      "total_recipes": "1"
    },
    {
      "id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
      "name": "John Doe",
      "email": "joao@mail.com",
      "admin": true,
      "avatar_url": "1684795924413-john-doe.jpg",
      "total_recipes": "3"
    },
    {
      "id": "656918aa-d766-4a25-9e57-0ed144188f08",
      "name": "Doe",
      "email": "luiz@mail.com",
      "admin": true,
      "avatar_url": "1682964132697-doe.jpg",
      "total_recipes": "1"
    }
  ]
  ```

### Mostrar Detalhes do Usuário

- Descrição: Rota para mostrar os detalhes de um usuário específico.
- Método: GET
- URL: `/show/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Exemplo de resposta

:
  ```json
  {
    "id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
    "name": "John Doe",
    "email": "john.doe@mail.com",
    "admin": true,
    "avatar_url": "1684795924413-john-doe.jpg",
    "total_recipes": "3"
  }
  ```

### Mostrar Receitas do Usuário

- Descrição: Rota para mostrar as receitas de um usuário específico.
- Método: GET
- URL: `/show/:id/recipes`
- Parâmetros:
  - `id`: ID do usuário.
- Exemplo de resposta:
  ```json
  [
    {
      "id": "a9867658-4579-4bc2-9790-024a716f1a67",
      "title": "Salada de frutas com iogurte",
      "description": "Uma sobremesa saudável, refrescante e fácil de fazer com apenas alguns ingredientes",
      "difficulty": "fácil",
      "prep_time": 10,
      "servings": 2,
      "ingredients": [
        "1 xícara de frutas picadas (morango, kiwi, manga, uva, etc.)",
        "1/2 xícara de iogurte natural",
        "1 colher de sopa de mel"
      ],
      "instructions": [
        "Em uma tigela, misture as frutas picadas.",
        "Em outra tigela, misture o iogurte e o mel.",
        "Despeje a mistura de iogurte sobre as frutas e misture bem.",
        "Sirva imediatamente ou leve à geladeira para esfriar."
      ],
      "image_url": "1683238135338-frutas.jpg",
      "user_id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
      "author": "John Doe"
    }
  ]
  ```

### Detalhes do Usuário Autenticado

- Descrição: Rota para mostrar os detalhes do usuário autenticado.
- Método: GET
- URL: `/me`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Exemplo de resposta:
  ```json
  {
    "id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
    "name": "John Doe",
    "email": "john.doe@mail.com",
    "admin": true,
    "avatar_url": "1684795924413-john-doe.jpg",
    "total_recipes": "3"
  }
  ```

### Atualizar Usuário

- Descrição: Rota para atualizar os dados de um usuário.
- Método: PUT
- URL: `/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Corpo da requisição:
  ```json
  {
    "name": "John Doe Updated",
    "email": "john_doe@gmail.com",
    "admin": "true",
  }
  ```
- Exemplo de resposta:
  ```json
  {
    "id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
    "name": "John Doe Updated",
    "email": "john_doe@gmail.com",
    "admin": "true"
  }
  ```

### Atualizar Senha do Usuário

- Descrição: Rota para atualizar a senha de um usuário.
- Método: PATCH
- URL: `/password/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Corpo da requisição:
  ```json
  {
    "current_password": "password123",
    "new_password": "newPassword",
    "confirm_password": "newPassword"
  }
  ```
- Exemplo de resposta:
  ```json
    204: No Content
  ```

### Atualizar Avatar do Usuário

- Descrição: Rota para atualizar

 o avatar de um usuário.
- Método: PATCH
- URL: `/avatar/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Corpo da requisição:
  - Formato de dados: multipart/form-data
  - Parâmetro:
    - `avatar_url`: Arquivo de imagem do avatar do usuário.
- Exemplo de resposta:
  ```json
  {
    "avatar_url": "1684795924413-john-doe.jpg"
  }
  ```

### Remover Avatar do Usuário

- Descrição: Rota para remover o avatar de um usuário.
- Método: DELETE
- URL: `/avatar/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Exemplo de resposta:
  ```json
  {
    "avatar_url": "defaultAvatar.png",
  }
  ```

### Remover Usuário

- Descrição: Rota para remover um usuário.
- Método: DELETE
- URL: `/:id`
- Parâmetros:
  - `id`: ID do usuário.
- Exemplo de resposta:
  ```json
    204: No Content
  ```

### Listar Receitas

- Descrição: Rota para listar todas as receitas cadastradas.
- Método: GET
- URL: `/`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Exemplo de resposta:
  ```json
  [
    {
      "id": "12741054-5799-43cb-8606-aa1d83a79aab",
      "title": "Omelete de queijo e tomate",
      "description": "Um café da manhã ou lanche rápido e fácil de preparar, com um toque de queijo e tomate",
      "difficulty": "easy",
      "prep_time": 10,
      "servings": 1,
      "ingredients": [
        "2 ovos",
        "1/4 xícara de queijo ralado",
        "1/4 xícara de tomate picado",
        "Sal e pimenta a gosto",
        "1 colher de sopa de óleo"
      ],
      "instructions": [
        "Em uma tigela, bata os ovos com sal e pimenta a gosto.",
        "Adicione o queijo ralado e o tomate picado à mistura de ovos",
        "Aqueça o óleo em uma frigideira antiaderente em fogo médio.",
        "Despeje a mistura de ovos na frigideira quente e deixe cozinhar por cerca de 3-4 minutos.",
        "Vire a omelete com cuidado e deixe cozinhar do outro lado por mais 2-3 minutos.",
        "Sirva quente"
      ],
      "image_url": "1683238394456-omelete.jpg",
      "user_id": "a25af278-b3a7-439c-b40f-443c94bd5ba6",
      "author": "John"
    },
    {
      "id": "57328ed0-cc59-4895-a296-6d6da735aa71",
      "title": "Bolo de cenoura",
      "description": "Bolo de cenoura fofinho e delicioso",
      "difficulty": "medium",
      "prep_time": 45,
      "servings": 12,
      "ingredients": [
        "3 cenouras médias",
        "3 ovos",
        "1 xícara de óleo",
        "2 xícaras de açúcar",
        "3 xícaras de farinha de trigo",
        "1 colher de sopa de fermento em pó"
      ],
      "instructions": [
        "Descasque as cenouras, corte em pedaços e bata no liquidificador com os ovos e o óleo.",
        "Em uma tigela, misture o açúcar e a farinha de trigo.",
        "Adicione a mistura do liquidificador à tigela e misture bem.",
        "Por último, adicione o fermento em pó e misture delicadamente.",
        "Despeje a massa em uma forma untada e enfarinhada e leve ao forno preaquecido a 180°C por cerca de 40 minutos ou até que esteja assado.",
        "Retire do forno e deixe esfriar antes de servir."
      ],
      "image_url": "1683492474323-cenoura.jpg",
      "user_id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
      "author": "John Doe"
    },
  ]
  ```

### Mostrar Detalhes da Receita

- Descrição: Rota para mostrar os detalhes de uma receita específica.
- Método: GET
- URL: `/show/:id`
- Parâmetros:
  - `id`: ID da receita.
- Exemplo de resposta:
  ```json
  {
    "id": "a9867658-4579-4bc2-9790-024a716f1a67",
    "title": "Salada de frutas com iogurte",
    "description": "Uma sobremesa saudável, refrescante e fácil de fazer com apenas alguns ingredientes",
    "difficulty": "fácil",
    "prep_time": 10,
    "servings": 2,
    "ingredients": [
      "1 xícara de frutas picadas (morango, kiwi, manga, uva, etc.)",
      "1/2 xícara de iogurte natural",
      "1 colher de sopa de mel"
    ],
    "instructions": [
      "Em uma tigela, misture as frutas picadas.",
      "Em outra tigela, misture o iogurte e o mel.",
      "Despeje a mistura de iogurte sobre as frutas e misture bem.",
      "Sirva imediatamente ou leve à geladeira para esfriar."
    ],
    "image_url": "1683238135338-frutas.jpg",
    "user_id": "bbb28857-775a-4fcf-97fb-edc1e781ebb2",
    "author": "John Doe"
  }
  ```

### Cadastrar Receita

- Descrição: Rota para cadastrar uma nova receita.
- Método: POST
- URL: `/`
- Parâmetros:
  - Nenhum parâmetro é necessário.
- Corpo da requisição:
  - Formato de dados: multipart/form-data
  - Parâmetros:
    - `title`: Título da receita.
    - `description`: Descrição da receita.
    - `difficulty`: Dificuldade da receita (fácil, médio ou difícil).
    - `prep_time`: Tempo de preparo da receita, em minutos.
    - `servings`: Rendimento da receita, em porções.
    - `ingredients`: Ingredientes da receita.
    - `instructions`: Instruções/Modo de Preparo da receita.
    - `user_id`: ID do usuário autenticado.
    - `image_url`: Arquivo de imagem da receita.
- Exemplo de resposta:
  ```json
  {
    "id": "b216ba17-4359-4d09-997b-9f016cc3f793",
    "title": "Omelete de queijo e tomate",
    "description": "Um café da manhã ou lanche rápido e fácil de preparar, com um toque de queijo e tomate",
    "difficulty": "médio",
    "prep_time": 10,
    "servings": 1,
    "ingredients": [
      "2 ovos",
      "1/4 xícara de queijo ralado",
      "1/4 xícara de tomate picado",
      "Sal e pimenta a gosto",
      "1 colher de sopa de óleo"
    ],
    "instructions": [
      "Em uma tigela, bata os ovos com sal e pimenta a gosto.",
      "Adicione o queijo ralado e o tomate picado à mistura de ovos",
      "Aqueça o óleo em uma frigideira antiaderente em fogo médio.",
      "Despeje a mistura de ovos na frigideira quente e deixe cozinhar por cerca de 3-4 minutos.",
      "Vire a omelete com cuidado e deixe cozinhar do outro lado por mais 2-3 minutos.",
      "Sirva quente"
    ],
    "image_url": "defaultRecipe.jpg",
    "user_id": "a25af278-b3a7-439c-b40f-443c94bd5ba6"
  }
  ```

### Atualizar Receita

- Descrição: Rota para atualizar uma receita.
- Método: PUT
- URL: `/:id`
- Parâmetros:
  - `id`: ID da receita.
- Corpo da requisição:
  - Formato de dados: multipart/form-data
  - Parâmetros:
    - `title`: Título da receita.
    - `description`: Descrição da receita.
    - `difficulty`: Dificuldade da receita (fácil, médio ou difícil).
    - `prep_time`: Tempo de preparo da receita, em minutos.
    - `servings`: Rendimento da receita, em porções.
    - `ingredients`: Ingredientes da receita.
    - `instructions`: Instruções/Modo de Preparo da receita.
    - `user_id`: ID do usuário autenticado.
    - `image_url`: Arquivo de imagem da receita.
- Exemplo de resposta:
  ```json
  {
    "id": "b216ba17-4359-4d09-997b-9f016cc3f793",
    "title": "Omelete de queijo e tomate",
    "description": "Um café da manhã ou lanche rápido e fácil de preparar, com um toque de queijo e tomate",
    "difficulty": "médio",
    "prep_time": 10,
    "servings": 1,
    "ingredients": [
      "2 ovos",
      "1/4 xícara de queijo ralado",
      "1/4 xícara de tomate picado",
      "Sal e pimenta a gosto",
      "1 colher de sopa de óleo"
    ],
    "instructions": [
      "Em uma tigela, bata os ovos com sal e pimenta a gosto.",
      "Adicione o queijo ralado e o tomate picado à mistura de ovos",
      "Aqueça o óleo em uma frigideira antiaderente em fogo médio.",
      "Despeje a mistura de ovos na frigideira quente e deixe cozinhar por cerca de 3-4 minutos.",
      "Vire a omelete com cuidado e deixe cozinhar do outro lado por mais 2-3 minutos.",
      "Sirva quente"
    ],
    "image_url": "defaultRecipe.jpg",
    "user_id": "a25af278-b3a7-439c-b40f-443c94bd5ba6"
  }
  ```

### Remover Receita

- Descrição: Rota para remover uma receita.
- Método: DELETE
- URL: `/:id`
- Parâmetros:
  - `id`: ID da receita.
- Exemplo de resposta:
  ```json
    204: No Content
  ```
