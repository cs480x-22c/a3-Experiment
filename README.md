# Experiment
Link: https://jacobadamsky.github.io/a3-Experiment/

This experiment was based off of the Cleveland and McGill experiment where the participants were asked to compare two areas and write what percent
the smaller one is of the larger one. Each participant did ~20 runs of the experiment (20 bar charts, 20 pie charts, 20 stacked rectangles) and was
expected to solely use their visual perception of the charts, meaning they weren't allowed to measure the areas in any way. I drew the graphs randomly
every iteration using D3 and then stored the results using Google Forms and a linked Google Sheet. To graph the results, I used Google Sheets API to
access the sheet data using JavaScript, and then I used R and GGPlot2 to create the graph. I hypothesized that bar charts would be the most accurate, with
rectangles being next and pie charts being the worst.

## Front Page:
![caption](https://raw.githubusercontent.com/jacobadamsky/a3-Experiment/main/img/frontpage.PNG)

## Bar Chart:
![caption](https://raw.githubusercontent.com/jacobadamsky/a3-Experiment/main/img/barchart.PNG)

## Pie Chart:
![caption](https://raw.githubusercontent.com/jacobadamsky/a3-Experiment/main/img/piechart.PNG)

## Stacked Rectangles:
![caption](https://raw.githubusercontent.com/jacobadamsky/a3-Experiment/main/img/stackedrectangles.PNG)

## Results
https://jacobadamsky.github.io/a3-Experiment/img/results.html
While I was correct about bar charts being the best, stacked rectangles and pie charts traded places with what I expected. From my own testing, pie charts were
harder to percieve than the stacked rectangles, but it turns out that I was wrong. With that said, they were both within 0.2 log2error of each other, so I wasn't
far off with my hypothesis.

## Technical Achievements:
My biggest technical achievemnt was linking up my experiment with Google Forms and Google Sheets API. When I first started using them, Google forms was a nuisance
(manually copying every form answer entry ID can take a while with a large form), but I managed to counteract this issue by limiting the number of questions per
run of the experiment. I also managed to use Google Sheets API which, while nice, didn't have the best documentation in my opinion.

## Design Achievements:
The one design achievement that I was happy with was my use of Google Forms. Instead of having two separate HTML objects (one for the form link and the other for the
D3 visualization), I was able to combine them into one object. I was also happy with my pie chart design. This may be more of a technical achievemnt, but getting
the pie chart to look right took me longer than it should have.

## Credits
Google Sheets API: https://developers.google.com/sheets/api/quickstart/js
<br>
Google Forms Custom Frontend: https://dev.to/utkarshdhiman48/custom-frontend-for-google-form-456l
