module.exports = function(sequelize, DataTypes) {
  const Burger = sequelize.define("Burger", {
    burger_name: DataTypes.STRING,
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Burger;
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
