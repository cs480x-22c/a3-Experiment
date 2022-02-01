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

    saveResultsToWeb()
    {

    }

    printResults()
    {
        console.log(this.userResults)
    }
}