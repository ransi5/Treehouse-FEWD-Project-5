
  function galleryCreator() {
    for (let i = 0; i < photos.length; i++) {
      let img = photos[i];
      let imgDesc = photoDesc[i];
      let grid = document.getElementById("grid-container");
      let x = 1 + i;
      grid.innerHTML += `<figure class=\"grid-item pic-${x}\"><img src=\"photos/thumbnails/${img}.jpg\" alt=\"${imgDesc}\"
      onclick=\"photoclick(${x})\"></figure>`;
    };
  }
  // document.getElementById("next").addEventListener('click', (event)=>{
  //   console.log((event.target.id));
  //   document.getElementById('image').style.animation = 'prev 1s';
  //
  // })

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
    let pic = document.querySelector("#lightbox-content img");
    const lightBox = document.getElementById("lightbox-container");
    let x = `item-${id}`;


    if (document.getElementById('image') != null) {
      console.log(document.getElementById('image') != null)
      document.getElementById('image').className = '';
      document.getElementById('image').className = 'next';
    }
    setTimeout(function(){
      while (lightbox.hasChildNodes()) {
          lightbox.removeChild(lightbox.firstChild);
      }
      gridscale();
    }, 200)
    setTimeout(function(){

      lightbox.innerHTML += `<figure id=\"item-${id}\" class=\"light-item\"><img id="image" src=\"photos/${img}.jpg\" alt=\"${imgDesc}\" class="prev"><figcaption>${imgCapt}</figcaption></figure>`;
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
        next.setAttribute("onclick", `photoclick(${q})`);
      }
      let sublightBox = document.getElementById(x);
      lightBox.style.visibility = "visible";
      sublightBox.style.visibility = "visible";
      sublightBox.style.opacity = "1";
      sublightBox.style.transition = "all .2s";
    },200);

    lightBox.style.transform = "scale(1)";
    lightBox.style.transition = "transform 1s";
    document.body.classList.add("stop-scrolling");
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

function searcher(){
  let searchtext = search.value.toLowerCase();
  let searchfield = photoDesc;
  let lightbox = document.getElementById("grid-container");
  let resultbox = document.getElementById("result");

  let hide = [];
  let show = [];
  if ( searchtext != '' ) {
    if (document.getElementById("gallery").contains(document.getElementById("result"))) {
      document.getElementById("result").remove();
      lightbox.style.visibility = "visible";
    }

    while (show.length > 0) {
      show.shift();
    }
    for (let i = 0; i < searchfield.length; i++) {
      let x = i + 1;
      let y = `.pic-${x}`;
      let z = searchfield[i].toLowerCase();
      let result = z.search(searchtext);
      if (result == -1) {
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
      let searbox = document.createElement("div");
      let grid = document.getElementById("grid-container");
      searbox.setAttribute("id", "result");
      grid.parentNode.insertBefore(searbox, grid);
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
    }
  } else {
    if (document.getElementById("gallery").contains(document.getElementById("result"))) {
      document.getElementById("result").remove();
    }
    lightbox.style.visibility = "visible";
  }
}
