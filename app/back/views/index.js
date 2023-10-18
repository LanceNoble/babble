main()

async function main() {
    let storyRes = await fetch('/story', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    let storyJson = await storyRes.json()
    document.querySelector('#story').innerHTML = storyJson.text

    let userRes = await fetch('/user', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    let userJson = await userRes.json()

    let form = document.querySelector('form')
    let note = document.querySelector('#note')
    if (Date.now() >= Date.parse(userJson.availability) - 5000) {
        form.style.display = 'block'
        note.style.display = 'none'
    }
    else {
        form.style.display = 'none'
        note.style.display = 'block'
        note.innerHTML += `${new Date(userJson.availability).toLocaleDateString()} ${new Date(userJson.availability).toLocaleTimeString()}`
    }



    form.onsubmit = async (e) => {
        e.preventDefault()
        const character = e.target.querySelector('#character').value
        if (character.length > 1) {
            alert('Your input cannot be more than one character')
            return false
        }

        await fetch('/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ text: storyJson.text += character })
        })

        let newDate = Date.now() + 86400000

        await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ availability: newDate })
        })

        storyRes = await fetch('/story', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        storyJson = await storyRes.json()
        document.querySelector('#story').innerHTML = storyJson.text

        userRes = await fetch('/user', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        userJson = await userRes.json()

        form = document.querySelector('form')
        note = document.querySelector('#note')
        if (Date.now() >= Date.parse(userJson.availability)) {
            form.style.display = 'block'
            note.style.display = 'none'
        }
        else {
            form.style.display = 'none'
            note.style.display = 'block'
            note.innerHTML += userJson.availability
        }

        return false
    }
}