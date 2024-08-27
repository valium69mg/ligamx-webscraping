import searchData from './searchData.js';
import { saveData , retrieveData, checkTableDate,checkIfUpdateNeeded } from './postgresDriver.js';
import analyzeSeason from './analyzeSeason.js';

//=============================== LIGA MX ====================================//
const ligamxXpath = '//*[@id="stats_standard_31"]/tbody/';
let ligaMxTeams = [
  {
    tableName: 'cruz_azul_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul", 
  } ,
  {
    tableName: 'chivas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c02b0f7a/Estadisticas-de-Guadalajara",
  }, 
  {
    tableName: 'america_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/18d3c3a3/Estadisticas-de-America",
  },
  {
    tableName: 'pumas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c9d59c6c/Estadisticas-de-Pumas-UNAM",
  },
  {
    tableName: 'toluca_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/44b88a4e/Estadisticas-de-Toluca",
  },
  {
    tableName: 'tigres_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/d9e1bd51/Estadisticas-de-UANL",
  },
  {
    tableName: 'monterrey_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/dd5ca9bd/Estadisticas-de-Monterrey",
  },
  {
    tableName: 'atlas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/7c76bc53/Estadisticas-de-Atlas",
  },
  {
    tableName: 'pachuca_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/1be8d2e3/Estadisticas-de-Pachuca",
  },
  {
    tableName: 'santos_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/03b65ba9/Estadisticas-de-Santos-Laguna",
  },
  {
    tableName: 'tijuana_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/a42ddf2f/Estadisticas-de-Tijuana",
  },
  {
    tableName: 'leon_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/fd7dad55/Estadisticas-de-Leon",
  },
  {
    tableName: 'necaxa_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/752db496/Estadisticas-de-Necaxa",
  },
  {
    tableName: 'puebla_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/73fd2313/Estadisticas-de-Puebla",
  },
  {
    tableName: 'mazatlan_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/f0297c23/Estadisticas-de-Mazatlan",
  },
  {
    tableName: 'juarez_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/29bff345/Estadisticas-de-FC-Juarez",
  },
  {
    tableName: 'queretaro_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c3352ce7/Estadisticas-de-Queretaro",
  },
  {
    tableName: 'sanluis_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/5d274ee4/Estadisticas-de-Atletico",
  },
];

//=============================== SEARCH AND SAVE DATA =======================//

async function searchAndSaveData(teamUrl,teamXpath,teamPlayerCount,tableName) {
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

// SEARCH AND SAVE
for (let i = 0; i < ligaMxTeams.length; i++) {
  let currentTeam = ligaMxTeams[i];
  await searchAndSaveData(currentTeam.teamUrl,ligamxXpath,18,currentTeam.tableName); 
}

// TEAM TO SEARCH AND SAVE
// 
// 

//=============================== ANALYZE  =======================//
//let data = await analyzeSeason('sanluis_stats_24_25');
//console.log(data);