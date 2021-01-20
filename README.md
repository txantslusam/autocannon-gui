# Autocannon GUI

This is gui for autocannon made with electron.

## Installation

Run `npm install` or `yarn`

## Running 

```shell
npm start
# or
yarn start
```

## Known bugs

### Autocannon can't be parsed -> "#! /usr/bin/env node" is blocking webpack

Comment this line in `./node_modules/autocannon/autocannon.js`.