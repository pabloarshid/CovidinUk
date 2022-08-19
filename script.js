
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
    // document.getElementById("date").innerHTML=record.data.date;
    // document.getElementById("newCasesByPublishDate").innerHTML=record.data.newCases;

}

chrome.storage.sync.get("areaName", (data) => {
  fetchData(data.areaName);
});
