export interface EventLog {
    createdAt: number // millisecond
    roomId: string, // uuid
    clientId: string, // display name
    kind: 'orange' | 'blue' | 'start'
}

export interface Count {
    blue: number
    orange: number
}

export interface DataSet {
    label: string
    data: number[]
    borderColor: string
    spanGaps: boolean
}
