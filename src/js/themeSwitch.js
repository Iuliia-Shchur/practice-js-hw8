import { galleryItems } from "./galleryItem";
import { refs} from "./refs";

let activeIndex = null;

function createGalleryCards(items) {
return items.map(({preview, original, description}) => {

    return `
    <li class="gallery__item">
      <a class="gallery__link"
        href="${original}">
          <img class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
    </li>
    `;
})
};

refs.galleryList.innerHTML = createGalleryCards(galleryItems).join('');

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal (e) {
    e.preventDefault()

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    refs.lightbox.classList.add('is-open');
    refs.lightbox__image.src = e.target.dataset.source;

createGalleryCards(galleryItems).forEach((element, ind) => {
    if(element.includes(e.target.src)) {
        activeIndex = ind;
    }
});
console.log(activeIndex);

window.addEventListener('keydown', closeByEscape);
window.addEventListener('keydown', changeByArrows);
    
};

refs.lightbox.addEventListener('click', onCloseModal);

function onCloseModal (e) {
    if (e?.target.nodeName === 'IMG') {
        return;
    }
    refs.lightbox__image.src = '';
    refs.lightbox.classList.remove('is-open');
   
window.removeEventListener('keydown', closeByEscape);
window.removeEventListener('keydown', changeByArrows);
}


function closeByEscape (e) {
    if (e.key !== 'Escape') {
        return;
    } onCloseModal();
    console.log('Hello');
}

function changeByArrows (e) {
if(e.key === 'ArrowRight' && activeIndex < galleryItems.length -1) {
    activeIndex += 1;
    refs.lightbox__image.src = galleryItems[activeIndex].original;
    return;
}  if(e.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    refs.lightbox__image.src = galleryItems[activeIndex].original;
    return;
} if(e.key === 'ArrowRight' && activeIndex === galleryItems.length -1) {
    activeIndex = 0;
    refs.lightbox__image.src = galleryItems[activeIndex].original;
    return;
}if(e.key === 'ArrowLeft' && activeIndex === 0) {
    activeIndex = galleryItems.length -1;
    refs.lightbox__image.src = galleryItems[activeIndex].original;
    return;
}}; 


// function keyboardManipulation({ key }) {
//     switch (key) {
//       case gallery.length - 1 > activeIndex && "ArrowRight":
//         activeIndex += 1;
//         refs.modalImg.src = gallery[activeIndex].original;
//         break;
//       case activeIndex > 0 && "ArrowLeft":
//         activeIndex -= 1;
//         refs.modalImg.src = gallery[activeIndex].original;
//         break;
//       case activeIndex === gallery.length - 1 && "ArrowRight":
//         activeIndex = 0;
//         refs.modalImg.src = gallery[activeIndex].original;
//         break;
//       case activeIndex === 0 && "ArrowLeft":
//         activeIndex = gallery.length - 1;
//         refs.modalImg.src = gallery[activeIndex].original;
//         break;
//       case "Escape":
//         closeModal();
//         break;
//       default:
//         alert("что-то пошло не так");
//     }
//   }
  
