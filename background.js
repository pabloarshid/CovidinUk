// areaname.js

let areaName = 'england';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ areaName });
  console.log('Default area name set to england', `areaname: ${areaName}`);
});
