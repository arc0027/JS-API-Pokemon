var POKEMON_LIST_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

/**
 * Obtiene la URL, luego devuelve la respuesta como JSON
 * @param theUrl - La URL a la que enviar la solicitud.
 * @returns Una promesa
 */

async function httpGetAsync(theUrl) {
    let lista = fetch(theUrl).then(function (response) {
        return response.json();
    }).catch(function () {
        console.log("Booo");
    });

    return lista;
}

/* Obtiene la lista de pokemon de la API y los muestra por pantalla */
async function lista_pokemon() {
    let numero = 1154;
    let lista_pokemon = document.getElementById("lista_pokemon");

    let POKEMONS = await httpGetAsync(POKEMON_LIST_ENDPOINT + '?limit=' + numero);

    lista_pokemon.innerHTML = null;
    POKEMONS.results.forEach(pokemon => {

        lista_pokemon.innerHTML += `<li>Pokemon: ${pokemon.name}</li>`
    });


}


/* Selecciona los elementos del documento HTML. */
const cartaPokemon = document.querySelector('[cartaPokemon]');
const nombrePokemon = document.querySelector('[nombrePokemon]');
const imagenPokemon = document.querySelector('[imagenPokemon]');
const contenedorImagen = document.querySelector('[contenedorImagen]');
const idPokemon = document.querySelector('[idPokemon]');
const tiposPokemon = document.querySelector('[tiposPokemon]');
const statsPokemon = document.querySelector('[statsPokemon]');

/* Contiene los colores para cada tipo de pokemon. */
const tipoColor = {
    electric: '#f8d030',
    normal: '#a8a878',
    fire: '#f08030',
    water: '#0596C7',
    ice: '#98d8d8',
    rock: '#b8a038',
    flying: '#a890f0',
    grass: '#78c850',
    psychic: '#f85888',
    ghost: '#a890f0',
    bug: '#a8b820',
    poison: '#795663',
    ground: '#E0C068',
    dragon: '#7038f8',
    steel: '#1D8A99',
    fighting: '#c03028',
    fairy: '#EE99AC',
    dark: '#705848',
    default: '#000000',
};




/**
 * Usamos la API de recuperación para realizar una solicitud a la PokeAPI y luego usamos el método
 * .then() para manejar la respuesta.
 */
const obtenerPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => datosPokemon(response))
        .catch(err => pokemonNoEncontrado())
}

/**
 * Obtiene los datos del pokemon y presenta el nombre, la imagen, el id, los tipos y las
 * estadísticas del pokemon en el documento HTML
 */
const datosPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    nombrePokemon.textContent = data.name;
    imagenPokemon.setAttribute('src', sprite);
    idPokemon.textContent = `Nº ${data.id}`;
    colorCartaPokemon(types);
    tipoPokemon(types);
    statPokemon(stats);
}

/**
 * Toma una matriz de objetos y devuelve una cadena que es un degradado radial de los colores de los
 * tipos del Pokémon, estableciendo el color de fondo del elemento imagenPokemon
 */
const colorCartaPokemon = types => {
    const color1 = tipoColor[types[0].type.name];
    const color2 = types[1] ? tipoColor[types[1].type.name] : tipoColor.default;
    imagenPokemon.style.background =  `radial-gradient(${color2} 25%, ${color1} 25%)`;
    imagenPokemon.style.backgroundSize = ' 5px 5px';
}

/**
 * Toma una matriz de tipos, borra el div tiposPokemon y luego recorre la matriz y crea un nuevo div para
 * cada tipo, configurando el color del texto con el color del tipo y el contenido del texto con el
 * nombre del tipo.
 */
const tipoPokemon = types => {
    tiposPokemon.innerHTML = '';
    types.forEach(type => {
        const tipoPokemon = document.createElement("div");
        tipoPokemon.style.color = tipoColor[type.type.name];
        tipoPokemon.textContent = type.type.name;
        tiposPokemon.appendChild(tipoPokemon);
    });
}

/**
 * Crea un nuevo elemento div para cada estadística y luego agrega el nombre de la
 * estadística y la cantidad de la estadística a ese elemento div
 */
const statPokemon = stats => {
    statsPokemon.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const nombreStat = document.createElement("div");
        const statBase = document.createElement("div");
        nombreStat.textContent = stat.stat.name;
        statBase.textContent = stat.base_stat;
        statElement.appendChild(nombreStat);
        statElement.appendChild(statBase);
        statsPokemon.appendChild(statElement);
    });
}

/**
 * Borra el contenido de la página y muestra un mensaje diciendo que no se encontró el Pokémon
 */
const pokemonNoEncontrado = () => {
    nombrePokemon.textContent = 'No encontrado';
    imagenPokemon.setAttribute('src', 'img/pikachu.png');
    imagenPokemon.style.background =  '#fff';
    tiposPokemon.innerHTML = '';
    statsPokemon.innerHTML = '';
    idPokemon.textContent = '';
}
