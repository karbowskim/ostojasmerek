function galleryPreviewTemplate(url) {
    return '<div class="light-gallery__close">'+
        '<img class="light-gallery__change-img light-gallery__change-img--close" src="./img/close.svg" alt="Poprzednie zdjęcie">'+
    '</div>'+
    '<div class="light-gallery__change light-gallery__change--prev">'+
        '<img class="light-gallery__change-img" src="./img/arrow_left.svg" alt="Poprzednie zdjęcie">'+
    '</div>'+
    '<div class="light-gallery__change light-gallery__change--next">'+
        '<img class="light-gallery__change-img" src="./img/arrow_right.svg" alt="Kolejne zdjęcie">'+
    '</div>'+
    '<img class="light-gallery__img" src="'+url+'">'+
    '</img>';    
 } 
 
 var prevSibling = null;
 var prevSiblingFullUrl = null;
 
 var nextSibling = null;
 var nextSiblingFullUrl = null;
 
 var currentElement = null;
 
 function closeGalleryPreview() {
     const lightGalleryElement = document.querySelector('.light-gallery');
     lightGalleryElement.parentNode.removeChild(lightGalleryElement);
 }
 
 function changePhoto(url) {
     if (!url) {
         return;
     }
 
     var galleryImg = document.querySelector('.light-gallery__img');
     galleryImg.src = url;
 }
 
 function findPrevSibling(element) {
     if (!element) {
         return;
     }
 
     return element.parentElement.previousElementSibling.querySelector('img');
 }
 
 function findNextSibling(element) {
     if (!element) {
         return;
     }
 
     return element.parentElement.nextElementSibling.querySelector('img');
 }
 
 function openGalleryPreview(element) {
     var url = element.target.dataset.full;

     if (!url) {
         return;
     }

     var bodyElement = document.querySelector('body');
     var newElement = document.createElement('div');
     newElement.classList.add('light-gallery');
     newElement.innerHTML = galleryPreviewTemplate(url);
     bodyElement.appendChild(newElement);
 
     const closeButton = document.querySelector('.light-gallery__close');
     closeButton.addEventListener('click', closeGalleryPreview);
 
     var initialElement = element.target;
     var selectedElement = null;
 
     document.querySelector('.light-gallery__change--prev').addEventListener('click', function() {
         if (initialElement) {
             selectedElement = initialElement;
             initialElement = null;            
         }
 
         prevSibling = findPrevSibling(selectedElement);
         selectedElement = prevSibling ? prevSibling : selectedElement;
         prevSiblingFullUrl = selectedElement ? selectedElement.dataset.full : null;
         changePhoto(prevSiblingFullUrl);
     });
 
     document.querySelector('.light-gallery__change--next').addEventListener('click', function() {
         if (initialElement) {
             selectedElement = initialElement;
             initialElement = null;
         } 
 
         nextSibling = findNextSibling(selectedElement)
         selectedElement = nextSibling ? nextSibling : selectedElement;
         nextSiblingFullUrl = selectedElement ? selectedElement.dataset.full : null;
         changePhoto(nextSiblingFullUrl);
     });
 }
 
 function initLightGallery() {
     const photosContainer = document.querySelector('.light-gallery__photos');
     photosContainer.addEventListener('click', openGalleryPreview);
 }
 
 window.onload = initLightGallery;