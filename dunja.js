const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const canvas2 = document.getElementById('score');
const context2 = canvas.getContext('2d');

const ctx = canvas2.getContext('2d');
function drawTabela(){
    context.fillStyle = "gray";
    context.fillRect(10,10,30,30);
}
var score = 0;
var highscore;

if(localStorage.highscore == null){
    highscore = 0;
  }
else{
 highscore = localStorage.highscore;
}

function Score(){
    ctx.fillStyle = "#82D585";
    ctx.fillRect(0,0,canvas2.width,canvas2.height);
    ctx.font = "20px Courier";
    ctx.fillStyle = "#262C32";
    ctx.fillText("Score = " + score, 20, 40);
    ctx.fillText("High score = " + highscore, 20, 70);
    
  }

document.addEventListener("mousemove", followMouse, false);

function followMouse(e) {
     xPos = e.clientX;
     yPos = e.clientY;
     //console.log(xPos + " " + yPos);
     console.log(muvuje);
     if(muvuje == 1){
         //nizFigura[0].move();

         prvi = true;
     }
     if(muvuje == 2){
         drugi = true;
     }
}

addEventListener('mousedown', Drag);
addEventListener('mouseup', Drop);

function Drop(){
    muvuje = 0;
    if(prvi == false && drugi == false){
        
        return;
    }

    var f;
    var br;
    if(prvi == true){
        f = nizFigura[0];
        
        br = 0;
    }
    if(drugi == true){
        f = nizFigura[1];
        
        br = 1;
    }
    prvi = false;
    drugi = false;
   

    var kk = f.kvadratici[0][0];


    if(kk.x < 10 || kk.x > 290 || kk.y > 288 || kk.y < 10){
        f.reset(br);
        return;
    }
    
    t.find(f.kvadratici[0][0]);
    
    if(t.zauzmi(k,l,f.w,f.h,f.kvadratici[0][0].color,f))
    {
        nizFigura[br] = new Figura();
        nizFigura[br].make(br);
        f=null;
    }
    else{
        f.reset(br);
    }
}

var muvuje = 0;
var prvi = false;
var drugi = false;
function Drag(){
    if(xPos > 140 && xPos < 180 && yPos > 470&& yPos < 510){
        muvuje = 1;
        //alert();
    }

    if(xPos > 140 && xPos < 180 && yPos > 610 && yPos < 670){
        muvuje = 2;
        //alert();
    }


    
}

class Kvadrat{
     constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = "#4A5A66";
        this.zauzet = false;
     }

     draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.size, this.size);
     }
}

//#4E9AD7  
class Tabela{
    constructor(){
        this.w = 10;
        this.h = 10;
        this.x = 10;
        this.y = 10;
        this.kvadratici = [];
    }

    make(){
        for(let i = 0; i < this.w; i++){
            this.kvadratici[i] = [];
            for(let j = 0; j < this.h; j++){
                var x, y;
                x = this.x + 25 * i + 3 * i;
                y = this.y + 28 * j;
                let ej = new Kvadrat(x,y,25); 
                this.kvadratici[i].push(ej);
                //console.log(this.kvadratici[i][j]);
            }
        }
    }
    draw(){
        for(let i = 0; i < this.w; i++){
            for(let j = 0; j < this.h; j++){
                this.kvadratici[i][j].draw();
            }
        }
    }

    find(kvadratic){
        for(let i = 0; i < this.w; i++){
            for(let j = 0; j < this.h; j++){
                if(inRange(this.kvadratici[i][j], kvadratic, 25)){
                    k = i;
                    l = j;
                }
            }
        }
    }
    zauzmi(i1,j1,duzina,sirina,boja)
    {
        if(i1+duzina-1>= this.w || j1+sirina-1>= this.h){
            return false;
        }
        for(let i = i1;i<i1+duzina;i++)
        {
            for(let j = j1;j<j1+sirina;j++)
            {
                if(this.kvadratici[i][j].zauzet == true)
                    return false;
            }
        }
        for(let i = i1;i<i1+duzina;i++)
        {
            for(let j = j1;j<j1+sirina;j++)
            {
                this.kvadratici[i][j].zauzet = true;
                this.kvadratici[i][j].color = boja;
            }
        }
        return true;
    }

    zauzmi2(i1,j1,duzina,sirina)
    {
        if(i1+duzina-1>= this.w || j1+sirina-1>= this.h){
            return false;
        }
        for(let i = i1;i<i1+duzina;i++)
        {
            for(let j = j1;j<j1+sirina;j++)
            {
                if(this.kvadratici[i][j].zauzet == true)
                    return false;
            }
        }
        return true;
    }
}

var k;
var l;

