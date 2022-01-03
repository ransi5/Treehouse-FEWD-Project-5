
  function galleryCreator() {
    for (let i = 0; i < photos.length; i++) {
      let img = photos[i];
      let imgDesc = photoDesc[i];
      let grid = document.getElementById("grid-container");
      let x = 1 + i;
      grid.innerHTML += `<figure class=\"grid-item pic-${x}\"><img src=\"photos/thumbnails/${img}.jpg\" alt=\"${imgDesc}\"
      onclick=\"photoclick(${x}, event)\"></figure>`;
    };
  }

  function gridscale() {
    let grid = document.getElementById("grid-container");
    if (!grid.getAttribute('transform')) {
      grid.style.transform = "scale(.1)";
      grid.style.transition = "transform .4s";
      setTimeout(function(){grid.style.visibility = "hidden"},400);
    }
  }

  function photoclick(id, event) {
    let i = id - 1;
    let q = id + 1;
    let img = photos[i];
    let imgDesc = photoDesc[i];
    let imgCapt = photoCapt[i];
    let lightbox = document.getElementById("lightbox-content");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let pic = document.querySelectorAll("#lightbox-content figure");
    const lightBox = document.getElementById("lightbox-container");
    let x = `item-${id}`;

    if(event.target.tagName === "IMG") {
      lightbox.innerHTML += `<figure id=\"item-${id}\" class=\"light-item next\"><img id="image" src=\"photos/${img}.jpg\"
      alt=\"${imgDesc}\"><figcaption>${imgCapt}</figcaption></figure>`;
      lightboxSetter();
      initialSetup();
      gridscale();
    }


    if (event.target.id == 'prev') {
      pic[0].className = '';
      pic[0].className = 'light-item prev';
      setTimeout(newSlide('next'), 500);
      setTimeout(()=>{
        pic[0].classList.add('hide');
      }, 500)
    }

    if (event.target.id == 'next') {
      pic[0].className = '';
      pic[0].className = 'light-item nextto';

      setTimeout(newSlide('prevto'), 500);
      setTimeout(()=>{
        pic[0].classList.add('hide');
      }, 500)
    }

    setTimeout(()=> {
      if(pic.length > 0) {
        oldSlide(lightbox);
      }
    },600)

    function oldSlide(container) {
      container.removeChild(container.firstChild);
    }

    function newSlide(cla) {

      lightbox.innerHTML += `<figure id=\"item-${id}\" class=\"light-item ${cla}\"><img id="image" src=\"photos/${img}.jpg\"
      alt=\"${imgDesc}\"><figcaption>${imgCapt}</figcaption></figure>`;
      console.log('animation start');
      lightboxSetter();
      initialSetup();
    }


    function initialSetup(){
      let sublightBox = document.getElementById(x);
      lightBox.style.visibility = "visible";
      sublightBox.style.visibility = "visible";
      sublightBox.style.opacity = "1";
      sublightBox.style.transition = "all .2s";

      lightBox.style.transform = "scale(1)";
      lightBox.style.transition = "transform 1s";
      document.body.classList.add("stop-scrolling");
    }

    function lightboxSetter(){

      if (i == 0) {
        prev.style.visibility = "hidden";
      } else if ( i > 0 ) {
        prev.style.visibility = "visible";
        prev.setAttribute("onclick", `photoclick(${i}, event)`);
      }
      if (id == photos.length) {
        next.style.visibility = "hidden";
      } else if ( id < photos.length) {
        next.style.visibility = "visible";
        next.setAttribute("onclick", `photoclick(${q}, event)`);
      }
    }
}


  function closeBox() {
    let light = document.getElementById("lightbox-container");
    let lightContent = document.getElementById("lightbox-content");
    let grid = document.getElementById("grid-container");
    light.style.transform = "scale(.01)";
    light.style.transition = "transform .4s";
    setTimeout(function(){light.style.visibility = "hidden";
    lightContent.style.visibility = "hidden";}, 300);
    while (lightContent.hasChildNodes()){
      lightContent.removeChild(lightContent.firstChild);
    }
    grid.style.visibility = "visible";
    grid.style.transform = "scale(1)";
    grid.style.transition = "transform .4s";
    document.body.classList.remove("stop-scrolling");
  }

  function createResultbox(){
    let searbox = document.createElement("div");
    let grid = document.getElementById("grid-container");
    searbox.setAttribute("id", "result");
    grid.parentNode.insertBefore(searbox, grid);
  }

function searcher(){
  let searchtext = search.value.toLowerCase();
  let searchfield = photoCapt;
  let lightbox = document.getElementById("grid-container");
  let resultbox = document.getElementById("result");

  let hide = [];
  let show = [];
  if ( searchtext != '' ) {
    lightbox.style.visibility = 'hidden';
    if (document.getElementById("gallery").contains(document.getElementById("result"))) {
      document.getElementById("result").remove();
    }

    while (show.length > 0) {
      show.shift();
    }
    for (let i = 0; i < searchfield.length; i++) {
      let x = i + 1;
      let y = `.pic-${x}`;
      let z = searchfield[i].toLowerCase();
      let result = z.search(searchtext);
      if (result === -1) {

        if (show.indexOf(y) != -1) {
          show.pop(y)
        }
        hide.push(y);
      } else {
        if (hide.indexOf(y) != -1) {
          hide.pop(y)
        }
        show.push(y)
      }
    }
    if (show.length > 0) {
      createResultbox();
      let resultbox = document.getElementById('result');
      lightbox.style.visibility = "hidden"

      let i = 0;
      while (i < show.length) {
        y = show[i];
        let clnitm = document.querySelector(y);
        let cln = clnitm.cloneNode(true);
        resultbox.appendChild(cln);
        i += 1;
      }
    } else {
      createResultbox();
      document.getElementById("result").innerHTML = "<h3 style='margin: auto, color:red'>No Result Found</h3>";
    }
  } else {
    if (document.getElementById("gallery").contains(document.getElementById("result"))) {
      document.getElementById("result").remove();
    }
    lightbox.style.visibility = "visible";
  }
}
