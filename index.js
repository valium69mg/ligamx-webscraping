import searchData from './searchData.js';
import saveData from './postgresDriver.js';

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
let data = await searchData(cruzAzulUrl2324,cruzAzulPlayersCount,xpathPrefix);

await saveData(data, 'cruz_azul_stats_23_24');