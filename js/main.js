const btnSearch = document.getElementById('search');
const pokeNameInput = document.getElementById("pokeName");
const txtStatus = document.getElementById('txtstatus');

pokeNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
})

btnSearch.addEventListener('click', () => {
    buscarPokemon();
})

const buscarPokemon = () => {
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./img/pokemon-sad.jpg");
            txtStatus.textContent = 'Pokémon no encontrado';
            txtStatus.classList.remove('removed')
        } else if (pokeName === '') {
            txtStatus.textContent = 'Escribe el nombre de un pokémon';
            txtStatus.classList.remove('removed')
        } else {
            txtStatus.classList.add('removed')
            txtStatus.textContent = '';
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            datos(data)
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const datos = (data) => {
    const namePokemon = document.getElementById('namepokemon');
    const typePokemon = document.getElementById('typepokemon');
    const vida = document.getElementById('vida');
    const ataque = document.getElementById('ataque');
    const defensa = document.getElementById('defensa');
    const velocidad = document.getElementById('velocidad');
    const ataqueEspecial = document.getElementById('ataqueespecial');
    const defensaEspecial = document.getElementById('defensaespecial');
    const movimiento1 = document.getElementById('movimiento1');
    const movimiento2 = document.getElementById('movimiento2');

    namePokemon.textContent = data.species.name;
    const statTypePokemon = data.types[1];
    typePokemon.textContent = 'Pokémon tipo: ' + data.types[0].type.name;
    if (typeof statTypePokemon != 'undefined') {
        typePokemon.textContent = 'Pokémon tipo: ' + data.types[0].type.name + ', ' + data.types[1].type.name;
    } else {
        typePokemon.textContent = 'Pokémon tipo: ' + data.types[0].type.name;
    }
    vida.textContent = 'Vida: ' + data.stats[0].base_stat;
    ataque.textContent = 'Ataque: ' + data.stats[1].base_stat;
    defensa.textContent = 'Defensa: ' + data.stats[2].base_stat;
    ataqueEspecial.textContent = 'Ataque especial: ' + data.stats[3].base_stat;
    defensaEspecial.textContent = 'Defensa especial: ' + data.stats[4].base_stat;
    velocidad.textContent = 'Velocidad: ' + data.stats[5].base_stat;
    movimiento1.textContent = data.abilities[0].ability.name;
    const statMovimiento2 = data.abilities[1];
    if (typeof statMovimiento2 != 'undefined') {
        movimiento2.textContent = data.abilities[1].ability.name;
        movimiento2.classList.remove('removed');
    } else {
        movimiento2.classList.add('removed');
    }
}
