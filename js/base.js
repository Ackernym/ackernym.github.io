//this is currently a playground for my js lightbox

const imagesLightbox = document.querySelectorAll(".image-link");

const lbContainer = document.createElement("div");
lbContainer.classList.add("lightbox");
var imageFull = document.createElement("img");


//for loop that creates lightbox divs
function createLightboxDiv() {
  for (let i = 0; i < imagesLightbox.length; i++) {
    console.log(imagesLightbox[i].href);
    lbContainer.setAttribute("id", `test${[i]}`);
    lbContainer.append(imageFull);
    imageFull.src = imagesLightbox[i].href;
    document.body.appendChild(lbContainer.cloneNode(true));
    imagesLightbox[i].href = "#";
  }
  removeClickListener();
}

//this has to be set to once: true so that only the first click triggers the creation of divs
imagesLightbox.forEach(element => {
  element.addEventListener('click', createLightboxDiv);
});

function removeClickListener() {
  imagesLightbox.forEach(element => {
    element.removeEventListener('click', createLightboxDiv);
  });
}