function inRange(x,y,size){
    if(x.x + size >= y.x && x.x <= y.x){
        if(x.y + size >= y.y && x.y <= y.y){
            return true;

        }
    }
    return false;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

class Figura{
    constructor(){
        let w = getRandomInt(3) + 1;
        let h;
        let uspravno;
        this.kvadratici = [];
        this.pocetno_x;
        this.pocetno_y;
    

        //case dva h = 

        switch(w){
            case 3: h = 3; break;
            case 2: h = getRandomInt(3) + 1; break;
            case 1: 
                h = getRandomInt(5) + 1; break;
                
        }

        uspravno = getRandomInt(2);
        if(uspravno == 1){let r = w; w = h; h = r;}

        this.w = w;
        this.h = h;

    }

    make(br){
        //alert(this.w);

        var d = 350;
        if(br == 1){
            d += 150;
        }
        for(let i = 0; i < this.w; i++){
            this.kvadratici[i] = [];
            for(let j = 0; j < this.h; j++){
                //alert("ejj");
                var x, y;
                x = canvas.width/2 - this.w/2 * 25 + 25 * i + 3 * i;
                y = 28 * j + d;
                let ej = new Kvadrat(x,y,25); 

                //RADI ZA SVE OBVEZNOOOOOO
                if(this.w == 3 && this.h == 3){
                    ej.color = "#EC7063";
                }
                else if(this.w == 2 && this.h == 2){
                    ej.color = "#2471A3";
                }
                else if(this.w == 1 && this.h == 2){
                    ej.color = "#A569BD";
                }
                else if(this.w == 2 && this.h == 1){
                    ej.color = "#A569BD";
                }
                else if(this.w == 3 && this.h == 1){
                    ej.color = "#A3E4D7";
                }
                else if(this.w == 1 && this.h == 3){
                    ej.color = "#A3E4D7";
                }
                else if(this.w == 1 && this.h == 5){
                    ej.color = "#EB984E";
                }
                else if(this.w == 5 && this.h == 1){
                    ej.color = "#EB984E";
                }
                else if(this.w == 1 && this.h == 4){
                    ej.color = "#F4D03F";
                }
                else if(this.w == 4 && this.h == 1){
                    ej.color = "#F4D03F";
                }
                else if(this.w == 2 && this.h == 3){
                    ej.color = "#5DADE2";
                }
                else if(this.w == 3 && this.h == 2){
                    ej.color = "#5DADE2";
                }
                else if(this.w == 1 && this.h == 1){
                    ej.color = "#82D585";
                }
                

                else{
                    ej.color = "blue";
                }
                
                this.kvadratici[i].push(ej);
            }
        }

    }
    reset(br){
        var d = 350;
        if(br == 1){
            d += 150;
        }
        for(let i = 0; i < this.w; i++){
            for(let j = 0; j < this.h; j++){
                this.kvadratici[i][j].x = canvas.width/2 - this.w/2 * 25 + 25 * i + 3 * i;
                this.kvadratici[i][j].y = 28 * j + d;
            }
        }
    }

    move(){
        for(let i = 0; i < this.w; i++){
            for(let j = 0; j < this.h; j++){
                //alert("ejj");
                var x, y;
                this.kvadratici[i][j].x = xPos + 25 * i + 3 * i - 8;
                this.kvadratici[i][j].y = yPos + 28*j - 112; 
               
            }
        }
        //console.log("jea"+ this.kvadratici[0][0].x + " "+ this.kvadratici[0][0].y);
    }

    draw(){
        for(let i = 0; i < this.w; i++){
            for(let j = 0; j < this.h; j++){
                this.kvadratici[i][j].draw();
            }
        }
    }

}

var nizFigura = [];
function DodajFiguru(){
    var f = new Figura();
    f.make(nizFigura.length);
    nizFigura.push(f);
}


var t = new Tabela();
t.make();
t.draw();
//var f = new Figura();
//f.make(0);
//f.draw();

function drawF(){
    for(let i = 0; i < nizFigura.length; i++){
        nizFigura[i].draw();
    }
}

function gameOver(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(t.zauzmi2(i,j, nizFigura[0].w, nizFigura[0].h) == true){
                return false;
            }
        }
    }

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
           if(t.zauzmi2(i,j, nizFigura[1].w, nizFigura[1].h) == true){
               return false;
           }
        }
    }

    return true;

}


function loop(){
    requestAnimationFrame(loop);

    context.clearRect(0,0,canvas.width,canvas.height);
    t.draw();

    if(nizFigura.length == 0){
        DodajFiguru();
        DodajFiguru();
    }

    if(nizFigura.length == 1){
        DodajFiguru();
    }

    drawF();

    if (gameOver() == true){
        //alert();
        context2.fillStyle = "#E36969";
        context2.fillRect(0,0,canvas.width,canvas.height);
        context2.font = "20px Courier";
        context2.fillStyle = "#262C32";
        context2.fillText("GAME OVER", canvas.width / 2 - 10, canvas.height / 2 -10);
        
    }

    if(gameOver() != true){
        

    

    if(prvi == true){
        nizFigura[0].move();
    }

    if(drugi == true){
        
        nizFigura[1].move();
    }

    var p = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(t.kvadratici[i][j].zauzet == true){
                p++;
                //alert(p);
            }
            if(p == 10){
                //alert("usao");
                for(let j = 0; j < 10; j++){
                    //t.make();
                    //t.draw();
                    t.kvadratici[i][j].zauzet = false;
                    t.kvadratici[i][j].color = "#4A5A66";
                    //alert(p);
                    p = 0;
                }
                if(score > highscore){
                    highscore = score;
                    localStorage.highscore = score;
                  }
            }
        }
        p = 0;
        
    }

    var e = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(t.kvadratici[j][i].zauzet == true){
                e++;
                //alert(p);
            }
            if(e == 10){
                //alert("usao");
                for(let j = 0; j < 10; j++){
                    //t.make();
                    //t.draw();
                    t.kvadratici[j][i].zauzet = false;
                    t.kvadratici[j][i].color = "#4A5A66";
                    //alert(p);
                    e = 0;
                }
                score += 10;
                if(score > highscore){
                    highscore = score;
                    localStorage.highscore = score;
                  }
            }
        }
        e = 0;
        
    }

    
    }
    Score();


}

loop();
