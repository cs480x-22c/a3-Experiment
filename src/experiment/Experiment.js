import DummyDataGenerator from "./data/DummyDataGenerator.js"
import UserResults from "./data/UserResults.js"
import Sizes from "./utils/Sizes.js"
import * as d3 from 'd3'
import TrialManager from "./TrialManager.js"
import ArrayUtils from "./utils/ArrayUtils.js"
import RadialBarChart from "./charts/RadialBarChart.js"
import BarChart from "./charts/BarChart.js"
import PieChart from "./charts/PieChart.js"
import Agreement from "./Agreement.js"

let instance = null

export default class Experiment 
{
    constructor(_svgID)
    {   
        if(instance)
        {
            return instance
        }
        instance = this
        
        this.svg = d3.select("#" + _svgID)
        
        this.agreement = new Agreement('agreeBtn', 'agreement', 'main')
        this.sizes = new Sizes()
        this.arrayUtils = new ArrayUtils()

        this.userResults = new UserResults()
        this.dummyDataGenerator = new DummyDataGenerator(5, 10, 5, 100, 1)
        this.trialManager = new TrialManager(20, [new PieChart(), new RadialBarChart(), new BarChart()], "guessField", "submitGuess")
    }

}