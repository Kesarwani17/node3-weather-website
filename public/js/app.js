const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address='+ location ).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address + "'s"+' Weather!'
                messageTwo.textContent = 'Weather at '+data.address+' is '+data.forecast.weather+'. It is '+data.forecast.temperature+'C and feels like '+data.forecast.feels_like+'C at '+data.location
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })

})