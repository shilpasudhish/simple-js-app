//Pokemon Objects

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 1.7,
        types: ['grass','poison']
    },
    {
        name: 'Butterfree',
        height: 1.1,
        types: ['Bug']
    },
    {
        name: 'Caterpie',
        height: 0.3,
        types: ['Bug','Shield-dust']
    }
];

//displays the name and height of the pokemon, and adds comment for the biggest pokemon.

for (let i=0;i<pokemonList.length;i++)
{
    if (pokemonList[i].height>1.5)
    {
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height+ ') - Wow, that’s big!</p>');

    }
    else
    {
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height+ ')</p>');
    }
}
