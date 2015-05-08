cordova.define("com.nikoyo.ucmobile.preview", function (require, exports, module) {
               var exec = require('cordova/exec');
               
               var ucmobile = {
                   previewPDF:function (success, error, uri,type) {
                       exec(success, error, 'OnlinePreview', 'previewPDF', [uri,type]);
                   },
                   previewTIF:function (success, error, uri,type) {
//                        showMessage("","IOS暂不支持在线浏览TIF!");
                       exec(success, error, 'OnlinePreview', 'previewTIF', [uri,type]);
                   },
                   previewIMG:function (success, error, uri,type) {
                       exec(success, error, 'OnlinePreview', 'previewIMG', [uri,type]);
                   }
               };
               
               module.exports = ucmobile;
               });