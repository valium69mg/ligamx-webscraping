CREATE TABLE team_stats (
    playerid serial,
    name varchar(50),
    post varchar(10),
    country varchar(10),
    number_of_matches varchar(10),
    number_of_starting_matches varchar(10),
    number_of_minutes_played varchar(10),
    number_of_goals varchar(10),
    number_of_assist varchar(10),
    number_of_yellow_cards varchar(10),
    number_of_red_cards varchar(10),
    number_of_progressive_carrying varchar(10),
    number_of_progressive_pass varchar(10),
    number_of_progressive_pass_received varchar(10),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (playerId)
);