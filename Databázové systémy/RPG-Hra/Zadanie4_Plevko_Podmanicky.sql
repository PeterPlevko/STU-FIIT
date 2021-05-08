CREATE TYPE "sex" AS ENUM (
  'male',
  'female',
  'other'
);

CREATE TYPE "registration_type" AS ENUM (
  'facebook',
  'twitter',
  'google'
);

CREATE TABLE "User_credentials" (
  "id" bigint PRIMARY KEY,
  "player_id" bigint,
  "pwd_hash" varchar(150),
  "registration_type" registration_type,
  "external_id" varchar(200),
  "email" varchar(50) UNIQUE NOT NULL,
  "confirmed" boolean DEFAULT FALSE,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "Player" (
  "id" bigint PRIMARY KEY,
  "user_name" varchar(20) UNIQUE NOT NULL CHECK (LENGTH("Player".user_name) > 5),
  "registration_type" registration_type,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "sex" sex NOT NULL
);

CREATE TABLE "Character" (
  "id" bigint PRIMARY KEY,
  "id_player" bigint,
  "id_coordinates" bigint NOT NULL,
  "id_class" bigint NOT NULL,
  "level" int DEFAULT 1,
  "name" varchar(20) NOT NULL CHECK (LENGTH("Character".name) > 5),
  "attack" decimal,
  "defense" decimal,
  "health" decimal,
  "experience" int,
  "created_at" TIMESTAMP
);

CREATE TABLE "Character_stats" (
  "id" bigint PRIMARY KEY,
  "character_id" bigint,
  "character_class" bigint,
  "monster_class" bigint,
  "died" int DEFAULT 0,
  "killed" int DEFAULT 0
);

CREATE TABLE "Player_teams" (
  "id" bigint PRIMARY KEY,
  "id_player" bigint,
  "id_team" bigint,
  "member" boolean DEFAULT TRUE,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "User_friends" (
  "id_Player" bigint PRIMARY KEY,
  "id_friend" bigint,
  "created_at" TIMESTAMP
);

CREATE TABLE "User_blocks" (
  "id" bigint PRIMARY KEY,
  "id_Player" bigint,
  "id_blocked" bigint,
  "created_at" TIMESTAMP
);

CREATE TABLE "Team" (
  "id" bigint PRIMARY KEY,
  "name" varchar(30) NOT NULL,
  "members_num" int NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "Team_invites" (
  "id" bigint PRIMARY KEY,
  "id_player_to" bigint,
  "id_player_from" bigint,
  "id_team" bigint,
  "accepted" boolean DEFAULT FALSE,
  "created_at" TIMESTAMP,
  "answered_at" TIMESTAMP
);

CREATE TABLE "Friendship_invites" (
  "id" bigint PRIMARY KEY,
  "id_player_to" bigint,
  "id_player_from" bigint,
  "accepted" boolean DEFAULT FALSE,
  "created_at" TIMESTAMP,
  "answered_at" TIMESTAMP
);

CREATE TABLE "Player_chat" (
  "id" bigint PRIMARY KEY,
  "id_player_to" bigint,
  "id_player_from" bigint,
  "message" varchar(200) NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "Team_chat" (
  "id" bigint PRIMARY KEY,
  "id_team_to" bigint,
  "id_player_from" bigint,
  "message" varchar(200) NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "Location" (
  "id" bigint PRIMARY KEY,
  "location_name" varchar(50) NOT NULL,
  "required_level" int DEFAULT 1,
  "encounter_chance" decimal DEFAULT 0.1,
  "width" int DEFAULT 50,
  "height" int DEFAULT 50
);

CREATE TABLE "Coordinates" (
  "id" bigint PRIMARY KEY,
  "id_location" bigint,
  "pos_x" bigint DEFAULT 0,
  "pos_y" bigint DEFAULT 0
);

CREATE TABLE "Quest" (
  "id" bigint PRIMARY KEY,
  "quest_name" varchar(30) NOT NULL,
  "id_location" bigint,
  "item_reward" bigint,
  "required_level" int DEFAULT 1,
  "experience" int NOT NULL,
  "monster_class" varchar(20),
  "monster_num" int
);

CREATE TABLE "Character_quests" (
  "id" bigint PRIMARY KEY,
  "id_quest" bigint,
  "id_character" bigint,
  "finished" boolean DEFAULT FALSE,
  "finished_at" TIMESTAMP,
  "acquired_at" TIMESTAMP
);

CREATE TABLE "Class" (
  "id" bigint PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "Class_level" (
  "id" bigint PRIMARY KEY,
  "id_class" bigint,
  "level" int DEFAULT 1,
  "experience_required" int,
  "health" decimal,
  "attack" decimal,
  "defense" decimal
);

CREATE TABLE "Skills" (
  "id" bigint PRIMARY KEY,
  "skill_name" varchar(20),
  "skill_class" bigint,
  "required_skill" bigint,
  "description" varchar(100) NOT NULL,
  "damage_modifier" decimal,
  "defense_modifier" decimal,
  "health_modifier" decimal
);

CREATE TABLE "Character_skills" (
  "id" bigint PRIMARY KEY,
  "id_character" bigint NOT NULL,
  "id_skill" bigint NOT NULL
);

CREATE TABLE "Monster" (
  "id" bigint PRIMARY KEY,
  "id_coordinates" bigint,
  "monster_class" bigint NOT NULL,
  "attack" decimal,
  "defense" decimal,
  "health" decimal,
  "created_at" TIMESTAMP
);

CREATE TABLE "Monster_class" (
  "id" bigint PRIMARY KEY,
  "class_name" varchar(20),
  "level" int DEFAULT 1,
  "required_monster" bigint,
  "required_quest" bigint,
  "item_class_drop" bigint,
  "drop_chance" decimal,
  "experience" int,
  "attack" decimal,
  "defense" decimal,
  "health" decimal
);

CREATE TABLE "Monster_skills" (
  "id" bigint PRIMARY KEY,
  "skill_name" varchar(20),
  "monster_class" bigint,
  "description" varchar(100) NOT NULL,
  "damage_modifier" decimal,
  "defense_modifier" decimal,
  "health_modifier" decimal
);

CREATE TABLE "Item" (
  "id" bigint PRIMARY KEY,
  "id_coordinates" bigint,
  "id_character" bigint,
  "id_monster" bigint,
  "item_class_id" bigint,
  "item_class" varchar(20) NOT NULL,
  "is_equipped" boolean DEFAULT FALSE,
  "created_at" TIMESTAMP
);

CREATE TABLE "Item_class" (
  "id" bigint PRIMARY KEY,
  "class_name" varchar(20),
  "attack_modifier" decimal,
  "defense_modifier" decimal,
  "health_modifier" decimal
);

CREATE TABLE "Battle" (
  "id" bigint PRIMARY KEY,
  "character_id" bigint,
  "monster_id" bigint,
  "character_starting_health" decimal,
  "monster_starting_health" decimal,
  "character_damage_done" decimal,
  "monster_damage_done" decimal,
  "character_remaining_health" decimal,
  "monster_remaining_healt" decimal,
  "experience" int,
  "created_at" TIMESTAMP
);

CREATE TABLE "Battle_skills" (
  "id" bigint PRIMARY KEY,
  "battle_id" bigint,
  "character_skill" varchar(20),
  "monster_skill" varchar(20),
  "damage_done" decimal
);

ALTER TABLE "User_credentials" ADD FOREIGN KEY ("player_id") REFERENCES "Player" ("id");

ALTER TABLE "User_friends" ADD FOREIGN KEY ("id_friend") REFERENCES "Player" ("id");

ALTER TABLE "Character" ADD FOREIGN KEY ("id_player") REFERENCES "Player" ("id");

ALTER TABLE "Character" ADD FOREIGN KEY ("id_coordinates") REFERENCES "Coordinates" ("id");

ALTER TABLE "Character" ADD FOREIGN KEY ("id_class") REFERENCES "Class" ("id");

ALTER TABLE "Character_stats" ADD FOREIGN KEY ("character_id") REFERENCES "Character" ("id");

ALTER TABLE "Character_stats" ADD FOREIGN KEY ("character_class") REFERENCES "Class" ("id");

ALTER TABLE "Character_stats" ADD FOREIGN KEY ("monster_class") REFERENCES "Monster_class" ("id");

ALTER TABLE "Player_teams" ADD FOREIGN KEY ("id_player") REFERENCES "Player" ("id");

ALTER TABLE "Player_teams" ADD FOREIGN KEY ("id_team") REFERENCES "Team" ("id");

ALTER TABLE "User_friends" ADD FOREIGN KEY ("id_Player") REFERENCES "Player" ("id");

ALTER TABLE "User_blocks" ADD FOREIGN KEY ("id_Player") REFERENCES "Player" ("id");

ALTER TABLE "User_blocks" ADD FOREIGN KEY ("id_blocked") REFERENCES "Player" ("id");

ALTER TABLE "Team_invites" ADD FOREIGN KEY ("id_player_to") REFERENCES "Player" ("id");

ALTER TABLE "Team_invites" ADD FOREIGN KEY ("id_player_from") REFERENCES "Player" ("id");

ALTER TABLE "Team_invites" ADD FOREIGN KEY ("id_team") REFERENCES "Team" ("id");

ALTER TABLE "Friendship_invites" ADD FOREIGN KEY ("id_player_to") REFERENCES "Player" ("id");

ALTER TABLE "Friendship_invites" ADD FOREIGN KEY ("id_player_from") REFERENCES "Player" ("id");

ALTER TABLE "Player_chat" ADD FOREIGN KEY ("id_player_to") REFERENCES "Player" ("id");

ALTER TABLE "Player_chat" ADD FOREIGN KEY ("id_player_from") REFERENCES "Player" ("id");

ALTER TABLE "Team_chat" ADD FOREIGN KEY ("id_team_to") REFERENCES "Team" ("id");

ALTER TABLE "Team_chat" ADD FOREIGN KEY ("id_player_from") REFERENCES "Player" ("id");

ALTER TABLE "Coordinates" ADD FOREIGN KEY ("id_location") REFERENCES "Location" ("id");

ALTER TABLE "Quest" ADD FOREIGN KEY ("id_location") REFERENCES "Location" ("id");

ALTER TABLE "Quest" ADD FOREIGN KEY ("item_reward") REFERENCES "Item_class" ("id");

ALTER TABLE "Character_quests" ADD FOREIGN KEY ("id_quest") REFERENCES "Quest" ("id");

ALTER TABLE "Character_quests" ADD FOREIGN KEY ("id_character") REFERENCES "Character" ("id");

ALTER TABLE "Class_level" ADD FOREIGN KEY ("id_class") REFERENCES "Class" ("id");

ALTER TABLE "Skills" ADD FOREIGN KEY ("skill_class") REFERENCES "Class" ("id");

ALTER TABLE "Skills" ADD FOREIGN KEY ("required_skill") REFERENCES "Skills" ("id");

ALTER TABLE "Character_skills" ADD FOREIGN KEY ("id_character") REFERENCES "Character" ("id");

ALTER TABLE "Character_skills" ADD FOREIGN KEY ("id_skill") REFERENCES "Skills" ("id");

ALTER TABLE "Monster" ADD FOREIGN KEY ("id_coordinates") REFERENCES "Coordinates" ("id");

ALTER TABLE "Monster" ADD FOREIGN KEY ("monster_class") REFERENCES "Monster_class" ("id");

ALTER TABLE "Monster_class" ADD FOREIGN KEY ("required_monster") REFERENCES "Monster_class" ("id");

ALTER TABLE "Monster_class" ADD FOREIGN KEY ("required_quest") REFERENCES "Quest" ("id");

ALTER TABLE "Monster_class" ADD FOREIGN KEY ("item_class_drop") REFERENCES "Item_class" ("id");

ALTER TABLE "Monster_skills" ADD FOREIGN KEY ("monster_class") REFERENCES "Monster_class" ("id");

ALTER TABLE "Item" ADD FOREIGN KEY ("id_coordinates") REFERENCES "Coordinates" ("id");

ALTER TABLE "Item" ADD FOREIGN KEY ("id_character") REFERENCES "Character" ("id");

ALTER TABLE "Item" ADD FOREIGN KEY ("id_monster") REFERENCES "Monster" ("id");

ALTER TABLE "Item" ADD FOREIGN KEY ("item_class_id") REFERENCES "Item_class" ("id");

ALTER TABLE "Battle" ADD FOREIGN KEY ("character_id") REFERENCES "Character" ("id");

ALTER TABLE "Battle" ADD FOREIGN KEY ("monster_id") REFERENCES "Monster" ("id");

ALTER TABLE "Battle_skills" ADD FOREIGN KEY ("battle_id") REFERENCES "Battle" ("id");
