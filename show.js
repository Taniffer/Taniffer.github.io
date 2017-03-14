/**
 * Created by 11275 on 2017/3/12.
 */
function shownumber(i,j,number){
    var numbercell = $("#numbercell-"+i+"-"+j);
    numbercell.css('color',getcellcolor(number[i][j]));
    numbercell.css('background-color',getcellbackgroundcolor(number[i][j]));
    numbercell.css('border-radius',0.05*cellwidth);
    numbercell.text(number[i][j]);
    //numbercell.css('line-height',cellwidth);

    numbercell.animate({
        width:cellwidth,
        height:cellwidth,
        lineHeight:cellwidth,
        fontSize:0.6*cellwidth,
        top:getcelltop(i,j),
        left:getcellleft(i,j)
    },50)
}


function moveanimation(x,y,tox,toy){
    var numbercell = $("#numbercell-"+x+"-"+y);
    numbercell.animate({
        top:getcelltop(tox,toy),
        left:getcellleft(tox,toy)
    },200)

}