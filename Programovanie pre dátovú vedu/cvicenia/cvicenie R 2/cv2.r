list1 <- list(1:3, "a", c(TRUE, FALSE, TRUE), c(2.3, 5.9))
list1
list2 <- list(list(list(1)))
list2
list3 <- list(list(1, 2), c(3, 4)) 
list3
list4 <- c(list(1, 2), c(3, 4)) 
list4

#1 which airport (labeled as origin) has the most delayed flights?
flights %>% select(dep_delay, origin) %>% 
  #distinct() %>%
  group_by(origin) %>%
  summarise(count = n()) %>% 
  #summarise(whole_delay = sum(dep_delay, na.rm = TRUE))
  arrange(desc(count)) %>%
  #head(1)
  select(origin) %>%
  print(n = 1)

#2 how many flights are shared between two carriers? 
#(i.e. flights having the same departure tine and destination,
#but different tail number) ?
flights %>% select(flight, carrier, dest, sched_dep_time) %>%
  distinct() %>% select(flight,carrier, dest, sched_dep_time) %>% 
  group_by(dest, sched_dep_time) %>%
  summarise(count = n())

#3 what is the average delay of a flight in New York outside tourist season 
#(i.e. from December to March) ?
flights %>% select(month, flight, dest, dep_delay) %>%
  filter(month %in% c(12, 1, 2, 3)) %>%
  summarise(avg = mean(dep_delay, na.rm = TRUE))
            
#4 what is the average distance of delayed flights? 
#Are short flights more delayed than the long-haul flights?
flights %>% 
  filter(dep_delay > 0) %>% 
  summarise(avg = mean(dep_delay, na.rm = TRUE))
  
# 5 which carrier has the most flight during summer holidays (July-August)?
flights %>% select(year, month, flight, carrier) %>%
  filter(month == 7 | month == 8) %>%
  select(flight, carrier) %>%
  group_by(carrier) %>%
  summarise(count = n()) %>%
  arrange(desc(count)) %>%
  select(carrier) %>%
  print(n = 1)
  

