const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize')

class Postgres extends IDb {
  constructor() {
    super();
    this._driver = null
    this._herois = null
  }

  async isConnected(){
    try{

      await this._driver.authenticate()
      return true

    }catch(error){
      console.log('FAIL', error);

      }
  }

  async defineModel(){
    this._herois = this._driver.define('herois', {
      id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
      },
      nome: {
          type: Sequelize.STRING,
          required: true,
      },
      poder: {
          type: Sequelize.STRING,
          required: true,
      }
  },{
      tableName: 'TB_HEROIS',
      freezeTableName: false,
      timestamps: false
  })

  await this._herois.sync()
  }

  async create(item) {
    const { dataValues }  = await this._herois.create(item);
    return dataValues;
  }


  read(item = {}) {
    return this._herois.findAll({where: item, raw: true});
  }

  update(id, item){
    return  this._herois.update(item, { where: {id: id}} );
  }


  async delete(id){
    const query = id ? {id} : {}
    return this._herois.destroy({where: query})
  }

  async connect(){
    this._driver = new Sequelize(
      'herois',
      'admin',
      'admin',
      {
          host: 'localhost',
          dialect: 'postgres',
          quoteIdentifiers: false,
          operatorAliases: false
      }
    )
    await this.defineModel()
  }


}

module.exports = Postgres;
