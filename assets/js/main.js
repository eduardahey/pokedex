const listItempokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newList = pokemonList.map((pokemon) => 
            `<a class="linkDetailPage" href="/paginaDetalhe.html?pokemonNumber=${pokemon.number}">
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

loadPokemonItens(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset,limit);
    }
})
    
    



    

