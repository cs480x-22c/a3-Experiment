# Tests
![image1](https://github.com/liamrathke/a3-Experiment/blob/main/tests.PNG)

We are comparing 3 different graph types (bar, pie, stacked bar), each graph is randomly generated for the user, the site will check the difference and compare that to the user submitted difference. Each user will do 60 graphs and the data will be sent to the database for storage. Results are stored at https://cs480x-22c-a3.herokuapp.com/results and the tests can be done at https://liamrathke.github.io/a3-Experiment/.

# Results
![image1](https://github.com/liamrathke/a3-Experiment/blob/main/results.PNG)

This chart pulls data from our database, calculates the confidence intervals using the most recent data and displays it acording to each graph type. The graph is located here https://liamrathke.github.io/a3-Experiment/results.html.

## Pie chart

![image](https://user-images.githubusercontent.com/37818941/154110869-460d25b3-e23d-4fd9-bb74-7026cd5ae5cd.png)

## Bar chart

![image](https://user-images.githubusercontent.com/37818941/154111048-37ca0a42-6b8e-4cdd-9cbe-663fb24f0c8a.png)

## Stacked bar chart

![image](https://user-images.githubusercontent.com/37818941/154111157-fd5c5913-9a40-4aef-8e29-0fa1294132aa.png)

The results seem on par with what we learned in class. The bar chart had the best accuracy of the 3 with stacked not far behind. Pie charts were clearly much less accurate.

Technical Achievments: Server back end that stores user results automatically in database, graphs randomly generated for each user, results pushed to database, final visualization pulls from database in real time and calculates confidence intervals.

Design Achievments: Slider input to select percentage, final visualization updates live with your data, test progress counter
