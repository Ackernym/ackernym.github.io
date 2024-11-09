//this is currently a playground for my js lightbox

const imagesLightbox = document.querySelectorAll(".image-link");

const lbContainer = document.createElement("div");
lbContainer.classList.add("lightbox");
var imageFull = document.createElement("img");


//for loop that creates lightbox divs
//and also changes the hrefs on the image-link class
//to be #portfolio-image loop number
//also adds ids to each of the newly created lightbox divs
function createLightboxDiv() {
  for (let i = 0; i < imagesLightbox.length; i++) {
    console.log(imagesLightbox[i].href);
    lbContainer.setAttribute("id", `image${[i]}`);
    lbContainer.append(imageFull);
    imageFull.src = imagesLightbox[i].href;
    document.body.appendChild(lbContainer.cloneNode(true));
    imagesLightbox[i].href = `#portfolio-image${[i]}`;
  }
  removeClickListener();
}

//event listener that creates the lightbox divs and then removes the event listener
//so that it only fires once
imagesLightbox.forEach(element => {
  element.addEventListener('click', createLightboxDiv);
});

//remove click listener function to be added into
//the createLightbox function
function removeClickListener() {
  imagesLightbox.forEach(element => {
    element.removeEventListener('click', createLightboxDiv);
  });
}

// TESTING


//cycles through each of the new lightbox divs created
//and then adds the class lightbox-active to the selected 
//thumbnail
imagesLightbox.forEach(element =>{
  element.addEventListener('click', (e) => {
    const lightboxes = document.querySelectorAll(".lightbox");
    var portfolioHref = e.currentTarget.getAttribute('href');
    var newHrefs = portfolioHref.replace("#portfolio-", "");
    console.log(newHrefs);
    console.log(lightboxes.length);
    for (let i = 0; i < lightboxes.length; i++){
      if (newHrefs === lightboxes[i].id) {
        lightboxes[i].classList.add("lightbox-active");
        console.log("true!");
        return
      }
      else if (newHrefs != lightboxes[i].id){
        console.log("false! continuing...");
      }
    }
  })
});
