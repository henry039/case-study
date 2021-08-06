import { FunctionalComponent, h} from 'preact';
import {useState} from 'preact/hooks'
import Content from './content' 

const App: FunctionalComponent = () => {
    const [playerName, setPlayerName] = useState<string>('')
    const [confirmToJoin, setConfirm] = useState<boolean>(false)

    return (
        <div>
            {
                confirmToJoin 
                    ? <Content playerName={playerName} />
                    : (<div>
                        <label for="panme">Please Enter Display Name</label>
                        <br />
                        <input type="text" id="pname" name="pname" onChange={(e) => setPlayerName((e.target as any).value)} />
                        <br />
                        <button onClick={() => playerName.length > 2 ? setConfirm(true) : null}>PLAY</button>
                    </div>)
            }
        </div>
    );
};

export default App;
