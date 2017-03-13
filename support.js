/**
 * Created by 11275 on 2017/3/12.
 */
function getcelltop(i,j){
    return i*120+20;
}
function getcellleft(i,j){
    return j*120+20;
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
            if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                return true;
                break;
            }
                }
    return false;

}

function canmoveup(board){
    for (var i = 1; i < 4; i ++)
        for (var j = 0; j < 4; j ++){
            if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                return true;
                break;
            }
                }
    return false;

}

function canmoveright(board){
    for (var i = 0; i < 4; i ++)
        for (var j = 2; j >= 0; j --){
            if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                return true;
                break;
            }
                }
    return false;


}

function canmovedown(board){
    for (var i = 2; i >= 0; i --)
        for (var j = 1; j < 4; j ++){
            if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                return true;
                break;
            }
                }
    return false;

}

function noobstacle(col,raw1 ,raw2 ,board){
    for (var i = raw1 + 1; i < raw2; i ++  ){
        if (board[col][i] != 0){
            return false;
            break;
        }
    }
    return true;
}

