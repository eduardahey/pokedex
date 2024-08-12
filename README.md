# Pokedex

Este projeto consome a API https://pokeapi.co/docs/v2 e traz uma lista de pokemons.

## Funcionalidades

- **Listar pokemons:** Visualize todos os pokemons contidos na API.
- **Adicionar pokemon à lista de favoritos:** Adicione à lista de favoritos, que fica contida no local storage, por meio do ícone de coração localizado em cada página detalhe.
- **Remover dos favoritos:** Remova o pokemon da lista de favoritos.
- **Listar pokemons:** Visualize os pokemons que você adicionou na lista de favoritos.

## Tecnologias Utilizadas

- **JavaScript:** Linguagem principal usada para implementar a lógica do sistema e fazer a manipulação do html e css.
- **HTML/CSS:** Para a interface básica do usuário.

## Estrutura do Projeto
- *HTML*
- **index.html:** Página inicial - Home.
- **paginaDetalhe.html:** Página de detalhe dos pokemons com informações.
- **favoritesPokemonsPage.html:** Página de pokemons favoritos.
  
- *CSS*
- **global.css:** Estilizações globais.
- **pokedex.css** Estilizações da pokedex.
- **detailPage.css** Estilizações da página de detalhe
- **favoritesPage.css** Estilizações da página de favoritos
  
- *JS*
- **detailPage.js:** Contém a lógica da página de detalhes, adiciona e remove pokemons da lista de favoritos e carrega as informações do pokeon selecionado.
- **favoritesPokemon** Contem a lógica da página de favoritos, limita o carregamento a 10 pokemons por vez.
- **main.js** Contém a lógica da página index, limita a busca de pokemons a 10 por vez e vai "paginando" a API.
- **pokeApi.js** Contém as buscas à página
- **pokemonModel.js** Contém o objeto pokemon com as propriedades que serão definidas pelas informações da API.
