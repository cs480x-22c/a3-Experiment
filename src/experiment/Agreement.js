export default class Agreement
{
    constructor(buttonID, agreementDivID, visualID)
    {
        this.button = document.getElementById(buttonID)
        this.agreementDiv = document.getElementById(agreementDivID)
        this.visual = document.getElementById(visualID)

        this.button.addEventListener('click', () => this.onButtonSubmit())
    }

    onButtonSubmit()
    {
        this.agreementDiv.remove()
        this.visual.classList.remove('hidden')
    }
}