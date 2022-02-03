import pandas as pd

#READ IN HAND PICKED DATA AND ADD ROWS FOR EACH GRAPH TYPE

#sample from range of indices to get range of ratios
sample = pd.read_csv("samples.csv");
sample["num"] = range(1, 21);

sample_bar = pd.DataFrame.copy(sample);
sample_bar["id"] = sample_bar["num"].apply(lambda x: "bar" + str(x));
sample_bar.drop("num", axis=1, inplace=True)

sample_pie = pd.DataFrame.copy(sample);
sample_pie["id"] = sample_pie["num"].apply(lambda x: "pie" + str(x));
sample_pie.drop("num", axis=1, inplace=True)

sample_bubble = pd.DataFrame.copy(sample);
sample_bubble["id"] = sample_bubble["num"].apply(lambda x: "bubble" + str(x));
sample_bubble.drop("num", axis=1, inplace=True)

#save data to csv
sample = pd.concat([sample_bar, sample_pie, sample_bubble], axis=0)
sample.to_csv("data.csv", index=False)