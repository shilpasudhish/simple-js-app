let pokemonRepository = (function () {
  //empty pokemon array
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  //Modal function
  function showModal(title, text, imgUrl) {
    // Clear all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;
    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    // Add image
    let imageElement = document.createElement("img");
    imageElement.src = imgUrl;
    imageElement.alt = `${title} image`;
    imageElement.classList.add("pokemon-image");

    //Appending all the modal elements
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modal.appendChild(imageElement);

    modalContainer.classList.add("is-visible");
  }

  //modal hide function
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  //hide modal with escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //hide modal when clicked outside the container
  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
