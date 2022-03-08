Experiment Information
===

Link to website, hosted on glitch: https://a3experiment.glitch.me/

Description: This was a appliction using d3.js and html in the front-end and node.js, express.js, and mongoose in the back-end. We utilized html to create the survey and transition between different graphs that were made using d3. During the survey, the plots were each marked with 2 dots, signifying which parts of the chart we want to compare. The data is collected during the survey and sent to the server when the survey is submitted. After the data is sent to the server using a POST request we parsed the data and put it in a mongoDB server. Then we used their db tools to convert it into a csv file that allowed us to analyze the results using the bootstrapped log2 error distribution used by Cleveland and McGill. As well as a graph with normal error. 

Experiment Results In Order of Performance
===

Bar
---
![first chart](./bar2.png)

Our bar chart was our best performing chart. This is similar to Cleveland & McGill's results, as it is easiest to compare two bars height as oppose to other visualizations.

Line
---
![first chart](./line2.png)

Our line chart was worse in performance compared to the bar chart, but beat out the pie charts by a significant margin. This is resonable, as simialr to the bar chart, line chart compares the data vertically. 

Pie
---
![first chart](./pie2.png)

Box plots were the worst performing chart out of the three. This could be for a couple reasons, the first theory being the lack of knowledge about how to read a slice of a circle.  Secondly, pie charts could overall be harder to compare sizes due to the lack of allignment between each slice.(The slices werent always next to eachother, creating different visual effect.) This caused for a wide variability in answers, creating more outliers compared to the other two charts. Thirdly, as the slice of chart can be oriented different, it creates very different visual effects causing the subject to become confused to the true size of the shape. 

Results in detailed graphs
===

error graph
---
![first chart](./errorgraph.png)

Our bar chart results are very similar to the Cleveland and McGill results, as you can see. Our pie chart results, on the other hand, were marginally poorer than Cleveland and McGill, with a greater spread. According to their technique, they labeled their slices with letters at the halfway of each slice, and their slices were all rather large. In contrast to our study, where we only reduced the size of our pie chart segments when they were nearly unnoticeable, these characteristics could have improved graphical perception.

bootstrapped log2 error distribution
---

__Log-base-2 or "cm-error"__: The true percent is the actual percentage of the smaller to the larger, while the reported percent is what participants reported. 
Cleveland and McGill recognized that their analyses would be biased if they took `abs(ReportedPercent – TruePercent)` as their score for error. 
To compensate, they came up with a logarithmic scale for error with this equation:

![cleveland equation](img/cleveland-equation.png)

![first chart](./bootstrappedlog2errordistribution.png)

## Technical Achievements
- **Server**: Used Node.JS server with express.JS framework.
![image](https://user-images.githubusercontent.com/73619173/157150750-cd4a0555-4b80-4170-9c5f-77688a41cbf7.png)
![image](https://user-images.githubusercontent.com/73619173/157148820-788b5521-9d7c-4b8e-bcc7-b427c1b44618.png)
![image](https://user-images.githubusercontent.com/73619173/157148850-f1acfac2-9a38-493a-adcc-eba49df1054b.png)

- **Database**: Used MongoDB and mangoose to send data to a mongoDB database.
![image](https://user-images.githubusercontent.com/73619173/157149150-aeb8f4de-3136-4e70-a092-92c6e3199d3c.png)
![image](https://user-images.githubusercontent.com/73619173/157150498-909b116d-e2e8-4cad-9f0e-8fff2a73d405.png)

- **Database Tools**: First time using MongoDB tools. Learned how to generate CSV file with selective data fields using the tools. This had to be downloaded seperatly and be set as a root path so it could be used in my terminal.

- **dotenv**: Used to protect sensitive data information, such as admin username and password.
![image](https://user-images.githubusercontent.com/73619173/157149665-94c4d5c1-50b9-4c3c-bbce-85f93bbd08d4.png)

- **body-parser**: Used bodyparser to easily parse JSON data being passed from the client to the server.

### Design Achievements
- We added a counter to tell participants how many charts are left.
- Consistent chart design and sizing.
- Explored how different color can effect graphs but later returned to comparison with dots. 
- We added our to dots to the middle of the graphs, while this differs from Cleveland and McGills example, it provided a clearer comparison and improved the users' grphical perception of the object. 
