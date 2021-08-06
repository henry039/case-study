import {EventLogRepo} from '../repo/event_log'
import {EventLog, Count, DataSet} from '../modals'

export class Counting {
    constructor(private _repo: EventLogRepo) {}

    resetCount() {
        if(this._repo.reset) this._repo.reset()
    }

    async addEvent(input: EventLog): Promise<void> {
        await this._repo.addEvent(input)
    }

    getEventLogs(roomId: string): Promise<EventLog[]> {
        return this._repo.filterLogsByRoomId(roomId)
    }

    async getCountingByKind(roomId: string): Promise<Count> {
        const logs = await this.getEventLogs(roomId)
        return logs.reduce((acc, curr) => {
            const {kind} = curr
            acc[kind] += 1
            return acc
        }, {orange: 0, blue: 0} as Count)
    }

    /**
     * for line chart data set by player per second perfomance
     * let start event as base 0s record
     * group event every second starting from start event
     * datasets: [
                    {
                        label: 'playername 1',
                        data: [12, 19, 3, 5, 2, 3], // hit per second
                        borderColor: dynamicColors()
                    },
                    {
                        label: 'playername 2',
                        data: [],
                        borderColor: dynamicColors()
                    },
                ]
     */
    async getCountingByPlayer(roomId: string): Promise<DataSet[]> {
        const logs = await this.getEventLogs(roomId)
        const start = logs[0].createdAt
        const dataGroupByPlayer = logs.reduce((acc, curr) => {
            const {clientId, createdAt} = curr
            if (clientId === 'serverStart') return acc
            acc[clientId] ? acc[clientId].push(createdAt) : acc[clientId] = [createdAt]
            return acc
        }, {})
        const dataGroupBySecond = Object.keys(dataGroupByPlayer).map(key => ({
            label: key,
            data: this.handleGroupBySecond(start, dataGroupByPlayer[key]),
            borderColor: this.dynamicColors(),
            spanGaps: true
        }))
        return dataGroupBySecond
    }

    private dynamicColors() {
        const randomHexCode = () => Math.floor(Math.random() * 255)
        return `rgb(${randomHexCode()},${randomHexCode()},${randomHexCode()})`;
    };

    private handleGroupBySecond(start:number, dataSet: number[]) {
        return dataSet.reduce((acc, curr) => {
            const secondToPress = Math.floor((curr - start) / 1000)
            acc[secondToPress] ? acc[secondToPress] += 1 : acc[secondToPress] = 1
            return acc
        }, [] as number[])
    }
}