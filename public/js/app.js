console.log('Client side javascript file is loaded!')
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input') 
const messageOne=document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{

// prevents the browser to reset when input is added to form
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error    

        } else{
            
            messageOne.textContent =data.location
            messageTwo.textContent = data.forecast
            console.log(data.forecast)
        }


    })
    
})
    
})