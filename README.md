# Assignment 3 - Replicating a Classic Experiment
![Alt text](https://github.com/alexiscaira/a3-Experiment/blob/main/img/Screen%20Shot%202022-02-14%20at%209.41.33%20PM.png?raw=true)


https://alexiscaira.github.io/a3-Experiment/

## Charts Used

Bar Charts
![Alt text](https://github.com/alexiscaira/a3-Experiment/blob/main/img/bar%20graph.png?raw=true)

Radial Charts
![Alt text](https://github.com/alexiscaira/a3-Experiment/blob/main/img/radial%20graph%20exam.png?raw=true)

Pie Charts
![Alt text](https://github.com/alexiscaira/a3-Experiment/blob/main/img/pie%20example.png?raw=true)

## Design Achievements

- Use Raleway as a custom font on the page
- Custom startup page that allows users to accept or decline participation in the experiment

## Tech Achievements

In order to allow users to asynchronously and simulataneously take the quiz we chose to have each trial submit a POST request to a google form that was stored on one of our group members' local Google Drives. This was accomplished by finding the required parameters to the form and submitting the associated request, sending the graph type, the real ratio, and the user ratio for each trial. The Google Form then automatically handles the organization of the results spreadsheet. We then had access to the full functionality of Google Sheets for data manipulation.

## GGPlot Output
