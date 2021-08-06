import pino from 'pino'

export const logger = pino({
    name: 'game-server',
    timestamp: () => `, "time": "${new Date().toISOString()}"`
})