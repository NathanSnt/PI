<h1 align="center"> :train2: Projeto Integrador - AlerTrem :train2:</h1>

Este projeto é uma plataforma que oferece informações atualizadas sobre a linha 9 esmeralda, que é operada pela empresa Via Mobilidade na cidade de São Paulo. O objetivo é facilitar a vida dos usuários da linha, que podem consultar dados sobre as estações, fazer comentários, reclamações e reports, e ficar por dentro das últimas notícias sobre a linha.

Este é o resultado do projeto integrador realizado pelos alunos do curso técnico em informática do SENAC da turma TI106. 
Os integrantes do grupo são:

- [Bruno](https://github.com/BrunoJoGomes)
- [Leonardo](https://github.com/NNiine)
- [João](https://github.com/jooaooz)
- [Gustavo](https://github.com/auizes)
- [Gabriel](https://github.com/Chefin004)
- [Nathan](https://github.com/NathanSnt)

## Sobre o projeto

O projeto consiste em duas partes: um site e um sistema de administração. O site é uma plataforma que fornece informações atualizadas sobre a linha 9 esmeralda, operada pela Via Mobilidade em São Paulo. O sistema de administração é uma ferramenta para gerenciar o conteúdo e os dados do site. O código-fonte do sistema de administração pode ser encontrado no repositório [BrunoJoGomes/Alertrem-sistema](https://github.com/BrunoJoGomes/Alertrem-sistema).

No site, os usuários podem:

- Ver o nome e a localização das estações da linha 9 esmeralda
- Conhecer as características de cada estação, como a acessibilidade e os serviços oferecidos
- Fazer reclamações sobre problemas ou sugestões relacionados à linha ou às estações
- Fazer reports sobre o status das estações, dos carros ou da linha em geral
- Consultar informações sobre as estações, como o horário de funcionamento e as conexões com outras linhas
- Visualizar os reports dos outros usuários
- Ficar sabendo sobre as últimas notícias sobre a linha 9 esmeralda, como obras, interrupções ou eventos

## Sobre as páginas

A página home é a primeira tela que você vê quando acessa o site do AlerTrem. Nela, você pode encontrar informações sobre a linha 9 esmeralda, as estações, as notícias e as reclamações dos usuários. Veja abaixo como navegar pela página home:

Esta é a home enquanto o usuário não está autenticado.
![Imagem da home do site exibindo o menu principal e o carrossel](https://github.com/NathanSnt/PI/assets/79227411/ae7c18c9-3f9f-4042-ba65-f46bc3b1b2f4)


Esta é a home quando o usuário está autenticado.
![Imagem da home do site exibindo o menu principal e o carrossel quando o usuário está autenticado](https://github.com/NathanSnt/PI/assets/79227411/84919385-d4da-4c8d-919d-e28a0e9bdc3d)


Esta é o restante da home.
![Imagem mostrarndo segunda parte da home](https://github.com/NathanSnt/PI/assets/79227411/9cfcb6a1-91fc-4c35-8130-5379ba443f2f)


- No menu principal, na parte superior da página, você pode acessar as seguintes opções:

  - **Mapa:** mostra a localização das estações da linha 9 esmeralda no mapa da cidade de São Paulo.
  - **Sobre nós:** apresenta o projeto e os integrantes do grupo que desenvolveu o site.
  - **Cadastrar/Login:** permite que você crie uma conta ou faça login no site para ter acesso a mais funcionalidades, como fazer reclamações e reports.
  - **Home:** volta para a página inicial do site.
  - **Reclamar:** permite que você faça uma reclamação sobre a linha ou alguma estação específica.
  - **Perfil:** mostra os seus dados, as suas reclamações e os seus reports.
  
- No carrossel, logo abaixo do menu principal, você pode ver as últimas notícias sobre a linha 9 esmeralda, como obras, interrupções ou eventos. Você pode clicar nas setas para ver mais notícias ou clicar na notícia para ler mais detalhes.

- No menu lateral, à esquerda da página, você pode ver a lista de todas as estações da linha 9 esmeralda. Você pode clicar em uma estação para ir para a página da estação, onde você pode ver as características, os comentários e os reports sobre ela.

- No conteúdo principal, no centro da página, você pode ver o status da linha em geral, que pode ser bom, neutro ou ruim, de acordo com os reports dos usuários. Você também pode ver a lista de todas as reclamações dos usuários sobre a linha ou as estações. Você pode clicar em uma reclamação para ver mais detalhes ou fazer um comentário.

## Como usar

Para conseguir executar este projeto:

- ### Clone e instale as dependências

	Vá até o local onde deseja salvar o projeto, abra o cmd e execute:
	```
	git clone https://github.com/NathanSnt/PI
	cd PI
	npm install
	```

- ### Suba o banco de dados

	Dentro da pasta PI tem um arquivo chamado `db_alertrem.sql` que, contém o script necessário para a criação do banco.
	Execute ele no seu SGBD de preferência.

- ### Configure variáveis de ambiente

	Ainda dentro da pasta PI, existe um arquivo chamado `.env`.
	Abra ele em qualquer editor de código para conseguir realizar as configurações necessárias.

	Variáveis:
	- `PORT` (Porta na qual o servidor estará sendo executado);
	- `MYSQL_DB` (Nome do banco de dados)
	- `MYSQL_USER` (Usuário para obter acesso ao banco)
	- `MYSQL_PASSWORD` (Senha do usuário)
	- `MYSQL_PORT` (Porta na qual o banco está sendo executado)
	- `MYSQL_HOST` (IP do servidor de banco de dados)

- ### Crie um usuário no banco de dados

	Acesse o banco e execute o seguinte comando:
	```
	CREATE USER 'alertrem'@'%' IDENTIFIED BY 'alertrem';
	GRANT ALL ON db_alertrem.* TO 'alertrem'@'%';
	FLUSH PRIVILEGES;
	```

- ### Execute o servidor

	Volte ao cmd na pasta PI e execute:
	```
	npm run start-dev
	```

E pronto! Se tudo estiver corretamente configurado, o servidor ja vai estar online.
