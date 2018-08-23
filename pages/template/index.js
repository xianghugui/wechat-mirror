/**
 * 商品详情富文本解析
 * describe：商品详情内容
 */

var textParsing = function (describe) {
  //解析富文本中
  describe = describe.replace(/<br\s*[\/]?>/gi, "\r\n");
  describe = describe.replace(/<b>(.*?)<\/b>/gi, "$1");
  describe = describe.replace(/<strong>(.*?)<\/strong>/gi, "$1");
  describe = describe.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
  describe = describe.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  describe = describe.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  describe = describe.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
  describe = describe.replace(/ +(?= )/g, '');
  describe = describe.replace(/style="(.*?)"/gi, "");
  describe = describe.replace(/width="(.*?)" height="(.*?)"/gi, "");
  describe = describe.replace(/class="(.*?)"/gi, "");
  describe = describe.replace(/\<img +?src="(.*?)\/>/gi, '<div class="describe-div"><img class="describe-img" src="$1/></div>');
  describe = describe.replace(/<h2>/gi, "<p>");
  describe = describe.replace(/<\/h2>/gi, "</p>");
  describe = describe.replace(/<h3>/gi, "<p>");
  describe = describe.replace(/<\/h3>/gi, "</p>");
  describe = describe.replace(/ /gi, " ");
  describe = describe.replace(/ /gi, " ");
  describe = describe.replace(/&/gi, "&");
  describe = describe.replace(/"/gi, '"');
  describe = describe.replace(/</gi, '<');
  describe = describe.replace(/>/gi, '>');
  describe = describe.replace(/px/gi, "rpx");
  return describe;
}

module.exports.textParsing = textParsing;

/**
 * 提取富文本中的第一张图片
 */

var exportSrc = function (describe) {
  var patt = /src="(.*?)"/gi;
  describe = patt.exec(describe);
  return describe[1];
}

module.exports.exportSrc = exportSrc;

module.exports.textParsing = textParsing;

/**
 * 消息时间显示
 * time:获取时间
 */

var formatDateTime = function(time) {
  var date = time.split(" ")
  return date[0]
}

module.exports.formatDateTime = formatDateTime;