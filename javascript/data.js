import { contact, posts } from "./constant.js";
import { handleClickButton, handleSubmit } from "./form.js";
function getRandomPosts(posts, numberOfPosts) {
  if (posts.length <= numberOfPosts) {
    return posts; // Nếu số bài viết <= số bài cần lấy, trả về tất cả bài viết
  }

  let randomPosts = [];
  let usedIndices = new Set();

  while (randomPosts.length < numberOfPosts) {
    let randomIndex = Math.floor(Math.random() * posts.length);
    if (!usedIndices.has(randomIndex)) {
      randomPosts.push(posts[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomPosts;
}

function displayPosts(posts) {
  const postsContainer = document.querySelector(".blogs");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("li");
    postElement.className = "";
    postElement.innerHTML = `<article><figure><img src="${
      post.img || ""
    }" alt="${
      post.title
    }" loading="lazy" /></figure><h3 ><a target="_blank" href="${post.link}">${
      post.title
    }</a></h3></article>`;
    postsContainer.appendChild(postElement);
  });
}

async function main() {
  const randomPosts = getRandomPosts(posts, 10);
  displayPosts(randomPosts);
}

function addContact(contact) {
  const email = `mailto:${contact.email}`;
  const phoneLink = `tel:${contact.numberphone}`;
  const zaloLink = `https://zalo.me/${contact.numberphone.replace(/\s+/g, "")}`;

  // Chọn tất cả các phần tử có class "phone" và "zalo"
  const phoneElements = document.querySelectorAll(".phone");
  const zaloElements = document.querySelectorAll(".zalo");
  const emailElements = document.querySelectorAll(".email");
  const addressElements = document.querySelectorAll(".address");
  const nameElements = document.querySelectorAll(".name");
  const titleElements = document.querySelectorAll(".nametitle");
  const sitenameElements = document.querySelectorAll(".sitename");
  const bookingElements = document.querySelectorAll(".booking__submit");
  // Lặp qua các phần tử và gán thuộc tính href
  phoneElements.forEach((element) => {
    element.setAttribute("href", phoneLink);
    if (element.textContent == "") {
      element.textContent = contact.numberphone;
    }
    if (element.getAttribute("data-name") == "phone") {
      element.insertAdjacentHTML("beforeend", contact.numberphone);
    }
    element.addEventListener("click", () => {
      handleClickButton(element.getAttribute("href"));
      if(!!contact.gID){
          gtag_report_conversion();
      }
    });
  });

  zaloElements.forEach((element) => {
    element.setAttribute("href", zaloLink);
    element.addEventListener("click", () => {
      handleClickButton(element.getAttribute("href"));
      if(!!contact.gID){
          gtag_report_conversion();
      }
    });
  });
  emailElements.forEach((element) => {
    element.setAttribute("href", email);
    element.textContent = contact.email;
  });
  addressElements.forEach((element) => {
    element.textContent = contact.address;
  });
  nameElements.forEach((element) => {
    element.textContent = contact.name;
  });
  titleElements.forEach((element) => {
    element.textContent = contact.nameTitle;
  });
  sitenameElements.forEach((element) => {
    element.textContent = contact.website;
  });
  bookingElements.forEach((element) => {
    element.addEventListener("click", () => {
      handleSubmit();
      if(!!contact.gID){
          gtag_report_conversion();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  addContact(contact);
  main();
});
