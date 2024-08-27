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


function printTeamAnalysis(data) {
  console.log("Max Goals: " + data.maxGoals.amount + " => " + data.maxGoals.name);
  console.log("Max Assists: " + data.maxAssists.amount + " => " + data.maxAssists.name);
  console.log("Max G/A: " + data.maxGoalsAndAssists.amount + " => " + data.maxGoalsAndAssists.name);
  console.log("Max Progressive Carries: " + data.maxProgressionCarries.amount + " => " + data.maxProgressionCarries.name);
  console.log("Max Progressive Pass: " + data.maxProgressionPass.amount + " => " + data.maxProgressionPass.name);
  console.log("Max Progressive Pass Rec: " + data.maxProgressionReceived.amount + " => " + data.maxProgressionReceived.name);
  console.log("Max Time Played: " + data.maxTimePlayed.amount + " => " + data.maxTimePlayed.name);
  console.log("Max Yellow Cards: " + data.maxYellowCards.amount + " => " + data.maxYellowCards.name);
  console.log("Max Red Cards: " + data.maxRedCards.amount + " => " + data.maxRedCards.name);
}

function maxLeagueAnalysis(league) {
  // ANALYZE LEAGUE 
  let maxGoals = 0;
  let maxAssists = 0;
  let maxGoalsAndAssists = 0;
  let maxProgressionCarries = 0;
  let maxProgressionPass = 0;
  let maxProgressionReceived = 0;
  let maxTimePlayed = 0;
  let maxYellowCards = 0;
  let maxRedCards = 0;
  for (let i = 0; i < league.length; i++) {
    let currentTeam = league[i];
    // GOALS
    if (currentTeam.maxGoals.amount > maxGoals) {
      maxGoals = currentTeam.maxGoals.amount;
    }
    // ASSISTS
    if (currentTeam.maxAssists.amount > maxAssists) {
      maxAssists = currentTeam.maxAssists.amount;
    }
    // G/A
    if (currentTeam.maxGoalsAndAssists.amount > maxGoalsAndAssists) {
      maxGoalsAndAssists = currentTeam.maxGoalsAndAssists.amount;
    }
    // Max progression carries
    if (currentTeam.maxProgressionCarries.amount > maxProgressionCarries) {
      maxProgressionCarries = currentTeam.maxProgressionCarries.amount;
    }
    // Max progression pass
    if (currentTeam.maxProgressionPass.amount > maxProgressionPass) {
      maxProgressionPass = currentTeam.maxProgressionPass.amount;
    }
    // Max progression pass received
    if (currentTeam.maxProgressionReceived.amount > maxProgressionReceived) {
      maxProgressionReceived = currentTeam.maxProgressionReceived.amount;
    }
    // Time played
    if (currentTeam.maxTimePlayed.amount > maxTimePlayed) {
      maxTimePlayed = currentTeam.maxTimePlayed.amount;
    }
    // Yellow Card
    if (currentTeam.maxYellowCards.amount > maxYellowCards) {
      maxYellowCards = currentTeam.maxYellowCards.amount;
    }
    // Red Card
    if (currentTeam.maxRedCards.amount > maxRedCards) {
      maxRedCards = currentTeam.maxYellowCards.amount;
    }
  }
  // RETURN DICT WITH LEAGUE MAXES
  return  {
    maxGoals: maxGoals,
    maxAssists: maxAssists,
    maxGoalsAndAssists: maxGoalsAndAssists,
    maxProgressionCarries: maxProgressionCarries,
    maxProgressionPass: maxProgressionPass,
    maxProgressionReceived: maxProgressionReceived,
    maxYellowCards: maxYellowCards,
    maxRedCards: maxRedCards,
  }

};

function getBestOfTheSeasonStats(analyzedSeason,seasonStats) {
  let bestOfTheSeason = {
    maxGoals: [],
    maxAssists:[],
    maxGoalsAndAssists: [],
    maxProgressionCarries: [],
    maxProgressionPass: [],
    maxProgressionReceived: [],
    maxYellowCards: [],
    maxRedCards: [],
  }
  for (let i = 0; i < analyzedSeason.length; i++) {
    let currentTeam = analyzedSeason[i];
    // GOALS
    if (currentTeam.maxGoals.amount == seasonStats.maxGoals) {
      bestOfTheSeason.maxGoals.push(currentTeam.maxGoals);
    }
    // ASSISTS
    if (currentTeam.maxAssists.amount == seasonStats.maxAssists) {
      bestOfTheSeason.maxAssists.push(currentTeam.maxAssists);
    }
    // G/A
    if (currentTeam.maxGoalsAndAssists.amount == seasonStats.maxGoalsAndAssists) {
      bestOfTheSeason.maxGoalsAndAssists.push(currentTeam.maxGoalsAndAssists);
    }
    // Max progression carries
    if (currentTeam.maxProgressionCarries.amount == seasonStats.maxProgressionCarries) {
      bestOfTheSeason.maxProgressionCarries.push(currentTeam.maxProgressionCarries);
    }
    // Max progression pass
    if (currentTeam.maxProgressionPass.amount == seasonStats.maxProgressionPass) {
      bestOfTheSeason.maxProgressionPass.push(currentTeam.maxProgressionPass);
  
    }
    // Max progression pass received
    if (currentTeam.maxProgressionReceived.amount == seasonStats.maxProgressionReceived) {
      bestOfTheSeason.maxProgressionReceived.push(currentTeam.maxProgressionReceived);
    }
    // Time played
    if (currentTeam.maxTimePlayed.amount == seasonStats.maxTimePlayed) {
      bestOfTheSeason.maxTimePlayed.push(currentTeam.maxTimePlayed);
    }
    // Yellow Card
    if (currentTeam.maxYellowCards.amount == seasonStats.maxYellowCards) {
      bestOfTheSeason.maxYellowCards.push(currentTeam.maxYellowCards);
    }
    // Red Card
    if (currentTeam.maxRedCards.amount == seasonStats.maxRedCards) {
      bestOfTheSeason.maxRedCards.push(currentTeam.maxRedCards);
    }
  }
  return bestOfTheSeason;
}


export {printTeamAnalysis,maxLeagueAnalysis,getBestOfTheSeasonStats}