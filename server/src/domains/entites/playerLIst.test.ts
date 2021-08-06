import {PlayerList} from './playerList'

describe("test PlayerList Entity", () => {
    it("should return empty list after reset", () => {
        const playerListEnt = new PlayerList(['Peter'])
        playerListEnt.resetPlayerList()
        expect(playerListEnt.currentPlayerList()).toHaveLength(0);
    });
    
    it("should append player 'Ada' into list", () => {
        const playerListEnt = new PlayerList(['Peter'])
        playerListEnt.addPlayer('Ada')
        expect(playerListEnt.currentPlayerList()[1]).toBe('Ada');
        expect(playerListEnt.currentPlayerList()).toHaveLength(2);
    });

    it("should remove player 'Peter' from list", () => {
        const playerListEnt = new PlayerList(['Peter', 'Ada'])
        playerListEnt.removePlayer('Peter')
        expect(playerListEnt.currentPlayerList()).toHaveLength(1);
        expect(playerListEnt.currentPlayerList().indexOf('Peter')).toBe(-1);
    });

    it("should get players ['Peter', 'Ada'] ", () => {
        const playerListEnt = new PlayerList(['Peter', 'Ada'])
        expect(playerListEnt.currentPlayerList()).toEqual(['Peter', 'Ada']);
    });
});