const dino = document.getElementById("dino");
const obstacleContainer = document.getElementById("obstacle-container");
const scoreElement = document.getElementById("score");

let gameStarted = false;
let score = 0;
let scoreInterval;
let obstacleTimeout;
let gameLoopId;

// Danh sách các loại chướng ngại vật
const obstacleTypes = [
    { class: 'cactus-short', width: 25, height: 40 },
    { class: 'cactus-tall', width: 28, height: 65 },
    { class: 'cactus-wide', width: 55, height: 42 },
    { class: 'bird-low', width: 38, height: 24 },
    { class: 'bird-high', width: 38, height: 24 }
];

// Hàm nhảy
function jump() {
    if (!gameStarted) return;
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(function () {
            dino.classList.remove("jump");
        }, 550);
    }
}

// Bắt đầu trò chơi
function startGame() {
    if (gameStarted) return;
    
    gameStarted = true;
    score = 0;
    scoreElement.innerText = "Điểm: 0";
    obstacleContainer.innerHTML = ''; // Xóa chướng ngại vật cũ nếu có
    document.querySelector('.instructions').innerHTML = "Bấm <strong>Space</strong> hoặc <strong>Chạm màn hình</strong> để nhảy!";

    // Tính điểm
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.innerText = "Điểm: " + score;
    }, 100);

    // Bắt đầu tạo chướng ngại vật
    spawnObstacle();

    // Vòng lặp cập nhật chuyển động và va chạm
    gameLoopId = requestAnimationFrame(updateGame);
}

// Thua game
function gameOver() {
    gameStarted = false;
    clearInterval(scoreInterval);
    clearTimeout(obstacleTimeout);
    cancelAnimationFrame(gameLoopId);
    
    setTimeout(() => {
        alert("GAME OVER!\nĐiểm số của bạn: " + score + "\nẤn OK để chơi lại.");
        document.querySelector('.instructions').innerHTML = "Ấn <strong>Space</strong> hoặc <strong>Chạm</strong> để chơi lại";
    }, 50);
}

// Tạo chướng ngại vật ngẫu nhiên
function spawnObstacle() {
    if (!gameStarted) return;

    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    const type = obstacleTypes[randomIndex];

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle', type.class);
    obstacle.style.left = '800px'; // Xuất hiện từ rìa phải
    obstacleContainer.appendChild(obstacle);

    // Hẹn giờ tạo chướng ngại vật tiếp theo (từ 1.2s đến 2.5s)
    const randomDelay = Math.random() * 1300 + 1200;
    obstacleTimeout = setTimeout(spawnObstacle, randomDelay);
}

// Cập nhật vị trí tất cả chướng ngại vật & kiểm tra va chạm
function updateGame() {
    if (!gameStarted) return;

    const obstacles = document.querySelectorAll('.obstacle');
    const dinoRect = dino.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        let currentLeft = parseFloat(obstacle.style.left);
        let speed = 6 + Math.floor(score / 50); // Tăng tốc độ dần theo điểm

        currentLeft -= speed;
        obstacle.style.left = currentLeft + 'px';

        // Kiểm tra va chạm bằng thuật toán AABB (Bounding Box)
        const obstacleRect = obstacle.getBoundingClientRect();
        
        // Thu nhỏ khung va chạm 5px để tính chính xác hơn
        if (
            dinoRect.right - 5 > obstacleRect.left &&
            dinoRect.left + 5 < obstacleRect.right &&
            dinoRect.bottom - 5 > obstacleRect.top &&
            dinoRect.top + 5 < obstacleRect.bottom
        ) {
            gameOver();
        }

        // Xóa chướng ngại vật khi ra khỏi màn hình bên trái
        if (currentLeft < -60) {
            obstacle.remove();
        }
    });

    if (gameStarted) {
        requestAnimationFrame(updateGame);
    }
}

// Lắng nghe phím Space / Mũi tên lên
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        if (!gameStarted) {
            startGame();
        } else {
            jump();
        }
    }
});

// Lắng nghe thao tác Click / Chạm màn hình
document.addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
    } else {
        jump();
    }
});
