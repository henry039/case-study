import dotenv from 'dotenv-safe'
import path from 'path'

dotenv.config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.sample')
})

// SERVER
export const PORT = process.env.PORT || 6582

// DB
export const DB_CLIENT = process.env.DB_CLIENT || ''
export const DB_HOST = process.env.DB_HOST || ''
export const DB_NAME = process.env.DB_NAME || ''
export const DB_ACC = process.env.DB_ACC || ''
export const DB_PWD = process.env.DB_PWD || ''
export const DB_TABLE = process.env.DB_TABLE || ''
