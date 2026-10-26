# A simple Connect 4 game

This is a simple exercise to create the game Connect 4.

The idea behind it is to showcase the use of React and the capabilities of it.

## Certain technical considerations

Doing this project I was surprised that the React team finally decided to propose frameworks when installing a new project.

![The React installation page](https://test.leanomartinet.com/ressources/connect4_react.png)

Since React is basically just a library, it's always been a debate about how to develop a proper React application (using a framework or at least a proper architecture).

I must admit that in the past I've tried lots of things (including Redux) but ended up creating my own way of coding (which basically is reusing my own classes).

In this project my approach was different and gave a shot to the use of Next.js that solves two of the main problems we used to have: a) routing between pages and b) fetching data without getting crazy using promises.

So, to make it short, this project is:

- Using the React v19.3 library
- Using the Next.js v16.4 framework
- Not using any styling framework (will solve it all with plain SCSS)

## The objects logic

Opposite to the backend, in the frontend is always challenging which objects should have their own classes. My personal rule was that if we "see" an object, and it's "big enough" then it can have it's own class.

Other schools create little objects for everything (labels, buttons, etc.) but then it can become tricky to deal with so many files.

For this project, the play was to create 3 objects:

- **The Game**, that includes the whole logic of Connect4. One game can have multiple players and only one board.

- **The Board**, it's an object on its own because it is big enough to render. Also there's some little logic on the render of it.

- **The Player**, because they can have a name and a color, both of which we could edit.

## How the game works

You can see more details of the logic and the algorithms at the end of this document. But for now we can concentrate to say that the idea of the game is simple:

1. There's always an active player (starting by player 1)
2. That player clicks on one of the columns (marked by letters) to insert a chip
3. If there's space in the column, then a chip is inserted
4. The game checks that there are 4 chips in a row, if that's the case then we have a winner. Otherwise the player is changed and we go back to 1.

Some screenshots:

**The home page of the game**
![The home page of the game](https://test.leanomartinet.com/ressources/connect4_screen1.png)

**How the game develops**
![How the game develops](https://test.leanomartinet.com/ressources/connect4_screen2.png)

**Editing the information of a player**
![Editing the information of a player](https://test.leanomartinet.com/ressources/connect4_screen3.png)

On the top right corner there are two buttons:

- **Reset** that is always visible, to restart a game completely and delete the Local Storage

- **Rewind** to delete the last step, only appears when the game properly started

## Local storage

The "game" is stored in the Local Storage of the browser to keep the state and reload everything in case the page is refreshed.

It is a JSON file that has the following format:

```json
{
    players: [player1, player2, ...];
    steps: [step1, step2, ....];
}
```

Each player has a code, name and color.
Each step has a player and the index of the column where the chip was inserted.

An example is:

```json
{
    "players": [
        {"code":"P1","name":"Lucy","color":"green"},
        {"code":"P2","name":"Charles","color":"orange"}
    ],
    "steps":[
        {"player":"P1","column":2},
        {"player":"P2","column":2},
        {"player":"P1","column":2},
        {"player":"P2","column":3}
    ]
}
```

## The style

A final word on the style is that for this simple projects I prefer to create everything from scratch.

It's clear that styling frameworks (like Bootstrap, Material, etc) are incredible when it's a group of developers that have to create similar components. But personally I've never seen a group of tenths of developers working in the frontend, normally is maximum 3 people that code directly.

For this project I used a combination of files that I have to "clean" the CSSs, which are:

- _normalize.scss to homogeneize the styles between browsers
- _common.scss where we put the basic styles
- _mixins.scss a group of very useful SCSS functions
- _varibles.scss a list of variables for colors, sizes and fonts


---
---

# Reasoning steps for this project

## Step 1: Understanding the project

I have never played the game, so I had to start watching to https://www.youtube.com/watch?v=7q3eEXEGsCE 

It seems like a very basic game where you have a board (which will be a matrix) and then a couple of players that put pieces on each column. Once there's four equal pieces in a row (horizontal, vertical or diagonal) that player wins.

### How the game should go

Basically we need these steps:

1) Select whose turn is it (Player1, Player2,...). When we start we just go with Player1.
2) That player should choose a column where to add his piece.
3) The game should check if there's a winner, or if there are no more spaces left. Either finish or loop to 1) again.

### Algorithm to check for the winner

There surely must be a linear algebra solution to this. I'm going to guess miltiplying the matrix by some vectors and we will find a winner, but I have no time to do so.

My approach will be simpler, I'll go spot by spot in the board and check for each one if there are 4 pieces in a row of the same. There are 8 cases to handle (2 horizontal, 2 vertical and 4 diagonal).

We can avoid certain cases depending on the position that we are checking. And obviously we will not test on the empty spaces.

### Visual notes

![Personal notes 1](https://test.leanomartinet.com/ressources/connect4_1.jpeg)
![Personal notes 2](https://test.leanomartinet.com/ressources/connect4_2.jpeg)
![Personal notes 3](https://test.leanomartinet.com/ressources/connect4_3.jpeg)


## Step 2: Basic proof of concept

Commit of this step: (https://github.com/theylooksotired/connect4/commit/f133e7e1386f31f18d1ca3c77c0304b2754254f3)

Here we have a very simple proof-of-concept using a board and 2 players.
They can play by clicking on the headers of a table:

![POC](https://test.leanomartinet.com/ressources/connect4_poc.png)

There are no more interactions and it's just the basic code to make the game work.


## Step 3: Improved the logic of the game

Commit of this step: (https://github.com/theylooksotired/connect4/commit/852182a0d2d6401e59dfa7c07f2c121f8204c65d)

There are some improvements on the game:

- Added the whole Local Storage functionality, which has the list of players and steps to reproduce. So everytime the page is recharged, the last state will be recovered.
- Added a RESET (or restart) button to put everything back to the initial state
- Added a REWIND button to delete the last step and re-run the game
- Created a separate Player that can have a name and a color

## Step 4: Clean the code and work on the style

This is the final commit and the idea was to clean the code, simplify and refactor some functions.

Also it was the moment to create the style, everything was built from zero. My idea was to avoid an styling framework because I wanted to show that I actually know how to deal with CSS and can create a clean and modern look even with quite simple tools.

