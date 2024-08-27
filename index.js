import analyzeSeason from './analyzeSeason.js';
import { printTeamAnalysis, maxLeagueAnalysis,getBestOfTheSeasonStats } from './analyzeSeason.js';
import searchAndSaveData from './searchAndSaveData.js';

const noOfPlayers = 22;
//=============================== LIGA MX ====================================//
const ligamxXpath = '//*[@id="stats_standard_31"]/tbody/';
let ligaMxTeams = [
  {
    tableName: 'cruz_azul_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/632f1838/Estadisticas-de-Cruz-Azul", 
  } ,
  {
    tableName: 'chivas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c02b0f7a/Estadisticas-de-Guadalajara",
  }, 
  {
    tableName: 'america_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/18d3c3a3/Estadisticas-de-America",
  },
  {
    tableName: 'pumas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c9d59c6c/Estadisticas-de-Pumas-UNAM",
  },
  {
    tableName: 'toluca_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/44b88a4e/Estadisticas-de-Toluca",
  },
  {
    tableName: 'tigres_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/d9e1bd51/Estadisticas-de-UANL",
  },
  {
    tableName: 'monterrey_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/dd5ca9bd/Estadisticas-de-Monterrey",
  },
  {
    tableName: 'atlas_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/7c76bc53/Estadisticas-de-Atlas",
  },
  {
    tableName: 'pachuca_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/1be8d2e3/Estadisticas-de-Pachuca",
  },
  {
    tableName: 'santos_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/03b65ba9/Estadisticas-de-Santos-Laguna",
  },
  {
    tableName: 'tijuana_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/a42ddf2f/Estadisticas-de-Tijuana",
  },
  {
    tableName: 'leon_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/fd7dad55/Estadisticas-de-Leon",
  },
  {
    tableName: 'necaxa_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/752db496/Estadisticas-de-Necaxa",
  },
  {
    tableName: 'puebla_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/73fd2313/Estadisticas-de-Puebla",
  },
  {
    tableName: 'mazatlan_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/f0297c23/Estadisticas-de-Mazatlan",
  },
  {
    tableName: 'juarez_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/29bff345/Estadisticas-de-FC-Juarez",
  },
  {
    tableName: 'queretaro_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/c3352ce7/Estadisticas-de-Queretaro",
  },
  {
    tableName: 'sanluis_stats_24_25',
    teamUrl: "https://fbref.com/es/equipos/5d274ee4/Estadisticas-de-Atletico",
  },
];

async function ligaMx() {
  //=============================== SEARCH AND SAVE DATA =======================//
  console.log("\n");
  console.log(`============== SEARCH AND SAVE DATA ==================`)
  for (let i = 0; i < ligaMxTeams.length; i++) {
    let currentTeam = ligaMxTeams[i];
    await searchAndSaveData(currentTeam.teamUrl,ligamxXpath,18,currentTeam.tableName); 
  }
  //=============================== ANALYZE  =======================//
  let ligaMxAnalyzed = []; // variable for analized teams as a list of dictionaries
  console.log("\n");
  console.log(`================ TEAM ANALYSIS ======================`)
  // LOOP TO ADD TO ANALIZED TEAMS TO THE LIST
  for (let i = 0; i < ligaMxTeams.length; i++) {
    let currentTeam = ligaMxTeams[i];
    console.log("\n");
    console.log(`============== ${currentTeam.tableName} ==========`)
    let data = await analyzeSeason(currentTeam.tableName);
    ligaMxAnalyzed.push(data);
    console.log(data);
  }
  console.log("\n");
  console.log(`=============== LEAGUE ANALYSIS =====================`)
  // GET MAX PARAMETERS FROM LEAGUE
  let seasonMaxStats = maxLeagueAnalysis(ligaMxAnalyzed);
  // SEARCH FOR THE PLAYERS WITH STATS EQUAL TO THE MAX PARAMETERS
  let bestOfLigaMx = getBestOfTheSeasonStats(ligaMxAnalyzed,seasonMaxStats);
  console.log(bestOfLigaMx);
}

//=============================== LA LIGA ====================================//
const laligaXpath = '//*[@id="stats_standard_12"]/tbody/';
let laLigaTeams = [
  {
    tableName: "fc_barcelona_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/206d90db/Estadisticas-de-Barcelona",
  },
  {
    tableName: "real_madrid_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/53a2f082/Estadisticas-de-Real-Madrid",
  },
  {
    tableName: "villareal_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/2a8183b3/Estadisticas-de-Villarreal",
  },
  {
    tableName: "celta_de_vigo_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/f25da7fb/Estadisticas-de-Celta-Vigo",
  },
  {
    tableName: "atletico_de_madrid_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/db3b9613/Estadisticas-de-Atletico-Madrid",
  },
  {
    tableName: "leganes_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/7c6f2c78/Estadisticas-de-Leganes",
  },
  {
    tableName: "osasuna_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/03c57e2b/Estadisticas-de-Osasuna",
  },
  {
    tableName: "rayo_vallecano_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/98e8af82/Estadisticas-de-Rayo-Vallecano",
  },
  {
    tableName: "real_sociedad_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/e31d1cd9/Estadisticas-de-Real-Sociedad",
  },
  {
    tableName: "valladolid_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/17859612/Estadisticas-de-Valladolid",
  },
  {
    tableName: "getafe_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/7848bd64/Estadisticas-de-Getafe",
  },
  {
    tableName: "real_betis_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/fc536746/Estadisticas-de-Real-Betis",
  },
  {
    tableName: "sevilla_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/ad2be733/Estadisticas-de-Sevilla",
  },
  {
    tableName: "mallorca_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/2aa12281/Estadisticas-de-Mallorca",
  },
  {
    tableName: "las_palmas_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/0049d422/Estadisticas-de-Las-Palmas",
  },
  {
    tableName: "athletic_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/2b390eca/Estadisticas-de-Athletic-Club",
  },
  {
    tableName: "alaves_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/8d6fd021/Estadisticas-de-Alaves",
  },
  {
    tableName: "girona_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/9024a00a/Estadisticas-de-Girona",
  },
  {
    tableName: "espanyol_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/a8661628/Estadisticas-de-Espanyol",
  },
  {
    tableName: "valencia_stats_24_25",
    teamUrl: "https://fbref.com/es/equipos/dcc91a7b/Estadisticas-de-Valencia",
  }
]

