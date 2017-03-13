/**
 * Created by 11275 on 2017/3/12.
 */
var board=new Array();
var score = 0;


$(document).ready(function(){
    newgame();
//

})

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

    for(var i = 0 ; i < 4; i ++){
        board[i]=new Array();
        for(var j = 0; j < 4; j ++)
            board[i][j]=0;
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
                    thenumbercell.css('top',getcelltop(i,j)+50);
                    thenumbercell.css('left',getcellleft(i,j)+50);
                }

                else {
                    thenumbercell.css('width','100px');
                    thenumbercell.css('height','100px');
                    thenumbercell.css('top',getcelltop(i,j));
                    thenumbercell.css('left',getcellleft(i,j));
                    thenumbercell.css('color',getcellcolor(board[i][j]));
                    thenumbercell.css('background-color',getcellbackgroundcolor(board[i][j]));
                    thenumbercell.text(board[i][j]);


                }
            }
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
        while (true) {
            if (board[randx][randy] == 0)
                break;
            else{
                randx = parseInt(Math.floor(Math.random()*4)) ;
                randy = parseInt(Math.floor(Math.random()*4)) ;
            }
        }

    //    随机数
        var randomnumber = Math.random()<0.9 ? 2 : 4;

        board[randx][randy]=randomnumber;
        updateBoard();
    }

}


$(document).keydown(function (event){
    switch (event.keyCode){
        case 37 ://left
            if (canmoveleft(board)){
                moveleft();
                randomanumber();
            }
            else     isgameover();
            break;

        case 38 ://up
            if (canmoveup(board)){
                moveup();
                randomanumber();
            }
            else     isgameover();
            break;

        case 39 ://right
            if (canmoveright(board)){
                moveright();
                randomanumber();
            }
            else     isgameover();
            break;

        case 40 ://down
            if (canmovedown(board)){
                movedown();
                randomanumber();
            }
            else     isgameover();
            break;

        default : break;
    }
})

function moveleft(){
    for(var i = 0 ; i<4; i ++ )
        for(var j = 1; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 0; k < j; k++){
                    if (board[i][k]==0 && noobstacle( i , k , j ,board)){
                        //add
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]== board[i][j] && noobstacle( i , k , j ,board)){
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    updateBoard();
}



function moveup(){
    for(var i = 1 ; i<4; i ++ )
        for(var j = 0; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 0; k < i; k++){
                    if (board[k][j]==0 && noobstacle( j , k , i ,board)){
                        //add
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]== board[i][j] && noobstacle( j , k , i ,board)){
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    updateBoard();
}



function moveright(){
    for(var i = 0 ; i<4; i ++ )
        for(var j = 2; j>= 0; j--){
            if (board[i][j] != 0){

                for (var k = 3; k > j; k--){
                    if (board[i][k]==0 && noobstacle( i , j , k ,board)){
                        //add
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]== board[i][j] && noobstacle( i , j , k ,board)){
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    updateBoard();
}



function movedown(){
    for(var i = 2 ; i>=0; i -- )
        for(var j = 0; j<4; j++){
            if (board[i][j] != 0){

                for (var k = 3; k > i; k--){
                    if (board[k][j]==0 && noobstacle( j , i , k ,board)){
                        //add
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]== board[i][j] && noobstacle( j , i , k ,board)){
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    updateBoard();
}

function isgameover(){
    if (~(canmoveleft(board)||canmoveleft(board) || canmoveright(board) || canmoveup(board))){
        alert("Game Over")
    }
}




