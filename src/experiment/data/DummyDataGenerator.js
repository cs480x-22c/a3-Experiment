export default class DummyDataGenerator
{
    constructor(minDataPoints, maxDataPoints, minDataValue, maxDataValue, dataIncriment)
    {
        this.minDataPoints = minDataPoints
        this.maxDataPoints = maxDataPoints
        this.minDataValue = minDataValue
        this.maxDataValue = maxDataValue
        this.dataIncriment = dataIncriment
    }

    generate()
    {
        let data = []
        for(let i = 0; i < Math.floor(Math.random() * (this.maxDataPoints - this.minDataPoints)) + this.minDataPoints; i++)
        {
            data.push(this._generateSingleDataPoint())
        }
        return data
    }

    _generateSingleDataPoint()
    {
        let data = 
        {
            "value": this._generateRandomValue()
        }
        return data
    }

    /**
     * Generates random value from minDataValue to maxDataValue with an incriment of dataIncriment
     */
    _generateRandomValue()
    {
        return Math.floor(Math.random() * (this.maxDataValue - this.minDataValue) / this.dataIncriment) * this.dataIncriment + this.minDataValue
    }
}