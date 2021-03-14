/*
Game Rules:-

>The game has 2 players, playing in rounds
>In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND
 score.
>But, If the Player rolls a 1, all his round score gets lost,after that It's the next player's turn
>The Player can choose to 'Hold',which means that his round score gets added to his Global score.After That,it's the next Player's turn
>The first Player to reach 100 Points on Global score wins the game.
*/
var scores, roundScore, activePlayer,gamePlaying;

init();




document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
            // 1.Random Number;
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.Display the Result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3.Update the round  score if the rolled number was not a 1
    if (dice !== 1) {
        //add scores
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        //move to next player
        nextPlayer();
    }  
    }
    
});


document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add Global score 
    scores[activePlayer] += roundScore;


    //Update UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    //check out  if Player won
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        gamePlaying = false;
    }
    else {
         //next Player
        nextPlayer();
    }
}   
});

function nextPlayer() {
       activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current--0').textContent = '0';
        document.getElementById('current--1').textContent = '0';

        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

       // document.querySelector('.player--0').classList.remove('player--active');
        //document.querySelector('.player--1').classList.add('player--active');

        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}

