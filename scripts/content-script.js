

chrome.runtime.sendMessage({ type: 'getData' },  response => {
  console.log(response);
  let listeNoms = [];
  let listePrenoms = [];
  for (let politicien of response.data) {
    listeNoms.push(politicien["nom"]);
    listePrenoms.push(politicien["prénom"]);
  }
  console.log(listeNoms);

  setTimeout(() => {
    trouverMot(listeNoms);
    let poli = document.querySelectorAll('.politicien');
    let text = document.createElement('div');
    text.style.position = 'absolute';
    text.style.background = 'black';
    text.style.padding = '10px';
    text.style.borderRadius = '15px';
    text.style.display = 'none';
    document.body.appendChild(text);
    text.innerText = "Bonjour";
    text.style.color= "white";
  
    poli.forEach(nom => {
      nom.addEventListener("mouseenter", (e) => {
        text.style.display = 'block';
        positionnerTexte(text, e.clientX, e.clientY);
      });
      nom.addEventListener("mousemove", (e) => {
        positionnerTexte(text, e.clientX, e.clientY);
      });
      nom.addEventListener("mouseleave", (e) => {
        text.style.display = 'none';
      });
    })
  }, 2000);
  
  
});

function positionnerTexte(element, x, y) {
  element.style.left = x + 10 + 'px';
  element.style.top = y + 10 + 'px';
}

// Parcourir les éléments de la page HTML
function trouverMot(listeMots, parent = document.body) {
  if (parent.tagName === 'A') {
    return;
  }

  const enfants = parent.childNodes;
  for (const enfant of enfants) {
    if (enfant.nodeType === Node.TEXT_NODE) {
      surlignage(listeMots, enfant, parent)
    } else if (enfant.nodeType === Node.ELEMENT_NODE) {
      if (enfant.tagName !== 'A') {
        trouverMot(listeMots, enfant);
      }
    }
  }
}


// Surligner le mot recherché
function surlignage(listeMots, enfant, parent) {
  const contenuElementLower = enfant.textContent.toLowerCase();
  const contenuElement = enfant.textContent;
  let nouveauContenu = contenuElement;
  for (const mot of listeMots) {
    if (contenuElementLower.includes(mot.toLowerCase())) {
      nouveauContenu = nouveauContenu.replace(
        new RegExp(`(${mot})`, 'gi'),
        '<span style="background-color: rgb(204 255 255); color:black;" class="politicien">$1</span>'
      );
    }
  }
  if (contenuElementLower !== nouveauContenu.toLowerCase()) {
    const nouvelEnfant = document.createElement('span');
    nouvelEnfant.innerHTML = nouveauContenu;
    parent.replaceChild(nouvelEnfant, enfant);
  }
}
