import {Counting} from './count'
import EventLog from '../repo/inmemory_event_log_repo'
import {sampleEventLog} from '../repo/inmemory_event_log_repo.test'

describe("test Counting Entity", () => {
    it("resetCount(): should empty the list", async() => {
        const eventLog = new EventLog(sampleEventLog)
        const counting = new Counting(eventLog)
        counting.resetCount()
        const got = await counting.getEventLogs('testing-server')
        expect(got).toHaveLength(0);
    });

    it("addEvent(): should add event log into list", async () => {
        const eventLogRepo = new EventLog(JSON.parse(JSON.stringify(sampleEventLog)))
        const counting = new Counting(eventLogRepo)
        await counting.addEvent({clientId: 'testing-client', roomId: 'testing-server', createdAt: 1519211809937, kind: 'orange' as const})
        const got = await counting.getCountingByKind('testing-server')
        expect(got).toEqual({orange:1, blue: 4});
    });

    it("getCountingByType(): should return total count of pressing", async () => {
        const eventLogRepo = new EventLog(JSON.parse(JSON.stringify(sampleEventLog)))
        const counting = new Counting(eventLogRepo)
        const got = await counting.getCountingByKind('testing-server') 
        expect(got).toEqual({orange:0, blue: 4});
    });

    it("getCountingByPlayer(): should return players result", async () => {
        const eventLogRepo = new EventLog(JSON.parse(JSON.stringify(sampleEventLog)))
        const counting = new Counting(eventLogRepo)
        const got = await counting.getCountingByPlayer('testing-server')
        expect(got).toMatchObject([{
            label: expect.any(String),
            data: expect.any(Array),
            borderColor: expect.any(String)
        }]);
        expect(got).toHaveLength(1)
    });

    it("getRawEventLogs(): should return event logs corresponding to 'testing-server'", async () => {
        const eventLogRepo = new EventLog(JSON.parse(JSON.stringify(sampleEventLog)))
        const counting = new Counting(eventLogRepo)
        const got = await counting.getEventLogs('testing-server')
        got.forEach(item => {
            expect(item).toMatchObject({
                createdAt: expect.any(Number), 
                clientId: expect.any(String),
                roomId: expect.any(String),
                kind: expect.any(String)
            })
        })
        expect(got).toHaveLength(4)
    })
});