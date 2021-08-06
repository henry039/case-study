import { EventLog } from "../modals";

export interface EventLogRepo {
    addEvent: (input: EventLog) => Promise<void>
    reset?: () => void
    filterLogsByRoomId: (serverId: string) => Promise<EventLog[]>
    // countingByKind?: (serverId: string) => Count
    // countingByPlayer?: (serverId: string) => DataSet[]
}