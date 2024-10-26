let pokemonRepository = (function () {
  //empty pokemon array
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //async function to load pokemons from the API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //async function to load specific details
  function loaddetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //add pokemon to the repository
  function add(item) {
    pokemonList.push(item);
  }

  //retrive the list
  function getAll() {
    return pokemonList;
  }
  //logs the pokemon details in the console when clicked
  function showDetails(pokemon) {
    loaddetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  //creates pokemon list as buttons and logs details
  function addListItem(pokemon) {
    let pokemonlist = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pok-button");
    listpokemon.appendChild(button);
    pokemonlist.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList,
    loaddetails: loaddetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
