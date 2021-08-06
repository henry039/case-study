## Dashboard - FE
- show connected player 
    - event: on `player joined` from Server
- start game on (pressing button when there are more than or equal to one player)
    - event: emit `game start` to Server
- show count down ??? may not sync with server
- show button pressed count
    - event: on `game processing` from Server ( btn press counting )
- show graph
    - event: on `game result` from Server ( leader board result )
- refresh to start over

## Client - FE
- enter display name(same display name but differnet match)
    - on start
    - event: emit `client: player joined` to Server (displayName)
- press button
    - event: emit `client: btn press` to Server (orange or blue)
- disable button
    - event: on `game end` from Server
- show dashboard link in [ qrcode / hyperlink ]
    - always redirect to `/dashboard`
- show next match ready
    - event: on `next game on`

## Server - BE (message broker like)
- health check on self and dashboard
    - check connection of db & dashboard
- handle game status ( `{status: boolean, startedAt: Date}` ) get from Dashboard
    - event: on `game start` from Dashboard
        <!-- - if status === true, dashboard refresh
        - emit `next game on` -->
    - event: emit `client: game start` to Client
- handle player info
    - event: on `client: player joined` from Client
    - event: emit `player joined` to Dashboard
- handle count down ( settimeout )
    - event: emit `game end` to Client & Dashboard
- handle btn press event logging (store db or file)
    - event: on `client: btn press` from Client
    - db: save event log to postgres (`{id: inc number, createdAt: Date, serverId: uuid, clientId: socketId|displayName, type: orange | blue}`)
    - file: save event log to csv format
- handle result projection ( aggregate the result from csv file or postgres db )
    - event: emit `game processing` to Dashboard -> btn press counting
    - event: emit `game result` to Dashboard 
- handle start over

## Remarks
- every dashboard refresh or connect would be a game start