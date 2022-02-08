export default class ArrayUtils
{
    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     * 
     * FROM: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
     */
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    nUniqueNumbers(total, min, max)
    {
        let numbersArray = []
        for(let i = min; i <= max; i += 1)
        {
            numbersArray.push(i)
        }

        numbersArray = this.shuffle(numbersArray)

        if(total >= max-min)
            return numbersArray
        
        let randomNums = []
        for(let i = 0; i < total; i++)
        {
            randomNums.push(numbersArray[i])
        }
        return randomNums    
    }
}