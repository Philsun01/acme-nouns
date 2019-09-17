const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/acme_nouns_db');

const { STRING, UUID, UUIDV4 } = Sequelize;

const Person = conn.define('person',{
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});
//const Place
//const Thing
