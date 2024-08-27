//=============================== ANALYZE DATA ====================================//
import { retrieveData } from "./postgresDriver.js";
// ANALYZE DATA 
// ANALYZE 1 SEASON OF A TEAM
// MOST GOALS, MOST ASSISTS, MOST G/A, MOST Progression, Most Time Played, Most Cards
// tableName = fc_barcelona_stats_24_25

export default async function analyzeSeason(tableName) {
    // TRY TO CONSULT THE DB FOR THE SPECIFIC TABLE
    let results = [];
    results = await retrieveData(tableName);
    if (results == []) { // DATA COULD NOT BE RETRIEVED
        return results;
    }
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
