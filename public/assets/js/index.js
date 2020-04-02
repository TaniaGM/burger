import API from "/js/api.js";

// Get references to page elements
const burgerListEl = document.getElementById("burger-list");
const devouredBurgerListEl = document.getElementById("devoured-burger-list");
const addBtnEl = document.getElementById("add-button");
const burgerNameEl = document.getElementById("burger-name");

// refreshExamples gets new examples from the db and repopulates the list
const refreshBurgers = function() {
  API.getBurgers().then(function(data) {
    burgerListEl.innerHTML = "";
    devouredBurgerListEl.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      if (!data[i].devoured) {
        const pEl = document.createElement("p");
        pEl.innerHTML = data[i].burger_name;

        const liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.setAttribute("data-id", data[i].id);
        liEl.append(pEl);

        const buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "btn-warning", "devour");
        buttonEl.innerHTML = "devour burger";
        buttonEl.addEventListener("click", handleDevourBtnClick);

        liEl.append(buttonEl);
        burgerListEl.append(liEl);
      } else {
        const pEl = document.createElement("p");
        pEl.innerHTML = data[i].burger_name;

        const liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.setAttribute("data-id", data[i].id);
        liEl.append(pEl);

        const buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "btn-danger", "delete");
        buttonEl.innerHTML = "delete";
        buttonEl.addEventListener("click", handleDeleteBtnClick);

        liEl.append(buttonEl);
        devouredBurgerListEl.append(liEl);
      }
    }
    // const exampleEls = data.map(function(example) {
    //   const aEl = document.createElement("a");
    //   aEl.innerHTML = example.text;
    //   aEl.setAttribute("href", "/example/?id=" + example.id);

    //   const liEl = document.createElement("li");
    //   liEl.classList.add("list-group-item");
    //   liEl.setAttribute("data-id", example.id);
    //   liEl.append(aEl);

    //   const buttonEl = document.createElement("button");
    //   buttonEl.classList.add("btn", "btn-danger", "float-right", "delete");
    //   buttonEl.innerHTML = "ｘ";
    //   buttonEl.addEventListener("click", handleDeleteBtnClick);

    //   liEl.append(buttonEl);

    //   return liEl;
    // });

    // burgerListEl.innerHTML = "";
    // burgerListEl.append(...exampleEls);
  });
};
refreshBurgers();

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = function(event) {
  event.preventDefault();

  const burger = {
    burger_name: burgerNameEl.value.trim()
  };

  if (!burger.burger_name) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveBurger(burger).then(function() {
    refreshBurgers();
  });

  burgerNameEl.value = "";
};

// handleDeleteBtnClick is called when a burger's delete button is clicked
// Remove the burger from the db and refresh the list
const handleDeleteBtnClick = function(event) {
  const idToDelete = event.target.parentElement.getAttribute("data-id");
  API.deleteBurger(idToDelete).then(function() {
    refreshBurgers();
  });
};

// Change the burger's "devoured" value to true and refresh the list
const handleDevourBtnClick = function(event) {
  const idToDelete = event.target.parentElement.getAttribute("data-id");
  API.devourBurger(idToDelete).then(function() {
    refreshBurgers();
  });
};

// Add event listeners to the add button
addBtnEl.addEventListener("click", handleFormSubmit);
// document.querySelectorAll(".delete").forEach(btn => {
//   btn.addEventListener("click", handleDeleteBtnClick);
// });