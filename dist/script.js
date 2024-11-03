let pokemonRepository = (function () {
  let t = [];
  function e(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function n(e) {
    t.push(e);
  }
  function o() {
    return t;
  }
  function i(t) {
    e(t).then(function () {
      var e, n, o;
      let i, a, l, r;
      console.log(t),
        (e = t.name),
        (n = "Height is " + t.height + "cm"),
        (o = t.imageUrl),
        (i = document.getElementById("pokemonModalLabel")),
        (a = document.getElementById("pokemon-details")),
        (i.textContent = e),
        (a.innerHTML = ""),
        ((l = document.createElement("p")).innerText = n),
        ((r = document.createElement("img")).src = o),
        (r.alt = `${e} image`),
        r.classList.add("img-fluid", "mx-auto", "d-block"),
        a.appendChild(r),
        a.appendChild(l),
        $("#pokemonModal").modal("show");
    });
  }
  return (
    document.querySelector("#modal-container"),
    {
      addListItem: function t(e) {
        let n = document.getElementById("pokemon-list"),
          o = document.createElement("li");
        o.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );
        let a = document.createElement("button");
        (a.innerText = e.name),
          a.classList.add("btn", "btn-primary", "btn-sm"),
          a.setAttribute("data-toggle", "modal"),
          a.setAttribute("data-target", "#pokemonModal"),
          o.appendChild(a),
          n.appendChild(o),
          a.addEventListener("click", function () {
            i(e);
          });
      },
      add: n,
      getAll: o,
      showDetails: i,
      loadList: function t() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              n({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      loaddetails: e,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
