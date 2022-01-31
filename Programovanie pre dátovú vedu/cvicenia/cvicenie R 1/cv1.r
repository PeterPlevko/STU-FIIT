# 1. Explain the relationship between objects a, b, c and d. Use tracemen() to check your answer.
a <- 1:10
b <- a
a[2] <- 4
c <- b
d <- 1:10

# 2. Write a R program to add two vectors of integers with length 3.
vector1 <- c(1:3)
vector2 <- c(3:5)
vector1 + vector2

# 3. Use the following code to create vector x.
x <- 1:10 ; x[c(1,4,8)] <- NA
x

# 5. Let’s use pseudo-random number generator to create to vectors x and y.
set.seed(123) # Sets an initial value for pseudo random generator of numbers. 
x <- rnorm(20, mean = 10, sd = 5) # Generates 20 random values that have mean of 10 and standard deviation of 5. 
y <- rnorm(20, mean = 5, sd = 15) # Generates another 20 random values that have mean of 5 and standard deviation of 15.