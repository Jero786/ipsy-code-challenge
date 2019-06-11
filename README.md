# Ypsy Code Challenge

### Prerequisites

`Node 9+`

### Installing

```
$ npm install -g eslint jest now
$ npm install
```
## In order to configure pre-commit that will execute prettier-eslint & unit-test before commit
```
$ npm install --save-dev husky prettier-eslint
```

## Setting environment variable

In order to connect with Spotify API, you will need create your account to get your public and private client id.
Once you get both, please create in a ROOT file, an new file called `.env` with the following information:

```
API_SPOTIFY_CLIENT_ID=[YOUR_CLIENT_ID]
API_SPOTIFY_CLIENT_SECRET_ID=[YOUR_SECRET_ID]
API_SPOTIFY_CLIENT_REDIRECT_URL=http://localhost:8888/callback/
API_SPOTIFY_URL_TOKEN=https://accounts.spotify.com/api/token
API_SPOTIFY_URL_ME=https://api.spotify.com/v1/me
API_SPOTIFY_TOKEN_INTERVAL_MS=1000
API_SPOTIFY_URL_AUTHORIZE=https://accounts.spotify.com/authorize
API_SPOTIFY_SCOPES=user-read-private user-read-email
```

**NOTE**:
In case that use `nvm` you will need to set by default  Node+6 (eg: `nvm alias default v10.8.0`)

### Starting the application

In order to start, just execute the following command line:
```
$ npm run dev
```

And then, open a browser with the following link:
```
http://localhost:8888
```
## Running unit tests
```
$ npm run test
```
## Running unit tests in watch mode
```
$ npm run test:watch
```

## Some design, principles and best practices

* Re-Ducks: Following this proposal structure improve modularity and encapsulation (only expose `index.tsx` from each dock, for instance: `state/ducks/catalog`) between features, and allow to scale in a flexible way. Also to improve testability of Action Creators, reducers, etc.
* Typescript: Implementing typing in a dynamic interpreted language like JS, help to us and Ides, to catch typos and errors while your are coding. That is a really important when you app will be large.
* Single responsibility principle, one reason to change. Each class/function has their own level of the abstraction.
* Selectors (SelectorState): Implementing selectors improve complex operations and also to lifting our state in a more granular way. (Help us to keep following SRP principle)
* Selectors Actions: Similar concept to State selectors, but apply to state. The main difference that only help us to know how retrieve some portion of a dense payload action from data response from an action.
* Selectors name convention:```Selector name: get<Noun>`
* Lifting action response payload: Just to assure that we save want store only the fields that we wanted. I create a type of data structured named: `FormatterField`, which you can build in a tree structure way.
* Following top down best practice. (Most important and public collaborates first, like a news paper)
* Favor React controller component over uncontrolled component. (In order to follow single source of truth principle as much as possible, and also to get component easier to work with).
* BEM: using block element modifier and with some variation of SMACSS like (`is-visible` instead of `block--visible`) is a really clean way to style components. Also it's a really a performance way to style component instead use neested selectors. (you don't care any more about not pass to 3 nested level)
* Server: the end-point should be prefixed with: `/api/v1`.
* Using middleware to separate REST GET call to out action creators. (that allow us in a future to work in parallel with `redux-observable` if we wanted for more complex request calls)
* Action Types: All async action, should be post fixed:
1. `REQUESTING_COMPLETED`
1. `REQUESTING_FAILED`
In order to generate out of the box the dispatcher action by `api-service` middleware.
* Action Types names should be use the following convention name:
1. ACTION: Effect is most commonly a noun that means the result of an action —> <NOUN>_<VERB> —> `CATALOG_ADDED` | `CATALOG_REMOVED`
1. ASYNC ACTION CREATOR: Affect is most commonly a verb —> <VERB><NOUN> —> `REQUESTING_CATALOG` | `REQUESTING_CATALOG_COMPLETED` | `REQUESTING_CATALOG_FAILED`
## Frameworks & libraries
* NextJS used to provider server rendering for performance, SEO and Code splitting reasons.
* React-testing-Library: A really useful library to help us to test React component in a clean, predictable and readable way.
* Redux: The reactive programming allow us to build more predictable, scalable & Solid web application.
* Immutablejs: For performance reason, allowing us to perform shallow equality and avoid unheeded rendering. (only for container component and reducer layer. In order to avoid problems when handling data, try to minimize the interoperability, and only keep your container component with immutable info. Lets dumb components with native objects.
* Lodash: For cross browsing support, performance and reliable way to handler data. (only for dump component and action creators).
* Prettier/husky/lint-staged/Eslint, Help us to avoid commit and push some code that don't follow with the default standards of the project and also prevent to push some code that don't pass the UT. (It's already configure airbnb, and eslint:recommended practices)
## Testing tips

* Test should follow the SRP principle too (single responsibility principle). Do one thing, test one thing.
* Test files, should be ended with `*.test.tx` and should be placed in the same folder from their SUT (Subject under test).
* Keep in mind the implicit structure of test must be AAA (Arrange, Act, Assert).
* Each test must be isolated, means that one test not be dependent to another in order to get given result, therefore it should not matter the order of execution of them.
* Avoid global variables. Instead, declare them in setup method.
* Follow the DRY principle (Don’t Repeat Yourself). If we identify that we have repeated code throughout our tests use beforeEach function to put the code in one place.
* Putting comments in the header of the test is an anti-pattern, avoid them.
* Don't test action isolate, when testing reducer I like to test action as well in order to avoid unwanted testing. (I know that sounds like a integrating test instead of unit test, but it make sense for me.)

## Pending implementations
* Implement Normalize, to have a flatten state. That help you to make more performance the shallow equality performed and also to deal with a easy structure store.
* Implement some CI such as Circle or Travis.
* E2E Testing with Cypress. It's really powerful implement it, in order to save time in the regressions testing.
* Implement some Lib report in Backend side and also in front-end side to be sure that your app are working properly, otherwise send a email when throws some error.
