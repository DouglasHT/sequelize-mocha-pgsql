const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'Flechas'}


describe('Postgres Strategy', () => {

    before(async function(){
        await context.connect()
    })

    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async () =>{
        const result = await context.create(MOCK_HEROI_CADASTRAR)    
        delete result.id    
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () =>{
        // const [posicao1, posicao2, posicao3] = ['esse e o 1', 'esse e o 2', 'esse e o 3']
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id        
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

})