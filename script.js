const dino = document.getElementById("dino");
const obstacleContainer = document.getElementById("obstacle-container");
const scoreElement = document.getElementById("score");

let score = 0;
let isJumping = false;
let isDuck = false;
let isGameOver = false;

// 1. Hàm nhảy
function jump() {
    if (isJumping || isGameOver || isDuck) return;
    isJumping = true;
    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
        isJumping = false;
    }, 550);
}

// 2. Hàm cúi đầu
function duck(isDown) {
    if (isJumping || isGameOver) return;
    if (isDown) {
        isDuck = true;
        dino.classList.add("duck");
    } else {
        isDuck = false;
        dino.classList.remove("duck");
    }
}

// 3. Lắng nghe sự kiện bàn phím
document.addEventListener("keydown", function (event) {
    if (isGameOver) {
        if (event.code === "Space" || event.code === "ArrowUp") {
            resetGame();
        }
        return;
    }

    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
    } else if (event.code === "ArrowDown") {
        event.preventDefault();
        duck(true);
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowDown") {
        duck(false);
    }
});

// Hỗ trợ click hoặc chạm màn hình để chơi lại khi thua
document.addEventListener("click", function () {
    if (isGameOver) {
        resetGame();
    }
});

// 4. Hàm tạo chướng ngại vật ngẫu nhiên
const obstacleTypes = ['cactus-short', 'cactus-tall', 'cactus-wide', 'bird-low', 'bird-high'];

function spawnObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    
    const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    obstacle.classList.add(randomType);
    
    obstacle.style.left = '800px';
    obstacleContainer.appendChild(obstacle);

    // Tính tốc độ di chuyển cơ bản, cứ mỗi 200 điểm sẽ tăng tốc độ lên (cộng thêm 1.5 đơn vị mỗi mốc 200 điểm)
    let speedBonus = Math.floor(score / 200) * 1.5;
    let currentSpeed = 5 + speedBonus;

    let obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        let currentLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

        let isBirdHigh = obstacle.classList.contains('bird-high');
        let isBirdLow = obstacle.classList.contains('bird-low');
        let isCactus = !isBirdHigh && !isBirdLow;

        // KIỂM TRA VA CHẠM CHÍNH XÁC
        if (currentLeft > 40 && currentLeft < 80) {
            if (isCactus || isBirdLow) {
                // Va chạm xương rồng hoặc chim bay thấp nếu khủng long không nhảy lên cao
                if (dinoBottom < 35) {
                    triggerGameOver();
                }
            } else if (isBirdHigh) {
                // Chim bay cao: Khủng long phải cúi đầu (duck) mới né được, nếu đứng bình thường hoặc nhảy lên sẽ bị đụng
                if (!isDuck && dinoBottom < 50) {
                    triggerGameOver();
                }
            }
        }

        // Xóa chướng ngại vật khi ra khỏi màn hình
        if (currentLeft < -60) {
            obstacle.remove();
            clearInterval(obstacleInterval);
        } else {
            // Cập nhật vị trí dịch chuyển dựa theo tốc độ hiện tại
            obstacle.style.left = (currentLeft - currentSpeed) + 'px';
        }
    }, 20);

    // Thời gian sinh chướng ngại vật tiếp theo ngắn lại một chút khi điểm cao dần
    let randomDelayTime = Math.max(900, 1500 - Math.floor(score / 100) * 50);
    let randomTime = Math.random() * 500 + randomDelayTime;
    setTimeout(spawnObstacle, randomTime);
}

// 5. Tính điểm số tăng dần theo thời gian
let scoreInterval = setInterval(() => {
    if (!isGameOver) {
        score++;
        scoreElement.innerText = "Điểm: " + score;
    }
}, 100);

// 6. Thua game
function triggerGameOver() {
    isGameOver = true;
    document.querySelector('.instructions').innerHTML = "Thua rồi! Bấm <strong>Space</strong> để chơi lại";
    alert("GAME OVER! Điểm của bạn: " + score + "\nBấm OK để chơi lại.");
}

// 7. Chơi lại từ đầu
function resetGame() {
    score = 0;
    scoreElement.innerText = "Điểm: 0";
    isGameOver = false;
    obstacleContainer.innerHTML = '';
    document.querySelector('.instructions').innerHTML = "Bấm <strong>Space</strong> (nhảy) hoặc <strong>Mũi tên xuống</strong> (cúi)";
    setTimeout(spawnObstacle, 1000);
}

// Bắt đầu chạy trò chơi
setTimeout(spawnObstacle, 1000);
