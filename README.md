# A simple Connect 4 game

This is a simple exercise to create the game Connect 4.

## Basic proof of concept

Here we have a very simple proof-of-concept using a board and 2 players.
They can play by clicking on the headers of a table:

![POC](https://test.leanomartinet.com/ressources/connect4_poc.png)

There are no more interactions and it's just the basic code to make the game work.

---

## Personal notes

I have never played the game, so I had to start watching to https://www.youtube.com/watch?v=7q3eEXEGsCE 

It seems like a very basic game where you have a board (which will be a matrix) and then a couple of players that put pieces on each column. Once there's four equal pieces in a row (horizontal, vertical or diagonal) that player wins.

# How the game should go

Basically we need these steps:

1) Select whose turn is it (Player1, Player2,...). When we start we just go with Player1.
2) That player should choose a column where to add his piece.
3) The game should check if there's a winner, or if there are no more spaces left. Either finish or loop to 1) again.

# Algorithm to check for the winner

There surely must be a linear algebra solution to this. I'm going to guess miltiplying the matrix by some vectors and we will find a winner, but I have no time to do so.

My approach will be simpler, I'll go spot by spot in the board and check for each one if there are 4 pieces in a row of the same. There are 8 cases to handle (2 horizontal, 2 vertical and 4 diagonal).

We can avoid certain cases depending on the position that we are checking. And obviously we will not test on the empty spaces.

# Visual notes

![Personal notes 1](https://test.leanomartinet.com/ressources/connect4_1.jpeg)
![Personal notes 2](https://test.leanomartinet.com/ressources/connect4_2.jpeg)
![Personal notes 3](https://test.leanomartinet.com/ressources/connect4_3.jpeg)
