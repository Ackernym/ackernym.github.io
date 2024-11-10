//TODO adjust paramaters on tab indexing so that the lightbox image itself isn't tabbable 
//TODO make exit button
// this lightbox was made pretty much by exactly following a tutorial from this youtube video
// https://www.youtube.com/watch?v=_h6iT2UnyVs&t=407s

// query selectors

const allBodyElements = document.querySelectorAll('body *');

const bodyTag = document.querySelector('body');

const imageLink = document.querySelectorAll('.image-link');
const imageArray = Array.from(imageLink);
const lastImage = imageArray.length - 1;
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');

const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnLeft = document.querySelector('#left');

const lightboxExitBtn = document.querySelector('.lightbox-exit-btn');

let activeImage;



// functions
const showLightBox = () => {lightbox.classList.add('active')}

const hideLightBox = () => {lightbox.classList.remove('active')}

// disables scrolling on the body when the lightbox is active
const disableBodyScroll = () => {bodyTag.classList.add('lightbox-open')}

// reenables scrolling on the body when the lightbox closes
const enableBodyScroll = () => {bodyTag.classList.remove('lightbox-open')}

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

// function to add a tabindex of -1 to all elements except the lightbox class
// and what is inside it
const addTabIndex = () => {
  allBodyElements.forEach(element => {
    if (!lightbox.contains(element)) {
      element.setAttribute('tabindex', -1);
    }
    else{
      element.setAttribute('tabindex', 0);
    }
  })
}

// function to restore tabindex to 0 for all elements upon lightbox closing
const removeTabIndex = () => {
  allBodyElements.forEach(element => {
    if (lightbox.contains(element)){
      element.setAttribute('tabindex', -1);
    }
    else {
      element.setAttribute('tabindex', '');
    }
  })
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
    addTabIndex()
    disableBodyScroll()
    })
  })

  lightbox.addEventListener('click', () => {
    removeTabIndex()
    hideLightBox()
    enableBodyScroll()
  })

  lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) =>{
      e.stopPropagation();
     transitionSlideHandler(e.currentTarget.id);
;    })
  })

// event listener for exit button to function
  lightboxExitBtn.addEventListener('click', () => {
    removeTabIndex()
    hideLightBox()
    enableBodyScroll()
  })



// event listener for window events
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key.includes('Escape')) {
      e.preventDefault();
      removeTabIndex();
      hideLightBox();
      enableBodyScroll();
    }
    if (e.key.includes('Left') || e.key.includes('Right')) {
      e.preventDefault();
      transitionSlideHandler(e.key.toLowerCase());
    }
  })
    
    
    
    
