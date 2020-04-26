/**
 * 下载功能封装
 * @author lxw-15315
 * @date 2018/11/12
 */
import qs from 'qs';
import Vue from 'vue';

/**
 * 下载文件
 * @param url api路径
 * @param method
 * @param param? get参数
 * @param data? post参数
 */
export function download(url, method, param = null, data = null) {
  var postData = data ? JSON.stringify(data) : JSON.stringify({});
  var url_ = param ? url + '?' + qs.stringify(param) : url;

  return Vue.prototype.$http({
    url: url_,
    method: method,
    data: postData,
    responseType: 'blob', // 返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
}

// /**
//  * 导出文件方法
//  * 创建一个blob类型实例，采用Blob对象的方式保存在本地
//  * @param res: 接收到的数据流
//  * @param type: 需要下载的文件类型
//  * @param fileName: 保存的文件名，后缀与type对应
//  * @return
//  */
// export function exportFile(res, type, fileName) {
//   const typeMap = {
//     xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
//     pdf: 'application/pdf',
//     txt: 'text/plain',
//     doc: 'application/msword',
//     exe: 'application/octet-stream',
//     ppt: 'application/mspowerpoint',
//     xls: 'application/msexcel',
//     csv: 'csv',
//     json: 'application/json',
//     xml: ' text/xml',
//     zip: 'application/zip',
//     png: 'image/png',
//     jpeg: 'image/jpeg',
//     gif: 'image/gif',
//   };
//   var mimeType = typeMap[type] || '';
//   var blob = new Blob([res.data], { type: mimeType });

//   if ('download' in document.createElement('a')) {
//     // 非IE下载
//     // h5 支持格式 URL.createObjectURL
//     const elink = document.createElement('a');

//     elink.download = fileName + '.' + type; // 下载后文件名
//     elink.style.display = 'none';
//     elink.href = URL.createObjectURL(blob); // 创建下载的链接
//     document.body.appendChild(elink);
//     elink.click(); // 点击下载
//     URL.revokeObjectURL(elink.href); // 释放URL 对象
//     document.body.removeChild(elink); // 下载完成移除元素
//   } else {
//     // IE10+下载
//     navigator.msSaveBlob(blob, fileName + '.' + type);
//   }
// }
// /**
//  * 处理文件下载。获取文件成功，则必返回 content-type 为 multipart/form-data。其他情况都是错误，错误会返回json格式，报告异常。
//  * @param fileName 文件名称。
//  * @param response 请求返回response。
//  * @param errorCallBack 错误回调函数
//  */
// export function downloadFile(fileName, response, errorCallBack) {
//   // 如果后台获取文件成功，则必返回 content-type 为 multipart/form-data。 其他情况都是错误，报告异常。
//   if (response.headers && response.headers['content-type'] === 'multipart/form-data') {
//     let index = fileName.indexOf('.');
//     let name = fileName.slice(0, index);
//     let type = fileName.slice(index + 1);
//     exportFile(response, type, name);
//   } else if (response.headers && response.headers['content-type'].includes('application/json')) {
//     // 由于 responseType 为 blob，而后台请求的错误是json类型对象，所以需要转换处理。
//     let reader = new FileReader();
//     reader.addEventListener('loadend', () => {
//       let jsonData = JSON.parse(reader.result);
//       let errorMsg = jsonData.message || '文件下载异常！';
//       errorCallBack(errorMsg);
//     });
//     reader.readAsText(response.data, ['utf-8']);
//   }
// }

// 文件下载
export function downloadFile(url) {
  this.$http({
    method: 'get',
    url: url,
    responseType: 'blob'
  }).then(data => {
    if (!data) {
      return;
    }
    let url = window.URL.createObjectURL(new Blob([data.data]));
    let link = document.createElement('a');

    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', row.fileName);
    link.click();
  });
}