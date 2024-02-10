
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadmoreButton')
const limit = 5
const maxRecords = 151
let offset = 0;



function loadPokemonItens(offset, limit ) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map((pokemon) =>
        `
        <li class="pokemon ${pokemon.type}" onclick="vDetails(${pokemon.number})">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    
    
        <div class="detail" >
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            
    
    
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        
    
    </li>
    `).join('')

        pokemonList.innerHTML = newHtml
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

let vDetails = (idPoke) =>{
    const modeloPoke = document.querySelector('.modeloPoke')
    if(modeloPoke){
        modeloPoke.remove()
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke}`)
        .then((response) => response.json())
        .then((responseJson) => pokeApi.convertDetails(responseJson))
        .then((convertPokemon) => {
            const bodyDoc = document.querySelector('body')
            bodyDoc.innerHTML += pokeApi.vDetails(convertPokemon)
        })
        
}

