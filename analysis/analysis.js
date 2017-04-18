var mark = [];

main();
//构造对象形式
function Annotation(title, author, position, time, content) {
  this.title = title;
  this.author = author;
  this.position = position;
  this.time = time;
  this.content = content;

}

//解析txt
function analysis() {
  /**
  *title~content是对象属性
  *originalTime是直接从字符串里截取出来的原始属性 例：2017年1月12日星期四 下午11:34:01（中文匹配）  Tuesday, February 21, 2017 1:11:53 AM（英文匹配）
  *originalTimeData是英文模式中第一次处理originalTime得到的数组，方便下次月份的转换，例 February--2
  *timeData是处理时间数据后获得的数组，例[2017,1,12,11,34,01]
  *stringArray是源字符串分割之后的数组
  *errorString一个错误字符串 如果有未匹配成功或者content为空的项，向mark里推进一个error，方便找出位置
  *text和textEnglish是stringArray  match匹配之后的数组
  */
  var title = '';
  var author = '';
  var position = '';
  var time = '';
  var content = '';
  var originalTime = '';
  var originalTimeData = [];
  var timeData = [];
  var stringArray = [];
  var errorString = '';
  var text, textEnglish;

  //原字符串解析为数组
  stringArray = sourceString.replace(/(^[\s\=]*)|([\s\=]*$)/g, '').split(/\={4,}/);
  for (var i = 0; i < stringArray.length; i++) {

    //匹配中文模式
    text = stringArray[i];
    text = text.match(/^([\s\S]+?)\(([^\(\)]*\(*[^\(\)]+\)*[^\)\(]*)\)[^\(\)]+?#(\d+)[-\u4e00-\u9fa5].*?\|.*?(\d+[\u4e00-\u9fa50-9\s\:]+)\n[\n\s]*([\s\S]*)$/);

    if (text != null) {
      title = text[1];
      author = text[2];
      position = text[3];
      originalTime = text[4];
      content = text[5];

      //将time数据改为标准形式的数组
      timeData = originalTime.replace(/(^\s*)|(\s*$)/g, '').split(/[^0-9]+/);

      //转换为24小时制
      if (originalTime.search(/上午/) != -1) {
        for (var j = 0; j < timeData.length - 2; j++) {
          if (timeData[j] < 10) {
            timeData[j] = '0' + timeData[j];
          }
        }
      } else {
        timeData[3] = timeData[3] - 0 + 12;
        for (var j = 0; j < timeData.length - 2; j++) {
          if (timeData[j] < 10) {
            timeData[j] = '0' + timeData[j];
          }

        }
      }
      //组合为对象中时间的格式
      time = timeData[0] + '-' + timeData[1] + '-' + timeData[2] + ' ' + timeData[3] + ':' + timeData[4] + ':' + timeData[5];
      mark.push(new Annotation(title, author, position, time, content));
    }


    //匹配英文模式
    textEnglish = stringArray[i];
    textEnglish = textEnglish.match(/^([\s\S]+)\(([^\(\)]*\(*[^\(\)]+\)*[^\)\(]*)\)[^\(\)]+?(\d+)[\s\S]+?\|.+?on\s+([\s\S]+?)\n[\n\s]*([\s\S]*)$/);
    if (textEnglish != null) {
      title = textEnglish[1];
      author = textEnglish[2];
      position = textEnglish[3];
      originalTime = textEnglish[4];
      content = textEnglish[5];

      //将time数据改为标准形式数组
      originalTimeData = originalTime.match(/,\s+([\s\S]+?)[AP]M/);
      timeData = originalTimeData[1].replace(/(^\s*)|(\s*$)/g, '').split(/[\s,\:]+/);
      timeData[0] = getMonth(timeData);

      //时间改为24小时制
      if (originalTime.search(/AM/) != -1) {
        for (var j = 0; j < timeData.length - 2; j++) {
          if (timeData[j] < 10) {
            timeData[j] = '0' + timeData[j];
          }
        }
      } else {
        timeData[3] = timeData[3] - 0 + 12;
        for (var j = 0; j < timeData.length - 2; j++) {
          if (timeData[j] < 10) {
            timeData[j] = '0' + timeData[j];
          }
        }
      }

      //组合为对象中time属性的格式
      time = timeData[2] + '-' + timeData[0] + '-' + timeData[1] + ' ' + timeData[3] + ':' + timeData[4] + ':' + timeData[5];
      mark.push(new Annotation(title, author, position, time, content));

    }

    //有错误或content为空则推进eroor
    if (text == null && textEnglish == null) {
      errorString = '第' + i + '条记录无效，不添加';
      mark.push(errorString);
    }
  }
}

function main() {
  window.onload = function() {
    analysis();
    //var showSource = document.getElementById('source');
    //source.innerHTML=sourceString;
    var contain = document.getElementById('contain');
    console.log(mark);
    var btn = document.getElementById('result');
    btn.addEventListener('click', show, false);
  }
}

//英文模式月份转换
function getMonth(timeData) {
  switch (timeData[0]) {
    case 'January':
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

    default:
      return 0;
      break;

  }
  return 0;
}
