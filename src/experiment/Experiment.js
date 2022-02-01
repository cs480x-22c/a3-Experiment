import DummyDataGenerator from "./data/DummyDataGenerator"
import UserResults from "./data/UserResults"
import Sizes from "./utils/Sizes"
import * as d3 from 'd3'
import TrialManager from "./TrialManager"
import ArrayUtils from "./utils/ArrayUtils"
import Graph from "./charts/Graph"

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
        

        //might not need actually
        this.sizes = new Sizes()
        this.arrayUtils = new ArrayUtils()

        this.userResults = new UserResults()
        this.dummyDataGenerator = new DummyDataGenerator(5, 10, 0, 100, 1)
        this.trialManager = new TrialManager(20, [new Graph("test")], "guessField", "submitGuess")
    }

    
}