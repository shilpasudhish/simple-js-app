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
  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach((pokemon) => {
  pokemon.height > 1.5
    ? document.write(
        "<p>" +
          pokemon.name +
          " (height:" +
          pokemon.height +
          ") - Wow, that’s big!</p>"
      )
    : document.write(
        "<p>" + pokemon.name + " (height:" + pokemon.height + ")</p>"
      );
});
