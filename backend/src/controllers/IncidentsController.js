const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const {title, description, value} = req.body
        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        })

        return res.json({id})
    },

    async selectAll(req, res){
        const { page = 1 } = req.query

        const [count] = await connection('incidents').count()

        const data = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.telefone', 'ongs.cidade', 'ongs.uf'])

        res.header('X-total-Count', count['count(*)'])

        return res.json(data)
    },

    async delete(req, res){
        const {id} = req.params

        const ong_id = req.headers.authorization

        const data = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

            if(data.ong_id !== ong_id){
                return res.status(401).json("Operação não permitida")
            }

            await connection('incidents').where('id', id).delete()

            return res.status(204).send()
    }
}