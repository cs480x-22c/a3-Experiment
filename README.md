# Assignment 3 - Replicating a Classic Experiment  
### Mattheus Faria
===

## The Experiment

Link to the Experiment: https://mfaria27.github.io/a3-Experiment/

Inspired by Cleveland and McGill's 1984 paper, this experiement gives multiple testers a set of randomly generated graphs with two of its segments marked. The tester is then asked to determine what percentage the smaller marked segment is of the larger marked segment. For example: If the smaller marked segment looked like it was half the size of the larger one, the tester would input 50 (Meaning 50%). Each participant was given 20 graphs with each graphs type, content, and marks randomized. By the end of the experiment, we would take the participants input responses and compare them to the true percentages calculated for each graph. 

With this experiment, I wanted to test the following hypthesis: Bar charts would be the easiest graph to gauge size differences when not given a y-axis or labels.

To test this, I randomly generated graph content, including: The graph id, which two segments will be marked, the ratio of the smaller mark to the larger mark, and an array of 5-10 random numbers that added up to 100 to be used as percentages. During the experiment, the website would randomly choose between creating either a bar chart, a stacked bar chart, or a pie chart, and then randommly select a graphs content from the previously generated data to create and display a graph. Once each participant completes their experiment, they are presented with a results page that displays the graph type, graph id, their results, and the expected results per graph. The participant would then send those 4 lists (Either copied from the console or the results page) to me for data anaylsis.

The documentation of the graph content generation is in an ipynb Notebook named "makeData.ipynb".
The javascript file "script.js" is not linked to the html file and is just a reference, as linking it causes it to the index causes it to lose some functionality. The script can be found at the bottom of "index.html".

## The Web Page

On start up:
![alt text](https://github.com/MFaria27/a3-Experiment/blob/main/Img/StartUp.png?raw=true)
===
An example of a pie chart:
![alt text](https://github.com/MFaria27/a3-Experiment/blob/main/Img/Pie.png?raw=true)
===
An example of a bar chart:
![alt text](https://github.com/MFaria27/a3-Experiment/blob/main/Img/bar.png?raw=true)
===
An example of a stacked bar chart:
![alt text](https://github.com/MFaria27/a3-Experiment/blob/main/Img/stack.png?raw=true)
===
The results page:
![alt text](https://github.com/MFaria27/a3-Experiment/blob/main/Img/resultspage.png?raw=true)

## Results



## Technical Achievements



## Design Achievements

