import { timeThursdays } from "d3";
import Experiment from "./Experiment";

export default class TrialManager
{
    constructor(trialsPerGraph, graphs, inputBoxID, submitBtnID)
    {
        this.trialsPerGraph = trialsPerGraph
        this.totalTrials = trialsPerGraph * graphs.length
        this.currentTrial = 1;
        this.experiment = new Experiment()
        this.inputField = document.getElementById(inputBoxID)
        this.btn = document.getElementById(submitBtnID)
        this.btn.addEventListener('click', () => this.onButtonSubmit())
        window.addEventListener('keydown', (e) => {if(e.code == "Enter") 
                                                        this.onButtonSubmit()})
        this.currentChart = null

        //Loading Trials into array
        this.chartTrials = []
        graphs.forEach(graph =>
        {
            for(let i = 0; i < this.trialsPerGraph; i++)
                this.chartTrials.push(graph)        
        })

        this.experiment.arrayUtils.shuffle(this.chartTrials)
        this.startNewTrial()
    }

    startNewTrial()
    {   
        this.inputField.focus()
        this.currentChart = this.chartTrials[this.currentTrial - 1]
        this.currentChart.load()
    }

    onTrialEnd(userResponse)
    {
        //Erase SVG
        this.experiment.svg.selectAll('*').remove()

        this.currentTrial++

        this.experiment.userResults.saveResult(this.currentChart.name, this.currentChart.getCorrectAnswer(), userResponse)

        if(this.currentTrial <= this.totalTrials)
        {
            this.startNewTrial()
        }
        else
        {
            this.experiment.userResults.printResults()
            alert("Thank you for taking part in this experiment!")
        }
    }

    onButtonSubmit()
    {
        let answer = this.inputField.value
        if(answer != "" && !isNaN(answer))
        {
            //reset input field
            this.inputField.value = ""
            this.onTrialEnd(+answer)
        }
    }    
}