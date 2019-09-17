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

const Place = conn.define('place',{
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

const Thing = conn.define('thing',{
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

Person.belongsTo(Place);
Place.hasMany(Person);
Thing.belongsTo(Person);
Person.hasMany(Thing);


const syncAndSeed = async() => {
  await conn.sync({force: true});

  const places = [
    {name: 'Torrance'},
    {name: 'Los Angeles'},
    {name: 'New York'}
  ];
  const [ Torrance, Los_Angeles, New_York ] = await Promise.all( places.map(place=>Place.create(place) ) );

  const people = [
    {name: 'Moe', placeId: Torrance.id },
    {name: 'Larry', placeId: Los_Angeles.id },
    {name: 'Curly', placeId: New_York.id },
    {name: 'Shep', placeId: Los_Angeles.id }
  ];
  const [ Moe, Larry, Curly ] = await Promise.all( people.map(person=>Person.create(person) ) );

  const things = [
    {name: 'Foo', personId: Moe.id },
    {name: 'Bar', personId: Larry.id },
    {name: 'Bazz', personId: Curly.id }
  ];
  const [ Foo, Bar, Bazz ] = await Promise.all( things.map(thing=>Thing.create(thing) ) );

}

module.exports = {
  syncAndSeed,
  models: {
    Place,
    Person,
    Thing
  }
}