async function laLiga() {
  //=============================== SEARCH AND SAVE DATA =======================//
  console.log("\n");
  console.log(`============== SEARCH AND SAVE DATA ==================`)
  for (let i = 0; i < laLigaTeams.length; i++) {
    let currentTeam = laLigaTeams[i];
    await searchAndSaveData(currentTeam.teamUrl,laligaXpath,noOfPlayers,currentTeam.tableName); 
  }
  //=============================== ANALYZE  =======================//
  let laLigaAnalyzed = []; 
  console.log("\n");
  console.log(`================ TEAM ANALYSIS ======================`)
  for (let i = 0; i < laLigaTeams.length; i++) {
    let currentTeam = laLigaTeams[i];
    console.log("\n");
    console.log(`============== ${currentTeam.tableName} ==========`)
    let data = await analyzeSeason(currentTeam.tableName);
    laLigaAnalyzed.push(data);
    console.log(data);
  }
  console.log("\n");
  console.log(`=============== LEAGUE ANALYSIS =====================`)
  let seasonMaxStats = maxLeagueAnalysis(laLigaAnalyzed);
  let bestOfLigaMx = getBestOfTheSeasonStats(laLigaAnalyzed,seasonMaxStats);
  console.log(bestOfLigaMx);
}
let premierXpath = '//*[@id="stats_standard_9"]/tbody/';
//=============================== PREMIER LEAGUE ====================================//

let premierTeams = [
  {
    tableName: 'manchester_united_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/19538871/Estadisticas-de-Manchester-United'
  },
  {
    tableName: 'manchester_city_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/b8fd03ef/Estadisticas-de-Manchester-City'
  },
  {
    tableName: 'brighton_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/d07537b9/Estadisticas-de-Brighton-and-Hove-Albion'
  },
  {
    tableName: 'arsenal_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/18bb7c10/Estadisticas-de-Arsenal'
  },
  {
    tableName: 'liverpool_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/822bd0ba/Estadisticas-de-Liverpool'
  },
  {
    tableName: 'tottenham_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/361ca564/Estadisticas-de-Tottenham-Hotspur'
  },
  {
    tableName: 'newcastle_united_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/b2b47a98/Estadisticas-de-Newcastle-United'
  },
  {
    tableName: 'nottingham_forest_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/e4a775cb/Estadisticas-de-Nottingham-Forest'
  },
  {
    tableName: 'chelsea_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/cff3d9bb/Estadisticas-de-Chelsea'
  },
  {
    tableName: 'west_ham_united_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/7c21e445/Estadisticas-de-West-Ham-United'
  },
  {
    tableName: 'fullham_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/fd962109/Estadisticas-de-Fulham'
  },
  {
    tableName: 'aston_villa_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/8602292d/Estadisticas-de-Aston-Villa'
  },
  {
    tableName: 'brentford_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/cd051869/Estadisticas-de-Brentford'
  },
  {
    tableName: 'bournemouth_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/4ba7cbea/Estadisticas-de-Bournemouth'
  },
  {
    tableName: 'leicester_city_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/a2d435b3/Estadisticas-de-Leicester-City'
  },
  {
    tableName: 'southampton_city_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/33c895d4/Estadisticas-de-Southampton'
  },
  {
    tableName: 'crystal_palace_city_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/47c64c55/Estadisticas-de-Crystal-Palace'
  },
  {
    tableName: 'ipswich_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/b74092de/Estadisticas-de-Ipswich-Town'
  },
  {
    tableName: 'wolverhampton_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/8cec06e1/Estadisticas-de-Wolverhampton-Wanderers'
  },
  {
    tableName: 'everton_stats_24_25',
    teamUrl: 'https://fbref.com/es/equipos/d3fd31cc/Estadisticas-de-Everton'
  },
]
async function premier() {
  //=============================== SEARCH AND SAVE DATA =======================//
  console.log("\n");
  console.log(`============== SEARCH AND SAVE DATA ==================`)
  for (let i = 0; i < premierTeams.length; i++) {
    let currentTeam = premierTeams[i];
    await searchAndSaveData(currentTeam.teamUrl,premierXpath,noOfPlayers,currentTeam.tableName); 
  }
  //=============================== ANALYZE  =======================//
  let premierAnalyzed = []; 
  console.log("\n");
  console.log(`================ TEAM ANALYSIS ======================`)
  for (let i = 0; i < premierTeams.length; i++) {
    let currentTeam = premierTeams[i];
    console.log("\n");
    console.log(`============== ${currentTeam.tableName} ==========`)
    let data = await analyzeSeason(currentTeam.tableName);
    premierAnalyzed .push(data);
    console.log(data);
  }
  console.log("\n");
  console.log(`=============== LEAGUE ANALYSIS =====================`)
  let seasonMaxStats = maxLeagueAnalysis(premierAnalyzed);
  let bestOfpremier = getBestOfTheSeasonStats(premierAnalyzed,seasonMaxStats);
  console.log(bestOfpremier);
}
// MAIN

// await ligaMx();
// await laLiga();
await premier();