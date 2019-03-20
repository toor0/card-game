var cardArray = [{
    'name': 'apple',
    'front': 'img/apple.png',
    'back': 'img/hearth.png'
},{
    'name': 'facebook',
    'front': 'img/facebook.png',
    'back': 'img/hearth.png'    
},{
    'name': 'google',
    'front': 'img/google.png',
    'back': 'img/hearth.png'    
},{
    'name': 'uber',
    'front': 'img/uber.png',
    'back': 'img/hearth.png'    
},{
    'name': 'amazon',
    'front': 'img/amazon.png',
    'back': 'img/hearth.png'    
},{
    'name': 'microsoft',
    'front': 'img/microsoft.png',
    'back': 'img/hearth.png'    
},{
    'name': 'airbnb',
    'front': 'img/airbnb.png',
    'back': 'img/hearth.png'    
},{
    'name': 'yelp',
    'front': 'img/yelp.png',
    'back': 'img/hearth.png'    
},{
    'name': 'linkedin',
    'front': 'img/linkedin.png',
    'back': 'img/hearth.png'    
},{
    'name': 'netflix',
    'front': 'img/netflix.png',
    'back': 'img/hearth.png'    
},{
    'name': 'salesforce',
    'front': 'img/salesforce.png',
    'back': 'img/hearth.png'    
},{
    'name': 'square',
    'front': 'img/square.png',
    'back': 'img/hearth.png'    
},{
    'name': 'twitter',
    'front': 'img/twitter.png',
    'back': 'img/hearth.png'    
},{
    'name': 'dropbox',
    'front': 'img/dropbox.png',
    'back': 'img/hearth.png'    
},{
    'name': 'spotify',
    'front': 'img/spotify.png',
    'back': 'img/hearth.png'    
},{
    'name': 'lyft',
    'front': 'img/lyft.png',
    'back': 'img/hearth.png'    
},{
    'name': 'pinterest',
    'front': 'img/pinterest.png',
    'back': 'img/hearth.png'    
},{
    'name': 'stripe',
    'front': 'img/stripe.png',
    'back': 'img/hearth.png'    
},{
    'name': 'slack',
    'front': 'img/slack.png',
    'back': 'img/hearth.png'    
},{
    'name': 'twitch',
    'front': 'img/twitch.png',
    'back': 'img/hearth.png'    
}
];




//Wait for Window to Load
document.addEventListener("DOMContentLoaded", function(){

    let score = 0;

    //Capture User Selected Difficulty
    let difficulty = '';
    let startScreen = document.getElementById("startScreen");
    let selection = document.getElementById("selection");
    selection.addEventListener("submit", function() {
        for(let i = 0; i < selection.length; i++) {
            if(selection[i].checked) {
                difficulty = selection[i].id;
            }
        }

    //Hides the selection
    startScreen.style.display = "none";

    //Create a new array of card objects based on difficulty selected, create duplicates, then shuffle
    const difficultyArray = {
        'easy': 6,
        'medium': 12,
        'hard': 20
    };

    const maxWidthArray = {
        'easy': '500px',
        'medium': '700px',
        'hard': '1175px'
    };

    let gameCardArray = cardArray.slice(0, difficultyArray[difficulty]);
    gameCardArray = gameCardArray.concat(gameCardArray);
    gameCardArray.sort(() => 0.5 - Math.random());
    console.log(gameCardArray);

    //Set up gameboard
    let game = document.getElementById("gameboard");
    let scoreBoard = document.createElement('div');
    scoreBoard.innerHTML = 'Clicks so far: ' + score;
    scoreBoard.classList.add('scoreboard');
    let grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(scoreBoard);
    game.appendChild(grid);
    console.log(maxWidthArray[difficulty]);
    grid.style.maxWidth = maxWidthArray[difficulty];

    gameCardArray.forEach(function(item){
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = `url(${item.front})`;

        const back = document.createElement('div');
        back.classList.add('back');

        
        grid.appendChild(card);
        card.appendChild(back);
        card.appendChild(front);

    })

    // Card selection and matching capability
    let count = 0;
    let firstGuess = '';
    let secondGuess = '';
    let previousGuess = null;
    grid.addEventListener('click', function(event){
        let clicked = event.target;

        if (
            clicked.nodeName === 'SECTION' ||
            clicked === previousGuess ||
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match')
          ) {
            return;
          }
          previousGuess = clicked;
    

        if(count < 2) {
            count++;
            if(count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected'); 
                console.log("adding first Guess");
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
                console.log('adding second guess');
            }
        }

        let delay = 1200;

        if(firstGuess !== '' && secondGuess !== '') {
            if(firstGuess === secondGuess) {
                setTimeout(match,delay);
                setTimeout(resetCards,delay);
                score++;
                scoreBoard.innerHTML = 'Clicks so far: ' + score;
            } else {
                setTimeout(resetCards,delay);
                score++;
                scoreBoard.innerHTML = 'Clicks so far: ' + score;
            }
        }
    })

    // Matching cards
    function match() {
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
        });
    }

    // Resetting cards
    function resetCards() {
        count = 0;
        firstGuess = '';
        secondGuess = '';
    
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        })
        previousGuess = '';
    }
    })



});