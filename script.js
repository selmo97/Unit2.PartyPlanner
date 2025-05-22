const body = document.querySelector("body");

const cohortCode = "2503-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohortCode}`;
const appContainer = document.getElementById("app"); // Get #app container

//state

let state = {
  events: [], //array of event objects
};

/* 
Define function to render events
    a. use forEach to loop through the data
    b. create a list element for each element in the array
    c. append the list item to the appContainer

*/
const renderEvents = () => {
  try {
    appContainer.innerHTML = ""; // clear previous content

    state.events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("event");
      eventElement.textContent = event.name;

      appContainer.appendChild(eventElement);
    });
  } catch (err) {
    console.error("Error rendering events:", err);
  }
};

// Fetch and render
const fetchAllEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();
    console.log(data);
    state.events = data.data;
  } catch (err) {
    console.error("Uh oh, trouble fetching events!", err);
  }
};

const init = async () => {
  await fetchAllEvents(); //fetch and store using state
  renderEvents(); // render the events to the DOM
};

init();
