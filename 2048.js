/**
 * Created by 11275 on 2017/3/12.
 */
var board=new Array();
var score = 0;
var noconflicts = new Array();

var startx;
var starty;
var endx;
var endy;



$(document).ready(function(){
    prepareforphone();
    newgame();
//

})

function prepareforphone(){
    if(documentwidth > 500){
        gridwidth = 500;
        cellspace = 20;
        cellwidth = 100;
    }


    $("#grid-container").css('width',gridwidth-2*cellspace);
    $("#grid-container").css('height',gridwidth-2*cellspace);
    $("#grid-container").css('border-radius',0.05*gridwidth);
    $("#grid-container").css('padding',cellspace);

    $(".grid-cell").css('width',cellwidth);
    $(".grid-cell").css('height',cellwidth);
    $(".grid-cell").css('border-radius',0.05*cellwidth);




}
function newgame(){
//初始化
    init();
//随机数
    randomanumber();
    randomanumber();
}

function init(){
    for(var i = 0 ; i<4; i ++ )
       for(var j = 0; j<4; j++){
           var gridcell = $("#grid-cell-"+i+"-"+j);
           gridcell.css('top',getcelltop(i,j));
           gridcell.css('left',getcellleft(i,j));
       }

    for(var i = 0 ; i < 4; i ++) {
        board[i] = new Array();
        noconflicts[i] = new Array();
        for (var j = 0; j < 4; j++) {

            board[i][j] = 0;
            noconflicts[i][j] = true;
        }
    }
    score = 0;

    updateBoard();
}


function updateBoard(){
    $(".numbercell").remove();
        for(var i = 0;i < 4; i ++)
            for(var j = 0 ; j < 4 ; j ++){
                $("#grid-container").append('<div class="numbercell" id="numbercell-'+i+'-'+j+'"></div>');
                var thenumbercell=$("#numbercell-"+i+"-"+j);
                if(board[i][j]==0){
                    thenumbercell.css('width','0px');
                    thenumbercell.css('height','0px');
                    thenumbercell.css('top',getcelltop(i,j)+cellwidth/2);
                    thenumbercell.css('left',getcellleft(i,j)+cellwidth/2);
                }

                else {

                    thenumbercell.css('width',cellwidth);
                    thenumbercell.css('height',cellwidth);
                    thenumbercell.css('top',getcelltop(i,j));
                    thenumbercell.css('left',getcellleft(i,j));
                    thenumbercell.css('color',getcellcolor(board[i][j]));
                    thenumbercell.css('background-color',getcellbackgroundcolor(board[i][j]));
                    thenumbercell.css('border-radius',0.05*cellwidth);
                    thenumbercell.text(board[i][j]);



                }
                noconflicts[i][j] = true;

            }
    $(".numbercell").css('line-height',cellwidth+'px');
    $(".numbercell").css('font-size',0.6*cellwidth+'px');

     var sc = $("#score") ;
        sc.text(score);

}

function randomanumber(){
    if(nospace(board)){
        return false;
    }
    else{
    //    随机位置
        var randx = parseInt(Math.floor(Math.random()*4)) ;
        var randy = parseInt(Math.floor(Math.random()*4)) ;

        var time = 0;
        while (time < 50) {
            if (board[randx][randy] == 0)
                break;
            else{
                randx = parseInt(Math.floor(Math.random()*4)) ;
                randy = parseInt(Math.floor(Math.random()*4)) ;
            }
            time++;
        }
        if(time == 50){
            for(var i = 0;i < 4; i ++)
                for(var j = 0 ; j < 4 ; j ++) {
                    if(board[i][j] == 0){
                        randx = i;
                        randy = j;
                    }
                }
        }

    //    随机数
        var randomnumber = Math.random()<0.9 ? 2 : 4;

        board[randx][randy]=randomnumber;
        shownumber(randx,randy,board);
    }

}


$(document).keydown(function (event){
    switch (event.keyCode){
        case 37 ://left
            event.preventDefault();
            if (canmoveleft(board)){
                moveleft();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
            break;

        case 38 ://up
            event.preventDefault();
            if (canmoveup(board)){
                moveup();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
            break;

        case 39 ://right
            event.preventDefault();
            if (canmoveright(board)){
                moveright();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
            break;

        case 40 ://down
            event.preventDefault();
            if (canmovedown(board)){
                movedown();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
            break;

        default : break;
    }
})

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;

})
document.addEventListener('touchmove',function(event){
    event.preventDefault();
})

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var detax = endx - startx;
    var detay = endy - starty;

    if(Math.abs(detax) <0.3 * gridwidth && Math.abs(detay) < 0.3 * gridwidth)
    return;

    if(Math.abs(detax) >= Math.abs(detay)){
        if (detax < 0){
            //left
            if (canmoveleft(board)){
                moveleft();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
        }
        else {
            //right
            if (canmoveright(board)){
                moveright();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
        }
    }
    else {
        if (detay < 0) {
            //up
            if (canmoveup(board)){
                moveup();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();

        }
        else {
            //down
            if (canmovedown(board)){
                movedown();
                setTimeout("randomanumber()",200);
            }
            else     isgameover();
        }
    }
})



function moveleft(){
    for(var i = 0 ; i<4; i ++ )
        for(var j = 1; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 0; k < j; k++){
                    if (board[i][k]==0 && noobstaclecol( i , k , j ,board)){
                        //animation
                        moveanimation(i,j,i,k);
                        //add
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]== board[i][j] && noobstaclecol( i , k , j ,board) && noconflicts[i][k]){
                        moveanimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];

                        noconflicts[i][k] = false;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoard()",200);
}



function moveup(){
    for(var i = 1 ; i<4; i ++ )
        for(var j = 0; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 0; k < i; k++){
                    if (board[k][j]==0 && noobstacleraw( j , k , i ,board)){
                        moveanimation(i,j,k,j);
                        //add
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]== board[i][j] && noobstacleraw( j , k , i ,board)&& noconflicts[k][j]){
                        moveanimation(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];
                        noconflicts[k][j] = false;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoard()",200);
}



function moveright(){
    for(var i = 0 ; i<4; i ++ )
        for(var j = 2; j>= 0; j--){
            if (board[i][j] != 0){

                for (var k = 3; k > j; k--){
                    if (board[i][k]==0 && noobstaclecol( i , j , k ,board)){
                        moveanimation(i,j,i,k);
                        //add
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]== board[i][j] && noobstaclecol( i , j , k ,board)&& noconflicts[i][k]){
                        moveanimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];

                        noconflicts[i][k] = false;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoard()",200);
}



function movedown(){
    for(var i = 2 ; i>=0; i -- )
        for(var j = 0; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 3; k > i; k--){
                    if (board[k][j]==0 && noobstacleraw( j , i , k ,board)){
                        moveanimation(i,j,k,j);
                        //add
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]== board[i][j] && noobstacleraw( j , i , k ,board)&& noconflicts[k][j]){
                        moveanimation(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];

                        noconflicts[k][j] = false;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoard()",200);
}

function isgameover(){
    if ((canmoveleft(board)||canmoveleft(board) || canmoveright(board) || canmoveup(board))==false){
        alert("Game Over")
    }
}




