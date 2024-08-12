let listFavorites = JSON.parse(localStorage.getItem('listFavorites')) || [];
document.addEventListener('DOMContentLoaded', () => {
    function getPokemonNumberFromUrl(){
        const params = new URLSearchParams(window.location.search);
        return params.get('pokemonNumber');
    }
    const pokemonNumber = getPokemonNumberFromUrl();

    if(pokemonNumber){
        pokeApi.getPokemonByNumber(pokemonNumber).then(pokemon => {
            showPokemonPage(pokemon);
        });
    }
    
});


function addOrRemovePokemonsFavorites(numberPokemon){
    const pokemonIsOnListFavorites = listFavorites.includes(numberPokemon);
    let fillHeart;
    if(!pokemonIsOnListFavorites){
        listFavorites.push(numberPokemon);
        fillHeart = true;
    }else{
        const indexARemover = listFavorites.indexOf(numberPokemon);
        listFavorites.splice(indexARemover,1);
        fillHeart = false;
    }
    localStorage.setItem('listFavorites',JSON.stringify(listFavorites));
    defineFavoriteIcon(fillHeart);
}

function defineFavoriteIcon(fillHeart){
    let linkFavoritesPage = document.getElementById('favorite');
    let imgHeart = linkFavoritesPage.getElementsByTagName('img')[0];

    if(!fillHeart){
        imgHeart.src = "/assets/images/favoriteIconNoFill.svg";
    }else{
        imgHeart.src = "/assets/images/favoriteIconFill.svg";
    }
}

function showPokemonPage(pokemon){
    const header = document.getElementById('pokemonDetails');
    const imagePokemon = document.getElementById('details');
    const infoAbout = document.getElementById('pokeInfo-about');
    const infoBaseStats = document.getElementById('base-stats');
    const infoMoves = document.getElementById('moves-info');
    const returnFavorite = document.getElementById('return-favorite');

    let fillHeart = listFavorites.includes(pokemon.number);

    returnFavorite.innerHTML = `
        <a id="return" href="javascript:history.back()">
            <img src="/assets/images/arrow_back_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Return to previous page">
        </a>
        <a id="favorite" href="" onclick="addOrRemovePokemonsFavorites(${pokemon.number});return false;">
            <img src="" alt="Go to the favorites pokemons page">
        </a>
    `
    defineFavoriteIcon(fillHeart);

    header.innerHTML = `
            <div>
                <h1 id="name">${pokemon.name}</h1>
                <div id="types">
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                </div>
            </div>
            <div id="number"><span>#${pokemon.number}</span></div>
    `;
    const mainElement = document.querySelector('main');
    mainElement.className = pokemon.type;
    const image = document.createElement('img');
    image.src = pokemon.photo; 
    image.alt = pokemon.name; // Texto alternativo para a imagem 
    image.id = 'imagePokemon';
    // Seleciona o elemento <ul>
    const ulElement = document.querySelector('#details .tabs');

    // Seleciona o pai do elemento <ul> que é o <section> com id="details"
    const parentElement = ulElement.parentElement;

    // Insere a imagem antes do elemento <ul>
    parentElement.insertBefore(image, ulElement);


    infoAbout.innerHTML = `
            <p class="information">${pokemon.height}</p>
            <p class="information">${pokemon.weight}</p>
            <p class="information">${pokemon.abilities.map((ability) => `<span class="ability ${ability}">${ability}</span>`).join(', ')}
            </p>

    `;
    
    let totalStats = 0;
    for(let baseStat of pokemon.stats){
        const base = baseStat.base_stat;
        totalStats += base;
    }
    let teste = pokemon.stats.map((stat) => `<p class="tag">${stat.name}</p>`);

    infoBaseStats.innerHTML = `
                <div>
                     ${pokemon.stats.map((stat) => `<p class="tag">${stat.name}</p>`).join('')}
                     <p class="tag">Total</p>
                </div>
 
                <div>
                    ${pokemon.stats.map((stat) => `<p class="information">${stat.base_stat}</p>`).join('')}
                     <p class="information">${totalStats}</p>
                </div>
    `


    infoMoves.innerHTML = `
        <div class="movesDiv">
            ${pokemon.moves.map((move) => `<p class="information">${move}</p>`).join('')}
        </div> 
    `
}

