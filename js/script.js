//Pokemon Objects

let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 1.7,
      types: ["grass", "poison"],
    },
    {
      name: "Butterfree",
      height: 1.1,
      types: ["Bug"],
    },
    {
      name: "Caterpie",
      height: 0.3,
      types: ["Bug", "Shield-dust"],
    },
  ];
  function add(item) {
    pokemonList.push(item);
  }
  function getAll() {
    return pokemonList;
  }

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

  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
  };
})();
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
