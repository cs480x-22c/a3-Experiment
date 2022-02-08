import Experiment from "../Experiment"


export default class Chart
{
    constructor(name)
    {
        this.name = name
        this.data = []
        this.bigValLoc = 0
        this.smallValLoc = 0
        this.experiment = new Experiment()
        this.labelColor = 'red'
    }
    
    getBigVal()
    {
        return this.data[this.bigValLoc].value
    }
    
    getSmallVal()
    {
        return this.data[this.smallValLoc].value
    }

    getCorrectAnswer()
    {
        return (this.getSmallVal() / this.getBigVal()) * 100
    }

    _generateData()
    {
        this.data = this.experiment.dummyDataGenerator.generate()
        this._pickBigSmallVals()
    }

    _pickBigSmallVals()
    {
        let specialValLocs = this.experiment.arrayUtils.nUniqueNumbers(2, 0, this.data.length-1)

        this.bigValLoc = specialValLocs[0]
        this.smallValLoc = specialValLocs[1]

        if(this.getBigVal() < this.getSmallVal())
        {
            let temp = this.bigValLoc
            this.bigValLoc = this.smallValLoc
            this.smallValLoc = temp
        }
    }
    
}