import {By, Builder, Browser} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const screen = {
  width: 640,
  height: 480
};

// web scrapping config 
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

export default async function searchData(url,xpathPrefix,noOfPlayers) {
  let driver;
  let maxPlayers = 0;
  let data = [];
  try {
    // build driver
    driver = await new Builder().forBrowser(Browser.CHROME)
                        .setChromeOptions(new chrome.Options().addArguments('--headless').windowSize(screen))                            
                        .build();
    // setup driver connection
    await driver.get(url);  
    // loop through table to retrieve data into a list of dictionaries
    for (let i = 1; i <= noOfPlayers; i++) {
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
        maxPlayers += 1;
    }
    return data;
  } catch (e) {
    console.log(`Error adding player ${maxPlayers + 1} on table. Registered only ${maxPlayers} players.`);
    return data;
  } finally {
    await driver.quit(); 
  }
};