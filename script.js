
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
  chrome.storage.sync.get("areaName", (data) => {
    console.log("clearing table")
	  var Table =document.getElementById("table");
    Table.innerHTML = "";
    fetchData(data.areaName);
  });
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

async function fetchData(areanamed) {
    const res=await fetch ('https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;' + 'areaName=' + areanamed+'&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}');
    const record=await res.json();

    var table = document.getElementById("table");
    for (let item of record.data) {
      row = table.insertRow(-1);
      for (let key in item) {
          var cell = row.insertCell(-1);
          cell.innerHTML = item[key];
      }
    }
}
