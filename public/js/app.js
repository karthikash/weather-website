const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.querySelector('#send-location').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert ('Geolocation is not supported by your browser')
    } 
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetch('/current?latitude=' + latitude + '&longtitude=' + longitude).then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.err) {
                    messageOne.textContent = data.err
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.weather
                }
            })
        })
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.err) {
                messageOne.textContent = data.err
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })
})