const path = require('path')
const hbs = require('hbs')
const express = require('express')
 
const location = require('./utils/location')
const geocode = require('./utils/geocode')
// const geocode = require('')


//initialize express
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')


//set paths
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
//assign view engine and set views directory to viewspath
app.set('view engine', 'hbs')
app.set('views',viewspath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialspath)

app.get('', (req, res) => {
    res.render('index',{
        title: "Weather app",
        name: "doodooli"
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help",
        name: "doodooli",
        message:"how can i help?"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About",
        name: "doodooli",
        message:" About us page"
    })
    
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })
app.get('/weather', (req, res) => {
  
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, long, loc }={}) => {
        
        if (error) {
            return res.send({ error })
        }
        location(lat, long, (error, forecastData={}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: loc,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must specify search'
        })

    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    // res.send('help article not found')
    res.render('404',{
        msg: 'Cannot find the help file you are looking for.'
    })
})
//match anything that hasnt been matched so far 
app.get('*',(req,res)=>{
    // res.send('my 404 page')
    res.render('404',{
        msg: 'Cannot find the page you are looking for.',
        name: 'doodooli'
    })

})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})