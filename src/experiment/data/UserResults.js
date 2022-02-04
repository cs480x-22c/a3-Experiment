export default class UserResults
{

    constructor()
    {
        this.userResults = []
    }

    saveResult(graphName, actual, guess)
    {
        let result = 
        {
            "graph": graphName,
            "actual": actual,
            "guess": guess
        }

        this.userResults.push(result)
    }

    calculateUserScore()
    {
        let average = 0;
        this.userResults.map(trial => (trial.guess > trial.actual) ? (trial.actual/trial.guess) : (trial.guess /trial.actual)).forEach(value => average += value)
        return Math.floor(average / this.userResults.length * 100)
    }

    saveResultsToWeb()
    {

    }

    printResults()
    {
        console.log(this.userResults)
    }
}