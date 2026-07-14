document.querySelector("#RMcharacterSearch").addEventListener("submit", searchCharacters);

async function searchCharacters(event) {
    event.preventDefault();

    const charName = document.querySelector("#charName").value
    const species = document.querySelector("#speciesSelect").value;
    const selectedGender = document.querySelector("input[name='gender']:checked");
    const message = document.querySelector("#validationMessage");

    let url = "https://rickandmortyapi.com/api/character/?";

    if (charName === "" && species === "" && selectedGender === null) {
        message.textContent = "Please slect at least one search criterion.";
        message.style.color = "red";
        return;
    }
    message.textContent = "";
    document.querySelector("#results").textContent = "";

    if (charName !== "") {
        url += "name=" + encodeURIComponent(charName) + "&";
    }
    
    if (species !== "") {
        url += "species=" + encodeURIComponent(species) + "&";
    }

    if (selectedGender !== null) {
        url += "gender=" + encodeURIComponent(selectedGender.value) + "&";
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayCharacters(data.results);

        console.log(data.results);
    } catch (error) {
        console.error(error);
        document.querySelector("#results").textContent = "No characters found.";
    }
}

function displayCharacters(characters) {
    const results = document.querySelector("#results");
    results.textContent = "";
    

    for (const character of characters) {
        const statusClass = character.status.toLowerCase();
        const card = document.createElement("div");
        card.classList.add("characterCard");

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Status:</strong><span class="${statusClass}"> ${character.status}</span></p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
            <p><strong>Episodes:</strong> ${character.episode.length}</p>
        `;

        results.appendChild(card);
    }
}