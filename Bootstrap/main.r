
library("ggplot2")

csv_data <- read.csv("../assignment3.csv",
                     stringsAsFactors = FALSE)


ggplot(data = csv_data) +
stat_summary(data = csv_data, mapping = aes(x = ReportedPercent, y = TruePercent), geom="bar")
