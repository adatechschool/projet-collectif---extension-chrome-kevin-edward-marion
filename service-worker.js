const getData = async (url) => {
    const response = await fetch(url);

    if (response.status != 200) {
        throw new Error("Cannot fetch the data.");
    };

    const data = await response.json();
    return data;
}

getData("donnee.json")
    .then(data => {

    })

function trouverMot(listeMots) {
    const elementsPage = document.body.querySelectorAll('*:not(script)');
    for (const element of elementsPage) {
        console.log(element)
        const contenuElement = element.textContent.toLowerCase();
        for (const mot of listeMots) {
            if (contenuElement.includes(mot.toLowerCase())) {
                const nouveauContenu = contenuElement.replace(mot, `<span style="background-color: yellow;">${mot}</span>`)
                element.innerHTML = nouveauContenu;
                return
            }
        }
    }
}