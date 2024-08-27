import searchData from './searchData.js';
import { checkTableDate ,checkIfUpdateNeeded,saveData  } from './postgresDriver.js';

export default async function searchAndSaveData(teamUrl,teamXpath,teamPlayerCount,tableName) {
    // PROGRAM TO SEARCH AND SAVE DATA
    console.log("\n");
    console.log(`============== ${tableName} ==========`)
    let updated_at = await checkTableDate(tableName);
    if (updated_at === null) { // THERE IS NOT A TABLE WITH THAT NAME
      console.log("Table not found, searching info...");
      let searchedData = await searchData(teamUrl,teamXpath,teamPlayerCount); // SEARCH DATA
      if (searchData != []) { // IF SEARCH WAS SUCCESFUL
        await saveData(searchedData, tableName); // returns true or false
        }
    } else { // IF TABLE IS FOUND
      console.log("Table found, analyzing if info is up to date...");
      console.log("Info is from: " + updated_at);
      let checkIfUpdate = checkIfUpdateNeeded(updated_at);
      if (checkIfUpdate == true) { // UPDATE NEEDED
        console.log("Table found is not up to date, procceding to updating the info");
        let searchedData = await searchData(teamUrl,teamXpath,teamPlayerCount);
        if (searchData != []) { // IF SEARCH WAS SUCCESFUL
          await saveData(searchedData, tableName); // returns true or false
        }
      }
      
    }
  };
  