# Visory Events Challenge

Hello! For the purpose of reviewing the final app, you can access the built and deployed version here: http://events-challenge-frontend.s3-website-ap-southeast-2.amazonaws.com

---

# Build Instructions
### Pre-requisites:
* AWS CLI
* SAM CLI
* NodeJS

### Server:
1. `cd server`
2. `sam build`
3. `sam deploy --guided`
4. Follow the instructions in the terminal
5. When prompted to enter the Discover API Key, enter **f7Nj0SQ7lNLACq6Gh22AD7SdftENUfST**
6. When prompted to enter the Frontend URL, enter the URL of the frontend app (e.g. http://localhost:4200)
7. The URL of your API will be displayed in the terminal, copy this for use with the frontend app

### Frontend:
1. `cd frontend`
2. `npm install`
3. Modify the `environment.ts` file to point to your API URL
4. `ng serve`

---

For the purposes of reviewing this project, I have provided an API key that can be used when deploying the server.
##### NOTE: Never commit API keys to a public repository. This repository is public however I will be revoking API keys after the review period is over.


# Notes to Reviewers
* Instructions for testing the application are included in the README of each project
* Due to time limitations I did not implement detailed unit tests, CI/CD, robust error handling, ideal component structure and many more features that I would have liked to implement

# Challenge Instructions

Build a small web application that helps users browse and discover events that they might be interested in. Leverage the Ticketmaster event discovery API (https://developer.ticketmaster.com/api-explorer/).

Feel free to use any framework, platform or delivery mechanism you wish to help you achieve your desired outcome.

The only requirements for the assignment are:

* We can filter by location
* We can provide a start and end datetime.
* Your code is well-tested.
* The README.md has been update with instructions to build and run your code.

Feel free to tackle this problem in a way that demonstrates your expertise of an area -- or takes you out of your comfort zone.

Good luck!
