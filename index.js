import searchData from './searchData.js';
import { saveData , retrieveData } from './postgresDriver.js';

// CRUZ AZUL
let xpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
// rows on website (26 players)
const cruzAzulPlayersCount = 26;
// 23-24 season stats link
const cruzAzulUrl2324 = "https://fbref.com/es/equipos/632f1838/2023-2024/Estadisticas-de-Cruz-Azul";
// 24-25 season stats link
const cruzAzulUrl = "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul";

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

// CHIVAS
const chivasUrl = "https://fbref.com/es/equipos/c02b0f7a/Estadisticas-de-Guadalajara";
const chivasXpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
const chivasPlayerCount = 25;

// AMERICA
const americaUrl = "https://fbref.com/es/equipos/18d3c3a3/Estadisticas-de-America";
const americaXpath = '//*[@id="stats_standard_31"]/tbody/';
const americaPlayerCount = 28;
// PROGRAM TO SEARCH AND SAVE DATA
//let data = await searchData(americaUrl,americaPlayerCount,americaXpath);
// await saveData(data, 'america_stats_24_25');

// ANALYZE DATA 
// ANALYZE 1 SEASON OF A TEAM
// MOST GOALS, MOST ASSISTS, MOST G/A, MOST Progression, Most Time Played, Most Cards

// tableName = fc_barcelona_stats_24_25

async function analyzeSeason(tableName) {

  let results = await retrieveData(tableName);
  // loop through results
  // goals, assists and g/a
  let maxGoals = 0;
  let maxGoalsName;
  let maxAssists = 0;
  let maxAssistsName;
  let maxGoalsAndAssists = 0;
  let maxGoalsAndAssistsName;
  // progressions
  let maxProgressionCarries = 0;
  let maxProgressionsCarriesName;
  let maxProgressionPass = 0;
  let maxProgressionPassName;
  let maxProgressionReceived = 0;
  let maxProgressionReceivedName;
  // time played
  let maxTimePlayed = 0;
  let maxTimePlayedName;
  // cards
  let maxYellowCards = 0;
  let maxYellowCardsName;
  let maxRedCards = 0;
  let maxRedCardsName;
  for (let i = 0; i < results.length; i++) {
      let player = results[i];
      let goalsAndAssist = 0;
      let cards = 0;
      // GOALS
      if (player['number_of_goals'] !== '' && parseInt(player['number_of_goals']) > maxGoals) {
        maxGoals = parseInt(player['number_of_goals']); 
        maxGoalsName = player['name'];
        goalsAndAssist += parseInt(player['number_of_goals']);
      }
      // ASSISTS
      if (player['number_of_assist'] !== '' && parseInt(player['number_of_assist']) > maxAssists) {
        maxAssists = parseInt(player['number_of_assist']); 
        maxAssistsName = player['name'];
        goalsAndAssist += parseInt(player['number_of_assist']);
      }
      // G/A
      if (goalsAndAssist > maxGoalsAndAssists) {
        maxGoalsAndAssists = goalsAndAssist;
        maxGoalsAndAssistsName = player['name'];
      }
      // MINUTES PLAYED
      if (player['number_of_minutes_played'] !== '' && parseInt(player['number_of_minutes_played']) > maxTimePlayed) {
        maxTimePlayed = parseInt(player['number_of_minutes_played']);
        maxTimePlayedName = player['name'];
      }
      // PROGRESSIONS
      if (player['number_of_progressive_carrying'] !== '' && parseInt(player['number_of_progressive_carrying']) > maxProgressionCarries) {
        maxProgressionCarries = parseInt(player['number_of_progressive_carrying']);
        maxProgressionsCarriesName = player['name'];
      }
      if (player['number_of_progressive_pass'] !== '' && parseInt(player['number_of_progressive_pass']) > maxProgressionPass) {
        maxProgressionPass = parseInt(player['number_of_progressive_pass']);
        maxProgressionPassName = player['name'];
      }
      if (player['number_of_progressive_pass_received'] !== '' && parseInt(player['number_of_progressive_pass_received']) > maxProgressionReceived) {
        maxProgressionReceived = parseInt(player['number_of_progressive_pass_received']);
        maxProgressionReceivedName = player['name'];
      }
      // CARDS
      if (player['number_of_yellow_cards'] !== '' && parseInt(player['number_of_yellow_cards']) > maxYellowCards) {
        maxYellowCards = parseInt(player['number_of_yellow_cards']);
        maxYellowCardsName = player['name'];
      }
      if (player['number_of_red_cards'] !== '' && parseInt(player['number_of_red_cards']) > maxRedCards) {
        maxRedCards = parseInt(player['number_of_red_cards']);
        maxRedCardsName = player['name']; 
      }
  }
  
  let analyzedData = {
    maxGoals: {amount: maxGoals, name: maxGoalsName},
    maxAssists: {amount: maxAssists,name: maxAssistsName},
    maxGoalsAndAssists: {amount: maxGoalsAndAssists,name: maxGoalsAndAssistsName},
    maxProgressionCarries: {amount: maxProgressionCarries, name: maxProgressionsCarriesName},
    maxProgressionPass: {amount: maxProgressionPass, name: maxProgressionPassName},
    maxProgressionReceived: {amount: maxProgressionReceived, name: maxProgressionReceivedName},
    maxTimePlayed: {amount: maxTimePlayed, name: maxTimePlayedName},
    maxYellowCards: {amount: maxYellowCards, name: maxYellowCardsName},
    maxRedCards: {amount: maxRedCards, name: maxRedCardsName},
  };
  
  return analyzedData;
};

let data = await analyzeSeason('america_stats_24_25');
console.log(data);