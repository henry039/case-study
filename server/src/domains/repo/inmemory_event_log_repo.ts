import { EventLog } from "../modals";
import {EventLogRepo} from './event_log'

export default class InMemoryEventLogRepoImpl implements EventLogRepo {
    constructor(private _logs: EventLog[] = []){}

    reset() {
        this._logs = []
    }

    async addEvent(input: EventLog) {
        this._logs.push(input)
    }

    async filterLogsByRoomId(roomId: string): Promise<EventLog[]> {
        return this._logs.filter(item => item.roomId === roomId)
    }

    // for current count display
    // would ignore the start event log
    // countingByKind(serverId: string): Count {
    //     return this.filterLogsByServerId(serverId)
    //         .reduce((acc, curr) => {
    //             const {kind} = curr
    //             acc[kind] += 1
    //             return acc
    //     }, {orange: 0, blue: 0})
    // }  
    
    // private dynamicColors() {
    //     const randomHexCode = () => Math.floor(Math.random() * 255)
    //     return `rgb(${randomHexCode()},${randomHexCode()},${randomHexCode()})`;
    // };

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
    // countingByPlayer(serverId: string) {
    //     const allData = this.filterLogsByServerId(serverId)
    //     const start = allData[0].createdAt
    //     const dataGroupByPlayer = allData.reduce((acc, curr) => {
    //         const {clientId, createdAt} = curr
    //         if (clientId === 'serverStart') return acc
    //         acc[clientId] ? acc[clientId].push(createdAt) : acc[clientId] = [createdAt]
    //         return acc
    //     }, {})
    //     const dataGroupBySecond = Object.keys(dataGroupByPlayer).map(key => ({
    //         label: key,
    //         data: this.handleGroupBySecond(start, dataGroupByPlayer[key]),
    //         borderColor: this.dynamicColors(),
    //         spanGaps: true
    //     }))
    //     return dataGroupBySecond
    // }

    // private handleGroupBySecond(start:number, dataSet: number[]) {
    //     return dataSet.reduce((acc, curr) => {
    //         const secondToPress = Math.floor((curr - start) / 1000)
    //         acc[secondToPress] ? acc[secondToPress] += 1 : acc[secondToPress] = 1
    //         return acc
    //     }, [] as number[])
    // }
}