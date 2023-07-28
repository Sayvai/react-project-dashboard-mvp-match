# MVP Match - Frontend Dashboard

This is a frontend web app, which renders an interactive MVP Match Dashboard to generate reports and insights about the MVP Match project transactions.

THe web app is currently limited to the generating report data, and other features may be added in the future.

The web app design was translated from the provided [Figma design file](https://www.figma.com/file/t00BR74ObZibDzdMquHcGk/Test?node-id=36%3A4788).

## Demo

View a brief GIF demo of the web apps' design functionality below:

![MVP-Match-Report-Dashboard](https://github.com/Sayvai/Sayvai/assets/7581546/d5a278cb-4f3c-415a-8955-225940fb131e)

## Getting Started

### Prerequisites

- install [Node.js](https://nodejs.org/en/download/). The version used for this project is v18.17.0

### Setup

- clone the repository (e.g. `git clone git@github.com:Sayvai/react-project-dashboard-mvp-match.git`)
- navigate to the project directory (e.g. `cd react-project-dashboard-mvp-match`)
- run `npm install` to install the dependencies
- run `npm run dev` to start the web app
- open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Testing

### Unit Tests

There are a number of unit tests written for the web app. The tests are written using the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To run the unit tests, run the following command in the terminal:

```
npm test
```

## Supported Browsers

The web app has been tested on the following browsers:

- <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/chrome/chrome.svg" alt="Google Chrome" width="16" height="16"/> **Google Chrome** (115.0.5790.114)
- <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/edge/edge.svg" alt="Microsoft Edge" width="16" height="16"/> **Microsoft Edge** (115.0.1901.188)
- <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/firefox/firefox.svg" alt="Mozilla Firefox" width="16" height="16"/> **Mozilla Firefox** (115.0.3)

## Future Improvements

Below are some of the improvements that can be made to the web app for future consideration:

- Add more unit tests
- Add more features to the web app
- Add End-to-End tests

## Technologies Used

- [Vite](https://vitejs.dev/) - A fast build tool for web apps (using the SWC compiler)
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [c3.js](https://c3js.org/) - A D3-based reusable chart library
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - A library for testing React components
