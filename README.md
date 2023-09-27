# MVP3 - Frontend 💻
  Frontend para MVP 3 de pós graduação de Eng de Software da PUC-Rio.
  Consiste em um sistema que simula um ambiente para adicionar amigos a sua lista de amizades, com base em uma lista de sugestão de amizades buscadas em uma api externa.


## Principais tecnologias utilizadas 🧑🏽‍💻
  - Typescript 
  - NextJS 13
  - Tailwind
  - Zustand
  - Radix UI


## Rotas da aplicação ✅
  ### **Rotas Públicas 🔓**
  - `/`, rota para tela de Login.
  - `/register`, rota para tela de cadastro de usuário.
  
  ### **Rotas Privadas 🔐**
  - `/home`, rota para página principal do sistema.



## Passos para executar aplicação com docker 👣
  A aplicação está utilizando docker container, então para sua execução realize os passos abaixo.

  1. clonar repositório
  2. no terminal do vscode, acesse o diretório do projeto clonado e execute o arquivo do docker compose com o comando `docker-compose up`
  3. isso irá criar um container docker com o frontend rodando
  4. para testar abra a url local na porta **3000** no seu navegador.


## Utilização 🚀
  Em sua primeira execução será necessário realizar o cadastro no sistema, informando, nome, email e senha.
  Após o cadastro você poderá realizar o login e explorar o sistema.
