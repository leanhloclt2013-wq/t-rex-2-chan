const dino = document.getElementById("dino");
const obstacleContainer = document.getElementById("obstacle-container");
const scoreElement = document.getElementById("score");

let score = 0;
let isJumping = false;
let isGameOver = false;

// 1. Hàm nhảy
function jump() {
    if (isJumping || isGameOver) return;
    isJumping = true;
    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
        isJumping = false;
    }, 550);
}

// 2. Lắng nghe sự kiện phím hoặc chạm màn hình
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        if (isGameOver) {
            resetGame();
        } else {
            jump();
        }
    }
});

document.addEventListener("click", function () {
    if (isGameOver) {
        resetGame();
    } else {
        jump();
    }
});

// 3. Hàm tạo chướng ngại vật (Xương rồng hoặc Chim)
const obstacleTypes = ['cactus-short', 'cactus-tall', 'cactus-wide', 'bird-low', 'bird-high'];

function spawnObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    
    // Chọn ngẫu nhiên loại chướng ngại vật
    const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    obstacle.classList.add(randomType);
    
    // Đặt vị trí ban đầu ở mép phải khung game (800px)
    obstacle.style.left = '800px';
    obstacleContainer.appendChild(obstacle);

    // Thời gian để chướng ngại vật chạy hết màn hình
    let obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        let currentLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

        // Kiểm tra va chạm (Dino ở khoảng left từ 50px đến 90px)
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        
        // Điều kiện va chạm chuẩn xác hơn cho từng loại
        let isBirdHigh = obstacle.classList.contains('bird-high');
        let collisionHeight = isBirdHigh ? 80 : 35; // Chim cao thì dino không cần nhảy hoặc né kiểu khác, tùy chỉnh ở đây

        if (currentLeft > 40 && currentLeft < 80 && dinoBottom < collisionHeight && !isBirdHigh) {
            // Va chạm xảy ra (trừ chim bay cao ra vì nó bay trên đầu)
            if (!(isBirdHigh && dinoBottom > 50)) {
                triggerGameOver();
            }
        }
        // Riêng chim bay cao thì kiểm tra nếu khủng long không nhảy lên thì thua (hoặc ngược lại tùy bạn chỉnh, ở đây ta bắt chạm cơ bản)
        if (isBirdHigh && currentLeft > 40 && currentLeft < 80 && dinoBottom < 90) {
            // Chim bay cao cần chui qua (nhưng game đơn giản chỉ nhảy, nên ta cho chim bay cao ở mức khủng long phải né hoặc chỉnh thấp xuống chút)
        }

        // Nếu chướng ngại vật đi ra ngoài màn hình thì xóa đi
        if (currentLeft < -60) {
            obstacle.remove();
            clearInterval(obstacleInterval);
        } else {
            obstacle.style.left = (currentLeft - 5) + 'px'; // Tốc độ di chuyển
        }
    }, 20);

    // Thời gian ngẫu nhiên sinh ra chướng ngại vật tiếp theo (1.5s đến 3s)
    let randomTime = Math.random() * 1500 + 1500;
    setTimeout(spawnObstacle, randomTime);
}

// 4. Tính điểm số tăng dần theo thời gian
let scoreInterval = setInterval(() => {
    if (!isGameOver) {
        score++;
        scoreElement.innerText = "Điểm: " + score;
    }
}, 100);

// 5. Thua game
function triggerGameOver() {
    isGameOver = true;
    alert("GAME OVER! Điểm của bạn: " + score + "\nBấm OK để chơi lại.");
    resetGame();
}

// 6. Chơi lại từ đầu
function resetGame() {
    score = 0;
    scoreElement.innerText = "Điểm: 0";
    isGameOver = false;
    obstacleContainer.innerHTML = ''; // Xóa hết chướng ngại vật cũ
}

// Bắt đầu chạy trò chơi ngay khi load xong script
setTimeout(spawnObstacle, 1000);
