# Story Lab 2017

## Dependencies
You'll need to have a few things installed globally to get started:
- [npm](http://npmjs.org)
- [gulp](http://gulpjs.com)

## Development
```sh
# clone the repo and move into the directory
git clone https://github.com/mikehwagz/storylab.git && cd storylab

# install dependencies
npm i

# build the site and start a dev server
# which generates serves the `build` directory at localhost:3000
gulp

# you can also just generate the build directory
# and not start the dev server
gulp build
```

## Deploy
```sh
# this command generates the dist directory which is the same as build,
# but with minified javascript and image assets
gulp dist
```

## Resources
- [biggie](https://github.com/baptistebriel/biggie)
- [bigwheel documentation](https://github.com/bigwheel-framework/documentation)
