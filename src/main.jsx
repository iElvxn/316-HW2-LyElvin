import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import App from './App.jsx'

// THIS FUNCTION TESTS TO SEE IF THIS APP HAS
// DATA IN LOCAL STORAGE. IF IT DOES, TRUE IS
// RETURNED, ELSE FALSE 
function isInLocalStorage() {
  return localStorage.getItem("playlister-data") != null;
}

function loadListsFromJSON(jsonFilePath) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let text = this.responseText;
      let lists = JSON.parse(text).playlists;

      // GO THROUGH THE LISTS AND SAVE EACH USING THEIR KEY
      for (let i = 0; i < lists.length; i++) {
        let listData = lists[i];
        let listString = JSON.stringify(listData);
        localStorage.setItem("playlister-list-" + listData.key, listString);
      }

      // THIS IS OUR SESSION DATA THAT WE'LL NEED TO
      // HELP US DEAL WITH THE LISTS
      localStorage.setItem("playlister-data", JSON.stringify(
        {
          "nextKey" : 3,
          "counter" : 3,
          "keyNamePairs" : [
            {"key": "0", "name": "Spacey"},
            {"key": "1", "name": "Any Colour You Like"}, 
            {"key": "2", "name": "Don't be Rude"}
          ]
        }));
      launch();
    }
  }
  xmlhttp.open("GET", jsonFilePath, true);
  xmlhttp.send();
}

function launch() {
  // IF NO DATA IS IN LOCAL STORAGE THEN LOAD ALL THE TEST
  // DATA FROM THE JSON FILE AND PUT IT THERE
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

if (!isInLocalStorage()) {
  loadListsFromJSON("./data/default_lists.json");
}
else {
  launch();
}