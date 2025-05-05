# Pokapp

## Intro

PokApp is a social application designed to help you organize and follow poker games results with your friends. Users can create game events, join or leave games and compete within seasons. Each season maintains a points-based leaderboard. Users can also view their personal profile, which includes detailed statistics such as games played, games won, winning percentage and historical performance across all seasons. Administrators can manage the seasons and set the winners, keeping the competition more controlled.

![Logo de PokApp](.././app/assets/PokApp1.png)

## Functional

### Use Cases

Admin
- Participate on a game
- Remove participation on a game
- List games
- Visualize game
- Visualize clasification
- Visualize profile
- Visualize others profiles
- Visualize historic matches
- Search profile
- Create game
- Cancel game (remove)
- Set game result

Player
- Participate on a game
- Remove participation on a game
- Request to be an admin
- Visualize clasification
- Visualize profile
- Visualize others profile
- Visualize historic matches
- Search others profile

### UIUX Design

[Figma] (https://www.figma.com/design/8NdJdYqx6gv825D8OWH2kQ/PokApp?node-id=0-1&t=1YjhFKVyuEID9QK4-1)

## Technical

### Blocks

- App
- API
- DB

### Packages

- app (...)
- api (...)
- com (validations, errors)
- doc (documentation)

### Data Model

User 
- id (string, uuid)
- role (string, enum: regular | admin)
- name (string, min length 1, max length 20)
- surname (string, min length 1, max length 20)
- email (string, max length 30)
- username (string, min length 3, max length 20)
- password (string, min length 8, max length 20)
- createdAt (Date)
- modifiedAt (Date)

Game 
- id (string, uuid)
- author (User.id)
- seasonName (Season.name)
- seasonId (Season.id, optional)
- status (string, enum: scheduled | finished)
- title (string, min length 1, max length 200)
- participants ([User.id])
- date (Date)
- place (string)
- winner (User.id)
- points (number)
- createdAt (Date)
- modifiedAt (Date)

Season
- id (string, uuid)
- startDate (Date)
- endDate (Date)
- status (string, enum: active | finished)
- name (string, min length 1, max length 20)
- games ([Game.id])
- winner (User.id)
- participants([User.id])
- createdAt (Date)
- modifiedAt (Date)

## Technologies

- ReactNative / Expo
- Node / Express 
- MongoDB / Mongoose
- Mocha / Chai
- JWT / bcrypt

### Code Coverage

- Test the code


![code coverage](.././app/assets/coverage.jpg)

## Planning

[Issue Tracking] 

GitHub Arnau: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/80)

GitHub Marc: (https://github.com/b00tc4mp/isdi-bootcamp-202501/issues/81)