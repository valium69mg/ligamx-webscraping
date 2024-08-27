import searchData from './searchData.js';
import { saveData , retrieveData, checkTableDate,checkIfUpdateNeeded } from './postgresDriver.js';
import analyzeSeason from './analyzeSeason.js';

//========================== LA LIGA =========================================//

// FC BARCELONA
let barcelonaXpathPrefix = '//*[@id="stats_standard_12"]/tbody/';
let barcelonaXpathPrefix2122 = '//*[@id="stats_standard_8"]/tbody/';
// rows on website (23 players)
const barcelonaPlayersCount = 23;
// 24-25 season stats link
const barcelonaUrl = "https://fbref.com/es/equipos/206d90db/Estadisticas-de-Barcelona";
// 23-24 season stats link
const barcelonaUrl2324 = "https://fbref.com/es/equipos/206d90db/2023-2024/c12/Estadisticas-de-Barcelona-La-Liga";
// 22-23 season stats link
const barcelonaUrl2223 = "https://fbref.com/es/equipos/206d90db/2022-2023/c12/Estadisticas-de-Barcelona-La-Liga";
// 21-22 season stats link
const barcelonaUrl2122 = "https://fbref.com/en/squads/206d90db/2021-2022/s11323/Barcelona-Stats";
//=============================== LIGA MX ====================================//

// CRUZ AZUL
let xpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
// rows on website (26 players)
const cruzAzulPlayersCount = 26;
// 23-24 season stats link
const cruzAzulUrl2324 = "https://fbref.com/es/equipos/632f1838/2023-2024/Estadisticas-de-Cruz-Azul";
// 24-25 season stats link
const cruzAzulUrl = "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul";
// CHIVAS
const chivasUrl = "https://fbref.com/es/equipos/c02b0f7a/Estadisticas-de-Guadalajara";
const chivasXpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
const chivasPlayerCount = 25;
// AMERICA
const americaUrl = "https://fbref.com/es/equipos/18d3c3a3/Estadisticas-de-America";
const americaXpath = '//*[@id="stats_standard_31"]/tbody/';
const americaPlayerCount = 28;
// PUMAS 
const pumasUrl = "https://fbref.com/es/equipos/c9d59c6c/Estadisticas-de-Pumas-UNAM";
const pumasXpath = '//*[@id="stats_standard_31"]/tbody/';
const pumasPlayerCount = 25;
// TOLUCA
const tolucaUrl = "https://fbref.com/es/equipos/44b88a4e/Estadisticas-de-Toluca";
const tolucaXpath  = '//*[@id="stats_standard_31"]/tbody/';
const tolucaPlayerCount = 25;
// TIGRES
const tigresUrl = "https://fbref.com/es/equipos/d9e1bd51/Estadisticas-de-UANL";
const tigresXpath = '//*[@id="stats_standard_31"]/tbody/';
const tigresPlayerCount = 23;
// MONTERREY
const monterreyUrl = "https://fbref.com/es/equipos/dd5ca9bd/Estadisticas-de-Monterrey";
const monterreyXpath ='//*[@id="stats_standard_31"]/tbody/';
const monterreyPlayerCount = 21;
// ATLAS
const atlasUrl = "https://fbref.com/es/equipos/7c76bc53/Estadisticas-de-Atlas";
const atlasXpath = '//*[@id="stats_standard_31"]/tbody/';
const atlasPlayerCount = 20;
// PACHUCA
const pachucaUrl = "https://fbref.com/es/equipos/1be8d2e3/Estadisticas-de-Pachuca";
const ligamxXpath = '//*[@id="stats_standard_31"]/tbody/';
const ligamxPlayerCount = 20;
// SANTOS LAGUNA
const santosUrl = "https://fbref.com/es/equipos/03b65ba9/Estadisticas-de-Santos-Laguna";
// CLUB TIJUANA
const tijuanaUrl = "https://fbref.com/es/equipos/a42ddf2f/Estadisticas-de-Tijuana";
// LEON
// NECAXA
// PUEBLA
// MAZATLAN
// JUAREZ
// QUERETARO
// ATL SAN LUIS

//=============================== SEARCH AND SAVE DATA =======================//

async function searchAndSaveData(teamUrl,teamXpath,teamPlayerCount,tableName) {
  // PROGRAM TO SEARCH AND SAVE DATA
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

// TEAM TO SEARCH AND SAVE
let tableName = 'tijuana_stats_24_25';
await searchAndSaveData(tijuanaUrl,ligamxXpath,ligamxPlayerCount,tableName); 

//=============================== ANALYZE  =======================//
//let data = await analyzeSeason('pachuca_stats_24_25');
//console.log(data);