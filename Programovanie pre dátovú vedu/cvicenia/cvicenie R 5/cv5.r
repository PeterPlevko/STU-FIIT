library(tidyverse)
data <- read.csv(file = 'players_22.csv')

# Question 1
data %>%
  group_by(body_type) %>%
  select(defending) %>%
  summarise(min = min(defending, na.rm=T))

# Question 2
data %>%
  filter(club_name == "FC Barcelona") %>%
  mutate(difference = value_eur - wage_eur) %>%
  select(long_name, difference) %>%
  arrange(desc(difference))

# Question 3
data %>%
  filter(league_name == "Italian Serie A") %>%
  mutate(BMI = weight_kg / (height_cm*0.01)^2) %>%
  select(long_name, weight_kg, height_cm, BMI, player_positions) %>%
  arrange(desc(BMI))

# Question 4
data %>%
  mutate_if(is.double, ~ .x - mean(.x, na.rm=T)) %>%
  filter(league_name == "French Ligue 1") %>%
  select(long_name, height_cm) %>%
  arrange(height_cm)