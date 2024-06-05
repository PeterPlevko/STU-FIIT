library(tidyverse)
data <- read.csv(file = 'players_22.csv')

# Question 1
data %>%
  filter(nationality == "Slovakia", player_positions %in% "GK") %>%
  select(long_name, player_positions, value_eur, overall, potential, nationality) %>%
  arrange(value_eur) %>%
  head(n=3)

# Question 2
data %>%
  select(long_name, overall, potential, age, wage_eur) %>%
  mutate(gap = potential - overall) %>%
  filter(wage_eur < 600, age < 22) %>%
  arrange(desc(gap), desc(wage_eur)) %>%
  head(n=3)

# Question 3
data %>%
  filter(league_name %in% c("English Premier League", "Spain Primera Division")) %>%
  group_by(league_name, preferred_foot) %>%
  summarise(count = n())

# Question 4
data %>%
  filter(nation_position != "NA", club_contract_valid_until < 2024) %>%
  summarise(mean_Age = mean(age),
            minAge = min(age),
            maxAge = max(age),
            count = n())