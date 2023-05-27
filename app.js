let page = 1

const fetchPokemons = async (page = 1) => {
  const limit = 9
  const offset = (page -1) * limit
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  const response = await fetch(url)
  const data = await response.json()
  const dataResults = data.results.map(pokemon => {
    //"url": "https://pokeapi.co/api/v2/pokemon/19/"
  const id = pokemon.url.split('/').at(6)
  // console.log(id);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    return {
      ...pokemon,
      id,
      image,

    }
  })
  return dataResults


}

const documentReady = async () => {
  const nextPage = document.getElementById('nextPage')
  const prevPage = document.getElementById('prevPage')
  const currentPage = document.getElementById('currentPage')

  nextPage.addEventListener('click', async () => {

    const pokemons = await fetchPokemons(++page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })


  prevPage.addEventListener('click', async () => {

    const pokemons = await fetchPokemons(--page)
    renderPokemons(pokemons)
    currentPage.innerHTML = page
  })

  const pokemons = await fetchPokemons()
  // console.log(pokemons);

  renderPokemons(pokemons)
}

document.addEventListener('DOMContentLoaded', documentReady)

const renderPokemons = (pokemons) => {
  const pokemonsList = document.getElementById('pokemonsList')

  let elements = ''

  pokemons.forEach( pokemon => {
    // elements = elements + `<h2>${pokemon.name}</h2>`
    elements += `
      <article class='pokemons-item' >
        <img src='${pokemon.image}' width='80' height='80'/>
        <h2> #${pokemon.id} ${pokemon.name}</h2>      
      </article>
   
    `


  })
  
  pokemonsList.innerHTML = elements

}






