var board;
var Score=0;
var rows=4;
var columns=4;
var buttons = document.querySelectorAll(".btn");
window.onload=function(){       //used to execute script once webpage is loadedcompletely
     setGame();
}
function setGame(){
   board=[
       [0, 0, 0, 0],
       [0, 0, 0, 0],
       [0, 0, 0, 0],
       [0, 0, 0, 0],
   ]
    
    //board = [
        //[2,2,2,2],
        //[2,2,2,2],
        //[4,4,8,8],
        //[4,4,8,8],
    //]
    for(let r=0;r<rows;r++){
        for(let c=0; c<columns;c++){
            //<div id="0-0"></div>
            let tile = document.createElement("div");  //to dynamically create an html element via js
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile); //to insert req content at end of specific elements.
        }
    }
    setTwo();//to replace vacant with 2 
    setTwo();
}

function hasEmptyTile(){
    for(let r=0; r<rows;r++){
    for(let c=0;c<columns;c++){
        if(board[r][c]==0){
            return true;
        }
      }
    }
      return false;
 }

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        //random r,c
        let r= Math.floor(Math.random()*rows);// 0-1*4 -> 0,3
        let c = Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c]=2;
            let tile= document.getElementById(r.toString + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x1");
            found=true;

        }
    }
    
}


function updateTile(tile , num){
    tile.innerText = "";
    tile.classList.value=""; //clear the classList
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x13");
        }
    }
}
document.addEventListener("keyup" , (e)=>{
    if(e.code=="ArrowLeft"){        // gives control to keyboard
        slideLeft();
        setTwo();
        
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
        
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
        
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
        
    }
    newFunction();
    update();
    
})//used to move keys
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var val = this.innerText;
        if (this.innerText === "Left") {        // gives control to keyboard
            slideLeft();
            setTwo();

        }
        else if (this.innerText === "Right") {
            slideRight();
            setTwo();

        }
        else if (this.innerText === "Up") {
            slideUp();
            setTwo();

        }
        else if (this.innerText === "Down") {
            slideDown();
            setTwo();

        }
        newFunction();
        update();
    });
}

function update(){
    document.getElementById("Score").innerText = Score;
    
}

function newFunction() {
    return "Score";
}

function filterZero(row){
    return row.filter(num => num !=0);//create a new array without 0's
}


function slide(row){
    //[0,2,2,2]
    row = filterZero(row); // get rid of zeroes ->[2,2,2]

    //slide
    for(i=0;i<row.length-1;i++){
        //check every 2
        if(row[i]==row[i+1]){
            row[i] *= 2;
            row[i+1]=0;
            Score = Score+row[i];
        } //[2,2,2]->[4,0,2]
        update();
    }
    row = filterZero(row);//[4,2]

    //add zeroes
    while(row.length<columns){
        row.push(0);
    }//[4,2,0,0]
    return row;
}
function slideLeft(){
for(let r=0;r<rows;r++){
    let row=board[r];
    row = slide(row);
    board[r]=row;

    for(let c=0; c<columns;c++){
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num= board[r][c];
        updateTile(tile,num);
    }
}

}
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
           }
        }
    }
function slideUp(){
    for(let c=0; c<columns; c++){
        let row = [board[0][c], board[1][c] , board[2][c],board[3][c]];
        row=slide(row);
        //board[0][c]=row[0];
        //board[1][c]=row[1];
        //board[2][c]=row[2];
        //board[3][c]=row[3];
        for (let r = 0; r < columns; r++) {
            board[r][c]=row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse(); //reverse array
        row = slide(row);
        row.reverse();
        //board[0][c]=row[0];
        //board[1][c]=row[1];
        //board[2][c]=row[2];
        //board[3][c]=row[3];
        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//document.addEventListener("touchstart", touchHandler);//allows to setup function to be called when a specific event happens
//document.addEventListener("touchmove", touchHandler);


//function touchHandler(e) {
  //  if (e.touches) {
      //  playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
       // playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        //output.textContent = `Touch:  x: ${playerX}, y: ${playerY}`;
        //e.preventDefault();
  //  }
//}
