const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura_min:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    peso_min:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    altura_max:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    peso_max:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    anosVida:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, 
  {
    timestamps: false // Excluye las propiedades createdAt y updatedAt
  }
  );
};
