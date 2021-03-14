/*
1.
player looses his Entire Score when he rolls two 6 in a row. After that, 
it's the next player's turn.(Hint: Always save the previos dice roll in a separate variable)
2.
Add an input field to the HTML where players can set the winning score, so that they can
change the predefined score of the 100.(Hint: you can read that value with the .value property
in javascript. this is a good opportunity to use google to figure this out: )
3.
Add another dice to the game, so that there are two dice now. the player loose his current score
when one of them is a 1.(Hint: you will need CSS to position the second dice, so take a look the
CSS code for the first one.)



*/

var scores, roundScore, activePlayer,gamePlaying;

init();

var lastDice;

document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
            // 1.Random Number;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

    //2.Display the Result
        document.getElementById('dice--1').style.display = 'block';
        document.getElementById('dice--2').style.display = 'block';
        document.getElementById('dice--1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice--2').src = 'dice-' + dice2 + '.png';

    //3.Update the round  score if the rolled number was not a 1
        if (dice1 !== 1 && dice2!==1) {
        //add scores
        roundScore += (dice1+dice2);
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        //move to next player
        nextPlayer();
    }  
       /* if (dice === 6 && lastDice === 6)
        {
            scores[activePlayer] = 0;
            document.querySelector('#score--' + activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1) {
        //add scores
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }else{
        //move to next player
            nextPlayer();
        }
        lastDice = dice;
        */
    }
    
});


document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add Global score 
    scores[activePlayer] += roundScore;


    //Update UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }
        
    //check out  if Player won
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.getElementById('dice--1').style.display = 'none';
        document.getElementById('dice--2').style.display = 'none';
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
    
        document.getElementById('dice--1').style.display = 'none';
        document.getElementById('dice--2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';

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

