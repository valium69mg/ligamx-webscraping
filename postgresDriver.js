import pg from 'pg'
const { Client } = pg;

// database config
const pgConfig = {
    user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
};

// timestamp parse 
pg.types.setTypeParser(1114, function(stringValue) {
    return stringValue;  //1114 for time without timezone type
  });
// date parse
pg.types.setTypeParser(1082, function(stringValue) {
    return stringValue;  //1082 for date type
});

// function: checkIfUpdateNeeded

// description: takes the timestamp as a string of a specific record on a particular table of 
// a team, then it computes if 24 hours have elapsed, if the time has passed it returns true, if
// not it returns false.

// extra: this function is used by searchAndSaveData function when it detects an existing table
// on the database and it needs to know if the table is ready for an update or not.

// INFO WILL UPDATE EVERY 24 HOURS FOR EVERY TEAM
function checkIfUpdateNeeded(updated_at) { // format: 2024-08-27 08:25:16.245305
    let timeZone = ' GMT-6';
    updated_at = updated_at + timeZone;
    let tableDate = Date.parse(updated_at); // Date when the table info was updated
    let nowDate = Date.now();
    // check dates 
    let result = nowDate - tableDate; // milliseconds passed since table was updated
    result = result/1000; // seconds passed since table was updated;
    let dayInSeconds = 86400; // 24 hours into seconds
    if (result > dayInSeconds) {
        console.log("Info needs updating.");
        return true;
    }
    console.log("Info does not need updating.")
    return false;
}

// function: checkTableDate

// description: this function takes a table name as a parameter, and then search for the first
// record and extracts the date that it was updated at as a string (updated_at timestamp 
// at the db).

// extra: this is used by checkIfUpdateNeeded function in order to check if the timestamp of
// the sample record taken is ready for an update.

async function checkTableDate(tableName) {
    const client = new Client(pgConfig);
    try {
        await client.connect();
        let results = await client.query(`SELECT * FROM ${tableName} LIMIT 1`);
        let updated_at = results.rows[0].updated_at;
        return updated_at;
    }catch(e) {
        return null;
    }finally {
        await client.end();
    }
}

// function: saveData

// description: takes 2 parameters, the data extracted by searchData.js main function, and
// the table name that it is used to save or update the data passed.
// The function checks if the table exists, if not it creates it. Then loops around every element
// of the data retrieved by the web scraping, it validates that the value is inserted.
// If the data is saved it returns true, if not it returns false. 

// extra: It is possible that the data array has some faulty elements that the function is not
// able to add, it then breaks the loop to stop adding records, but keeps the records added 
// previously

async function saveData(data,tableName) {
    const client = new Client(pgConfig);
    let result; // bool
    try {  
        // ESTABLISH CONNECTION WITH THE POSTGRES DB
        await client.connect();
        // TABLE CREATION
        await client.query(`CREATE TABLE IF NOT EXISTS ${tableName} ( \
            playerid serial, \
            name varchar(50), \
            post varchar(10), \
            country varchar(10), \
            number_of_matches varchar(10), \
            number_of_starting_matches varchar(10), \
            number_of_minutes_played varchar(10), \
            number_of_goals varchar(10), \
            number_of_assist varchar(10), \
            number_of_yellow_cards varchar(10), \
            number_of_red_cards varchar(10), \
            number_of_progressive_carrying varchar(10), \
            number_of_progressive_pass varchar(10), \
            number_of_progressive_pass_received varchar(10), \
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
            primary key (playerId) \
          );`)
        // DELETE TABLE CONTENTS
        console.log("Replacing previous data...");
        await client.query(`DELETE FROM ${tableName} WHERE 1=1`);
        // LOOP THROUGH DATA AND SAVE IT ON THE TABLE
        for (let i = 0; i < data.length; i++) {
            let player = data[i];
            try {
                await client.query(`INSERT INTO ${tableName} (name,post,country,number_of_matches,number_of_starting_matches,number_of_minutes_played,number_of_goals,number_of_assist,number_of_yellow_cards,number_of_red_cards,number_of_progressive_carrying,number_of_progressive_pass,number_of_progressive_pass_received) \
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
                [player['name'],player['pos'],player['country'],player['numberOfMatches'],player['numberOfStartingMatches'],player['numberOfMinutesPlayed'],player['numberOfGoals'],player['numberOfAssist'],player['numberOfYellowCards'],player['numberOfRedCards'],player['numberOfProgressiveCarrying'],player['numberOfProgressivePasses'],player['numberOfProgressivePassesReceived']]);    
            }catch(e) { // ERROR INSERTING SOME DATA
                console.log(e);
                break; // break the loop no need to add more
            }
        }
        console.log(`${tableName} stats saved on the database.`);
        result = true;
    }catch(e) {
        console.log(`${tableName} stats could not be saved on the database!`)
        console.log(e);
        result = false;
    }finally {
        await client.end();
        return result;
    }
};

// function: retrieveData

// description: this function retrieves all records from a specific table on the database
// it is used to retrieve the data (if it is up to date) from the database in order to be
// analyzed by other functions

async function retrieveData(tableName) { 
    const client = new Client(pgConfig);
    try {
        await client.connect();
        let result = await client.query(`SELECT * FROM ${tableName}`);
        return result.rows;
    }catch(e) {
        console.log(`${tableName} stats could not be retrieved from the database!`);
        console.log(e);
        return [];
    }finally {
        await client.end();
    }
}

export {saveData,retrieveData,checkTableDate,checkIfUpdateNeeded};