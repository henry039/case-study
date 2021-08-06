import { FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks'
import io, {Socket} from 'socket.io-client'
import styles from './content.css' 

interface ContentParams {
    playerName: string
}

const Content: FunctionalComponent<ContentParams> = (input) => {
    const [socketConn, setSocketConn] = useState<Socket>()
    const [isGameStart, setIsGameStart] = useState<boolean>(false)
    const [isGameEnd, setIsGameEnd] = useState<boolean>(false)

    useEffect(() => {
        const roomId = new URL(window.location.href).pathname.split('/')[2]
        const socket = io("http://localhost:65431/client", { transports: ["websocket"], auth: {token: 'abc'}, query: {roomId, playerName: input.playerName}})
        setSocketConn(socket)
        socket.emit('client: player join', input.playerName)
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        if(socketConn) {
            socketConn.on('client: game end', () => {
                setIsGameEnd(true)
                socketConn.disconnect()
            })
            socketConn.on('client: game start', () => setIsGameStart(true))
            socketConn.on('connect_error', (err) => {
                console.log('Connection Error: : ', err.message)
                socketConn.disconnect()
            })
        } 
    }, [socketConn])

    const handlePress = (e: h.JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        socketConn?.emit('client: player press', (e.target as any).value, input.playerName)
    }

    return (
        <div>
            <p>{input.playerName}</p>
            <p>Instructions: There are 2 buttons down below please hit that to score within 5 seconds</p>
            <p>{isGameStart ? 'Hit Those Button' : 'The Game Will start soon. Get Ready'}</p>
            <div className={styles.container}>
                <button disabled={isGameStart ? isGameEnd ? true : false : true} onClick={handlePress} value='orange' className={`${styles.btn} ${styles.orange}`} />
                <button disabled={isGameStart ? isGameEnd ? true : false : true} onClick={handlePress} value='blue' className={`${styles.btn} ${styles.blue}`} />
            </div>
            {isGameEnd && <p>The Time Is Up !!!! Good Job Guys</p>}
        </div>
    );
};

export default Content;