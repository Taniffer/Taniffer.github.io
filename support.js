/**
 * Created by 11275 on 2017/3/12.
 */

documentwidth = window.screen.availWidth;
gridwidth = 0.92 * documentwidth;
cellwidth = 0.18 * documentwidth;
cellspace = 0.04 * documentwidth;



function getcelltop(i,j){
    return i*(cellspace+cellwidth)+cellspace;
}
function getcellleft(i,j){
    return j*(cellspace+cellwidth)+cellspace;
}
function getcellcolor (number){
    return "white";
}
function getcellbackgroundcolor(number){
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";

}
function nospace(board){
    for (var i = 0; i < 4; i ++)
        for (var j = 0; j < 4; j ++){
            if(board[i][j]==0)
                return false;

        }

    return true;
}

function canmoveleft(board){
    for (var i = 0; i < 4; i ++)
        for (var j = 1; j < 4; j ++){
            if (board[i][j]!=0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                    break;
                }
            }
                }
    return false;

}

function canmoveup(board){
    for (var i = 1; i < 4; i ++)
        for (var j = 0; j < 4; j ++){
            if (board[i][j]!=0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                    break;
                }
            }
                }
    return false;

}

function canmoveright(board){
    for (var i = 0; i < 4; i ++)
        for (var j = 2; j >= 0; j --){
            if (board[i][j]!=0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                    break;
                }
            }
                }
    return false;


}

function canmovedown(board){
    for (var i = 2; i >= 0; i --)
        for (var j = 0; j < 4; j ++){
            if (board[i][j]!=0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                    break;
                }
            }
                }
    return false;

}

function noobstaclecol(col,raw1 ,raw2 ,board){
    for (var i = raw1 + 1; i < raw2; i ++  ){
        if (board[col][i] != 0){
            return false;
            break;
        }
    }
    return true;
}

function noobstacleraw(raw,col1 ,col2 ,board){
    for (var i = col1 + 1; i < col2; i ++  ){
        if (board[i][raw] != 0){
            return false;
            break;
        }
    }
    return true;
}

