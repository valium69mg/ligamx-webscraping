import pg from 'pg'
const { Client } = pg
import {By, Builder, Browser} from 'selenium-webdriver';


// database config
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
  });

async function saveData(data) {
    try {  
        await client.connect();
        for (let i = 0; i < data.length; i++) {
            let player = data[i];
            await client.query("INSERT INTO team_stats (name,post,country,number_of_matches,number_of_starting_matches,number_of_minutes_played,number_of_goals,number_of_assist,number_of_yellow_cards,number_of_red_cards,number_of_progressive_carrying,number_of_progressive_pass,number_of_progressive_pass_received) \
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
                [player['name'],player['pos'],player['country'],player['numberOfMatches'],player['numberOfStartingMatches'],player['numberOfMinutesPlayed'],player['numberOfGoals'],player['numberOfAssist'],player['numberOfYellowCards'],player['numberOfRedCards'],player['numberOfProgressiveCarrying'],player['numberOfProgressivePasses'],player['numberOfProgressivePassesReceived']]);     
        }
        console.log("Team stats saved on the database.");
    }catch(e) {
        console.log(e);
    }finally {
        await client.end();
    }
};

// web scrapping config 
const cruzAzulUrl = "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul";

let nameSubfix = '/th';
let posSubfix = '/td[2]';
let countrySubfix = '/td[1]/a/span/span';
let numberOfMatchesSubfix = '/td[4]';
let numberOfStartingMatchesSubfix = '/td[5]';
let numberOfMinutesPlayedSubfix = '/td[6]';
let numberOfGoalsSubfix = '/td[8]';
let numberOfAssistSubfix = '/td[9]';
let numberOfYellowCardsSubfix = '/td[14]';
let numberOfRedCardsSubfix = '/td[15]';
let numberOfProgressiveCarryingSubfix = '/td[20]';
let numberOfProgressivePassesSubfix = '/td[21]';
let numberOfProgressivePassesReceivedSubfix = '/td[22]';

async function searchData(url) {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(url);
    let xpathPrefix = '//*[@id="stats_standard_31"]/tbody/';
    let data = [];
    for (let i = 1; i <= 26; i++) {
        let playerStats = {};
        let row = "tr[" + i + "]" ;
        // id 
        let id = i;
        playerStats['id'] = id;
        // name 
        let namePath = xpathPrefix + row + nameSubfix;
        let name = await driver.findElement(By.xpath(namePath)).getText();
        playerStats['name'] = name;
        // post
        let posPath = xpathPrefix + row + posSubfix;
        let pos = await driver.findElement(By.xpath(posPath)).getText();
        playerStats['pos'] = pos;
        // country 
        let countryPath = xpathPrefix + row + countrySubfix;
        let country = await driver.findElement(By.xpath(countryPath)).getText();
        playerStats['country'] = country;
        // no of matches
        let numberOfMatchesPath = xpathPrefix + row + numberOfMatchesSubfix;
        let numberOfMatches = await driver.findElement(By.xpath(numberOfMatchesPath )).getText();
        playerStats['numberOfMatches'] = numberOfMatches;
        // no of starting matches
        let numberOfStartingMatchesPath = xpathPrefix + row + numberOfStartingMatchesSubfix;
        let numberOfStartingMatches = await driver.findElement(By.xpath(numberOfStartingMatchesPath)).getText();
        playerStats['numberOfStartingMatches'] = numberOfStartingMatches;
        // no of minutes played 
        let numberOfMinutesPlayedPath = xpathPrefix + row + numberOfMinutesPlayedSubfix;
        let numberOfMinutesPlayed = await driver.findElement(By.xpath(numberOfMinutesPlayedPath)).getText();
        playerStats['numberOfMinutesPlayed'] = numberOfMinutesPlayed;
        // no of goals
        let numberOfGoalsPath = xpathPrefix + row + numberOfGoalsSubfix;
        let numberOfGoals = await driver.findElement(By.xpath(numberOfGoalsPath)).getText();
        playerStats['numberOfGoals'] = numberOfGoals;
        // no of assist
        let numberOfAssistPath = xpathPrefix + row + numberOfAssistSubfix;
        let numberOfAssist = await driver.findElement(By.xpath(numberOfAssistPath)).getText();
        playerStats['numberOfAssist'] = numberOfAssist;
        // no of yellow cards
        let numberOfYellowCardsPath = xpathPrefix + row + numberOfYellowCardsSubfix;
        let numberOfYellowCards = await driver.findElement(By.xpath(numberOfYellowCardsPath)).getText();
        playerStats['numberOfYellowCards'] = numberOfYellowCards;
        // no of red cards
        let numberOfRedCardsPath = xpathPrefix + row + numberOfRedCardsSubfix;
        let numberOfRedCards = await driver.findElement(By.xpath(numberOfRedCardsPath)).getText();
        playerStats['numberOfRedCards'] = numberOfRedCards;
        // progressive carrying
        let numberOfProgressiveCarryingPath = xpathPrefix + row + numberOfProgressiveCarryingSubfix;
        let numberOfProgressiveCarrying = await driver.findElement(By.xpath(numberOfProgressiveCarryingPath)).getText();
        playerStats['numberOfProgressiveCarrying'] = numberOfProgressiveCarrying;
        // progressive passes
        let numberOfProgressivePassesPath = xpathPrefix + row + numberOfProgressivePassesSubfix;
        let numberOfProgressivePasses = await driver.findElement(By.xpath(numberOfProgressivePassesPath)).getText();
        playerStats['numberOfProgressivePasses'] = numberOfProgressivePasses;
        // progressive passes received        
        let numberOfProgressivePassesReceivedPath = xpathPrefix + row + numberOfProgressivePassesReceivedSubfix;
        let numberOfProgressivePassesReceived = await driver.findElement(By.xpath(numberOfProgressivePassesReceivedPath)).getText();
        playerStats['numberOfProgressivePassesReceived'] = numberOfProgressivePassesReceived;
        // retrieve data
        data.push(playerStats);
    }
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
};


let data = await searchData(cruzAzulUrl);

await saveData(data);