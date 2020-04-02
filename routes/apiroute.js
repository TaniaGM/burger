const db = require("../models");

module.exports = {
  postBurgerApi: async function(req, res) {
    const dbBurger = await db.Burger.create(req.body);
    res.json(dbBurger);
  },
  api: function(app) {
    // Get all burgers
    app.get("/api/burgers", function(req, res) {
      db.Burger.findAll({}).then(function(dbBurgers) {
        res.json(dbBurgers);
      });
    });

    // Get a burger
    app.get("/api/burgers/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Burger.findAll({ where: { id: req.params.id } }).then(function(
        dbBurgers
      ) {
        console.log(dbBurgers);
        res.json(dbBurgers[0]);
      });
    });

    // Create a new burger
    app.post("/api/burgers", this.postBurgerApi);

    // Change an existing burger's devoured value to true
    app.put("/api/burgers/:id", function(req, res) {
      db.Burger.update(
        { devoured: true },
        { where: { id: req.params.id } }
      ).then(function(dbBurger) {
        res.json(dbBurger);
      });
    });

    // Delete a burger by id
    app.delete("/api/burgers/:id", function(req, res) {
      db.Burger.destroy({ where: { id: req.params.id } }).then(function(
        dbBurger
      ) {
        res.json(dbBurger);
      });
    });
  }
};