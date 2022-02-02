import random
import numpy as np
import pandas as pd

#generate a list of between 5 and 10 numbers that sum to 100
def generate_nums():
    #decide how many numbers will be in the set
    n = random.randint(5, 10)
    
    #generate numbers
    nums = np.random.uniform(size=n)
        
    #rescale numbers to sum to 100
    nums = nums * (100 / sum(nums))
 
    return nums
    
#check that all numbers are between 3 and 39 and that difference between numbers is greater than 0.1
def validate_nums(nums):
    #check min and max
    if min(nums) <= 3 or max(nums) >= 39:
        return False
    
    #make sure difference between elements is greater than 0.1
    nums_sorted = np.sort(nums)
    for i in range(nums.size - 1):
        if (nums_sorted[i + 1] - nums_sorted[i] <= 0.1):
            return False
    
    return True

#given the size of the list, generate indices of numbers to mark on graph
def generate_marks(size):
    marks = random.sample(range(0, size), 2)
    return marks[0], marks[1]

#generate n valid lists
def generate_lists(n):
    sets = []
    mark1 = []
    mark2 = []
    ratios = []
    counter = 0
    while (counter < n):
        nums = generate_nums()
        if validate_nums(nums):
            sets.append(list(nums))
            m1, m2 = generate_marks(nums.size)
            mark1.append(m1)
            mark2.append(m2)
            if nums[m1] < nums[m2]:
                ratios.append(nums[m1] / nums[m2])
            else:
                ratios.append(nums[m2] / nums[m1])
            counter += 1
        
    df = pd.DataFrame();
    df['nums'] = sets
    df['mark1'] = mark1
    df['mark2'] = mark2
    df['ratio'] = ratios
    
    return df.sort_values(by="ratio")

#generate many possible sets
df = generate_lists(1000)

#sample from range of indices to get range of ratios
sample = df.iloc[range(0, 1000, 50)]
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
