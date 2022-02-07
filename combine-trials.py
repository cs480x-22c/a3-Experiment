import pandas as pd

def getTrueValue(chart_id):
    if "bar" in chart_id:
        return int(chart_id[3:]) * 5
    elif "pie" in chart_id:
        return int(chart_id[3:]) * 5
    elif "bubble" in chart_id:
        return int(chart_id[6:]) * 5
    
def getChartType(chart_id):
    if "bar" in chart_id:
        return "bar"
    elif "pie" in chart_id:
        return "pie"
    elif "bubble" in chart_id:
        return "bubble"

dfs = []

for i in range(1, 10 + 1):
    df = pd.read_csv("./trials/trial" + str(i) + ".csv")
    df["participant"] = i
    df["trial_num"] = range(1, 60 + 1)
    dfs.append(df)
    
data = pd.concat(dfs)
data["true_value"] = data["id"].apply(lambda x: getTrueValue(x))
data["type"] = data["id"].apply(lambda x: getChartType(x))
data.drop("id", axis=1, inplace=True)

data = data[["participant", "trial_num", "type", "true_value", "response"]]
data.columns = ["participant", "trial_num", "type", "true_value", "reported_value"]

data["error"] = data["true_value"] - data["reported_value"]

data.to_csv("trials.csv", index=False)