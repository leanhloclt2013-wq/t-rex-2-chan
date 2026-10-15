body {
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden; /* Ngăn cuộn trang */
}

.game-container {
    text-align: center;
}

h1 {
    color: #535353;
    font-size: 24px;
    margin-bottom: 20px;
}

#game {
    width: 800px; /* Tăng độ rộng game */
    height: 250px; /* Tăng độ cao game */
    border-bottom: 2px solid #535353;
    position: relative;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

#score {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 20px;
    color: #535353;
    font-weight: bold;
    z-index: 10;
}

.ground {
    width: 100%;
    height: 2px;
    background-color: #535353;
    position: absolute;
    bottom: 0;
}

#dino {
    width: 40px;
    height: 40px;
    background-color: #535353; /* Khủng long màu xám */
    position: absolute;
    bottom: 2px;
    left: 50px;
    border-radius: 4px; /* Bo góc nhẹ */
}

/* Các loại chướng ngại vật chung */
.obstacle {
    position: absolute;
    bottom: 2px; /* Mặc định sát đất */
    animation: moveObstacle 1.8s infinite linear; /* Thời gian di chuyển */
}

/* 1. Xương rồng thấp */
.cactus-short {
    width: 25px;
    height: 40px;
    background-color: #1a7f37;
}

/* 2. Xương rồng cao */
.cactus-tall {
    width: 30px;
    height: 60px;
    background-color: #1a7f37;
}

/* 3. Xương rồng rộng */
.cactus-wide {
    width: 60px;
    height: 40px;
    background-color: #1a7f37;
}

/* 4. Chim bay thấp */
.bird-low {
    width: 35px;
    height: 25px;
    background-color: #cf222e; /* Màu đỏ */
    border-radius: 50%; /* Hình chim tròn */
    bottom: 30px; /* Bay ngang tầm nhảy của Dino */
}

/* 5. Chim bay cao */
.bird-high {
    width: 35px;
    height: 25px;
    background-color: #cf222e;
    border-radius: 50%;
    bottom: 80px; /* Bay rất cao, không cần nhảy */
}

/* Animation cho Dino nhảy */
.jump {
    animation: jumpAni 0.6s linear; /* Thời gian nhảy */
}

@keyframes jumpAni {
    0% { bottom: 2px; }
    30% { bottom: 120px; } /* Đỉnh nhảy */
    70% { bottom: 120px; } /* Giữ trên cao một chút */
    100% { bottom: 2px; }
}

/* Animation cho chướng ngại vật di chuyển từ phải sang trái */
@keyframes moveObstacle {
    0% { left: 850px; } /* Bắt đầu ngoài màn hình bên phải */
    100% { left: -70px; } /* Kết thúc ngoài màn hình bên trái */
}

.instructions {
    margin-top: 15px;
    color: #777;
    font-size: 14px;
}
