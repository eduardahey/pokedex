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

function showPokemonPage(pokemon){
    const header = document.getElementById('pokemonDetails');
    const imagePokemon = document.getElementById('details');
    const infoAbout = document.getElementById('pokeInfo-about');
    const infoBaseStats = document.getElementById('base-stats');
    const infoMoves = document.getElementById('moves-info');
    const returnFavorite = document.getElementById('return-favorite');
    returnFavorite.innerHTML = `
        <a id="return" href="/index.html">
            <img src="/assets/images/arrow_back_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Return to previous page">
        </a>
        <a id="favorite" href="/favoritePokemonsPage.html" onclick="addPokemonToFavorites(${pokemon.number});">
            <img src="/assets/images/favorite_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Go to the favorites pokemons page">
        </a>
    `

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
    // const movesPerDiv = 9;
    // const totalDivs = Math.ceil(pokemon.moves.length/movesPerDiv);
    // let movesHtml = '';

    // for(let i = 0;i < totalDivs;i++)
    // {
    //     const start  = i * movesPerDiv;
    //     const end = start + movesPerDiv;
    //     const movesChunk = pokemon.moves.slice(start,end);

    //     movesHtml += `
    //         <div class="movesDiv">
    //             ${movesChunk.map((move) => `<p class="information">${move}</p>`).join('')}
    //         </div>  
    //     `;
    // }

    infoMoves.innerHTML = `
        <div class="movesDiv">
            ${pokemon.moves.map((move) => `<p class="information">${move}</p>`).join('')}
        </div> 
    `
}

let listFavorites = JSON.parse(localStorage.getItem('listFavorites')) || [];
function addPokemonToFavorites(numberPokemon){
    if(!listFavorites.includes(numberPokemon)){
        listFavorites.push(numberPokemon);
        localStorage.setItem('listFavorites',JSON.stringify(listFavorites));
    }else{
        console.log('O pokemon já está na lista de favoritos.');
    }
}