document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        players: [
            { id: 1, name: 'Player 1', score: 0 },
            { id: 2, name: 'Player 2', score: 0 },
            { id: 3, name: 'Player 3', score: 0 },
            { id: 4, name: 'Player 4', score: 0 }
        ],
        currentPlayerIndex: 0,
        roundsPlayed: 0,
        maxRounds: 12, // 3 rounds per player
        currentSport: null,
        animationFrame: null,
        powerMeterRunning: false,
        powerValue: 0,
        angleValue: 50, // default middle
        timingValue: 0,
        isAngleMoving: false,
        isTimingMoving: false
    };

    // Sport point values
    const sportPoints = {
        'football': 1,
        'american-football': 2,
        'cricket': 3,
        'basketball': 4
    };

    // DOM Elements
    const sportsSelection = document.querySelector('.sports-selection');
    const gamePlay = document.querySelector('.game-play');
    const sportOptions = document.querySelectorAll('.sport-option');
    const sportGames = document.querySelectorAll('.sport-game');
    const resetBtn = document.querySelector('.reset-btn');
    const resultContainer = document.querySelector('.result-container');
    const continueBtn = document.querySelector('.continue-btn');
    const gameOverModal = document.querySelector('.game-over-modal');
    const playAgainBtn = document.querySelector('.play-again-btn');
    const currentPlayerDisplay = document.querySelector('.current-player');
    const actionTextDisplay = document.querySelector('.action-text');

    // Initialize the game
    function initGame() {
        updatePlayerDisplay();
        
        // Add event listeners for sport selection
        sportOptions.forEach(option => {
            option.addEventListener('click', selectSport);
        });
        
        // Add event listener for reset button
        resetBtn.addEventListener('click', resetGame);
        
        // Add event listener for continue button
        continueBtn.addEventListener('click', continueTurn);
        
        // Add event listener for play again button
        playAgainBtn.addEventListener('click', resetGame);
    }

    // Update player display
    function updatePlayerDisplay() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        currentPlayerDisplay.textContent = `${currentPlayer.name}'s Turn`;
        
        // Update active player highlight
        document.querySelectorAll('.player').forEach(playerEl => {
            playerEl.classList.remove('active');
        });
        document.querySelector(`.player${currentPlayer.id}`).classList.add('active');
        
        // Update all scores
        gameState.players.forEach(player => {
            document.querySelector(`.player${player.id} .player-score`).textContent = player.score;
        });
    }

    // Handle sport selection
    function selectSport() {
        const sport = this.getAttribute('data-sport');
        gameState.currentSport = sport;
        
        // Hide sport selection and show game play
        sportsSelection.classList.add('hidden');
        gamePlay.classList.remove('hidden');
        
        // Show the correct sport game
        sportGames.forEach(game => {
            game.classList.remove('active');
        });
        document.getElementById(`${sport}-game`).classList.add('active');
        
        // Update action text
        actionTextDisplay.textContent = `Playing ${getSportName(sport)}`;
        
        // Initialize the specific sport game
        switch(sport) {
            case 'football':
                initFootballGame();
                break;
            case 'american-football':
                initAmericanFootballGame();
                break;
            case 'cricket':
                initCricketGame();
                break;
            case 'basketball':
                initBasketballGame();
                break;
        }
    }

    // Get sport name for display
    function getSportName(sport) {
        switch(sport) {
            case 'football': return 'Football';
            case 'american-football': return 'American Football';
            case 'cricket': return 'Cricket';
            case 'basketball': return 'Basketball';
            default: return sport;
        }
    }

    // *** FOOTBALL GAME ***
    function initFootballGame() {
        const footballGame = document.getElementById('football-game');
        const shootBtn = footballGame.querySelector('.shoot-btn');
        const powerBar = footballGame.querySelector('.power-bar');
        const ball = footballGame.querySelector('.football-ball');
        
        // Reset game elements
        ball.style.transform = 'translateX(-50%)';
        ball.style.bottom = '50px';
        powerBar.style.width = '0%';
        
        // Start power meter when button is clicked
        shootBtn.addEventListener('click', function footballShoot() {
            if(!gameState.powerMeterRunning) {
                // Start power meter
                gameState.powerMeterRunning = true;
                gameState.powerValue = 0;
                
                function updatePowerMeter() {
                    if(gameState.powerValue >= 100) {
                        gameState.powerMeterRunning = false;
                        kickFootball();
                        return;
                    }
                    
                    gameState.powerValue += 2;
                    powerBar.style.width = `${gameState.powerValue}%`;
                    gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
                }
                
                gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
            } else {
                // Stop power meter and kick
                gameState.powerMeterRunning = false;
                cancelAnimationFrame(gameState.animationFrame);
                kickFootball();
            }
            
            // Remove event listener to prevent multiple kicks
            shootBtn.removeEventListener('click', footballShoot);
        });
        
        function kickFootball() {
            // Get goalkeeper position
            const goalkeeper = footballGame.querySelector('.goalkeeper');
            const goalkeeperRect = goalkeeper.getBoundingClientRect();
            const goalRect = footballGame.querySelector('.goal').getBoundingClientRect();
            
            // Calculate random factors for kick direction and height
            const direction = (Math.random() * 200) - 100; // -100 to 100 px from center
            const height = 150 + (gameState.powerValue * 1.5); // Higher power = higher kick
            
            // Animate the ball
            ball.style.transition = 'all 1s ease-out';
            ball.style.transform = `translateX(calc(-50% + ${direction}px))`;
            ball.style.bottom = `${height}px`;
            
            // Check if goal after animation completes
            setTimeout(() => {
                const ballRect = ball.getBoundingClientRect();
                
                // Check if ball is in goal area
                const isInGoal = (
                    ballRect.left > goalRect.left &&
                    ballRect.right < goalRect.right &&
                    ballRect.top > goalRect.top &&
                    ballRect.bottom < goalRect.bottom + 50
                );
                
                // Check if goalkeeper blocked
                const isBlocked = (
                    ballRect.left < goalkeeperRect.right &&
                    ballRect.right > goalkeeperRect.left &&
                    ballRect.top < goalkeeperRect.bottom &&
                    ballRect.bottom > goalkeeperRect.top
                );
                
                if(isInGoal && !isBlocked) {
                    showResult(true, sportPoints['football']);
                } else {
                    showResult(false, 0);
                }
            }, 1000);
        }
    }

    // *** AMERICAN FOOTBALL GAME ***
    function initAmericanFootballGame() {
        const americanFootballGame = document.getElementById('american-football-game');
        const shootBtn = americanFootballGame.querySelector('.shoot-btn');
        const powerBar = americanFootballGame.querySelector('.power-bar');
        const ball = americanFootballGame.querySelector('.american-football-ball');
        const angleIndicator = americanFootballGame.querySelector('.angle-indicator');
        
        // Reset game elements
        ball.style.transform = 'translateX(-50%)';
        ball.style.bottom = '50px';
        powerBar.style.width = '0%';
        angleIndicator.style.left = '50%';
        
        // Start angle selection
        gameState.isAngleMoving = true;
        gameState.angleValue = 50; // center
        
        function updateAngle() {
            if(!gameState.isAngleMoving) return;
            
            // Make angle indicator move back and forth
            gameState.angleValue += gameState.angleDirection || 1;
            if(gameState.angleValue >= 100) {
                gameState.angleValue = 100;
                gameState.angleDirection = -1;
            } else if(gameState.angleValue <= 0) {
                gameState.angleValue = 0;
                gameState.angleDirection = 1;
            }
            
            angleIndicator.style.left = `${gameState.angleValue}%`;
            gameState.animationFrame = requestAnimationFrame(updateAngle);
        }
        
        gameState.animationFrame = requestAnimationFrame(updateAngle);
        
        // Handle shoot button click for american football
        shootBtn.addEventListener('click', function americanFootballShoot() {
            if(gameState.isAngleMoving) {
                // Stop angle selection and start power meter
                gameState.isAngleMoving = false;
                cancelAnimationFrame(gameState.animationFrame);
                
                // Start power meter
                gameState.powerMeterRunning = true;
                gameState.powerValue = 0;
                
                function updatePowerMeter() {
                    if(!gameState.powerMeterRunning) return;
                    
                    gameState.powerValue += 2;
                    if(gameState.powerValue >= 100) {
                        gameState.powerValue = 100;
                        gameState.powerMeterRunning = false;
                        kickAmericanFootball();
                        return;
                    }
                    
                    powerBar.style.width = `${gameState.powerValue}%`;
                    gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
                }
                
                gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
            } else if(gameState.powerMeterRunning) {
                // Stop power meter and kick
                gameState.powerMeterRunning = false;
                cancelAnimationFrame(gameState.animationFrame);
                kickAmericanFootball();
            }
            
            // Remove event listener to prevent multiple kicks
            shootBtn.removeEventListener('click', americanFootballShoot);
        });
        
        function kickAmericanFootball() {
            // Calculate angle from center (0 = left, 50 = center, 100 = right)
            const angle = (gameState.angleValue - 50) / 50; // -1 to 1
            
            // Calculate height based on power
            const height = 150 + (gameState.powerValue * 2); // Higher power = higher kick
            
            // Calculate horizontal displacement based on angle
            const horizontalDisplacement = angle * 100; // pixels from center
            
            // Animate the ball
            ball.style.transition = 'all 1.5s ease-out';
            ball.style.transform = `translateX(calc(-50% + ${horizontalDisplacement}px)) rotate(360deg)`;
            ball.style.bottom = `${height}px`;
            
            // Check if goal after animation completes
            setTimeout(() => {
                const ballRect = ball.getBoundingClientRect();
                const postLeft = americanFootballGame.querySelector('.post-left').getBoundingClientRect();
                const postRight = americanFootballGame.querySelector('.post-right').getBoundingClientRect();
                const postTop = americanFootballGame.querySelector('.post-top').getBoundingClientRect();
                
                // Check if ball is between the posts
                const isGoal = (
                    ballRect.left > postLeft.right &&
                    ballRect.right < postRight.left &&
                    ballRect.bottom < postTop.top + 50 &&
                    height > 120 // Must be high enough
                );
                
                if(isGoal) {
                    showResult(true, sportPoints['american-football']);
                } else {
                    showResult(false, 0);
                }
            }, 1500);
        }
    }

    // *** CRICKET GAME ***
    function initCricketGame() {
        const cricketGame = document.getElementById('cricket-game');
        const shootBtn = cricketGame.querySelector('.shoot-btn');
        const ball = cricketGame.querySelector('.cricket-ball');
        const bat = cricketGame.querySelector('.cricket-bat');
        const timingIndicator = cricketGame.querySelector('.timing-indicator');
        const perfectZone = cricketGame.querySelector('.perfect-zone');
        
        // Reset game elements
        ball.style.left = 'auto';
        ball.style.right = '100px';
        ball.style.bottom = '100px';
        bat.style.transform = 'translateX(-50%) rotate(45deg)';
        
        // Start timing meter
        gameState.isTimingMoving = true;
        
        function updateTiming() {
            if(!gameState.isTimingMoving) return;
            
            // Timing indicator automatically moves in CSS animation
            // We just need to check its position when player clicks
            
            gameState.animationFrame = requestAnimationFrame(updateTiming);
        }
        
        gameState.animationFrame = requestAnimationFrame(updateTiming);
        
        // Handle shoot button click for cricket
        shootBtn.addEventListener('click', function cricketHit() {
            // Stop timing
            gameState.isTimingMoving = false;
            cancelAnimationFrame(gameState.animationFrame);
            
            // Get timing indicator position
            const timingRect = timingIndicator.getBoundingClientRect();
            const perfectRect = perfectZone.getBoundingClientRect();
            
            // Check if timing was perfect
            const isPerfect = (
                timingRect.left >= perfectRect.left &&
                timingRect.right <= perfectRect.right
            );
            
            // Swing the bat
            bat.style.transition = 'transform 0.3s ease-out';
            bat.style.transform = 'translateX(-50%) rotate(-45deg)';
            
            // Animate the ball based on timing
            setTimeout(() => {
                ball.style.transition = 'all 1s ease-out';
                
                if(isPerfect) {
                    // Perfect hit - ball goes straight to stump
                    ball.style.right = 'auto';
                    ball.style.left = '50%';
                    ball.style.bottom = '200px';
                    
                    // Check if hit the stump
                    setTimeout(() => {
                        showResult(true, sportPoints['cricket']);
                    }, 1000);
                } else {
                    // Mistimed hit - ball goes in random direction
                    const randomX = 30 + Math.random() * 40; // 30-70% across
                    const randomY = 50 + Math.random() * 100; // 50-150px up
                    
                    ball.style.right = 'auto';
                    ball.style.left = `${randomX}%`;
                    ball.style.bottom = `${randomY}px`;
                    
                    // Miss
                    setTimeout(() => {
                        showResult(false, 0);
                    }, 1000);
                }
            }, 300);
            
            // Remove event listener to prevent multiple hits
            shootBtn.removeEventListener('click', cricketHit);
        });
    }

    // *** BASKETBALL GAME ***
    function initBasketballGame() {
        const basketballGame = document.getElementById('basketball-game');
        const shootBtn = basketballGame.querySelector('.shoot-btn');
        const powerBar = basketballGame.querySelector('.power-bar');
        const ball = basketballGame.querySelector('.basketball-ball');
        const angleIndicator = basketballGame.querySelector('.angle-indicator');
        
        // Reset game elements
        ball.style.transform = 'translateX(-50%)';
        ball.style.bottom = '50px';
        powerBar.style.width = '0%';
        angleIndicator.style.left = '50%';
        
        // Start angle selection
        gameState.isAngleMoving = true;
        gameState.angleValue = 50; // center
        
        function updateAngle() {
            if(!gameState.isAngleMoving) return;
            
            // Make angle indicator move back and forth
            gameState.angleValue += gameState.angleDirection || 1;
            if(gameState.angleValue >= 100) {
                gameState.angleValue = 100;
                gameState.angleDirection = -1;
            } else if(gameState.angleValue <= 0) {
                gameState.angleValue = 0;
                gameState.angleDirection = 1;
            }
            
            angleIndicator.style.left = `${gameState.angleValue}%`;
            gameState.animationFrame = requestAnimationFrame(updateAngle);
        }
        
        gameState.animationFrame = requestAnimationFrame(updateAngle);
        
        // Handle shoot button click for basketball
        shootBtn.addEventListener('click', function basketballShoot() {
            if(gameState.isAngleMoving) {
                // Stop angle selection and start power meter
                gameState.isAngleMoving = false;
                cancelAnimationFrame(gameState.animationFrame);
                
                // Start power meter
                gameState.powerMeterRunning = true;
                gameState.powerValue = 0;
                
                function updatePowerMeter() {
                    if(!gameState.powerMeterRunning) return;
                    
                    gameState.powerValue += 2;
                    if(gameState.powerValue >= 100) {
                        gameState.powerValue = 100;
                        gameState.powerMeterRunning = false;
                        shootBasketball();
                        return;
                    }
                    
                    powerBar.style.width = `${gameState.powerValue}%`;
                    gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
                }
                
                gameState.animationFrame = requestAnimationFrame(updatePowerMeter);
            } else if(gameState.powerMeterRunning) {
                // Stop power meter and shoot
                gameState.powerMeterRunning = false;
                cancelAnimationFrame(gameState.animationFrame);
                shootBasketball();
            }
            
            // Remove event listener to prevent multiple shots
            shootBtn.removeEventListener('click', basketballShoot);
        });
        
        function shootBasketball() {
            // Calculate angle from center (0 = left, 50 = center, 100 = right)
            const angle = (gameState.angleValue - 50) / 50; // -1 to 1
            
            // Calculate if power is in sweet spot (40-70 is ideal)
            const isPowerIdeal = gameState.powerValue >= 40 && gameState.powerValue <= 70;
            
            // Calculate arc height based on power
            const arcHeight = 200 + gameState.powerValue; // Higher power = higher arc
            
            // Calculate horizontal displacement based on angle
            const horizontalDisplacement = angle * 80; // pixels from center
            
            // Animate the ball in an arc
            ball.style.transition = 'all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            // Set initial position for animation
            ball.style.transform = `translateX(-50%)`;
            
            // Use keyframes for arc motion
            const ballAnimation = ball.animate([
                { 
                    transform: `translateX(calc(-50% + 0px))`, 
                    bottom: '50px' 
                },
                { 
                    transform: `translateX(calc(-50% + ${horizontalDisplacement/2}px))`, 
                    bottom: `${arcHeight}px` 
                },
                { 
                    transform: `translateX(calc(-50% + ${horizontalDisplacement}px))`, 
                    bottom: '300px' 
                }
            ], {
                duration: 1500,
                fill: 'forwards',
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            });
            
            // Check if basket after animation completes
            setTimeout(() => {
                // Determine success based on angle and power
                // Center angle (close to 0) and ideal power are more likely to succeed
                const angleAccuracy = 1 - Math.abs(angle); // 1 at center, 0 at edges
                const powerFactor = isPowerIdeal ? 1 : 0.3; // 1 if ideal power, 0.3 otherwise
                
                // Combined accuracy
                const accuracy = angleAccuracy * powerFactor;
                
                // Probability of success based on accuracy
                const successThreshold = 0.6; // 60% accuracy needed
                const isBasket = accuracy > successThreshold;
                
                if(isBasket) {
                    showResult(true, sportPoints['basketball']);
                } else {
                    showResult(false, 0);
                }
            }, 1500);
        }
    }

    // Show result of the turn
    function showResult(isSuccess, points) {
        // Stop any ongoing animations
        cancelAnimationFrame(gameState.animationFrame);
        
        // Show result container
        resultContainer.classList.remove('hidden');
        
        // Get result elements
        const resultIcon = document.querySelector('.result-icon');
        const resultMessage = document.querySelector('.result-message');
        const pointsEarned = document.querySelector('.points-earned');
        
        // Set result content based on success
        if(isSuccess) {
            resultIcon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success-color);"></i>';
            resultMessage.textContent = 'Success!';
            pointsEarned.textContent = `+${points} points`;
            
            // Add points to current player
            const currentPlayer = gameState.players[gameState.currentPlayerIndex];
            currentPlayer.score += points;
        } else {
            resultIcon.innerHTML = '<i class="fas fa-times-circle" style="color: var(--danger-color);"></i>';
            resultMessage.textContent = 'Missed!';
            pointsEarned.textContent = 'No points earned';
        }
    }

    // Continue to next turn
    function continueTurn() {
        // Hide result container
        resultContainer.classList.add('hidden');
        
        // Reset game play area
        gamePlay.classList.add('hidden');
        
        // Increment round counter
        gameState.roundsPlayed++;
        
        // Check if game over
        if(gameState.roundsPlayed >= gameState.maxRounds) {
            endGame();
            return;
        }
        
        // Move to next player
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
        
        // Update player display
        updatePlayerDisplay();
        
        // Show sport selection
        sportsSelection.classList.remove('hidden');
        actionTextDisplay.textContent = 'Select a sport to play';
    }

    // End the game and show results
    function endGame() {
        // Find winner
        let winnerIndex = 0;
        for(let i = 1; i < gameState.players.length; i++) {
            if(gameState.players[i].score > gameState.players[winnerIndex].score) {
                winnerIndex = i;
            }
        }
        
        // Check for ties
        const winnerScore = gameState.players[winnerIndex].score;
        const winners = gameState.players.filter(player => player.score === winnerScore);
        
        // Prepare final scores HTML
        let scoresHTML = '<div class="final-player-scores">';
        gameState.players.forEach(player => {
            scoresHTML += `<div class="final-player-score ${player.score === winnerScore ? 'winner' : ''}">
                <div class="final-player-name">${player.name}</div>
                <div class="final-score">${player.score}</div>
            </div>`;
        });
        scoresHTML += '</div>';
        
        // Set winner announcement
        let winnerText = '';
        if(winners.length > 1) {
            winnerText = `It's a tie between ${winners.map(w => w.name).join(' and ')}!`;
        } else {
            winnerText = `${gameState.players[winnerIndex].name} wins!`;
        }
        
        // Show game over modal
        document.querySelector('.final-scores').innerHTML = scoresHTML;
        document.querySelector('.winner-announcement').textContent = winnerText;
        gameOverModal.classList.remove('hidden');
    }

    // Reset the game
    function resetGame() {
        // Reset game state
        gameState.players.forEach(player => {
            player.score = 0;
        });
        gameState.currentPlayerIndex = 0;
        gameState.roundsPlayed = 0;
        gameState.currentSport = null;
        
        // Cancel any animations
        if(gameState.animationFrame) {
            cancelAnimationFrame(gameState.animationFrame);
        }
        
        // Reset DOM
        gamePlay.classList.add('hidden');
        resultContainer.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        sportsSelection.classList.remove('hidden');
        
        // Update displays
        updatePlayerDisplay();
        actionTextDisplay.textContent = 'Select a sport to play';
    }

    // Initialize the game
    initGame();
});