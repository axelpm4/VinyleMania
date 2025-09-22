const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
let index = 0;

function showSlide(i) {
  if (i < 0) index = slideCount - 1;
  else if (i >= slideCount) index = 0;
  else index = i;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

document.querySelector('.arrow.left').addEventListener('click', () => showSlide(index - 1));
document.querySelector('.arrow.right').addEventListener('click', () => showSlide(index + 1));

// Auto-slide toutes les 3s
setInterval(() => showSlide(index + 1), 129500);