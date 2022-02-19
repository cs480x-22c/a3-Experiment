
numEntries = 7

entries <- floor(runif(numEntries, min=0, max=40))

chartNum <- floor(runif(1, min=0, max=3))

df <- data.frame( chart = chartNum,
                  value = entries)

write.csv(df,"testData.csv")
