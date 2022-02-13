library(tidyverse)
library(gsheet)
library(plotly)
data <- gsheet2tbl('docs.google.com/spreadsheets/d/1_GF2RMcjay1qsn90G7sC85lOEA9qcgQNLHDqC2ekWbc')

log2error1 = log(abs(data$`bar-percent`)+1/8, base=2)
log2error2 = log(abs(data$`pie-percent`)+1/8, base=2)
log2error3 = log(abs(data$`rect-percent`)+1/8, base=2)

plot <- ggplot(data, aes(log2error, Type)) + 
  stat_summary(aes(x=log2error1, y="bar"),
               fun.data = "mean_cl_boot", color = "red", size = 1) +
  stat_summary(aes(x=log2error2, y="pie"),
               fun.data = "mean_cl_boot", color = "blue", size = 1) + 
  stat_summary(aes(x=log2error3, y="rect"),
               fun.data = "mean_cl_boot", color = "green", size = 1) +
  scale_y_discrete(limits = c("bar", "pie", "rect"), labels = c("Bar", "Pie", "Rectangle"))

plotlyplot <- ggplotly(plot)
htmlwidgets::saveWidget(plotlyplot, "index.html")