const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");

// Bắt sự kiện nhảy khi bấm phím Space hoặc click chuột/chạm màn hình
function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

document.addEventListener("click", function () {
    jump();
});

// Cho chướng ngại vật bắt đầu chạy
obstacle.classList.add("move");

// Kiểm tra va chạm liên tục
let isAlive = setInterval(function () {
    // Lấy vị trí hiện tại của Dino (cách đáy)
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    
    // Lấy vị trí hiện tại của chướng ngại vật (cách trái)
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Điều kiện va chạm: chướng ngại vật đang ở khoảng từ 50px đến 70px và khủng long không nhảy lên cao (dưới 30px)
    if (obstacleLeft < 70 && obstacleLeft > 40 && dinoBottom < 30) {
        alert("Game Over! Bạn đã thua cuộc.");
        window.location.reload();
    }
}, 10);
