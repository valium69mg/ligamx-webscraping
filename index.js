import pg from 'pg'
const { Client } = pg
import searchData from './searchData.js';

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

// cruz azul

let xpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
// rows on website (26 players)
const cruzAzulPlayersCount = 26;
// 23-24 season stats link
const cruzAzulUrl2324 = "https://fbref.com/es/equipos/632f1838/2023-2024/Estadisticas-de-Cruz-Azul";
// 24-25 season stats link
const cruzAzulUrl = "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul";

// barcelona
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

let data = await searchData(cruzAzulUrl,cruzAzulPlayersCount,xpathPrefix);

await saveData(data, 'cruz_azul_stats_24_25');