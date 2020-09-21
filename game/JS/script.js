var planet = 9.81/100;
var posX = 0;
var posY = 0;
var sX = 0;
var sY = 0;
var x = 0;
var y = 0;
var showX = 0;
var showY = 0;
var deg = 0;
var str = 0;
var barStr = 0;
var bullet = document.getElementById("bullet"), deg = 10;
var aim = document.getElementById("aimArea");
var launch = document.getElementById("launch");
var newBtn = document.getElementById("newPos");
var strBar = document.getElementById("bar");
var coordinates = document.getElementById("coordinates");
var gravitation = 0;
var interval = 0;
var barInt = 0;
var enemyPos = 0;
var enemy = document.getElementById("enemy");
var coor = "";
var liveSymbol = document.getElementById("liveBox");
var retry = document.getElementById("again");
var lives = 0;
var text = "";

retry.addEventListener("click", function() {
    if (lives > 0 && !coor.includes("Hit!!") ) {
        posX = 0;
        posY = 0;
        x = 0;
        y = 0;
        sX = 0;
        sY = 0;
        showX = 0;
        showY = 0;
        bullet.style.bottom = 0 + 'px';
        bullet.style.left = 0 + 'px';
        updateLives();
    }
    else {
        coordinates.innerHTML = "Please start new game!";
    }
})

newBtn.addEventListener("click", function() {
    lives = 3;
    updateLives();
    liveSymbol.innerHTML = text;
    coordinates.style.color = "green";
    coordinates.style.lineHeight = 1.4 + "rem";
    coordinates.style.fontSize = "120%";
    coordinates.style.fontWeight = "300";
    coordinates.style.textShadow = "0 0 15px green, 0 0 15px green, 0 0 15px green";
    enemyPos = Math.ceil(Math.random() * 700) + 100;
    enemy.style.left = enemyPos + 'px';
    bullet.style.bottom = 0 + 'px';
    bullet.style.left = 0 + 'px';
    posX = 0;
    posY = 0;
    x = 0;
    y = 0;
    sX = 0;
    sY = 0;
    showX = 0;
    showY = 0;
    coor = "X:" + x + " -- Y: " + y + "<br />Saved Coor.:<br />X: " + showX +  " -- Y: " + showY + "<br /> Str: " + str;
    coordinates.innerHTML = coor;
    coordinates.style.lineHeight = 1.4 + "rem";
    clearInterval(interval);
})


aim.addEventListener("mousemove", getCoor, true);

launch.addEventListener("mousedown", function(){
    coordinates.style.color = "green";
    coordinates.style.lineHeight = 1.4 + "rem";
    coordinates.style.fontSize = "120%";
    coordinates.style.fontWeight = "300";
    coordinates.style.textShadow = "0 0 15px green, 0 0 15px green, 0 0 15px green";
    if (sX == 0 && sY == 0) {
        coor = "Set Coordinates!!";
        coordinates.style.color = "red";
        coordinates.style.lineHeight = 5.5 + "rem";
        coordinates.style.fontSize = "140%";
        coordinates.style.fontWeight = "bold";
        coordinates.style.textShadow = "0 0 15px red, 0 0 15px red, 0 0 15px red";
        coordinates.innerHTML = coor;
    }
    else {
        barInt = setInterval(barAnim, 1);
    }
})

function barAnim() {
    if (str != 100) {
    str = str + 1;
    barStr = str;
    strBar.style.width = barStr + '%';
    coor = "X:" + x + " -- Y: " + y + "<br />Saved Coor.:<br />X: " + showX +  " -- Y: " + showY + "<br /> Str: " + str;
    coordinates.innerHTML = coor;
    }
    else {
        clearInterval(barInt);
    }
}

launch.addEventListener("mouseup", function(){
    clearInterval(barInt);
    barStr = 0;
    strBar.style.width = '0%';
    if (bullet.style.left == '0px' && sX != 0 && sY != 0) {
    shoot(sY, sX, str/10);
    lives--;
    updateLives();
    }
    str = 0;
});

function getCoor(pointer) {
    coordinates.style.color = "green";
    coordinates.style.lineHeight = 1.4 + "rem";
    coordinates.style.fontSize = "120%";
    coordinates.style.fontWeight = "300";
    coordinates.style.textShadow = "0 0 15px green, 0 0 15px green, 0 0 15px green";
    x = pointer.clientX - 15;
    y = ((pointer.clientY - 500) * -1) + 15;
    coor = "X:" + x + " -- Y: " + y + "<br />Saved Coor.:<br />X: " + showX +  " -- Y: " + showY + "<br /> Str: " + str;
    coordinates.innerHTML = coor;
    aim.style.cursor = "crosshair";
    if (sX == 0 && sY == 0) { 
        aim.addEventListener("click", saveCoor);
    }
}

function saveCoor() {
    showX = x;
    showY = y;
    sX = 1;
    sY = y / x;
    coor = "X:" + x + " -- Y: " + y + "<br />Saved Coor.:<br />X: " + showX +  " -- Y: " + showY + "<br /> Str: " + str;
    coordinates.innerHTML = coor;
} 

function shoot(up, left, strenght) {
    posY = 0;
    interval = setInterval(nextPos, 10, up + 1, left + 1, strenght);
}

function nextPos(up, left, strenght) {
    if (posY < 0) {
        bullet.style.bottom = '-10px';
        gravitation = planet;
        clearInterval(interval);
        if (posX + 50 >= enemyPos && posX < enemyPos + 50){
        coor = "Hit!!";
        coordinates.style.fontSize = "140%";
        coordinates.style.fontWeight = "bold";
        }
        else {
            if (lives > 0) {
                coordinates.style.color = "red";
                coor = "Try again...";
            }
            else {
                coor = "You Loose!";
            }
        }
        coordinates.style.lineHeight = 5.5 + "rem";
        coordinates.innerHTML = coor;
    }
    else {
    gravitation += planet;
    posY += up * strenght - gravitation;
    posX += left * strenght;
    bullet.style.bottom = posY + 'px';
    bullet.style.left = posX + 'px';
    bullet.style.transform = "rotate(" + deg + "deg)";
    deg = (deg + 10) % 360;
    }
}

function updateLives() {
    text = "";
    for (i = 0; i < lives; i++){
        text += "<span class='ammo'>X</span> ";
    }
    liveSymbol.innerHTML = text;
}