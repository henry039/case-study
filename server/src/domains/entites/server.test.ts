import {ServerInfo} from './server'

describe("test ServerInfo Entity", () => {
    it("should return 'testing-id' as server Id", () => {
        const serverEnt = new ServerInfo('testing-id', false)
        expect(serverEnt.getServerId()).toBe('testing-id');
    });
    
    it("should set server Id to 'testing-uat-1234'", () => {
        const serverEnt = new ServerInfo('testing-id', false)
        serverEnt.setServerId('testing-uat-1234')
        expect(serverEnt.getServerId()).toBe('testing-uat-1234');
    });

    it("should return game status to true", () => {
        const serverEnt = new ServerInfo('testing-id', true)
        expect(serverEnt.getGameStatus()).toBeTruthy();
    });

    it("should set game status to false", () => {
        const serverEnt = new ServerInfo('testing-id', true)
        serverEnt.setGameStatus(false)
        expect(serverEnt.getGameStatus()).toBeFalsy();
    });
});