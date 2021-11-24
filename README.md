# favorite-gifs

## Description
This project is a gif search form which uses vue.js, vuex and giphy.
It lets you find your favorite gifs and add it to the list.

It's a simple sample project which lets you see how I write code - the UI is not meant to be pretty.

Search by clicking the search button or by clicking enter when the input field is selected.
On successive searches whithout changing the search query, the API will return the consecutive pages.

The favorite gifs are stored in local storage, via vuex-persistedstate plugin.
You can add gifs as favorite by clicking them. If the clicked gif is already favorite, it will be removed from the favorites.

Navigate with keyboard - use tab key to select gifs. Press enter or space to perform an action on the selected gif.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Run unit tests
```
yarn test:unit
```
