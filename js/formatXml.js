/*
 * @Date: 2020-04-19 22:11:04
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-19 22:18:30
 */
/**
 *
 * @author lixiwang l15315
 * @date 2019/7/23
 */
export default function formatXml(text) {
  //去掉多余的空格
  text =
    '\n' +
    text
      .replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, ' $1');
      })
      .replace(/>\s*?</g, '>\n<');

  //把注释编码
  text = text
    .replace(/\n/g, '\r')
    .replace(/<!--(.+?)-->/g, function ($0, text) {
      var ret = '<!--' + escape(text) + '-->';
      //alert(ret);
      return ret;
    })
    .replace(/\r/g, '\n');

  //调整格式
  var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/gm;
  var nodeStack = [];
  var output = text.replace(rgx, function (
    $0,
    all,
    name,
    isBegin,
    isCloseFull1,
    isCloseFull2,
    isFull1,
    isFull2,
  ) {
    var isClosed =
      isCloseFull1 === '/' || isCloseFull2 === '/' || isFull1 === '/' || isFull2 === '/';
    //alert([all,isClosed].join('='));
    var prefix = '';
    if (isBegin === '!') {
      prefix = getPrefix(nodeStack.length);
    } else {
      if (isBegin !== '/') {
        prefix = getPrefix(nodeStack.length);
        if (!isClosed) {
          nodeStack.push(name);
        }
      } else {
        nodeStack.pop();
        prefix = getPrefix(nodeStack.length);
      }
    }
    return '\n' + prefix + all;
  });

  var outputText = output.substring(1);
  //alert(outputText);

  //把注释还原并解码，调格式
  outputText = outputText
    .replace(/\n/g, '\r')
    .replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
      //alert(['[',prefix,']=',prefix.length].join(''));
      if (prefix.charAt(0) === '\r') {
        prefix = prefix.substring(1);
      }
      text = unescape(text).replace(/\r/g, '\n');
      //alert(ret);
      return '\n' + prefix + '<!--' + text.replace(/^\s*/gm, prefix) + '-->';
    });

  return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}

function getPrefix(prefixIndex) {
  var span = '    ';
  var output = [];
  for (var i = 0; i < prefixIndex; ++i) {
    output.push(span);
  }

  return output.join('');
}
