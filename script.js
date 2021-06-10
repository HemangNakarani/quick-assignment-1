let photoList = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];

var current = 0;

function appendListToMenu(photoList) {
  const menu = document.querySelector(".grid-item.menu");

  photoList.forEach((photo, index) => {
    const menuitem = document.createElement("div");
    menuitem.classList.add("photo-title");
    menuitem.setAttribute("id", "photo-" + index);

    const thumbnail_box = document.createElement("div");
    thumbnail_box.classList.add("thumbnail");

    const thumbnail_image = document.createElement("img");
    thumbnail_image.setAttribute("alt", photo.title);
    thumbnail_image.setAttribute("src", photo.previewImage);

    const image_title = document.createElement("h4");
    image_title.classList.add("add-ellipsis");
    image_title.innerText = photo.title;

    thumbnail_box.appendChild(thumbnail_image);
    menuitem.appendChild(thumbnail_box);
    menuitem.appendChild(image_title);

    menuitem.addEventListener("click", (event) => {
      replacePhoto(index, photo);
    });

    menu.appendChild(menuitem);
  });
}

function replacePhoto(id, photo) {
  const current_photo = document.querySelector("#photo-" + current);
  current_photo.style.backgroundColor = "white";
  current_photo.style.color = "black";

  const menuitem = document.querySelector("#photo-" + id);
  menuitem.style.backgroundColor = "#1c6cfd";
  menuitem.style.color = "white";

  current = id;

  const img = document.querySelector(".photo-preview img");
  const tag = document.querySelector(".photo_caption");

  img.setAttribute("src", photo.previewImage);
  tag.innerText = photo.title;
}

window.addEventListener("keydown", (event) => {
  event.preventDefault();

  switch (event.key) {
    case "ArrowDown": {
      let index = (current + 1) % photoList.length;
      replacePhoto(index, photoList[index]);
      break;
    }
    case "ArrowUp": {
      let index = (current - 1 + photoList.length) % photoList.length;
      replacePhoto(index, photoList[index]);
      break;
    }
  }
});

appendListToMenu(photoList);
replacePhoto(current, photoList[current]);
