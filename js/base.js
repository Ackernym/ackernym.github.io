//TODO make it so that if you click the arrow key on the keyboard on the last or first images it won't loop
//since we made it so that if you're clicking on it it'll hide the arrow key
// this lightbox was made pretty much by exactly following a tutorial from this youtube video
// https://www.youtube.com/watch?v=_h6iT2UnyVs&t=407s

// query selectors
const imageLink = document.querySelectorAll('.image-link');
const imageArray = Array.from(imageLink);
const lastImage = imageArray.length - 1;
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');

const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnLeft = document.querySelector('#left');

let activeImage;



// functions
const showLightBox = () => {lightbox.classList.add('active')}

const hideLightBox = () => {lightbox.classList.remove('active')}

const setActiveImage = (image) => {
  lightboxImage.src = image.dataset.imgfull;
  activeImage = imageArray.indexOf(image);
  removeBtnInactiveClass()
  switch(activeImage) {
    case 0:
      lightboxBtnLeft.classList.add('inactive');
      //lightboxBtnRight.classList.remove('inactive');
      break;
    case lastImage:
      lightboxBtnRight.classList.add('inactive');
     // lightboxBtnLeft.classList.remove('inactive');
      break;
    default:
      removeBtnInactiveClass()
  }
}

const removeBtnInactiveClass = () => {
  lightboxBtns.forEach(btn => {
    btn.classList.remove('inactive');
  })
}

const transitionSlidesLeft = () => {
  lightboxBtnLeft.focus();
  activeImage === 0 ? setActiveImage(imageArray[lastImage]) : setActiveImage(imageArray[activeImage - 1]);
}

const transitionSlidesRight = () => {
  lightboxBtnRight.focus();
  activeImage === lastImage ? setActiveImage(imageArray[0]) : setActiveImage(imageArray[activeImage + 1]);
}

const transitionSlideHandler = (moveItem) => {
  moveItem.includes('left') ? transitionSlidesLeft() : transitionSlidesRight();
}

// event listeners
imageLink.forEach(image => {
  image.addEventListener('click', (e) => {
    e.currentTarget.removeAttribute('href');
    showLightBox()
    setActiveImage(image)
    })
  })

  lightbox.addEventListener('click', () => {hideLightBox()})

  lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>{
      e.stopPropagation();
     transitionSlideHandler(e.currentTarget.id);
;    })
  })




  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key.includes('Left') || e.key.includes('Right')) {
      e.preventDefault();
      transitionSlideHandler(e.key.toLowerCase());
    }
  })
    
    
    
    
