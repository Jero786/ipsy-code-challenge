# Ipsy - Be Your Self  

### Short description

A SaaS platform, that suggest the best content of each particular logged user. More the user use the platform, listen their music from Spotify, reading doc from New Yor Time, and others integration Books API, more accurate the platform will suggest the content for him.   

### Long Description

The idea of Be Your Self platform (BYS), it’s create a self familiar environment for a user. For instance, if he want to relax or to study, while listen a quite music, or watch a movie at the weekend, read some interesting articles, etc. 
The important part of the system is: All the content that consume the user from the platform will be tracked. So, each music that the user listen, each movie and each document will be tracked, in order to to be processed later. 

### Use Case Example: 

Some user, already logged-in, perform a search of a particular song like: "Elvis - Can't Help Falling In Love". After that, the system generate a `HistorySoundTrack` object, which contain the information like: user information, track sound information, location of the user, etc. 
After that, in differed time, some scheduled Job from BYS platform `SoundTrackLyricsHydrationJob`, will process each `HistorySoundTrack` and will search each lyrics of each song using [Genius](https://genius.com/developers) API. The result of this operation is get the lyrics/text from each song, and then persist that in some non-sql database, like MongoDB, Cassandra, Hadoop, etc.
Then other Job `SoundTrackProfileGeneratorJob`, also in deferred time, will be in charge to get each lyrics already persisted, and will be analyzed using [`ML-Analizer`](https://rapidapi.com/mlanalyzer/api/ml-analyzer) API. That API, will give us a semantic content like: Text Classification, Sentiment Analysis, Stock symbol extraction, Person Names Extractor, Language Detection, Locations Extractor, Adult content Analyzer, and so on. With all this content/information, BYS platform will generate a particular profile for each sound track. So once, we have all the song "normalized", with semantic information. So then `UserProfileGeneratorJob`, will be ready to start to generate the each `UserProfile` by `User`, that will be used to generate the module of suggestion of the platform `SuggestionUserIndicatorAPI`. That module, is the core of BYS. Because, more the user use the platform (more tracking data), so more accurate will be generated their profile. The same idea, will be implemented for Videos Section and Reading Section too. 
-------------------------------

### Scope Modules

| Module name                    | Interview scope |
|--------------------------------|:---------------:|
| Sign-up                        |        NO       |
| Sign-In                        |       YES       |
| Welcome Page                   |       YES       |
| Music Home Page                |       YES       |
| SoundTrackLyricsHydratationJob |        NO       |
| SoundTrackProfileGeneratorJob  |        NO       |
| UserProfileGeneratorJob        |        NO       |
| SuggestionUserIndicatorAPI     |        NO       |
| Reading Home Page              |        NO       |
| Video Home Page                |        NO       |

### Prerequisites

`Node 9+`

### Installing

```
$ npm install -g eslint jest now
$ npm install
```
### In order to configure pre-commit that will execute prettier-eslint & unit-test before commit
```
$ npm install --save-dev husky prettier-eslint
```

### Setting environment variable

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

**NOTE**: In case that use `nvm` you will need to set by default  Node+6 (eg: `nvm alias default v10.8.0`)

### Starting the application

In order to start, just execute the following command line:
```
$ npm run dev
```

And then, open a browser with the following link:
```
http://localhost:8888
```
### Running unit tests
```
$ npm run test
```
### Running unit tests in watch mode
```
$ npm run test:watch
```

### Some design, principles and best practices

* Re-Ducks: Following this proposal structure improve modularity and encapsulation (only expose `index.tsx` from each dock folder, for instance: `state/ducks/catalog/index.ts`). Also allow us to scale better and improve testability of actions, action creators, reducers, operators and selectors in a really flexible way.
* Typescript: Implementing check typing in a dynamic interpreted language like JS, help us and also to Ides, to catch typos and errors while your are coding. That is a really important when you app will be large.
* State Selectors (`state-selector`): Implementing selectors improve complex operations and also to lifting our state in a more granular way (help us to keep following SRP principle).
* Actions Selectors (`action-selector`): Similar concept to State selectors, but apply to the response of payload async action. (really helpful when you response payload is really big)
* Filter async action payload response(`FormatterField[]`):I create a Tree data structured, which you can define the fields that you want to persist into our state store.
* Selectors name convention:`Selector name: get<Noun>`
* Following top down best practice (most important and public collaborates first, like a news paper).
* Favor React controller component over uncontrolled component. (In order to follow single source of truth principle as much as possible, and also to get component easier to work with).
* BEM: using block element modifier and with some variation of SMACSS like (`is-visible` instead of `block--visible`) is a really clean way to style components. Also it's a really a performance way to style component instead use neested selectors. (you don't care any more about not pass to 3 nested level)
* Server: the end-point should be prefixed with: `/api/v1`. That help us to versioning our API, and also to be a common pre-fix url to apply easy filters, middlewares, etc.
* REST calls in a middleware, instead of action creators: That allow us to decrease the coupling between our action creators and the side-effect libraries(`redux-thunk`, `redux-saga`, `redux-observable`, etc). Also make test simpler and our modules more isolates. Also give us teh possibility to implement in parallel with other libraries like `redux-observable` with Epics idea.
* Action Types naming convention: All async action, should be post fixed with:
1. `REQUESTING_COMPLETED`
1. `REQUESTING_FAILED`
And also should have a attribute `async:true` in their body, and has the following data structure: 
```
type: types.REQUEST_SEARCH,
    meta: {
        async: true,
        path: `/search?text="${text}"`,
        method: 'GET',
    },
```
Following that convention, help us to avoid boilerplate code using `api-service.ts` middleware.

* Action Types names convention is:
1. ACTION: Effect is most commonly a noun that means the result of an action —> <NOUN>_<VERB> —> `CATALOG_ADDED` | `CATALOG_REMOVED`
1. ASYNC ACTION CREATOR: Affect is most commonly a verb —> <VERB><NOUN> —> `REQUESTING_CATALOG` | `REQUESTING_CATALOG_COMPLETED` | `REQUESTING_CATALOG_FAILED`
### Frameworks & libraries
* NextJS used to provider server rendering for performance, SEO and Code splitting reasons.
* React-testing-Library: A really useful library to help us to test React component in a clean, predictable and readable way.
* Redux: The reactive programming allow us to build more predictable, scalable & Solid web application.
* Immutablejs: For performance reason, allowing us to perform shallow equality and avoid unheeded rendering. (only for container component and reducer layer. In order to avoid problems when handling data, try to minimize the interoperability, and only keep your container component with immutable info. Lets dumb components with native objects.
* Lodash: For cross browsing support, performance and reliable way to handler data. (only for dump component and action creators).
* Prettier/husky/lint-staged/Eslint, Help us to avoid commit and push some code that don't follow with the default standards of the project and also prevent to push some code that don't pass the UT. (It's already configure airbnb, and eslint:recommended practices)
* Following in each part of the app SRP (Single responsibility principle). One reason to change. Each module/class/function has their own level of the abstraction.

### Spotify API integration

Some of reasons why I chose connect by `Authorization Code`:

1. The original example of this test project was create a part of a SaaS which give you a full platform for internment, such as Music, Video, etc. 
The data that serve to the user, will be suggested, filtered, and in some cases changed, depends on the user which is log in. 
In that business context, I need to have a full control over the information that need to display, so I need to create a kind of gateway/proxy between out API to the external APIs services. 
the the external API services. For that reason, among others, I think it's better to connect with Spotify API by `Authorization Code` fit better than `Client Credentials` and `Implicit Grant`.

Some of reasons why I didn't like to connect by `Client Credentials` or `Implicit Grant`:

1. SSR: We are not able to make server rendering, so request need to make it from node.jse server.
1. Security: There are more security concert to make this request from the server, than the client side.
1. The SDK: A really bad thing also to use SDK, if you don't have control over how to display, how to show.
1. The warning from official document: 'The content and functionality may change without warning in future versions.’. If you are a SaaS, you need to be responsible, so that such of things you will not want to.
1. Business rule, Be Your Safe: In order to populate our database with tracking information to improve our system of suggestion, we need to create like a gateway/proxy of request between our user platform and the external services.
1. Also, making server side request you have more control, we could implement cache request, make filter, etc.

### Testing tips

* Test should follow the SRP principle too (single responsibility principle). Do one thing, test one thing.
* Test files, should be ended with `*.test.tx` and should be placed in the same folder from their SUT (Subject under test).
* Keep in mind the implicit structure of test must be AAA (Arrange, Act, Assert).
* Each test must be isolated, means that one test not be dependent to another in order to get given result, therefore it should not matter the order of execution of them.
* Avoid global variables. Instead, declare them in setup method.
* Follow the DRY principle (Don’t Repeat Yourself). If we identify that we have repeated code throughout our tests use beforeEach function to put the code in one place.
* Putting comments in the header of the test is an anti-pattern, avoid them.
* Don't test action isolate, when testing reducer I like to test action as well in order to avoid unwanted testing. (I know that sounds like a integrating test instead of unit test, but it make sense for me.)

### Techical pending implementations stuff

* Implement Normalize, to have a flatten state. That help you to make more performance the shallow equality performed and also to deal with a easy structure store.
* Implement some CI such as Circle or Travis.
* E2E Testing with Cypress. It's really powerful implement it, in order to save time in the regressions testing.
* Implement some Lib report in Backend side and also in front-end side to be sure that your app are working properly, otherwise send a email when throws some error.

### Deployed link:
[Link APP](https://pure-shore-67296.herokuapp.com)
