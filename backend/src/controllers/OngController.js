const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {

    async selectAll(req, res){
        const data = await connection('ongs').select('*')
        
        return res.json(data)
    },

    async create(req, res){
        const {name, email, telefone, cidade, estado, uf} = req.body

        const id = crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert({
            id, name, email, telefone, cidade, estado, uf
        })
    
        return res.json({id})
    }
}