// query selectors
const imageLink = document.querySelectorAll('.image-link');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');


// functions
const showLightBox = () => {lightbox.classList.add('active')}

const hideLightBox = () => {lightbox.classList.remove('active')}

const setActiveImage = (image) => {
  lightboxImage.src = image.dataset.imgfull;
}

// event listeners
imageLink.forEach(image => {
  image.addEventListener('click', (e) => {
    e.currentTarget.removeAttribute('href');
    showLightBox()
    setActiveImage(image)
    })
  })

  lightbox.addEventListener('click', () => {
    hideLightBox()
   })
    
