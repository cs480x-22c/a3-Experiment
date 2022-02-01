export default class ArrayUtils
{
    shuffle(array)
    {
        return array.sort(() => Math.random - 0.5)
    }

    nUniqueNumbers(total, min, max)
    {
        let numbersArray = []
        for(let i = min; i <= max; i += 1)
        {
            numbersArray.push(i)
        }

        numbersArray = this.shuffle(numbersArray)

        if(total <= max-min)
            return numbersArray
        
        let randomNums = [];
        for(let i = 0; i < total; i++)
        {
            randomNums.push(numbersArray[i])
        }
        return randomNums    
    }
}