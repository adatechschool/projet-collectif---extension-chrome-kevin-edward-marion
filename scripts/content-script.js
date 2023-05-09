chrome.runtime.sendMessage({ type: 'getData' }, response => {
  console.log(response);
  let listeNoms = [];
  let listePrenoms = [];
  for (let politicien of response.data) {
    listeNoms.push(politicien["nom"]);
    listePrenoms.push(politicien["prénom"]);
  }
  console.log(listeNoms);
  setTimeout(() => trouverMot(listeNoms), 2000)
});

// Parcourir les éléments de la page HTML
function trouverMot(listeMots, parent = document.body) {
  if (parent.tagName === 'A') {
    return;
  }

  const enfants = parent.childNodes;
  for (const enfant of enfants) {
    if (enfant.nodeType === Node.TEXT_NODE) {
      const contenuElementLower = enfant.textContent.toLowerCase();
      const contenuElement = enfant.textContent;
      let nouveauContenu = contenuElement;
      for (const mot of listeMots) {
        if (contenuElementLower.includes(mot.toLowerCase())) {
          nouveauContenu = nouveauContenu.replace(
            new RegExp(`(${mot})`, 'gi'),
            '<span style="background-color: yellow;">$1</span>'
          );
        }
      }
      if (contenuElementLower !== nouveauContenu.toLowerCase()) {
        const nouvelEnfant = document.createElement('span');
        nouvelEnfant.innerHTML = nouveauContenu;
        parent.replaceChild(nouvelEnfant, enfant);
      }
    } else if (enfant.nodeType === Node.ELEMENT_NODE) {
      if (enfant.tagName !== 'A') {
        trouverMot(listeMots, enfant);
      }
    }
  }
}

// setTimeout(() => trouverMot(["Macron", "Borne"]), 2000);


// Surligner le mot recherché
// function surlignage(mot, enfant, parent) {
  
//     const nouveauContenu = enfant.textContent.replace(mot, `<span style="background-color: yellow;">${mot}</span>`);
//     const nouvelEnfant = document.createElement('span');
//     nouvelEnfant.innerHTML = nouveauContenu;
//     parent.replaceChild(nouvelEnfant, enfant);
  
// }
