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
  {
    previewImage: "https://source.unsplash.com/1HcK5xQoUKQ",
    title:
      "aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk",
  },
  {
    previewImage: "https://source.unsplash.com/3esjG-nlgyk",
    title:
      "abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz",
  },
];

var current = 0;

function appendListToMenu(photoList) {
  const menu = document.querySelector(".photo-menu-wrapper");

  photoList.forEach((photo, index) => {
    menu.appendChild(getMenuItem(photo, index));
  });
}

function getMenuItem(photo, index) {
  const menuitem = document.createElement("div");
  menuitem.classList.add("photo-menu-item");
  menuitem.setAttribute("id", "photo-" + index);

  const thumbnail_image = document.createElement("img");
  thumbnail_image.setAttribute("alt", photo.title);
  thumbnail_image.setAttribute("src", photo.previewImage);

  const title_text = document.createElement("h4");
  title_text.classList.add("add-word-break");
  title_text.innerText = photo.title;

  menuitem.appendChild(thumbnail_image);
  menuitem.appendChild(title_text);

  menuitem.addEventListener("click", (event) => {
    replacePhoto(index, photo);
  });

  return menuitem;
}

function FitTextNodeList() {
  const nodeList = document.querySelectorAll(".photo-menu-item h4");
  nodeList.forEach((node, index) => {
    FitTextNode(node, index);
  });
}

function FitTextNode(node, index) {
  let originalText = photoList[index].title;
  let halfLength = Math.floor(originalText.length / 2);

  node.textContent = "M"; // to mesure maxHeight on oneLine
  let oneLineHeight = node.clientHeight;

  node.textContent = originalText;

  // Binary Search to Fit the content
  let l = 0;
  let r = originalText.length;
  let numOfLines = 3; // Number Of Lines We can afford before truncation

  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    let removeFromLeft = Math.floor(mid / 2);
    let removeFromRight = mid - removeFromLeft;

    let leftText = originalText.slice(0, halfLength - removeFromLeft);
    let rightText = originalText.slice(halfLength + removeFromRight);

    node.textContent = leftText + "..." + rightText;

    if (node.clientHeight > numOfLines * oneLineHeight) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  // if the String is getting ovweFlow then truncate with binary-search Answer;
  if (l !== 0) {
    let removeFromLeft = Math.floor(l / 2);
    let removeFromRight = l - removeFromLeft;

    let leftText = originalText.slice(0, halfLength - removeFromLeft);
    let rightText = originalText.slice(halfLength + removeFromRight);

    node.textContent = leftText + "..." + rightText;
  } else {
    node.textContent = originalText;
  }
}

function replacePhoto(id, photo) {
  const current_photo = document.querySelector("#photo-" + current);
  current_photo.style.backgroundColor = "white";
  current_photo.style.color = "black";

  const menuitem = document.querySelector("#photo-" + id);
  menuitem.style.backgroundColor = "#1c6cfd";
  menuitem.style.color = "white";

  const img = document.querySelector(".photo-preview img");
  const tag = document.querySelector(".photo-caption");

  img.setAttribute("src", photo.previewImage);
  tag.textContent = photo.title;

  current = id;
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown": {
      event.preventDefault();
      let index = (current + 1) % photoList.length;
      replacePhoto(index, photoList[index]);
      break;
    }
    case "ArrowUp": {
      event.preventDefault();
      let index = (current - 1 + photoList.length) % photoList.length;
      replacePhoto(index, photoList[index]);
      break;
    }
  }
});

appendListToMenu(photoList);
document.fonts.ready.then(() => {
  FitTextNodeList();
});
replacePhoto(current, photoList[current]);
window.addEventListener("resize", FitTextNodeList);
