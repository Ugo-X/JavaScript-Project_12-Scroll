// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// setting up our date dynamically.
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
// ********** close links ************

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // so here we do not want to hard code our value for the length of our navbar. we want to be able to calculate it dynamically
  // in order to do this we have a method called getBoundingClientRect() that can help us to calculate the height of an element relative to the viewport.
  // Recall that we decided to wrap our unordered list with the class of links inside a parent container with a class of links-container so that when we now want to use the above method to get the height of the links we can now use our ul

  // also note that we have to add a height of auto the links container on the bigger screen to avoid the links from disappearing or being out of order

  const containerHeight = linksContainer.getBoundingClientRect().height;
  // console.log(containerHeight);

  const linksHeight = links.getBoundingClientRect().height;
  // console.log(linksHeight);
  // The logic
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************

// PageYOffset is a read only window that returns the number of pixels the document had been scrolled vertically
//  The logic here is that we want to say that if the distance scrolled is bigger than our nav bar, then we want to effect some changes to our nav bar such as making it fixed.

const nav = document.getElementById("nav");
const topBtn = document.querySelector(".top-link");
const header = document.getElementById("home");

// so here i said that when the page height is higher than the nav height, we add the fixed-nav class to the nav
// recalll that the way to get the height of any element in the document is to use the  getBoundingClientRect method
window.addEventListener("scroll", function () {
  const pageHeight = window.pageYOffset;
  const navHeight = nav.getBoundingClientRect().height;
  const headerHeight = header.getBoundingClientRect().height;
  linksContainer.style.height = 0;
  // here we are saying that if the number of pixels scrolled vertically is more than the height of the nav bar then we want the nav bar to get some styles
  if (pageHeight > navHeight) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }
  if (pageHeight > headerHeight) {
    topBtn.classList.add("show-link");
  } else {
    topBtn.classList.remove("show-link");
  }
});

// ***********Close the nav bar*********
// here when any of the section links are clicked on, the linksContainer, which is the links container will loose its automatically generated height hereby closing the drop down nav bar

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (btn) {
  btn.addEventListener("click", function (evt) {
    const one = evt.currentTarget;
    linksContainer.style.height = 0;
    evt.preventDefault();
    // so we basically want to get the position of our seections and scroll to them and to do that we do the following
    // 1 get the id reference so we can select it using one of our selector methods eg getElementById
    //offsetTop - A Number, representing the top position of the element, in pixels
    const id = one.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    // selecting our nav
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains("fixed-nav");
    // position
    let position = element.offsetTop - navHeight;

    // conditions
    // if the navbar does not contain the fixed class, we will further subtract the nav height
    if (!fixedNav) {
      position = position - navHeight;
    }
    // if the navbar is greater than 75 then we add also our container height
    if (navHeight > 70) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
  });
});

// ********** smooth scroll ************
// select links
// offset top -- a number representing the top position of an element in pixels
