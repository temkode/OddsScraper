# OddsScraper

**OddsScraper** is a secure API for scraping horse race card information from WilliamHill. This API implements authentication and authorization to make this data securely accessible.

## Assumptions

Note that this is a simplified demo version. We have used dummy user data. The scraped race card information is stored in memory, mainly for illustrating the authorization capabilities of the API. In this setup, only admins can update the information, while both users and admins can view the data stored in memory.

## Use the deployed version

This app is deployed to an AWS EC2 instance here http://3.8.160.46:3000

You can skip the set up instructions and use the `/auth`, `/api` paths the same way as below with a HTTP client such as Postman

## How to Run locally

Before you begin, make sure your machine has Git and Node.js with npm installed.

1. **Clone this repository:** You can do this by either using `git clone` or downloading the code.
2. **Install Dependencies:** In the root directory, execute `npm install` to install the necessary dependencies.
3. **Build the Project:** Run `npm run build` to build the project.
4. **Start the Server:** Launch the server by running `node dist/server.js`.

Now that the API is up and running, you can use a tool like Postman or another HTTP client to interact with it.

### Authentication

1. **Log in as an Admin:**

   - Send a POST request to `http://localhost:3000/auth` with the following request body:
     ```json
     {
       "email": "admin@wsd.com",
       "password": "admin"
     }
     ```

2. **Log in as a User:**

   - To log in as a regular user, send a POST request to `http://localhost:3000/auth` with the following request body:
     ```json
     {
       "email": "user@wsd.com",
       "password": "user"
     }
     ```

   You will receive an access token that is valid for 15 minutes.

### Updating Race Card Information

As an admin, you can update race card information by sending a POST request to `http://localhost:3000/api/odds/update`. Include the following request body with the race card URL of your choice from the [WilliamHill racecard page](https://sports.williamhill.com/betting/en-gb/horse-racing/meetings):

```json
{
  "url": "https://sports.williamhill.com/betting/en-gb/horse-racing/racecard/OB_EV29130142/1740-leicester"
}
```

### Reading Race Card Information

As a user or admin, you can read race card information by sending a GET request to `http://localhost:3000/api/odds`

### Authorisation / User Access

To experience user access, log in as a user and observe that you are restricted from using the endpoint for updating race card information.
