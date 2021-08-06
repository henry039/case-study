import {Socket, Server} from 'socket.io'
import {serverEmitter} from '../../configs/event_emitter'
import {logger} from '../../configs/logger'

const clientHandler = (io: Server) => {
    const clientNamespace = io.of('client')
    
    clientNamespace.use((socket, next) => {
        const token = socket.handshake.auth.token
        if (token === 'abc') {
            next()
        } else {
            next(new Error("unauthorized"))
        }
    })

    clientNamespace.on('connection', (socket) => onConnection(socket, io))
}

const onConnection = (socket: Socket, io: Server) => {
    const roomId = socket.handshake.query.roomId as string
    socket.join(roomId)

    socket.on('client: player join', (playerName: string) => {
        serverEmitter.emit(`[${roomId}]server: player join`, playerName)
    })

    socket.on('client: player press', (kind: 'orange' | 'blue', playerName: string) => {
        serverEmitter.emit(`[${roomId}]server: player press`, kind, playerName)
    })

    serverEmitter.on(`[${roomId}]server: game start`, () => io.of('client').to(roomId).emit('client: game start'))
    serverEmitter.on(`[${roomId}]server: game end`, () => io.of('client').to(roomId).emit('client: game end'))

    socket.on("disconnecting", (reason) => {
        // once socket is disconnected all listener would be removed 
        serverEmitter.emit(`[${roomId}]server: player leave`, socket.handshake.query.playerName)
        socket.removeAllListeners()
        socket.leave(roomId)
        logger.info(socket.id, reason)
    });

    socket.on('disconnect', () => {
        if(io.sockets.adapter.rooms[roomId] === undefined) {
            serverEmitter.removeAllListeners(`[${roomId}]server: game start`)
            serverEmitter.removeAllListeners(`[${roomId}]server: game end`)
        }
    })
}

export default clientHandler