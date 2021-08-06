export class PlayerList {
    // would be the playername that user input
    // in memory should be fine since it is just a state that can ignore
    constructor(private _playerList: Record<string, string[]> = {}) {}

    addPlayer(player: string, roomId: string){
        if(this._playerList[roomId]) {
            this._playerList[roomId].push(player)
        } else {
            this._playerList[roomId] = [player]
    }
    }

    removePlayer(player: string, roomId: string) {
        this._playerList[roomId] = this._playerList[roomId].filter(item => item !== player)
    }

    resetPlayerList(roomId: string) {
        const {[roomId]: filterout, ...rest} = this._playerList
        this._playerList = rest
    }

    currentPlayerList(roomId: string) {
        return this._playerList[roomId]
    }
}