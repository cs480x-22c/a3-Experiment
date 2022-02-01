export default class ArrayUtils
{
    shuffle(array)
    {
        return array.sort(() => Math.random - 0.5)
    }
}