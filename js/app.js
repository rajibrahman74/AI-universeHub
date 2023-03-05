// Load card data

const loadCardsData = async (dataLimit) => {
  // loader start
  toggleLoader(true);

  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayCardData(data.data.tools, dataLimit);

  // loader stop
  toggleLoader(false);
};





// Display all cards in UI

const displayCardData = (cards, dataLimit) => {

  // display all cards
  const cardsContainer = document.getElementById("cards-container");

  // display dataLimit number of cards by default
  const seeMore = document.getElementById("see-more");
  if (cards.length > dataLimit) {
    cards = cards.slice(0, dataLimit);
    seeMore.classList.remove("d-none");
  } else {
    seeMore.classList.add("d-none");
  }

  // clear the existing cards
  cardsContainer.innerHTML = "";

  // display cards in UI
  cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");

    cardDiv.innerHTML = `
      <div class="card h-100 p-3">
        <img src="${card.image}" class="card-img-top mx-auto rounded-3" alt="">
        <div class="card-body">
          <h3 class="mt-4">features</h3>
          <ol class="inside mt-3">
            <li>${card.features[0] ? card.features[0] : "No Data found"}</li>
            <li>${card.features[1] ? card.features[1] : "No Data found"}</li>
            <li>${card.features[2] ? card.features[2] : "No Data found"}</li>
          </ol>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <div>
            <h3>${card.name}</h3>
            <p><i class="fa-solid fa-calendar-days me-2"></i>${card.published_in}</p>
          </div>
          <button onclick="loadCardDetails('${card.id}')" class="border-0" data-bs-toggle="modal" data-bs-target="#cardDetailModal">
            <i class="fa-solid fa-arrow-right fs-4 text-danger"></i>
          </button>
        </div>
      </div>
    `;
    cardsContainer.appendChild(cardDiv);
  });
};


// see more button add event listener
document.getElementById("see-more-btn").addEventListener("click", function () {

  // set card container children length
  const dataLimit = document.getElementById("cards-container").children.length + 6;

  // pass dataLimit parameter in loadCardData function
  loadCardsData(dataLimit);
});




// sort button add event listener
document.getElementById("sort-btn").addEventListener("click", function() {

  // get current cards than sort by date of birth
  const cards = Array.from(document.getElementById("cards-container").children);
  cards.sort((a, b) => {
    const aDate = new Date(a.querySelector(".fa-calendar-days").nextSibling.textContent);
    const bDate = new Date(b.querySelector(".fa-calendar-days").nextSibling.textContent);
    return aDate - bDate;
  });



  // again add sorted card in the container
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  cards.forEach((card) => cardsContainer.appendChild(card));
});





// load card details

const loadCardDetails = async (id) => {
  // get cardDetails API link

  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json(res);
  displayCardDetails(data.data);
};


// display card details

const displayCardDetails = (dataDetails) => {

  const modalContent = document.getElementById("modal-content-container");

  modalContent.innerHTML = `
  <div class="card-information mw-50 bg-white p-4">
  <h2 class="fs-5">${dataDetails.description}</h2>
  <div class="pricings">
    <div class="pricing pricing-one d-flex flex-column justify-content-center align-items-center">
      <span>${
        dataDetails.pricing[0].price != 0
          ? dataDetails.pricing[0].price
          : "Free of cost"
      }</span>
      <span>${
        dataDetails.pricing[0].plan != 0
          ? dataDetails.pricing[0].plan
          : "No Data found"
      }</span>
    </div>
    <div class="pricing pricing-two  d-flex flex-column justify-content-center align-items-center">
      <span>${
        dataDetails.pricing[1].price != 0
          ? dataDetails.pricing[1].price
          : "Free of cost"
      }</span>
      <span>${
        dataDetails.pricing[1].plan != 0
          ? dataDetails.pricing[1].plan
          : "No Data found"
      }</span>
    </div>
    <div class="pricing pricing-three d-flex flex-column justify-content-center align-items-center text-center">
      <span>${
        dataDetails.pricing[2].price != 0
          ? dataDetails.pricing[2].price
          : "Free of cost"
      }</span>
      <span>${
        dataDetails.pricing[2].plan != 0
          ? dataDetails.pricing[2].plan
          : "No Data found"
      }</span>
    </div>
  </div>
  <div class="d-flex justify-content-around">
    <div>
      <h3>features</h3>
      <ul>
        <li>${
          dataDetails.features[1].feature_name
            ? dataDetails.features[1].feature_name
            : "No Data Found"
        }</li>
        <li>${
          dataDetails.features[2].feature_name
            ? dataDetails.features[2].feature_name
            : "No Data Found"
        }</li>
        <li>${
          dataDetails.features[3].feature_name
            ? dataDetails.features[3].feature_name
            : "No Data Found"
        }</li>
    </ul>
  </div>
  <div>
      <h3>Integrations</h3>
      <ul>
        <li>${
          dataDetails.integrations[0]
            ? dataDetails.integrations[0]
            : "No Data Found"
        }</li>
        <li>${
          dataDetails.integrations[1]
            ? dataDetails.integrations[1]
            : "No Data Found"
        }</li>
        <li>${
          dataDetails.integrations[2]
            ? dataDetails.integrations[2]
            : "No Data Found"
        }</li>
    </ul>
    </div>
  </div>
</div>
<div class="mw-50 px-4 pb-4">
  <span class="d-flex justify-content-end">
      <button class="accurecy-btn fw-bold text-white border-0 me-2">${dataDetails.accuracy.score ? dataDetails.accuracy.score * 100 : "No"}% accurecy</button>
  </span>
  <img class="w-100 rounded-4 mx-auto" src="${
    dataDetails.image_link[0]
  }" alt="">
  <div>
      <h2 class="questions mt-3">${
        dataDetails.input_output_examples[0].input
      }</h2>
      <p class="text-center">${
        dataDetails.input_output_examples[0].output ? dataDetails.input_output_examples[0].output: "No! Not Yet! Take a break!!!"}</p>
  </div>
</div>
  `;
};




// load data initially
loadCardsData(6);