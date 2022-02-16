library(tidyverse)
trials = read.csv("Master.csv")
error=trials$Error
print(abs(error)+1/8)
log2error = log(abs(error)+1/8, base=2)
d <- ggplot(trials, aes(log2error, Chart)) + geom_point()
d + stat_summary(fun.data = "mean_cl_boot", colour = "red", size = 2)
