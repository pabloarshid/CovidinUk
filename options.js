let page = document.getElementById("buttonDiv");
const presetAreas = ["england", "northern ireland", "scotland", "wales"];
let selectedClassName = "current";


// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let areaName = event.target.dataset.area;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ areaName });
}

function constructOptions(areaNames) {
  chrome.storage.sync.get("areaName", (data) =>{
    let currentarea = data.areaName;
    for (let areanames1 of areaNames){
      let button = document.createElement("button")
      button.dataset.area = areanames1
      button.innerText = areanames1
      // …mark the currently selected color…
      if (areanames1 === currentarea) {
        button.classList.add(selectedClassName);
      }
      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

constructOptions(presetAreas);
