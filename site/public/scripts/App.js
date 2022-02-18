/////////////////////////////////////////////////////////////////////////////////
//
// Title:            App.js
// Semester:         Spring 2022
//
// Author:           Matthew Aguiar
// CS Login:         mcaguiar
// Lecturer's Name:  Lane Harrison
//
// Description:      This file contains the App class which contains the main
//                   methods for running this application.
//
/////////////////////////////////////////////////////////////////////////////////

class App
{
    //Class Constants
    static STATE_ENUM = {START: 0, EXPERIMENT: 1, FINISH: 2};
    static MAX_VISUALIZATIONS = 60;
    static MAX_PIE_VIZ = 20;
    static MAX_HOR_BAR_VIZ = 20;
    static MAX_VERT_BAR_VIZ = 20;
    static MAX_DATA_POINTS = 10;
    static DATA_POINT_MIN = 0;
    static DATA_POINT_MAX = 100;
    static DATA_GENERATOR = new DataGenerator();

    //Class Variables
    static state = App.STATE_ENUM.START; //Always start in START when page is loaded
    static progress = 0;
    static charts = [ //Each object in this array contains a class reference that can be instantiated!
        { Chart: PieChart, remaining: App.MAX_PIE_VIZ, horizontal: false },
        { Chart: BarChart, remaining: App.MAX_HOR_BAR_VIZ, horizontal: true },
        { Chart: BarChart, remaining: App.MAX_VERT_BAR_VIZ, horizontal: false }
    ];
    static chart = null;
    static enter_pressed = false;

    static main()
    {
        //Perform First State
        App.next_state();

        //Attach Handler to Enter Key
        window.addEventListener("keypress", App.process_key);
        window.addEventListener("keyup", event => { App.enter_pressed = false; })
    }

    static process_key(event)
    {
        if(event.code === "Enter" && App.enter_pressed === false)
        {
            //Set Enter Flag
            App.enter_pressed = true;

            //Check user Input from Previous Chart
            if (App.progress > 0 && App.progress < (App.MAX_VISUALIZATIONS + 1))
                App.process_guess();

            //Advance to next State
            App.next_state(); //Go to next state if [enter] key is pressed
        }
    }

    static process_guess()
    {
        //Local Variables
        let input = parseInt("0" + document.getElementById("response-input").value);
        let chart_type =
            (App.chart instanceof PieChart) ? "Pie"
            : (App.chart.horizontal === false) ? "Vertical Bar" :
            "Horizontal Bar";
        let true_percent = Math.round(Math.abs(
            1 - (Math.min(App.chart.data.points[App.chart.data.element1_index].value,
                App.chart.data.points[App.chart.data.element2_index].value)
            / Math.max(App.chart.data.points[App.chart.data.element1_index].value,
                App.chart.data.points[App.chart.data.element2_index].value))
        ) * 100);

        //Store Guess
        window.DATABASE.push(window.DATABASE.ref(window.DATABASE.getDatabase()), {
            VisType: chart_type,
            TruePercent: true_percent,
            ReportedPercent: input
        });
    }

    static next_state()
    {
        switch(App.state)
        {
            case App.STATE_ENUM.START:
                document.getElementById("header").innerText = WELCOME_HEADER;
                document.getElementById("info").innerText = WELCOME_STRING;
                document.getElementById("response-label").innerText = PRESS_ENTER_STRING;
                App.state = App.STATE_ENUM.EXPERIMENT; //Get ready for experiment next time.
                break;

            case App.STATE_ENUM.EXPERIMENT:
                App.progress++;
                document.getElementById("header").innerText = EXPERIMENT_STRING;
                document.getElementById("info").innerText = App.progress.toString() + " / " + App.MAX_VISUALIZATIONS.toString();
                document.getElementById("content").innerHTML = "";
                document.getElementById("response-input").style.display = "inline";
                document.getElementById("response-input").value = "";
                App.chart = App.get_random_chart();
                console.log(App.chart, App.charts);
                App.chart.draw();
                if(App.progress === App.MAX_VISUALIZATIONS)
                    App.state = App.STATE_ENUM.FINISH
                break;

            case App.STATE_ENUM.FINISH:
                App.progress++;
                document.getElementById("header").innerText = EXIT_HEADER;
                document.getElementById("info").innerText = EXIT_STRING;
                document.getElementById("response-label").innerText = "";
                document.getElementById("content").innerHTML = "";
                document.getElementById("response-input").style.display = "none";
        }
    }

    //Returns a Chart type of some kind
    static get_random_chart()
    {
        //Local Variables
        let chart_type = App.charts[Math.floor(Math.random()*App.charts.length)]; //Get random chart type
        let chart = chart_type.Chart; //Store reference to a Chart [sub]class

        //Decrement the Number of Charts to Test
        chart_type.remaining--;

        //Remove Chart Type from Array if All Done
        if(chart_type.remaining === 0)
            App.charts.splice(App.charts.indexOf(chart_type), 1);

        //Return New Chart Object
        return new chart(App.DATA_GENERATOR.generate_data(App.MAX_DATA_POINTS, App.DATA_POINT_MIN, App.DATA_POINT_MAX), chart_type.horizontal);
    }
}