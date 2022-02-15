# Assignment 3 - Replicating a Classic Experiment

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

## Tech Achievements

Pie Charts
![Alt text](https://github.com/alexiscaira/a3-Experiment/blob/main/img/pie%20example.png?raw=true)

## General Requirements

0. Your code should be forked from the GitHub repo and linked using GitHub pages.
1. Your project should use d3 to build visualizations.
2. Your writeup (readme.md in the repo) should contain the following:

- Working link to the experiment hosted on gh-pages or some other site.
- Concise description and screenshot of your experiment.
- Description of the technical achievements you attempted with this project.
- Description of the design achievements you attempted with this project.

## Background

In 1984, William Cleveland and Robert McGill published the results of several controlled experiments that pitted bar charts against pies and stacked-bar variants.
Their paper (http://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-spr/readings/cleveland.pdf) (http://info.slis.indiana.edu/~katy/S637-S11/cleveland84.pdf) is considered a seminal paper in data visualization.
In particular, they ran a psychology-style experiment where users were shown a series of randomly-generated charts with two graphical elements marked like this:

![cleveland bar chart](img/cleveland-bar.png)

Participants were then asked, "What percentage is the smaller of the larger?".
This was repeated hundreds of time with varying data and charts.
By the end of the study, Cleveland and McGill had amassed a large dataset that looked like this:

![cleveland table](img/cleveland-table.png)

**Log-base-2 or "cm-error"**: The true percent is the actual percentage of the smaller to the larger, while the reported percent is what participants reported.
Cleveland and McGill recognized that their analyses would be biased if they took `abs(ReportedPercent – TruePercent)` as their score for error.
To compensate, they came up with a logarithmic scale for error with this equation:

![cleveland equation](img/cleveland-equation.png)

You’ll be implementing this error score as part of the lab.
(Hint: it’s not a trick question, this is just to familiarize you with the experiment protocol).
With this Cleveland-McGill error score you can better compare the performance of the charts you test to figure out which one performs the best.

As a baseline, compare your average Error scores to the following chart, which include both Cleveland and McGill’s results as well as more recent extensions of this experiment (lower error indicates better performance, and error bars are bootstrapped 95% confidence intervals (`http://en.wikipedia.org/wiki/Confidence_interval#Meaning_and_interpretation`)):

![cleveland results](img/cleveland-results.png)

## GitHub Details

- Fork the GitHub Repository. You now have a copy associated with your username.
- Make changes to index.html to fulfill the project requirements.
- Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
- Edit this README.md with a link to your gh-pages site: e.g. http://YourUsernameGoesHere.github.io/Experiment/index.html
- Replace this file (README.md) with your writeup and Design/Technical achievements.
- To submit, make a [Pull Request](https://help.github.com/articles/using-pull-requests/) on the original repository.
- Name your submission using the following scheme:

```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...
```
