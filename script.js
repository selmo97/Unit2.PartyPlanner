const body = document.querySelector("body");

const cohortCode = "2503-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortCode}`;
const appContainer = document.getElementById("app"); // Get #app container

//state

let state = {
  parties: [], //array of party objects
  selectedParty: null
};

/* 
Define function to render parties
    a. use forEach to loop through the data
    b. create a list element for each element in the array
    c. append the list item to the appContainer

*/
const renderParties = () => {
  try {
    appContainer.innerHTML = ""; // clear previous content

    state.parties.forEach((party) => {
      const partyElement = document.createElement("div");
      partyElement.classList.add("party");
      partyElement.textContent = party.name;
      partyElement.addEventListener("click", () => {
        fetchSingleParty(party.id);
      });

      appContainer.appendChild(partyElement);
    });
  } catch (err) {
    console.error("Error rendering parties:", err);
  }
};

const renderSelectedParty = () => {
    appContainer.innerHTML = "";

    if (!state.selectedParty) {
        appContainer.textContent = "Please select a party..";
        return;
    }

    const party = state.selectedParty;

    const detailDiv = document.createElement("div");
    detailDiv.innerHTML = `
        <h2>${party.name}</h2>
        <p>ID: ${party.id}</p>
        <p>Date: ${party.date}</p>
        <p>Location: ${party.location}</p>
        <p>Description: ${party.description}</p>
        <button id="backToList">Back to All Parties</button>
    `;

    appContainer.appendChild(detailDiv);

    document.getElementById("backToList").addEventListener("click", () => {
        renderParties();
    });
};

// Fetch and render
const fetchAllParties = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();
    console.log(data);
    state.parties = data.data;
  } catch (err) {
    console.error("Uh oh, trouble fetching events!", err);
  }
};

const fetchSingleParty = async (partyId) => {
    try {
        
        const response = await fetch(`${API_URL}/events/${partyId}`);
        const { data } = await response.json();
        state.selectedParty = data;
        renderSelectedParty(); // render detailed view 
    } catch (err) {
        console.error('Error fetching single party:', err);
    }
};

const init = async () => {
  await fetchAllParties(); //fetch and store using state
  renderParties(); // render the events to the DOM

};

init();
