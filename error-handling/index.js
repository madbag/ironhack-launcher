module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).render("not-found");
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);//from the the GET method, this error will come in the terminal and is used for developers

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {//checks if it is true or false
      res.status(500).render("error");
    }
  });
};
