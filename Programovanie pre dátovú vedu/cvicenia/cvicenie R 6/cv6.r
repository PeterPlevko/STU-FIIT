# Question 1
library(tidyverse)
setwd("<cesta>/Data")

listOfFiles <- list.files()

data <- map(listOfFiles, read_csv)
names(data) <- listOfFiles
data <- map2(data, listOfFiles, ~ mutate(.x, season = .y))
data <- map(data, ~ select(.x, season, everything()))

data %>%
  map(~ select(.x, short_name)) %>%
  reduce(intersect) %>%
  unlist() %>%
  length()

# Question 2
data %>%
  map(~ filter(.x, short_name == "L. Messi")) %>%
  map(~ select(.x,season, wage_eur, value_eur)) %>%
  reduce(rbind)

# Question 3 and 4
leagues <- c("Spain Primera Division", "German 1. Bundesliga", "English Premier League", "Italian Serie A")

data %>%
  map(~ filter(.x, league_name %in% leagues)) %>%
  map(~ select(.x, league_name, overall, potential, value_eur, wage_eur)) %>%
  reduce(rbind) %>%
  group_by(league_name) %>%
  summarise_if(is.double, mean) %>%
  mutate(WVR = wage_eur/value_eur)
