const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name);
    const [ability] = abilities;

    pokemon.abilities = abilities;
    pokemon.ability = ability;

    const stats = pokeDetail.stats.map((stat) => {
        return {
            name: stat.stat.name,
            base_stat: stat.base_stat
        };
    });
    pokemon.stats = stats;

    const moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name);
    pokemon.moves = moves;

    const levelUpMoves = pokeDetail.moves
        .filter(moveDetail => 
            moveDetail.version_group_details.some(versionDetail => versionDetail.move_learn_method.name == 'level-up'
        )
    )
    .map(moveDetail => moveDetail.move.name);
    
    pokemon.moves = levelUpMoves;
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0,limit = 20,page = 'home') => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            if(page == 'favorites'){
                let listPokeFavorite = JSON.parse(localStorage.getItem('listFavorites')) || [];
                const newListPokeFavorites = pokemonsDetails.filter(pokemon => listPokeFavorite.includes(pokemon.number));
                return newListPokeFavorites;
            }else{
                return pokemonsDetails;
            }
        })
}

pokeApi.getPokemonByNumber = (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

