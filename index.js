const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const middleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/check', (req, res) => {
  const userAge = req.body.age

  if (userAge >= 18) {
    return res.redirect(`major?age=${userAge}`)
  } else {
    return res.redirect(`minor?age=${userAge}`)
  }
})

app.get('/major', middleware, (req, res) => {
  return res.render('major', {
    age: req.query.age
  })
})

app.get('/minor', middleware, (req, res) => {
  return res.render('minor', {
    age: req.query.age
  })
})

app.listen(3000)
