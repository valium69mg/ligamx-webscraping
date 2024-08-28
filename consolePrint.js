
// funcions: Logs

// description: logs used on the index functions of analysis of leagues.
// Separated them into another file for cleaner looking code.

function printSearchAndSaveLog() {
    console.log("\n");
    console.log(`============== SEARCH AND SAVE DATA =================`);
};

function printTeamAnalysisLog() {
    console.log("\n");
    console.log(`================ TEAM ANALYSIS ======================`);
}

function printTableNameLog(tableName) {
    console.log("\n");
    console.log(`============== ${tableName} ==========`);
};

function printLeagueAnalysisLog() {
    console.log("\n");
    console.log(`=============== LEAGUE ANALYSIS =====================`)
}

export {printSearchAndSaveLog,printTeamAnalysisLog,printTableNameLog,printLeagueAnalysisLog}