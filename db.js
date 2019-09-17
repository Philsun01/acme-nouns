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

const syncAndSeed = async() => {
  await conn.sync({force: true});

  const places = [
    {name: 'Torrance'},
    {name: 'Los Angeles'},
    {name: 'New York'}
  ];
  const [ Torrance, Los_Angeles, New_York ] = await Promise.all( places.map(place=>Place.create(place) ) );

  const people = [
    {name: 'Moe'},
    {name: 'Larry'},
    {name: 'Curly'}
  ];
  const [ Moe, Larry, Curly ] = await Promise.all( people.map(person=>Person.create(person) ) );

  const things = [
    {name: 'Foo'},
    {name: 'Bar'},
    {name: 'Bazz'}
  ];
  const [ Foo, Bar, Bazz ] = await Promise.all( things.map(thing=>Thing.create(thing) ) );

}

syncAndSeed();

