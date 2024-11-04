let pokemonRepository = (function () {
  //empty pokemon array
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

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
      showModal(
        pokemon.name,
        "Height is " + pokemon.height + "cm",
        pokemon.imageUrl
      );
    });
  }
  //creates pokemon list as buttons and logs details
  function addListItem(pokemon) {
    let pokemonlist = document.getElementById("pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-light");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    listpokemon.appendChild(button);
    pokemonlist.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  //modal function
  function showModal(title, text, imgUrl) {
    // Update modal title and body content
    let modalTitle = document.getElementById("pokemonModalLabel");
    let modalBody = document.getElementById("pokemon-details");

    modalTitle.textContent = title;
    modalBody.innerHTML = ""; // Clear previous content

    // Create content elements for the modal
    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = imgUrl;
    imageElement.alt = `${title} image`;
    imageElement.classList.add("img-fluid", "mx-auto", "d-block");

    // Append content to the modal body
    modalBody.appendChild(imageElement);
    modalBody.appendChild(contentElement);

    // Show the modal using Bootstrap's jQuery method
    $("#pokemonModal").modal("show");
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
