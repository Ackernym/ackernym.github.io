//TODO make it so that the body doesn't scroll when the modal is open
//TODO make it so that the only things that can be tabbed when the modal is open are the arrow/exit buttons
//TODO make exit button
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

//if you want to loop around with arrow keys even if the button is inactive, set
//the first case to  setActiveImage(imageArray[lastImage])
const transitionSlidesLeft = () => {
  lightboxBtnLeft.focus();
  activeImage === 0 ? setActiveImage(imageArray[0]) : setActiveImage(imageArray[activeImage - 1]);
}

//if you want to loop around with the arrow keys even if the button is inactice, set
//the first case to setActiveImage(imageArray[0])
const transitionSlidesRight = () => {
  lightboxBtnRight.focus();
  activeImage === lastImage ? setActiveImage(imageArray[lastImage]) : setActiveImage(imageArray[activeImage + 1]);
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



// event listener for window events
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key.includes('Escape')) {
      e.preventDefault();
      hideLightBox();
    }
    if (e.key.includes('Left') || e.key.includes('Right')) {
      e.preventDefault();
      transitionSlideHandler(e.key.toLowerCase());
    }
  })
    
    
    
    
