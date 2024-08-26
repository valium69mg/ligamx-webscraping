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


// PROGRAM TO SEARCH AND SAVE DATA
// let data = await searchData(cruzAzulUrl2324,cruzAzulPlayersCount,xpathPrefix);
// await saveData(data, 'cruz_azul_stats_23_24');

// ANALYZE DATA 
// ANALYZE 1 SEASON OF A TEAM
// MOST GOALS, MOST ASSISTS, MOST G/A, MOST Progression, Most Time Played, Most Cards

// tableName = fc_barcelona_stats_24_25

async function analyzeSeason(tableName) {

  let results = await retrieveData(tableName);
  // loop through results
  let maxGoals = 0;
  let maxGoalsName;
  let maxAssists = 0;
  let maxAssistsName;
  let maxGoalsAndAssists = 0;
  let maxGoalsAndAssistsName;
  let maxProgressions = 0;
  let maxProgressionsName;
  let maxTimePlayed = 0;
  let maxTimePlayedName;
  let maxCards = 0;
  let maxCardsName;
  for (let i = 0; i < results.length; i++) {
      let player = results[i];
      let goalsAndAssist = 0;
      let progressions = 0;
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
      if (player['number_of_progressive_carrying'] !== '') {
        progressions += parseInt(player['number_of_progressive_carrying']);
      }
      if (player['number_of_progressive_pass'] !== '') {
        progressions += parseInt(player['number_of_progressive_pass']);
      }
      if (player['number_of_progressive_pass_received'] !== '') {
        progressions += parseInt(player['number_of_progressive_pass_received']);
      }
      if (progressions > maxProgressions) {
        maxProgressions = progressions;
        maxProgressionsName = player['name'];
      }
      // CARDS
      if (player['number_of_yellow_cards'] !== '') {
        cards += parseInt(player['number_of_yellow_cards']);
      }
      if (player['number_of_red_cards'] !== '') {
        cards += parseInt(player['number_of_red_cards']);
      }
      if (cards > maxCards) {
        maxCards = cards;
        maxCardsName = player['name'];
      }
  }
  
  let analyzedData = {
    maxGoals: {amount: maxGoals, name: maxGoalsName},
    maxAssists: {amount: maxAssists,name: maxAssistsName},
    maxGoalsAndAssists: {amount: maxGoalsAndAssists,name: maxGoalsAndAssistsName},
    maxProgressions: {amount: maxProgressions, name: maxProgressionsName},
    maxTimePlayed: {amount: maxTimePlayed, name: maxTimePlayedName},
    maxCards: {amount: maxCards, name: maxCardsName},
  };
  
  console.log(analyzedData);
};

