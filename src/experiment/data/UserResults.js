import { nanoid } from 'nanoid'
export default class UserResults
{

    constructor()
    {
        this.userID = nanoid(6)
        this.userResults = []
    }

    saveResult(trialNumber, graphName, actual, reported)
    {
        let result = 
        {   
            'trialNumber': trialNumber,
            "graph": graphName,
            "actual": actual,
            "reported": reported
        }

        this.userResults.push(result)
    }

    calculateUserScore()
    {
        let average = 0;
        this.userResults.map(trial => (trial.reported > trial.actual) ? (trial.actual/trial.reported) : (trial.reported /trial.actual)).forEach(value => average += value)
        return Math.floor(average / this.userResults.length * 100)
    }

    printResults()
    {
        let resultsCSV = ""
        this.userResults.forEach(trial =>
            {
                resultsCSV += `\"${this.userID}\",${trial.trialNumber},\"${trial.graph}\",${trial.actual},${trial.reported}\n`
            })
        console.log(resultsCSV)
    }
}