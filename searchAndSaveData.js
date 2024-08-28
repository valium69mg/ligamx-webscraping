import searchData from './searchData.js';
import { checkTableDate ,checkIfUpdateNeeded,saveData  } from './postgresDriver.js';
import {printTableNameLog} from './consolePrint.js';

// function: searchAndSaveData

// description: this function takes four parameters

// teamUrl => this is the URL from the FBREF website provided in the lists of index.js of each
// team
// teamXpath => each league has an specific xpath that uses, it is also on index.js variables
// for each team
// teamPlayerCount => amount of players records that we want to save
// tableName => the table's name on the database, also in the list of index.js for each team

// the goal of this function is to search and update the data on the database if needed.
// the function first checks if the table exists, if there is no table with that name
// it begins the process to create it by searching the web and then saving the data, if the
// table is found on the registry, it checks if it needs updating, if it does it updates it,
// if the table is up to date then if just returns with nothing.

export default async function searchAndSaveData(teamUrl,teamXpath,teamPlayerCount,tableName) {
    // PROGRAM TO SEARCH AND SAVE DATA
    printTableNameLog(tableName);
    let updated_at = await checkTableDate(tableName);
    if (updated_at === null) { // THERE IS NOT A TABLE WITH THAT NAME
      console.log("Table not found, searching info...");
      let searchedData = [];
      searchedData = await searchData(teamUrl,teamXpath,teamPlayerCount); // SEARCH DATA
      console.log("Data gathered from the web.");
      if (searchedData != null && searchedData != []) { // IF SEARCH WAS SUCCESFUL
        await saveData(searchedData, tableName); // returns true or false
        return;
      } 
      console.log(`Data not saved for ${tableName}`);
      return;
    } 
    // IF TABLE IS FOUND
    console.log("Table found, analyzing if info is up to date...");
    console.log("Info is from: " + updated_at);
    let checkIfUpdate = checkIfUpdateNeeded(updated_at);
    if (checkIfUpdate == true) { // UPDATE NEEDED
      console.log("Table found is not up to date, procceding to updating the info");
      let searchedData = await searchData(teamUrl,teamXpath,teamPlayerCount);
      if (searchData != []) { // IF SEARCH WAS SUCCESFUL
        await saveData(searchedData, tableName); // returns true or false
        return;
      }
    }
  };
  