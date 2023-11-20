const express = require('express');
const mongoose= require('mongoose')
const ShortUrl= require('./models/shortUrl');
const app = express()

const MONGOURL = "mongodb+srv://haiderkamran8603:uWVdAje3xtHYhw4L@cluster0.gq3o5tf.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGOURL,{
    useNewUrlParser: true, useUnifiedTopology: true
})
// haiderkamran8603
// uWVdAje3xtHYhw4L
app.set('view engine', 'ejs') // pug
// d9OnhlSsMSVdM3r3N1ymYF8CJ2CHsoS8UGEX19aoPLwoitVwl4 - secret
app.use(express.urlencoded({extended:false}))

app.get('/', async(req, res)=> {
    const shortUrls= await ShortUrl.find()
    console.log("ShortURLS", shortUrls);
    res.render('index', { shortUrls: shortUrls, name: "Kamran" })
})

app.post('/shortUrls', async (req, res)=> {
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/');
});

app.get('/:key', async (req, res) => {
   const shortUrl = await ShortUrlhortUrl.findOne({short: req.params.key })
   if(shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});