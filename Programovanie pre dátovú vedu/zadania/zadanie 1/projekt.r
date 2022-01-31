#########################LIBRARIES#########################
#najskor si nacitame potrebne kniznice
library(tidyverse)
library(readxl)
library(lubridate)
library(gmodels)
###########################################################


########################READ_FILES#########################
#nacitame datove subory a ulozime data do premennych
data_covid <- read_csv("covid.csv", col_names = T)
data_steam <- read_csv(file = "players.csv", col_names = T)
###########################################################


########################DESCRIPTIVE########################
#zakladne deskriptivne statistiky ako je pocet zaznamov, atributov,
#datove typy a pocet chybajucich dat pre oba datasety
tail(data_covid)
nrow(data_covid)
ncol(data_covid)
map(data_covid, typeof)
sum(is.na(data_covid))

tail(data_steam)
nrow(data_steam)
ncol(data_steam)
map(data_steam, typeof)
sum(is.na(data_steam))
###########################################################


#######################COVID_DATASET#######################
#kedze mame data roznych krajin a chceme celosvetove dohromady,
#tak musime tieto data zoskupit podla datumu a hodnoty jednotlivych
#krajin scitat
covid <- data_covid %>%
  group_by(date) %>%
  summarise(daily_new_cases = sum(daily_new_cases, na.rm = TRUE),
            daily_new_deaths = sum(daily_new_deaths, na.rm = TRUE))

#prekonvertujeme datumy z char na date a kazdemu priradime prvy
#den v mesiac (aby sme ich vedeli zoskupit do mesiacov kvoli formatu
#dat v druhom datasete)
covid$date <- as.Date(covid$date)
day(covid$date) <- 1

#zoskupime data do jednotlivych mesiacov a zoradime ich
covid <- covid %>%
  group_by(date) %>%
  summarise(daily_new_cases = sum(daily_new_cases, na.rm = TRUE),
            daily_new_deaths = sum(daily_new_deaths, na.rm = TRUE)) %>%
  arrange(date)
###########################################################


#######################STEAM_DATASET#######################
#vyberieme len tie data z datasetu, ktore nas zaujimaju a zoskupime ich pre mesiace,
#kedze pre jeden mesiac sa zaznamenavali hraci z viacerych hier (vsetkych ich scitame)
steam <- data_steam %>%
  select(Month_Year, Avg_players, Peak_Players) %>%
  group_by(Month_Year) %>%
  summarise(Avg_players = sum(Avg_players, na.rm = TRUE), Peak_Players = sum(Peak_Players, na.rm = TRUE))

#upravime format datumu na rovnaky, ako mame v prvom datasete
steam$date <- paste(sapply(strsplit(steam$Month_Year, " "),"[[", 2),
  match(sapply(strsplit(steam$Month_Year, " "),"[[", 1), month.name), 1, sep = "/")
steam <- steam %>%
  select(date, Avg_players, Peak_Players)
steam$date <- as.Date(steam$date)
###########################################################


#######################RESULTS_GRAPHS######################
#najskor spojime nase 2 datasety do jedneho
result <- merge(covid, steam, "date")

result$daily_new_cases_milions = result$daily_new_cases / 1000000

#tieto zakladne grafy sme si zvolili pre jednoduchu vizualizaciu nasich dat
#na zaklade casu, teda ako vyzerali pocty covid pacientov v jednotlivych mesiacoch
#a ako vyzerali pocty hracov v jednotlivych mesiacoch na platforme STEAM
#korelaciu mame zobrazenu v dalsej kapitole
ggplot(data = result, aes(date, Avg_players)) + geom_col() +
  scale_x_continuous(breaks = seq(date("2020-01-01"), by="3 months", length.out=7))
ggplot(data = result, aes(date, daily_new_cases_milions)) + geom_col() +
  scale_x_continuous(breaks = seq(date("2020-01-01"), by="3 months", length.out=7))
###########################################################


########################HYPOTHESIS#########################
#Hypoteza: "Pocas pandemie sa zvysuje pocet hracov na platforme STEAM"

#vypocitame priemer a nasledne pre kazdy mesiac zmenu oproti priemeru (aj v %)
avrg <- mean(result$daily_new_cases)
result$covid_avrg_chng <- result$daily_new_cases - avrg
result$covid_avrg_prcntg_chng <- round((result$daily_new_cases / avrg - 1) * 100, 2)

#ten isty vypocet spravime aj pre hracov
avrg <- mean(result$Avg_players)
result$player_avrg_chng <- result$Avg_players - avrg
result$player_avrg_prcntg_chng <- round((result$Avg_players / avrg - 1) * 100, 2)

#ideme testovat korelaciu medzi % zmenou oproti priemeru v novych pripadoch covidu
#a medzi % zmenou oproti priemeru hracov na platforme STEAM

#vyberieme len tie data, ktore potrebujeme na nasu hyptezu
hypo_data <- result %>%
  select(date, player_avrg_prcntg_chng, covid_avrg_prcntg_chng)

#najskor si vyberieme podmnoziny dat o velkosti 50% povodnych dat
half <- map(1:30, ~ hypo_data[sort(sample(1:dim(hypo_data)[1], size = 0.5*dim(hypo_data)[1])),])

#aplikujeme linearnu regresiu na vsetky tieto podmnoziny
models <- map(half, ~ lm(.x$player_avrg_prcntg_chng ~ .x$covid_avrg_prcntg_chng))

#z kazdeho modelu vyberieme rezidualy (teda vzdialenosti od priemeru) a Beta koeficienty
listOfFunctions <- list(coefficients = coef, residuals = residuals)
f <- function(x) {sapply(listOfFunctions, function(g) g(x))}
extractedData <- map(models, ~ f(.x))

#vypocitame standardnu odchylku od Beta0 (teda kolko je Y, ked je X = 0) a
#Beta1 (o kolko sa posunieme na Y, ked na X sa posunieme o 1)
sd(map_dbl(models, ~ coef(.x)[1]))
sd(map_dbl(models, ~ coef(.x)[2]))

#vypocitame standardnu chybu suctu druhych mocnin rezidualov a
#druhu mocninu priemeru rezidualov pre kazdy set
rss <- map_dbl(models, ~ sum(resid(.x)^2))
rse <- map_dbl(rss, ~ sqrt(.x/(0.5*dim(hypo_data)[1]-2)))

#vysledky vykreslime do grafov
boxplot(rss)
boxplot(rse)

#urobime t-test, teda pozrieme ci je vztah medzi predikatom x a odozvou y
cfs <- map_dbl(models, ~ coef(.x)[2])
t.test(cfs, mu=0)

#na grafe vidno (zelena ciara, ze s poctom covid pripadov stupa pocet hracov na platforme STEAM)
scatter.smooth(hypo_data$covid_avrg_prcntg_chng, hypo_data$player_avrg_prcntg_chng,
               xlab = "Percentuálna zmena voèi priemeru denných prírastkov covidu",
               ylab = "Percentuálna zmena voèi priemeru aktívnych hráèov",
               lpars = list(col = "green", lwd = 5, lty = 7))
###########################################################

