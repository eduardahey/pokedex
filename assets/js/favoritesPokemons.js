const listItempokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

let listFavoritesPokemons = JSON.parse(localStorage.getItem('listFavorites'));
let currentIndex = 0;
const loadBatchSize = 10;

function loadFavoritesPokemons(){
    const pokemonBatch = listFavoritesPokemons.slice(currentIndex, currentIndex + loadBatchSize);
    pokemonBatch.forEach(pokemonNumber => {
        pokeApi.getPokemonByNumber(pokemonNumber).then(pokemon => {
            showPokemon(pokemon);
        });
    });

    currentIndex += loadBatchSize;

    if(currentIndex >= listFavoritesPokemons.length){
        loadMoreButton.style.display = 'none';
    }
}

function showPokemon(pokemon){
    listItempokemonOl.innerHTML +=
    `<a class="linkDetailPage" href="/paginaDetalhe.html?pokemonNumber=${pokemon.number}">
        <li id="pokemonContent" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>        
        </li>
    </a>`
    
}

loadFavoritesPokemons();

loadMoreButton.addEventListener('click', () => {
    loadFavoritesPokemons();
});

function searchPokemon(){
    let input = document.getElementById('search-navbar');
    let filter = input.value.toUpperCase();
    let olList = document.getElementById('pokemonList');
    let linkPokemon = olList.getElementsByTagName('a');

    for(let i = 0;i < linkPokemon.length; i++){   
        let li = linkPokemon[i].getElementsByTagName('li')[0];

        let nameContent = li.getElementsByTagName('span')[1];
        let nameValue = nameContent.textContent || nameContent.innerText;

        let typesContent = li.getElementsByTagName('ol')[0];
        let types = typesContent.getElementsByTagName('li');

        let nameMatches = nameValue.toUpperCase().indexOf(filter) > -1;
        let typesMatch = Array.from(types).some(type => type.textContent.toUpperCase().indexOf(filter) > -1);

        if(nameMatches || typesMatch){
            linkPokemon[i].style.display = "";
        }else{
            linkPokemon[i].style.display = "none";
        }
    }
}