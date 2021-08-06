import {Knex} from 'knex'
import { EventLog } from "../modals";
import {EventLogRepo} from './event_log'

export default class EventLogRepoImpl implements EventLogRepo {
    constructor(private _knexConn: Knex){}
    
    async addEvent(input: EventLog) {
        await this._knexConn.insert(input).from('event_logs')
    }

    async filterLogsByRoomId(roomId: string): Promise<EventLog[]> {
        return this._knexConn.select<string, EventLog>('*').where({roomId}).from('event_logs')
    }
}