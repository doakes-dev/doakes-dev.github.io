document.querySelector("#RMcharacterSearch").addEventListener("submit", searchCharacters);

async function searchCharacters(event) {
    event.preventDefault();

    const species = document.querySelector("#speciesSelect").value;
    const selectedGender = document.querySelector("input[name='gender']:checked");

    let url = "https://rickandmortyapi.com/api/character/?";

    if (species !== "") {
        url += "species=" + encodeURIComponent(species) + "&";
    }

    if (selectedGender !== null) {
        url += "gender=" + encodeURIComponent(selectedGender.value) + "&";
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data.results);
    } catch (error) {
        console.error(error);
    }
}