document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const scorebox = document.querySelector('.score-box')

    let birdLeft = 220
    let birdBottom = 200 
    let gravity = 2
    let isGameOver = false
    let gap = 430   
    let score = 0
    let level = 1
    

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32){
            jump()
        } 
    }


    function jump() {
        if (birdBottom < 495) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)

    function generateCloud(){
        let cloudLeft = 500
        let randomCloudHeight = 400 + (Math.random() * 200)
        let cloudBottom = randomCloudHeight
        const cloud = document.createElement('div')

        if (!isGameOver) {
            cloud.classList.add('cloud')
        }
        gameDisplay.appendChild(cloud)
        cloud.style.left = cloudLeft + 'px'

        function moveCloud() {
            cloudLeft -=1
            cloud.style.left = cloudLeft + 'px'
            cloud.style.bottom = cloudBottom + 'px'
        }

        let cloudTimerId = setInterval(moveCloud, 50)
        if (!isGameOver) setTimeout(generateCloud, 20000)

    }

    generateCloud()

    function generateObstacle() {
        let vardist = Math.random() * 500
        let obstacleLeft = 500
        let randomHeight = Math.random() * 80
        let rGap = gap + (Math.random() * (100 - (level * 10)))
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + rGap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {  
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
                scorebox.innerHTML = score + ' Score'
                score +=1
                level = Math.floor(score / 10)
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + rGap - 195) ||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 21 - level)
        if (!isGameOver) setTimeout(generateObstacle, (2500 + vardist))
    }

    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
        console.log(level)
    }

})

