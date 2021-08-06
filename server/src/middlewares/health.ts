import {Request, Response} from 'express'
import {KnexConn} from '../../configs/knex'

export const HealthCheckHanlder = async (req: Request, res: Response) => {
    let DB_CONNECTION = ''
    await KnexConn.raw('select 1+1 as result')
        .then(() => DB_CONNECTION = 'active')
        .catch((err) => DB_CONNECTION = `Inactive - ${err}`)
    const appInfo = {
        TIME: new Date().toISOString(),
        DB_CONNECTION: DB_CONNECTION
    }
    res.status(200).json(appInfo)
}