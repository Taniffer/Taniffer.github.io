var mark = [];
var sourceString = `技术元素 (凯文·凯利)
- 您在位置 #392-392的标注 | 添加于 2015年4月23日星期四 上午9:25:22

目光聚集的地方，金钱必将跟随
==========
技术元素 (凯文·凯利)
- 您在位置 #436-437的标注 | 添加于 2015年4月23日星期四 上午9:44:33

生命，无论大小，其独特之处部分在于它能传承过去，在当下表现过去，
==========
技术元素 (凯文·凯利)
- 您在位置 #436-437的标注 | 添加于 2015年4月23日星期四 上午9:44:33

生命，无论大小，其独特之处部分在于它能传承过去，在当下表现过去，
==========
最璀璨的银河——刘慈欣经典作品集 (刘慈欣)
- Your Highlight on Location 243-243 | Added on Thursday, May 12, 2016 4:43:24 PM

微风中
==========
最璀璨的银河——刘慈欣经典作品集 (刘慈欣)
- Your Highlight on Location 242-242 | Added on Thursday, May 12, 2016 4:43:12 PM

我把双手
==========
最璀璨的银河——刘慈欣经典作品集 (刘慈欣)
- Your Note on Location 243 | Added on Thursday, May 12, 2016 4:43:24 PM

note
==========
最璀璨的银河——刘慈欣经典作品集 (刘慈欣)
- Your Highlight on Location 243-243 | Added on Thursday, May 12, 2016 4:43:24 PM

微风中
==========
`;
main();
//构造对象形式
function Annotation(title,author,position,time,content){
  this.title = title;
  this.author = author;
  this.position = position;
  this.time = time;
  this.content = content;

}

//解析txt
function analysis(){
  var title ="";
  var author = "";
  var position = "";
  var originalTime = "";
  var content="";
  var timeData=[];
  var time ="";

    var stringArray=[];
    //原字符串解析为数组
    stringArray=sourceString.split(/\=+/);

    for (var i = 0; i < stringArray.length; i++) {

      //匹配中文模式
      var text = stringArray[i];
      text = text.match(/^([\u4e00-\u9fa5，\sa-zA-Z——]+)\((.+)\)[\s\S]+?#(\d+)[-\u4e00-\u9fa5].*?\|.*?(\d+[\u4e00-\u9fa50-9\s\:]+)\n[\n\s]*([\s\S]*)$/);
      if(text!=null){
         title =text[1];
         author = text[2];
         position = text[3];
         originalTime = text[4];
         content = text[5];
         //将time数据改为标准形式
          timeData =originalTime.replace(/(^\s*)|(\s*$)/g, "").split(/[^0-9]+/);
          //转换为24小时制
          if(originalTime.search(/上午/)!=-1){
            for (var j = 0; j < timeData.length; j++) {
              if (timeData[j]<10) {
                  timeData[j] = "0"+timeData[j];
                }

            }
          }
          else {
            timeData[3]=timeData[3]-0+12;
            for (var j = 0; j < timeData.length; j++) {
              if (timeData[j]<10) {
                  timeData[j] = "0"+timeData[j];
                }

            }
          }
           time =timeData[0]+"-"+timeData[1]+"-"+timeData[2]+" "+timeData[3]+":"+timeData[4]+":"+timeData[5];
          if(content!=null)
        mark.push(new Annotation(title,author,position,time,content));

       }
       console.log(i);
         console.log(stringArray[i]);
       //匹配英文模式
       var textEnglish =  stringArray[i];
          textEnglish=textEnglish.match(/^([\u4e00-\u9fa5，\sa-zA-Z——]+)\((.+)\)[\s\S]+?(\d+)[\s\S]+?on\s+([\s\S]+?)\n[\n\s]*([\s\S]*)$/);

       if(textEnglish!=null){
          title =textEnglish[1];
          author = textEnglish[2];
          position = textEnglish[3];
          originalTime = textEnglish[4];
          content = textEnglish[5];
        //将time数据改为标准形式

          var originalTimeData=originalTime.match(/,\s+([\s\S]+?)[AP]M/);
          timeData =originalTimeData[1].replace(/(^\s*)|(\s*$)/g, "").split(/[\s,\:]+/);

          timeData[0]=getMonth(timeData);
          console.log(timeData);
          //时间改为24小时制
          if(originalTime.search(/AM/)!=-1){
            for (var j = 0; j < timeData.length; j++) {
              if (timeData[j]<10) {
                  timeData[j] = "0"+timeData[j];
                }

            }
          }
          else {
            timeData[3]=timeData[3]-0+12;
            for (var j = 0; j < timeData.length; j++) {
              if (timeData[j]<10) {
                  timeData[j] = "0"+timeData[j];
                }

            }
          }
           time =timeData[2]+"-"+timeData[0]+"-"+timeData[1]+" "+timeData[3]+":"+timeData[4]+":"+timeData[5];
           console.log(time);
         if(content!=null)
         mark.push(new Annotation(title,author,position,time,content));

        }
    }




}

function main(){

  window.onload = function(){
    analysis();

    var showSource = document.getElementById('source');
    source.innerHTML=sourceString;
    var contain=document.getElementById('contain');

    console.log(mark);
    var btn = document.getElementById('result');
    btn.addEventListener("click", show, false);
  }
}

function getMonth(timeData){
          switch (timeData[0]) {
            case "January":
                return 1;
                break;
            case 'February':
                return 2;
                break;
            case 'March':
                return 3;
                break;
            case 'April':
                return 4;
                break;
            case 'May':
                return 5;
                break;
            case 'June':
                return 6;
                break;
            case 'July':
                return 7;
                break;
            case 'Aguest':
                return 8;
                break;
            case 'September':
                return 9;
                break;
            case 'October':
                return 10;
                break;
            case 'November':
                return 11;
                break;
            case 'December':
                return 12;
                break;

            default:  return 0;
              break;

          }
          return 0;
        }