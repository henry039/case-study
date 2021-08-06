import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import ClientHandler from './src/handlers/client'
import DashboardHandler from './src/handlers/dashboard'
import path from 'path'
import {PORT} from './configs/env'
import {v4} from 'uuid'
import {logger} from './configs/logger'

// repo 
// import EventLogRepo from './src/domains/repo/inmemory_event_log_repo'
// const eventLogRepo = new EventLogRepo()
import {KnexConn} from './configs/knex'
import EventLogRepo from './src/domains/repo/event_log_repo'
const eventLogRepo = new EventLogRepo(KnexConn)

// entities
import {PlayerList, Counting} from './src/domains/entites'
export const playerlistEnt = new PlayerList()
export const countingEnt = new Counting(eventLogRepo)

/** Middlewares */
import {HealthCheckHanlder} from './src/middlewares/health'

// server 
const app = express()
app.use('/public/dashboard', express.static(path.join(__dirname, 'public', 'dashboard')))
app.use('/public/client', express.static(path.join(__dirname, 'public', 'client')))
app.get('/health', HealthCheckHanlder)
app.get('/dashboard', (_, res) => res.redirect(`/dashboard/${v4()}`))
app.get('/dashboard/:roomId', (_, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html')))
app.get('/client/:roomId', (_, res) => res.sendFile(path.join(__dirname, 'public', 'client', 'index.html')))
const server = http.createServer(app)
const io = new Server(server)
ClientHandler(io)
DashboardHandler(io)

server.listen(PORT, () => {
  logger.info(`Websocket server is up and listening on PORT:${PORT}`);
});
