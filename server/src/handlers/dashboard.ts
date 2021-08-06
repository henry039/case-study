import {Socket, Server} from 'socket.io'
import {countingEnt, playerlistEnt} from '../../server'
import {logger} from '../../configs/logger'
import {serverEmitter} from '../../configs/event_emitter'

function resetAllAndSetNewServerInfo(roomId: string) {
    countingEnt.resetCount()
    playerlistEnt.resetPlayerList(roomId)
}

function handlePlayerJoin(roomBroadcaster: any, playerId: string, roomId: string) {
    logger.debug('--------------- player join -------------')
    playerlistEnt.addPlayer(playerId, roomId)
    const currentPlayerList = playerlistEnt.currentPlayerList(roomId)
    roomBroadcaster.emit('dashboard: player join', currentPlayerList)
}

function handlePlayerLeave(roomBroadcaster: any, playerId: string, roomId: string) {
    logger.debug('--------------- player leave -------------')
    playerlistEnt.removePlayer(playerId, roomId)
    const currentPlayerList = playerlistEnt.currentPlayerList(roomId)
    roomBroadcaster.emit('dashboard: player leave', currentPlayerList)
}

async function handlePlayerPress(roomBroadcaster: any, kind: 'orange' | 'blue', playerId: string, roomId: string) {
    logger.debug('--------------- player press -------------')
    await countingEnt.addEvent({createdAt: new Date().getTime(), kind, clientId: playerId, roomId})
    const currentCountByKind = await countingEnt.getCountingByKind(roomId)
    roomBroadcaster.emit('dashboard: player press', currentCountByKind)
}

async function handleGameStart(roomId: string) {
    logger.debug('--------------- game start -------------')
    await countingEnt.addEvent({createdAt: new Date().getTime(), kind: 'start', clientId: 'serverStart', roomId})
    serverEmitter.emit(`[${roomId}]server: game start`)
}

function handleCountDown(roomBroadcaster: any, roomId: string) {
    setTimeout(async () => {
        logger.debug('-------------- game end -----------------')
        const report = await countingEnt.getCountingByPlayer(roomId)
        roomBroadcaster.emit('dashboard: get report', report)
        serverEmitter.emit(`[${roomId}]server: game end`)
    }, 5 * 1000);
}

const onConnection = (socket: Socket, io: Server) => {
    const roomId = socket.handshake.query.roomId as string
    socket.join(roomId)
    logger.info('dashboard ready')
    const roomBroadcaster = io.of('dashboard').to(roomId)

    // each connection would create listener
    serverEmitter.on(`[${roomId}]server: player join`, (playerId: string) => handlePlayerJoin(roomBroadcaster, playerId, roomId))
    serverEmitter.on(`[${roomId}]server: player leave`, (playerId: string) => handlePlayerLeave(roomBroadcaster, playerId, roomId))
    serverEmitter.on(`[${roomId}]server: player press`, (kind: 'orange' | 'blue', playerId: string) => handlePlayerPress(roomBroadcaster, kind, playerId, roomId))

    socket.on('dashboard: game start', () => {
        handleCountDown(roomBroadcaster, roomId)
        handleGameStart(roomId)
        serverEmitter.emit(`[${roomId}]server: game start`)
    })

    socket.on('disconnecting', (reason) => {
        // remove when dashboard refresh or disconnect
        resetAllAndSetNewServerInfo(roomId)
        socket.leave(roomId)
        logger.warn('Dashboard Disconnected: ', reason)
    })

    socket.on('disconnect', () => {
        if(io.sockets.adapter.rooms[roomId] === undefined) {
            serverEmitter.removeAllListeners(`[${roomId}]server: player join`)
            serverEmitter.removeAllListeners(`[${roomId}]server: player press`)
        }
    })
}

const dashboardHandler = (io: Server) => {
    const dashboardNamespace = io.of('dashboard')

    dashboardNamespace.use((socket, next) => {
        const token = socket.handshake.auth.token
        if (token === 'xyz') {
            next()
        } else {
            next(new Error("unauthorized"))
        }
    })
    dashboardNamespace.on('connection', (socket) => onConnection(socket, io))
}

export default dashboardHandler