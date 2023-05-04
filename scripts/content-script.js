

// Parcours les éléments de la page HTML
function trouverMot(listeMots, parent = document.body) {
  // Exclure les éléments avec le tag "a" et leurs enfants
  if (parent.tagName === 'A') {
    return;
  }

  const enfants = parent.childNodes;
  for (const enfant of enfants) {
    if (enfant.nodeType === Node.TEXT_NODE) {
      const contenuElement = enfant.textContent.toLowerCase();
      for (const mot of listeMots) {
        if (contenuElement.includes(mot.toLowerCase())) {
          surlignage(mot, contenuElement, enfant, parent);
        }
      }
    } else if (enfant.nodeType === Node.ELEMENT_NODE) {
      // Appeler la fonction de manière récursive sur l'enfant si ce n'est pas un lien
      if (enfant.tagName !== 'A') {
        trouverMot(listeMots, enfant);
      }
    }
  }
}

// Surligne le mot recherché
function surlignage(mot, contenuElement, enfant, parent) {
  
    const nouveauContenu = enfant.textContent.replace(new RegExp(`\\b(${mot})\\b`, 'gi'), `<span style="background-color: yellow;">$1</span>`);
    const nouvelEnfant = document.createElement('span');
    nouvelEnfant.innerHTML = nouveauContenu;
    parent.replaceChild(nouvelEnfant, enfant);
  
}

setTimeout(() => trouverMot(["Macron"]), 2000);