const request = require('request')

module.exports = (lat,long,callback)=>{

    const url = 'https://api.darksky.net/forecast/56916e3c4a1e93b7b8886dc36c982bdf/'+lat+','+long+'?units=si'

    request({url,json: true},(err,{body})=>{
        if(err){
            callback('unable to connect to darksy api',undefined)
        } else if(body.err){
            callback('invalid input',undefined)
        } else{
            console.log(url)
            callback(undefined,{timezone: body.timezone, forecast: body.daily.data[0].summary,humidity: body.daily.data[0].precipProbability,temp: body.currently.temperature})
        }

    })


}