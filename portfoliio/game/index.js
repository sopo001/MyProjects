var $input = document.querySelector('#game-time');
var $span = document.querySelector('#time');
var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')

var score = 0;
var isGameStarted = false;

$input.addEventListener ('input',setGameTime);
$start.addEventListener ('click', startGame);
$game.addEventListener('click', handleBoxClick);

function setGameTime() {
    var time = +$input.value;
    $span.textContent = time.toFixed(1);
    hide($resultHeader)
    show($timeHeader)
}
function handleBoxClick(event) {
    if (!isGameStarted) {
        return

    }
    if(event.target.dataset.box){
        score++;
        randomBox();
    }
}
function setScore() {
    $result.textContent = score.toString();

}

function startGame() {
    score = 0;
    setGameTime();
    hide($start);
    hide($resultHeader)
    show($timeHeader)
    $input.setAttribute('disabled' , true)
    isGameStarted = true;

    var inetrval = setInterval(function() {
        var time = +$span.textContent; 
        if (time <=0){
            clearInterval(inetrval);
            endGame();
        }  else {
            $game.style.backgroundColor='white';
            $span.textContent = (time - 0.1).toFixed(1);
        }                
    },100)
    randomBox();
}

function endGame() {
    $game.innerHTML = ''
    show($start);
    setGameTime();
    $game.style.backgroundColor='#ccc';
    setScore();
    hide($timeHeader)
    show($resultHeader)
    $input.removeAttribute('disabled')
    isGameStarted = false;
}
function randomBox() {
    $game.innerHTML = '';
    var box = document.createElement('div');
    var boxSize = rand(30,100);
    var gameBoard = $game.getBoundingClientRect();
    var maxTop = gameBoard.height - boxSize ;
    var maxLeft = gameBoard.width - boxSize ; 

    box.style.width=box.style.height= boxSize + 'px';
    box.style.backgroundColor= 'rgb( '+ rand(0,256) +', ' + rand(0,256) + ',' + rand(0,256) + ')'
    box.style.position = 'absolute';
    box.style.top= rand(0 , maxTop) + 'px';
    box.style.left= rand(0 , maxLeft) + 'px';
    box.setAttribute('data-box', 'true');
    box.style.animation = 'box 2s'

    $game.insertAdjacentElement('beforeend', box);
}
function show($el) {
    $el.classList.remove('hide')
}
function hide($el) {
    $el.classList.add('hide')
}
function rand(max,min) {
    return Math.floor(Math.random() * (max - min) +min )
}


