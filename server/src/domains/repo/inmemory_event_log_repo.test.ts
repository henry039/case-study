import EventLogRepo from './inmemory_event_log_repo'

export const sampleEventLog = [
    {clientId: 'testing-client', roomId: 'testing-server', createdAt: 1519211809934, kind: 'blue' as const},
    {clientId: 'testing-client', roomId: 'testing-server', createdAt: 1519211809935, kind: 'blue' as const},
    {clientId: 'testing-client', roomId: 'testing-server', createdAt: 1519211809936, kind: 'blue' as const},
    {clientId: 'testing-client', roomId: 'testing-server', createdAt: 1519211809937, kind: 'blue' as const},
    {clientId: 'testing-client', roomId: 'testing-server12', createdAt: 1519211809937, kind: 'blue' as const},
    {clientId: 'testing-client', roomId: 'testing-server531', createdAt: 1519211809937, kind: 'blue' as const},
]

describe("test EventLog Repo", () => {
    it("reset(): should return empty list after reset", async () => {
        const eventLogRepo = new EventLogRepo(JSON.parse(JSON.stringify(sampleEventLog)))
        eventLogRepo.reset()
        const got = await eventLogRepo.filterLogsByRoomId('testing-server')
        expect(got).toHaveLength(0);
    });
    
    it("addEvent(): should append event log into list", async () => {
        const eventLogRepo = new EventLogRepo(JSON.parse(JSON.stringify(sampleEventLog)))
        await eventLogRepo.addEvent({clientId: 'testing-client', roomId: 'testing-server12', createdAt: 1519211809937, kind: 'orange' as const})
        const got = await eventLogRepo.filterLogsByRoomId('testing-server12')
        expect(got).toHaveLength(2);
    });

    // it("countingByKind(): should count only event log from 'testing-server531'", () => {
    //     const eventLogRepo = new EventLogRepo(JSON.parse(JSON.stringify(sampleEventLog)))
    //     expect(eventLogRepo.countingByKind('testing-server531')).toEqual({orange: 0, blue: 1});
    // });

    // it("filterLogsByServerId(): should get event logs corresponding to testing-server12", () => {
    //     const eventLogRepo = new EventLogRepo(JSON.parse(JSON.stringify(sampleEventLog)))
    //     expect(eventLogRepo.filterLogsByServerId('testing-server12')).toHaveLength(1);
    // });

    // it("countingByPlayer(): should return chart data set corresponding to testing-server12", () => {
    //     const eventLogRepo = new EventLogRepo(JSON.parse(JSON.stringify(sampleEventLog)))
    //     expect(eventLogRepo.countingByPlayer('testing-server12')).toMatchObject([{
    //         label: expect.any(String),
    //         data: expect.any(Array),
    //         borderColor: expect.any(String)
    //     }]);
    // });
});