export class ServerInfo {
    constructor(private _serverId: string, private _gameStatus: boolean = false) {}

    getServerId() {
        return this._serverId
    }

    setServerId(serverId: string) {
        this._serverId = serverId
    }

    getGameStatus() {
        return this._gameStatus
    }

    setGameStatus(status: boolean) {
        return this._gameStatus = status
    }
}