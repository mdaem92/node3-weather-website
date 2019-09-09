const request = require('request')
const chalk = require('chalk')
const green = chalk.green

module.exports = (address,callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoidG9tbXkxOTkyIiwiYSI6ImNrMDUxeW13NzBhYWkzbHBjdjI1eWNmYW8ifQ.XxaAlqxwH9p0A_cTfY5SDQ&limit=1'

    request({url, json: true },(error,{body}) =>{

        if(error){
            callback('unable to connect',undefined)
        } else if(body.features.length === 0){  
            console.log('features empty')
            callback('unable to find location ',undefined)
            
        } else {
             
             callback(undefined,{
                 lat: body.features[0].center[1],
                 long: body.features[0].center[0],
                 loc: body.features[0].place_name
             })
         }
      
    })


}
