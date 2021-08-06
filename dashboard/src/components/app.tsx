import { FunctionalComponent, h } from 'preact';
import {useState,useEffect, useRef} from 'preact/hooks'
import io, {Socket} from 'socket.io-client'
import {Chart, registerables} from 'chart.js'
import QRCode from 'qrcode.react'

interface Count {
    orange: number
    blue: number
}

const App: FunctionalComponent = () => {
    const [socketConn, setSocketConn] = useState<Socket>()
    const [count, setCount] = useState<Count>({orange: 0, blue: 0})
    const [playerList, setPlayerList] = useState<string[]>([])
    const [report, setReport] = useState<{label: string, data: []}[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        const roomId = new URL(window.location.href).pathname.split('/')[2]
        setRoomId(roomId)
        const socket = io("http://localhost:65431/dashboard", {transports: ['websocket'], auth: {token: 'xyz'}, query: {roomId}})
        setSocketConn(socket)

        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        if(report.length > 0){
            Chart.register(...registerables);
            if(canvasRef.current) new Chart(canvasRef.current, {
                type: 'line', 
                data: {
                    labels: [1, 2, 3, 4, 5],
                    datasets: report   
                },
                // data: {
                //     labels: [1, 2, 3,4,5],
                //     datasets: [
                //         {
                //             label: '# of Votes 1',
                //             data: [12, 19, 3, 5, 2, 3],
                //             borderColor: dynamicColors(),
                //             spanGaps: true
                //         },
                //         {
                //             label: '# of Votes 2',
                //             data: new Array(5).fill(null).map(() => Math.floor(Math.random() * 20)),
                //             borderColor: dynamicColors()
                //         },
                //     ]
                // },  
                options: {
                    animation: {
                        duration: 500,
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'hits',
                                font: {
                                    size: 17
                                }
                            },
                            min: 0,
                            ticks: {
                                stepSize: 1
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'second',
                                font: {
                                    size: 17
                                } 
                            }
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart'
                        }
                    }
            }})
        }
    }, [report])

    useEffect(() => {
        if(socketConn) {
            socketConn.on('connect_error', (err) => {
                console.log('Connection Error: ', err.message)
                socketConn.disconnect()
            })

            socketConn.on('dashboard: player join', (playerList: string[]) => setPlayerList(playerList))
            socketConn.on('dashboard: player leave', (playerList: string[]) => setPlayerList(playerList))
            socketConn.on('dashboard: player press', (count: Count) => setCount(count))
            socketConn.on('dashboard: get report', (report) => setReport(report))
        }
    }, [socketConn])

    const handleGameStart = () => socketConn?.emit('dashboard: game start')
    return (
        <div style={{width: '100%', height: '100%'}}>
            <p>Join Game By Scanning or Clicking The QRCode Below </p>
            <a href={`http://localhost:65431/client/${roomId}`} target="_blank"><QRCode value={`http://localhost:65431/client/${roomId}`} /></a>
            <div>Player List</div>
            <div style={{display: 'flex', flexWrap: 'wrap', width: '30%'}}><ol>{playerList.length > 0 && playerList.map(player => <li style={{width: '50%'}}>{player}</li>)}</ol></div>
            <button onClick={handleGameStart}>Game Start</button>
            <div>Counting</div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '30%'}}>
                <div>Orange: {count.orange}</div>
                <div>Blue: {count.blue}</div>
            </div>
            <canvas ref={canvasRef} style={{width: '100%'}}></canvas>
        </div>
    );
};

export default App;
