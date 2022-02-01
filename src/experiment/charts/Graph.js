import { thresholdScott } from "d3"
import Experiment from "../Experiment"

export default class Graph
{
    constructor(name)
    {
        this.name = name
        this.data = []
        this.bigValLoc = 0
        this.smallValLoc = 0
        this.experiment = new Experiment()
    }

    getBigVal()
    {
        return this.data[this.bigValLoc].value
    }

    getSmallVal()
    {
        return this.data[this.smallValLoc].value
    }

    load()
    {
        this.data = this.experiment.dummyDataGenerator.generate()
        this._pickBigSmallVals()

        console.log(this.getBigVal())
        console.log(this.getSmallVal())
        
        this.experiment.svg.append("rect")
                .attr("width", 100)
                .attr("height", 100)
                .attr("fill", "pink")
    }

    _pickBigSmallVals()
    {
        this.bigValLoc = this.smallValLoc = Math.floor(Math.random() * this.data.length)
        console.log(this.bigValLoc + " " + this.smallValLoc)
        //while(this.smalValLoc == this.bigValLoc)
        //{
            console.log("pass")
            this.smallValLoc = Math.floor(Math.random() * this.data.length)
        //}
    }
    
}