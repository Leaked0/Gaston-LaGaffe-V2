module.exports = async (app, express, session) => {

  app.use(express.urlencoded())
  app.use(express.json())
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

}