# Star wars custom elements for planets

Star wars planets using LIT Element (web components library), there is a list of planets and a planet as a custom element

## Setup

Install dependencies:

```bash
npm i
```

## Demo

![Alt text](https://raw.githubusercontent.com/thiswallz/swapi-planets/master/ss1.png?raw=true 'Demos')

## 1) Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## 2) Dev Server

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html.

## Testing

Tests are using Sino, Karma, Chai, Mocha, and the open-wc test helpers for testing. See the [open-wc testing documentation](https://open-wc.org/testing/testing.html) for more information.

Tests can be run with the `test` script:

```bash
npm test
```

The site will usually be served at http://localhost:8000/dev
