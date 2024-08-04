const listItempokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;
let page;

function definePageByUrl(offset,limit){
    // const url = window.location.href;
    const path = window.location.pathname;
    if(path.includes('index.html')){
        page = 'home';
    }else if(path.includes('favoritePokemonsPage.html')){
        page = 'favorites';
    }
    loadPokemonItens(offset,limit,page);
}

function loadPokemonItens(offset,limit,page){
    pokeApi.getPokemons(offset, limit,page).then((pokemonList = []) => {
        const newList = pokemonList.map((pokemon) => `<a class="linkDetailPage" href="/paginaDetalhe.html?pokemonNumber=${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>        
            </li>
            </a>
    `).join('');
        listItempokemonOl.innerHTML += newList;
    })
}

definePageByUrl(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        definePageByUrl(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        definePageByUrl(offset,limit);
    }
})
    
    



    

