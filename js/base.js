// query selectors
const imageLink = document.querySelectorAll('.image-link');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');

// functions
const showLightBox = () => {lightbox.classList.add('active')}


// event listeners
imageLink.forEach(image => {
  image.addEventListener('click', (e) => {
    const oldHref = e.currentTarget.getAttribute('href');
    const newHref = e.currentTarget.removeAttribute('href');
    showLightBox()
    lightboxImage.src = oldHref;
    console.log(oldHref);    
    })
  })
    
