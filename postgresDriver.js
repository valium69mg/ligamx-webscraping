import pg from 'pg'
const { Client } = pg;

// database config
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
});

async function saveData(data,tableName) {
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
        // LOOP THROUGH DATA AND SAVE IT ON THE TABLE
        for (let i = 0; i < data.length; i++) {
            let player = data[i];
            await client.query(`INSERT INTO ${tableName} (name,post,country,number_of_matches,number_of_starting_matches,number_of_minutes_played,number_of_goals,number_of_assist,number_of_yellow_cards,number_of_red_cards,number_of_progressive_carrying,number_of_progressive_pass,number_of_progressive_pass_received) \
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
                [player['name'],player['pos'],player['country'],player['numberOfMatches'],player['numberOfStartingMatches'],player['numberOfMinutesPlayed'],player['numberOfGoals'],player['numberOfAssist'],player['numberOfYellowCards'],player['numberOfRedCards'],player['numberOfProgressiveCarrying'],player['numberOfProgressivePasses'],player['numberOfProgressivePassesReceived']]);     
        }
        console.log("Team stats saved on the database.");
    }catch(e) {
        console.log(e);
    }finally {
        await client.end();
    }
};

async function retrieveData(tableName) {
    try {
        await client.connect();
        let results = await client.query(`SELECT * FROM ${tableName}`);
        return results.rows;
    }catch(e) {
        console.log(e);
    }finally {
        await client.end();
    }
}

export {saveData,retrieveData};