document.addEventListener("DOMContentLoaded", () => {
  // --- Catalogue filtre ---
  const toggleBtn = document.getElementById("toggle-filters");
  const filters = document.getElementById("catalogue-filters");

  if (toggleBtn && filters) {
    toggleBtn.addEventListener("click", () => {
      filters.classList.toggle("active");
    });
  }
// BURGER
const burger = document.querySelector(".hamburger");
const menu = document.getElementById("nav-menu");
const closeBtn = document.querySelector(".close-btn");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.add("active");
  });
}
if (closeBtn && menu) {
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
  });
}

  // --- Slider ---
  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let index = 0;

  function showSlide(i) {
    if (i < 0) index = slideCount - 1;
    else if (i >= slideCount) index = 0;
    else index = i;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  if (leftArrow && rightArrow && slides) {
    leftArrow.addEventListener('click', () => showSlide(index - 1));
    rightArrow.addEventListener('click', () => showSlide(index + 1));

    // Auto-slide toutes les 3s
    setInterval(() => showSlide(index + 1), 3000);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 6; // nombre de vinyles visibles par page
  const grid = document.getElementById("catalogue-grid");
  const cards = grid.querySelectorAll(".catalogue-card");
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  let currentPage = 1;

  function showPage(page) {
    currentPage = page;

    // cacher tous les vinyles
    cards.forEach(card => card.style.display = "none");

    // afficher seulement ceux de la page choisie
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    for (let i = start; i < end && i < cards.length; i++) {
      cards[i].style.display = "block";
    }

    // mettre à jour le bouton actif
    document.querySelectorAll(".page-btn").forEach(btn => {
      btn.classList.remove("active");
      if (parseInt(btn.dataset.page) === page) {
        btn.classList.add("active");
      }
    });
  }

  // Gérer les boutons numérotés
  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.dataset.page);
      showPage(page);
    });
  });

  // Précédent / Suivant
  document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  document.getElementById("next").addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  // Afficher la première page au début
  showPage(1);
});
// ici c'est la page 404 

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("soundBtn");
  const sound = document.getElementById("elevatorSound");

  button.addEventListener("click", () => {
    sound.currentTime = 0; // remet au début si déjà joué
    sound.play();
  });
});
;
// ==== AJOUT DES VINYLES DU JSON ====
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalogue-grid");
  if (!grid) return;

  fetch("../assets/vinyle.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(vinyle => {
        const card = document.createElement("div");
        card.classList.add("catalogue-card");

        card.innerHTML = `
          <div class="vinyle-img">
            <img src="${vinyle.image}" alt="${vinyle.title}" class="main-img">
            <div class="actions">
              <button><i class="bi bi-bag-fill"></i></button>
              <button><i class="bi bi-play-circle"></i></button>
              <button><i class="bi bi-eye"></i></button>
            </div>
          </div>
          <h4>${vinyle.artist} – ${vinyle.title}</h4>
          <p>${vinyle.price} € / ${vinyle.rental_duration_days} jours</p>
        `;

        grid.appendChild(card);
      });

      // ⚡ rappeler la pagination après ajout
      if (typeof showPage === "function") {
        showPage(1);
      }
    })
    .catch(error => console.error("Erreur chargement JSON :", error));
});
