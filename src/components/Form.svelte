<script>
    let submitForm = async (form) => {
    //get this using prefill link
    const formID = "1FAIpQLSdiON02QMfiQt4U29xJgY_Kk2rL5XONc5D9sz3qyps0CSbmfA"
    
    let fields = {
        "1": "entry.1250327149",
        "2": "entry.1550003358",
        "3": "entry.796467503",
        "4": "entry.414099223",
        "5": "entry.1191868527",
        "6": "entry.707594900",
        "7": "entry.1899165164",
        "8": "entry.1742913110",
        "9": "entry.2089839453",
        "10": "entry.2022321668",
    }

    let data = new FormData(form.currentTarget);

    let url = `https://docs.google.com/forms/d/e/${formID}/formResponse?usp=pp_url`;
    Object.keys(fields).forEach((key,index) => {
        let response = data.get(key);
        url += `&${fields[key]}=${response ? response : 'empty'}`
    });
    url += '&submit=Submit';

    const res = await fetch(url, {
        mode: 'no-cors'
    });
    return res;
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <input type="number" name="1"/>
    <input type="number" name="2"/>
    <input type="submit"/>
</form>
<button on:click={submitForm}>Submit Me</button>