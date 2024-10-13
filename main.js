const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

let balls = []
let score = 0
let lives = 3
const ballRadius = 10
const basketWidth = 100
const basketHeight = 20
let basketX = (canvas.width - basketWidth) / 2
let baseVelocity = 2


function spawnBall() {
    const x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
    const velocityX = (Math.random() - 0.5) * 2
    const velocityY = baseVelocity + Math.random()
    balls.push({ x: x, y: 0, color: 'blue', points: 1, velocityX: velocityX, velocityY: velocityY })
}


function spawnPurpleBall() {
    const x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius
    const velocityX = (Math.random() - 0.5) * 2
    const velocityY = baseVelocity + Math.random()
    balls.push({ x: x, y: 0, color: 'purple', points: 5, velocityX: velocityX, velocityY: velocityY })
}


function drawBalls() {
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2)
        ctx.fillStyle = ball.color
        ctx.fill()
        ctx.closePath()
    });
}


function drawBasket() {
    ctx.fillStyle = 'brown'
    ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight)
}


function updateGame() {
    balls.forEach(ball => {
        ball.x += ball.velocityX
        ball.y += ball.velocityY

      
        if (ball.y + ballRadius >= canvas.height - basketHeight && 
            ball.x >= basketX && 
            ball.x <= basketX + basketWidth) {
            score += ball.points
            balls.splice(balls.indexOf(ball), 1)
            
      
            if (score % 10 === 0) { 
                baseVelocity += 0.5
            }
        } else if (ball.y > canvas.height) {
            lives--
            if (lives <= 0) {
                alert(`Игра окончена. Вы набрали ${score} очков`)
                document.location.reload()
            }
            
            balls.splice(balls.indexOf(ball), 1)
        }

        
        if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
            ball.velocityX = -ball.velocityX
        }
    })
}


canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left

 
    basketX = mouseX - basketWidth / 2

   
    if (basketX < 0) {
        basketX = 0
    } else if (basketX > canvas.width - basketWidth) {
        basketX = canvas.width - basketWidth
    }
})


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBalls()
    drawBasket()
    updateGame()
    

    ctx.fillStyle = 'black'
    ctx.fillText(`Очки: ${score}`, 10, 20)
    ctx.fillText(`Жизни: ${lives}`, canvas.width - 80, 20)

    requestAnimationFrame(gameLoop)
}



setInterval(spawnBall, 1000)
setInterval(spawnPurpleBall, 3000)
requestAnimationFrame(gameLoop)

