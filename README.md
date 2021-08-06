<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Case Study</h3>

  <p align="center">
    An application test how good they could press the button in 5 seconds
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#development">Development</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#remark">Remark</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
There are dashboard to keep track of all the player clicking events. Each match would have 5 seconds to play.  

### Built With

* [ReactJS](https://reactjs.org) - Frontend web library used
* [Express](https://expressjs.com) - Backend web framework used
* [Socket IO](https://socket.io) - Real-time communication library used
* [PostgreSQL](https://www.postgresql.org/) - Database used
* [Jest](https://jestjs.io/) - Testing framework used
* [Docker](https://www.docker.com/) - Container application used



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
1. Install [NodeJS](https://nodejs.org/en/download/) >=14.15.1
1. Install [PostgreSQL](https://www.postgresql.org/download/)
1. Install [Docker](https://www.docker.com/products/docker-desktop) (optional)

### Development

1. Locate the repostiory
1. Go to folder `server` then `npm install`
1. Create and config `.env` following `.env.sample`
1. Run `npm run test`
1. Run `npm start`
1. Open browser and navigate to `/dashboard`

### Deployment
1. Locate the repository
1. Run `docker-compose up`


<!-- Remark -->
## Remark
- Frontend Development
    1. Build the static website from `client` or `dashboard` 
    2. Place `build` folder into `server/public`
    3. Rename as `client` or `dashboard`