//注册Helper
//获取格式对应的图标
Template7.registerHelper('getIcons', function (type, options) {
    if (type == 'sysFolder') {
        return "'icon icon-list icon-list-folder'";
    } else if (type == 'sysLink') {
        return "'icon icon-list icon-list-link'";
    } else if (type == 'businessobject') {
        return "'icon icon-list icon-list-object'";
    } else if (type == 'doc') {
        return "'icon icon-list icon-list-doc'";
    } else if (type == 'docx') {
        return "'icon icon-list icon-list-doc'";
    } else if (type == 'html') {
        return "'icon icon-list icon-list-html'";
    } else if (type == 'pdf') {
        return "'icon icon-list icon-list-pdf'";
    } else if (type == 'ppt') {
        return "'icon icon-list icon-list-ppt'";
    } else if (type == 'pptx') {
        return "'icon icon-list icon-list-ppt'";
    } else if (type == 'rtf') {
        return "'icon icon-list icon-list-rtf'";
    } else if (type == 'jpg') {
        return "'icon icon-list icon-list-jpg'";
    } else if (type == 'txt') {
        return "'icon icon-list icon-list-txt'";
    } else if (type == 'xls') {
        return "'icon icon-list icon-list-xls'";
    } else if (type == 'xlsx') {
        return "'icon icon-list icon-list-xls'";
    } else if (type == 'xml') {
        return "'icon icon-list icon-list-xml'";
    } else if (type == 'bmp') {
        return "'icon icon-list icon-list-bmp'";
    } else if (type == 'gif') {
        return "'icon icon-list icon-list-gif'";
    } else if (type == 'png') {
        return "'icon icon-list icon-list-png'";
    } else if (type == 'tif') {
        return "'icon icon-list icon-list-tif'";
    } else if (type == 'tiff') {
        return "'icon icon-list icon-list-tif'";
    } else if (type == 'zip') {
        return "'icon icon-list icon-list-zip'";
    } else if (type == 'no') {
        return "'icon icon-list icon-list-noattachment'";
    } else if (type == 'most') {
        return "'icon icon-list icon-list-attachments'";
    } else if (type == 'user') {
        return "'icon icon-grid icon-grid-user'";
    } else if (type == 'group') {
        return "'icon icon-grid icon-grid-group'";
    } else if (type == 'org') {
        return "'icon icon-grid icon-grid-org'";
    } else {
        return "'icon icon-list icon-list-unknown'";
    }
});

//转换时间格式
Template7.registerHelper('convertDateTime', function (time, options) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
});

//转换versionable到对应的文字
Template7.registerHelper('convertFacets', function (facets, options) {
    if(facets){
        for (var i in facets){
            if(facets[i] == 'versionable'){
                return '带版本控制的文档';
            }
        }
    }
    return '';
});

//转换大小为千分位格式
Template7.registerHelper('convertSize', function (size, options) {
    if(size){
        return (size + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+' KB';
    }
    return '0 KB';
});

//转换 1或0 为 是或否
Template7.registerHelper('convertBoolean', function (value) {
    if (value == 1) {
        return '是';
    } else if (value == 0) {
        return '否';
    }
    return '';
});

//转换 0或1 为 是或否 ; 和上述不同的是，此处进行相反的转义
Template7.registerHelper('convertBoolean_reverse', function (value) {
    if (value == 0) {
        return '是';
    } else if (value == 1) {
        return '否';
    }
    return '';
});

//转换权限ID为中文
Template7.registerHelper('convertPermits', function (permissionId, options) {
    if (permissionId == 'List') {//基本权限
        return '列表';
    } else if (permissionId == 'Read') {
        return '读';
    } else if (permissionId == 'Update') {
        return '更新';
    } else if (permissionId == 'Delete') {
        return '删除';
    } else if (permissionId == 'Ex_Delete') {//扩展权限
        return '删除';
    } else if (permissionId == 'Ex_OriginDownload') {
        return '下载';
    } else if (permissionId == 'Ex_ChangePermission') {
        return '修改权限';
    } else if (permissionId == 'EX_Create') {
        return '创建子内容';
    } else if (permissionId == 'Property_None') {//属性权限
        return '拒访';
    } else if (permissionId == 'Property_Read') {
        return '读';
    } else {
        return '';
    }

    return '';
});

//初始化F7
var ucApp = new Framework7({
    modalTitle: '易存文档管理系统',
    template7Pages: true,
    precompileTemplates: true,

    onAjaxStart: function (xhr) {
        ucApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        ucApp.hideIndicator();
    }

});

//根节点ID
var root = 'nko-ucontent-root';

//文档类型名称
var sysfilecontenttype='SYSFILECONTENTTYPE';

//文件夹类型名称
var sysfoldercontenttype='SYSFOLDERCONTENTTYPE';

var $$ = Framework7.$;

var mainView = ucApp.addView('.view-main', {
    dynamicNavbar: true
    //animatePages:false
});

//var leftView = ucApp.addView('.view-left', {
//    dynamicNavbar: true
//});

//全局ajax请求的IP端口地址配置
//var ucUrl = 'http://192.168.1.116:8080/dm/';
var ucUrl = 'http://192.168.1.75:8080/ucontent_dm/';
//var ucUrl = 'http://221.234.47.116:8028/ucontent_dm/';


//会话级的存储 - sessionStorage
var storage = window.sessionStorage;
var user = JSON.parse(storage.getItem('userInfo'));
if (user) {
    $$('#userName').html(user.name);
} else {
    status401Error();
};

//登录后刷新root内容列表
var isLogin = storage.getItem('isLogin');
if (isLogin == 'Y') {
    getContentList(root, '');
    showHideReturnBack();
    storage.removeItem('isLogin');
};

//左侧工具栏点击高亮
$$('#repository-right').on('click', function (e) {
    $$('#set-right').addClass('active');
    mainView.router.back({
        url: 'index.html'
        ,force:true
    })
});
$$('#set-left').on('click', function (e) {
    $$('#repository-left').addClass('active');

    //将设置页面点出的右侧页面返回到viewmain
    mainView.router.back({
        url: 'index.html',
        force: true,
        animatePages:false
    })
});

//page初始化 - viewmain
ucApp.onPageInit('index-home', function (page) {
    //主页右侧的全屏按钮
    $$('#fullscreen_view_main').on('click', function (e) {
        fullscreen('#fullscreen_view_main');
    });
});

//主页右侧的全屏按钮
$$('#fullscreen_view_main').on('click', function (e) {
    fullscreen('#fullscreen_view_main');
});

function arraycontains(array,item){
    if (array==null||array.length==0||item==""){
        return false;
    }else{
        for(var i=0;i<array.length;i++){
        if(array[i]==item)
            return true;
        }
        return false;
    }
}

//判断功能点权限
function checkAction(action){
    var isAdmin = storage.getItem('isAdmin');
    if(isAdmin==='admin'){
        return true;
    }else{
        var actions = storage.getItem('actions');
        var getActions = actions.split(',');
        if (arraycontains(getActions,action)){
            return true;
        }else{
            return false;
        }
    }
}

//判断内容操作权限
function checkPremession(cid){

}

//导航栏上的新建功能按钮的浮动层
//New File
$$('#btn_newFile').on('click', function (e) {
    ucApp.closeModal('.popover-links');
    //判断是否有功能点权限
    if (!checkAction("docMg_newDoc")){
        showMessage('error','没有此操作的权限');
        return;
    };

    //判断是否有创建权限
    var cid = storage.getItem('currentFolder');
    var  url = ucUrl + 'contents/'+cid+'/checkPremession';
    $.get(url, function(checkPremession) {
        if(checkPremession){
            mainView.router.load({
                url:'tpl/newFile.html',
                context: {
                    parentId : cid
                }
            });
        }else{
            showMessage('error','没有创建内容的权限');
        }
    });
    ucApp.closeModal('.popover-links');
});

//page初始化_newFile
ucApp.onPageInit('newFile', function (page) {
    $('#content_newFileForm').validate({
        rules: {
            content_newFile_name: {
                required: true,
                maxlength:50,
                invalidData: true
            },
            content_newFile_description: {
                required: false,
                maxlength:200,
                invalidData: true
            }
        }
    });

    $$('#fullscreen_newFile').on('click', function () {
        fullscreen('#fullscreen_newFile');
    });

    $$('#content_newFile_chooseFile_btn').on('click', function () {
        fileChooser.open(
            function(uri) {
                $$('#content_newFile_filepath').val(uri);
                var fname = decodeURI(uri.substr(uri.lastIndexOf('/')+1));
                $$('#content_newFile_filename').html(fname);
                if(fname!='') {
                    if ($.trim($('#content_newFile_name').val()) == '') {
                        $('#content_newFile_name').val(fname);
                        $("#content_newFileForm").valid();
                    }
                }
            }
        );
    });

                 $$('#newFile_add').on('click', function () {
                                       if (!$("#content_newFileForm").valid()) {
                                       return;
                                       }
                                       ucApp.showIndicator();
                                       var description = $$('#content_newFile_description').val();
                                       var name = $$('#content_newFile_name').val();
                                       var pid = $$('#content_newFile_parentId').val();
                                       var content = {
                                       contentTypeName: sysfilecontenttype,
                                       parentId: pid,
                                       name: name,
                                       description: description
                                       //filePath: basePath
                                       };
                                       var contentString = JSON.stringify(content);
                                       $$('#content_newFile_contentString').val(contentString);
                                       $('#content_newFileForm').ajaxSubmit({
                                                                            url : ucUrl + 'contents',
                                                                            type : 'POST',
                                                                            success : function(responseText, statusText) {
                                                                            var currentFolderId = storage.getItem('currentFolder');
                                                                            $('#search_input').attr('value','');
                                                                            getContentList(currentFolderId,'');
                                                                            ucApp.hideIndicator();
                                                                            ucApp.alert('新建成功!');
                                                                            mainView.router.back({
                                                                                                 url: 'index.html'
                                                                                                 ,force:true
                                                                                                 })
                                                                            } ,
                                                                            error: function(jqXHR, textStatus, errorThrown) {
                                                                            ucApp.hideIndicator();
                                                                            //alert(jqXHR.getResponseHeader('code'));
                                                                            showMessage('error',jqXHR.getResponseHeader('code'));
                                                                            }
                                                                            });
                                       });

    $$('#back_newFile').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_newFile');
    });

});


//New Folder
$$('#btn_newFolder').on('click', function (e) {
    //判断是否有功能点权限
    if (!checkAction("docMg_newFolder")){
        showMessage('error','没有此操作的权限');
        ucApp.closeModal('.popover-links');
        return;
    };

    //判断是否有创建权限
    var cid = storage.getItem('currentFolder');
    var  url = ucUrl + 'contents/'+cid+'/checkPremession';
    $.get(url, function(checkPremession) {
        if(checkPremession){
            mainView.router.load({
                url:'tpl/newFolder.html',
                context: {
                    parentId : cid
                }
            });
        }else{
            showMessage('error','没有创建内容的权限');
        }
    });
    ucApp.closeModal('.popover-links');
});

//page初始化_newFolder
ucApp.onPageInit('newFolder', function (page) {
    $('#content_newFolderForm').validate({
        rules: {
            content_newFolder_name: {
                required: true,
                maxlength:50,
                invalidData: true
            },
            content_newFolder_description: {
                required: false,
                maxlength:200,
                invalidData: true
            }
        }
    });

    $$('#fullscreen_newFolder').on('click', function () {
        fullscreen('#fullscreen_newFolder');
    });

    $$('#newFolder_add').on('click', function () {
        if (!$("#content_newFolderForm").valid()) {
            return;
        }
        var description = $$('#content_newFolder_description').val();
        var name = $$('#content_newFolder_name').val();
        var pid = $$('#content_newFolder_parentId').val();

        var content = {
            contentTypeName: sysfoldercontenttype,
            parentId: pid,
            name: name,
            description: description
        };

        $.ajax({
            async: true,
            type: "POST",
            contentType: "application/json",
            url: ucUrl + 'contents',
            data: JSON.stringify(content)
        }).success(function (data) {
            var currentFolderId = storage.getItem('currentFolder');
            $('#search_input').attr('value','');
            getContentList(currentFolderId,'');
            showMessage('success','新建成功!');
            mainView.router.back({
                url: 'index.html'
                ,force:true
            })
        }).error(function (jqXHR) {
            if (jqXHR.status == '401') {
                status401Error();
            } else {
                showMessage('error',jqXHR.getResponseHeader('code'));
            }
        });
    });

    $$('#back_newFolder').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_newFolder');
    });

});

//New Other
$$('#btn_newOther').on('click', function (e) {
    //判断是否有功能点权限
    if (!checkAction("docMg_newObj")){
        showMessage('error','没有此操作的权限');
        ucApp.closeModal('.popover-links');
        return;
    };

    //判断是否有创建权限
    var cid = storage.getItem('currentFolder');
    var  url = ucUrl + 'contents/'+cid+'/checkPremession';
    $.get(url, function(checkPremession) {
        if(checkPremession){
            //获取文档类型列表
            $.ajax({
                type: 'GET',
                url: ucUrl + 'documentTypes',
                data: {
                    status: 2,
                    flag: 3
                },
                success: function(data) {
                    var cid = storage.getItem('currentFolder');
                    mainView.router.load({
                        url:'tpl/newOther.html',
                        context: {
                            parentId : cid,
                            contentTypes:data
                        }
                    });
                }
            });
        }else{
            showMessage('error','没有创建内容的权限');
        }
    });
    ucApp.closeModal('.popover-links');
});

//page初始化_newFolder
ucApp.onPageInit('newOther', function (page) {
    $$('#fullscreen_newOther').on('click', function () {
        fullscreen('#fullscreen_newOther');
    });
    $$('#back_newOther').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_newOther');
    });

    var validateRule = {rules: {
        content_newOtherDocument_name: {
            required: true,
            maxlength: 50,
            invalidData: true
        },
        content_newOtherDocument_documentType: {
            required: true,
            invalidData: true
        },
        content_newOtherDocument_description: {
            maxlength: 200,
            invalidData: true
        }
    }};

    var validator = $('#content_newOtherDocumentForm').validate(validateRule);

    $('#content_newOtherDocument_documentType').change(function() {
        var ctName = $(this).val();
        var fileInfo = $(this).find('option:selected').attr('info') + '';
        //if ($("#content_newOtherDocument_upload").find('p').length > 0) {
        //    $("#content_newOtherDocument_upload").empty();
        //}
        $("#content_newOtherDocument_upload").empty();
        if (fileInfo == 'true') {
            drawUploadDiv();
        }
        //if ($('#content_newOtherDocument_propertyListDIV').find('input[class="row"]').length > 0) {
        //    $('#content_newOtherDocument_propertyListDIV').empty();
        //}
        $('#content_newOtherDocument_propertyListDIV').empty();
        if (ctName != '') {
            $.ajax({
                type: "GET",
                url: ucUrl + "documentTypes/" + ctName + "/customProperties",
                success: function(data) {
                    if (data) {
                        var propertyListDIV = $('#content_newOtherDocument_propertyListDIV');
                        validateRule = drawPropsDiv(propertyListDIV ,data, validateRule);
                        $.extend(validator.settings, validateRule);
                    }
                }
            });
        }
    });

    $$('#newOther_add').on('click', function () {
        if (!$("#content_newOtherDocumentForm").valid()) {
            return;
        }
        ucApp.showIndicator();

//       if($('#content_newOtherDocument_upload').find('p')&&$('#content_newOtherDocument_upload').find('p').length>0){
//           $('#content_newOtherDocument_upload').find('input:file').each(function(i){
//                 if(i>0){
//                     if($(this).val()==''){
//                         $(this).parent().remove();
//                     }
//                 }
//           });
//           var files = $('#content_newOtherDocument_upload').find('input:file');
//           if(files.length>1){
//               for(var i=0;i<files.length;i++){
//                   for(var j=(i+1);j<files.length;j++){
//                           alert(files[i].value);
//                           alert(files[j].value);
//                       var fileName1 = files[i].value.substring(files[i].value.lastIndexOf("\\")+1,files[i].value.length);
//                       var fileName2 = files[j].value.substring(files[j].value.lastIndexOf("\\")+1,files[j].value.length);
//                           alert(fileName1);
//                           alert(fileName2);
//                       if(fileName1==fileName2){
//                           //ucApp.alert('上传重复附件');
//                           showMessage('error','上传重复附件');
//                           ucApp.hideIndicator();
//                           return ;
//                       }
//                   }
//               }
//           }
//       }
       
       var content = organizationDocument();
       var contentString = JSON.stringify(content);
       $('#content_newOtherDocument_contentString').val(contentString);
       $('#content_newOtherDocumentForm').ajaxSubmit({
             url : ucUrl + 'contents',
             type : 'POST',
             success : function(responseText, statusText) {
                 var currentFolderId = storage.getItem('currentFolder');
                 $('#search_input').attr('value','');
                 getContentList(currentFolderId,'');
                 ucApp.hideIndicator();
                 //ucApp.alert('新建成功!');
                 showMessage('success','新建成功!');
                 mainView.router.back({
                                      url: 'index.html'
                                      ,force:true
                                      })
             } ,
             error: function(jqXHR, textStatus, errorThrown) {
                 ucApp.hideIndicator();
                 //showErrorMassage(jqXHR.getResponseHeader('code'));
                 showMessage('error',jqXHR.getResponseHeader('code'));
             }
       });
    });
});


//批量上传附件，使用递归方法
function uploadMultiFiles(type,fileUris,contentId,success,fails,sameFiles,otherFails){
    var tempType = type;
    var tempSameFiles = sameFiles;
    var tempOtherFails = otherFails;
    var tempContentId = contentId;
    var tempFileUris = fileUris;
    var tempSuccess = success;
    var tempFails = fails;

    //如果上传uri数组为空，则表示递归完成，抛出讯息
    if (tempFileUris&&tempFileUris.length==0){
        var currentFolderId = storage.getItem('currentFolder');
        getContentList(currentFolderId,'');
        var infoText = "\n"+"上传文件成功"+tempSuccess+"个,失败"+tempFails+"个.";
        if(tempSameFiles!=""){
            infoText = infoText + "\n" + "失败原因:文档中已经存在相同的附件[" + "\n"+tempSameFiles+"]";
        }
        if(tempOtherFails!=""){
            infoText = infoText + "\n" + " 存储流失败[" + "\n"+tempOtherFails+"]";
        }
        if (tempType=="new"){
            showMessage('success','新建成功!'+infoText);
        }else{
            showMessage('success','修改成功!'+infoText);
        }
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        ucApp.hideIndicator();
    }


    //上传uri数组的第一个元素
    if(tempFileUris&&tempFileUris.length>0){
        var fileURI = tempFileUris[0];

        //移除数组的这第一个元素
        tempFileUris.shift();
        if(fileURI&&(fileURI!="")){
            var win = function(r) {
                //写入流成功
                //console.log("Code = " + r.responseCode);
                //console.log("Response = " + r.response);
                //console.log("Sent = " + r.bytesSent);

                //递归
                tempSuccess = tempSuccess + 1;
                uploadMultiFiles(tempType,tempFileUris,tempContentId,tempSuccess,tempFails,tempSameFiles,tempOtherFails);
            }

            var fail = function(error) {
                //......卧槽......失败了
                //console.log("upload error source " + error.source);
                //console.log("upload error target " + error.target);
                var errorMsg = JSON.stringify(error);
                var fname=decodeURI(fileURI.substr(fileURI.lastIndexOf('/')+1));
                //ucApp.alert(getErrorMsg(errorMsg,fname));
                //tempMsg = tempMsg +","+getErrorMsg(errorMsg,fname)+"";

                if (errorMsg.indexOf('02-content-2001')>0){
                    if (tempSameFiles==""){
                        tempSameFiles = fname;
                    }else{
                        tempSameFiles = tempSameFiles+","+fname;
                    }
                }else{
                    if (tempOtherFails==""){
                        tempOtherFails = fname;
                    }else{
                        tempOtherFails = tempOtherFails+","+fname;
                    }
                }

                //递归
                tempFails = tempFails + 1;
                uploadMultiFiles(tempType,tempFileUris,tempContentId,tempSuccess,tempFails,tempSameFiles,tempOtherFails);
            }

            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
            options.mimeType="text/plain";

            var params = new Object();
            options.params = params;
            params.value1 = "test";
            params.value2 = "param";

            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI(ucUrl + 'contents/mobile/'+contentId+'/files'), win, fail, options);
        }
    }
}

//将来配合手动清理缓存的按钮使用
function cleanPreviewCache(contentId) {
    var fileuri = 'file:///mnt/sdcard/ucmobile/' + contentId + "/";
    window.resolveLocalFileSystemURL(
        fileuri,
        function (entry) {
            if (entry.isDirectory) {
                entry.removeRecursively(
                   function () {
                    //console.log("删除缓存成功");
                }, function () {
                    //console.log("删除缓存失败");
                });
            }
        },
        function (error) {
        }
    );
}

//弹出选择约束值层
function callChoicePopup(arrayData,isMulti){
    if(arrayData){
        $('#choices').empty();
        for(index=0;index<arrayData.length;index++){
            var flag = index+'';
            var value = arrayData[index]
            var choiceHtml='<li>';
            if (isMulti){
                choiceHtml=choiceHtml+
                '<label class="label-checkbox item-content">'+
                ' <input type="checkbox" name="ks-checkbox" value="'+value+'" id="choiceItem'+flag+'" >'+
                '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>';
            }else{
                choiceHtml=choiceHtml+
                '<label class="label-radio item-content">'+
                '<input type="radio" name="ks-radio" value="'+value+'" id="choiceItem'+flag+'" >';
            }
            choiceHtml=choiceHtml+
            '<div class="item-inner">'+
            '<div class="item-title">'+value+'</div>'+
            '</div>'+
            '</label>'+
            ' </li>';
            $('#choices').append(choiceHtml);
        };
        ucApp.popup('.popup-about');
    }
}

//用来记录约束值选择层的DOM
var chosenPropObj=null;

//点击确定完成约束值选择
$$('#popup_confirm').on('click', function () {
    ucApp.closeModal('.popup-about');
    var values='';
    $('#choices').find('li').each(function () {
        if ($(this).find('input[type=checkbox]').attr('checked') == 'checked') {
            if (values == '') {
                values = values + $(this).find('input[type=checkbox]').val();
            } else {
                values = values + ',' + $(this).find('input[type=checkbox]').val();
            }
        }
        if ($(this).find('input[type=radio]').attr('checked') == 'checked') {
            if (values == '') {
                values = values + $(this).find('input[type=radio]').val();
            } else {
                values = values + ',' + $(this).find('input[type=radio]').val();
            }
        }
    });
    if (chosenPropObj){
        $(chosenPropObj).val(values);
    }
    $('#choices').empty();
    chosenPropObj=null;
});

//点击约束值选择层取消按钮
$$('#popup_cancel').on('click', function () {
    $('#choices').empty();
    chosenPropObj=null;
    ucApp.closeModal('.popup-about');
});

//创建属性表单中上传部分
function drawUploadDiv() {
//    $("#content_newOtherDocument_upload").append('<p><input  type="file" name="file_upload0"/><a href="" name="addUpload">添加文档</a>&nbsp;&nbsp;<a href="" name="deleteUpload" hidden="hidden">删除文档</a>');
    $("#content_newOtherDocument_upload").append('<p><input  type="file" name="file_upload0"/>');
    $('#content_newOtherDocument_upload').find('a[name="addUpload"]').click(function(){
        var index = $(this).parent().find('p').length+1;
        var newP = $(this).parent().clone(true);
        newP.find('a[name="deleteUpload"]').removeAttr("hidden");
        newP.find('input').attr('name','file_upload'+index);
        $('#content_newOtherDocument_upload').append(newP);
                                                                            
    });
    $('#content_newOtherDocument_upload').find('a[name="deleteUpload"]').click(function(){
        $('#content_newOtherDocument_upload').find('input:file').each(function(i){
              $(this).attr('name','file_upload'+i);
        });
       $(this).parent().remove();
    });
    $("#content_newOtherDocument_upload").find('input:file:first').change(function(){
      var fileValue = $(this).val();
      if(fileValue!=''){
         if($.trim($('#content_newOtherDocument_name').val())==''){
             var fileName = fileValue.substring(fileValue.lastIndexOf("\\")+1,fileValue.length);
             $('#content_newOtherDocument_name').val(fileName);
             $("#content_newOtherDocumentForm").valid();
         }
      }
    });
};

function toValue(value) {
    if (value == null || value == 'null' || value == undefined) {
        return "";
    } else {
        return value;
    }
};

function toDate(ticks) {
    if (ticks && ticks != '') {
        var date =  new Date(Date.parse(ticks.replace(/-/g,"/")));
        var MM = date.getMonth() + 1;
        if (MM < 10) {
            MM = "0" + MM;
        }
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        if (dd < 10) {
            dd = "0" + dd;
        }
        return yyyy + '-' + MM + '-' + dd;
    } else {
        return '';
    }
};

//创建属性表单
function drawPropsDiv(propsDiv, propsObj, validateRule) {
    var self = this;
    var propertyListDIV = propsDiv;
    $.each(propsObj, function(key, props) {
        if (props) {
            //var p = $('<p><input type="hidden" name="type" value="' + props.type + '"/></p>').appendTo(propertyListDIV);
            var p = $('<div class="row"><input type="hidden" name="type" value="' + props.type + '"/></div>').appendTo(propertyListDIV);
            if (props.required) {
                p.append('<em>*</em>');
                validateRule.rules[props.name] = {
                    required: true
                };
            } else {
                p.append('<em>&nbsp;</em>');
            }
            var defaultValue = toValue(props.defaultValue);
            if (props.choices && props.choices != '') {
                if (props.type == 'DATETIME' && defaultValue != '') {
                    defaultValue = toDate(defaultValue);
                }
                validateRule = drawChoiceProps(props, validateRule, p);
            } else {
                if (props.type == 'STRING') {
                    validateRule = drawStringProps(props, validateRule, p);
                }
                if (props.type == 'BOOLEAN') {
                    validateRule = drawBooleanDiv(props, validateRule, p);
                }
                if (props.type == 'INTEGER') {
                    validateRule = drawIntegerDiv(props, validateRule, p);
                }
                if (props.type == 'DATETIME') {
                    defaultValue = toDate(defaultValue);
                    validateRule = drawDatetimeDiv(props, validateRule, p);
                }
                if (props.type == 'FLOAT') {
                    validateRule = drawFloatDiv(props, validateRule, p);
                }
            }
            if (props.type == 'BOOLEAN') {
                if (defaultValue) {
                    defaultValue = '1';
                    p.find('input[type="checkbox"]').attr("checked", "checked");
                } else {
                    defaultValue = '0';
                }
            }
            if (props.type == 'INTEGER') {
                defaultValue = defaultValue + '';
            }
            if (props.type == 'DATETIME') {
                defaultValue = toDate(defaultValue);
            }
            if (defaultValue && defaultValue != '') {
                if (p.find('input[type="text"]').length > 0) {
                    p.find('input[type="text"]').val(defaultValue);
                }
            }
        }
    });
    return validateRule;
};

//创建属性表单中存在约束值的属性
function drawChoiceProps(prop, validateRule, obj) {
    if (validateRule.rules[prop.name]) {
        validateRule.rules[prop.name].maxlength = 100;
    } else {
        validateRule.rules[prop.name] = {
            maxlength: 100
        };
    }
    var choicesList = prop.choices;

    if (prop.type == 'DATETIME') {
        var resultList = [];
        $(choicesList).each(function() {
            resultList.push(toDate(this));
        });
        choicesList = resultList;
    }
    //validateRule.rules[prop.name].equalFromList = choicesList;
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"> <input type="text" name="' + prop.name + '"/><a href="#">选择约束值</a></div>');
    //<label class="promptmessage">'+msg.documentManagment.toolBar.newOtherDocumentDialog.hasChoice+'</label>
    obj.find('a').click(function() {
        if (prop.choices) {
            chosenPropObj = $(this).parent().find('input[type="text"]');
            if (prop.multiple){
                callChoicePopup(prop.choices,true);
            }else{
                callChoicePopup(prop.choices,false);
            }
        }
    });

    if (prop.type == 'INTEGER') {
        if (validateRule.rules[prop.name]) {
            validateRule.rules[prop.name].digits = true;
        } else {
            validateRule.rules[prop.name] = {
                digits: true
            };
        }
    }
    if (prop.type == 'DATETIME') {
        if (validateRule.rules[prop.name]) {
            validateRule.rules[prop.name].date = true;
        } else {
            validateRule.rules[prop.name] = {
                date: true
            };
        }
    }
    if (prop.type == 'FLOAT') {
        if (validateRule.rules[prop.name]) {
            validateRule.rules[prop.name].validFloat = true;
        } else {
            validateRule.rules[prop.name] = {
                validFloat: true
            };
        }
    }

    return validateRule;
};

//创建属性表单中字符串属性DOM
function drawStringProps(prop, validateRule, obj) {
    if (validateRule.rules[prop.name]) {
        validateRule.rules[prop.name].maxlength = 100;
    } else {
        validateRule.rules[prop.name] = {
            maxlength: 100
        };
    }
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"><input type="text" name="' + prop.name + '"/></div>');

    return validateRule;
};

//创建属性表单中布尔型属性DOM
function drawBooleanDiv(prop, validateRule, obj) {
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"><input type="checkbox" name="' + prop.name + '" value="1" style="min-width: 5px;"/></div>');
    return validateRule;
}

//创建属性表单中整型属性DOM
function drawIntegerDiv(prop, validateRule, obj) {
    if (validateRule.rules[prop.name]) {
        validateRule.rules[prop.name].digits = true;
        validateRule.rules[prop.name].min = -2147483648;
        validateRule.rules[prop.name].max = 2147483647;
    } else {
        validateRule.rules[prop.name] = {
            digits: true,
            min:-2147483648,
            max:2147483647
        };
    }
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"><input type="text" name="' + prop.name + '"/></div>');
    return validateRule;
}

//创建属性表单中日期型属性DOM
function drawDatetimeDiv(prop, validateRule, obj) {
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"><input type="date" name="' + prop.name + '" value=""></div>');
    return validateRule;
};

//创建属性表单中浮点型属性DOM
function drawFloatDiv(prop, validateRule, obj) {
    if (validateRule.rules[prop.name]) {
        validateRule.rules[prop.name].validFloat = true;
    } else {
        validateRule.rules[prop.name] = {
            validFloat: true
        };
    }
    obj.append('<div class="col-15"><label for="' + prop.name + '">' + prop.displayName + '</label></div><div class="col-85"><input type="text" name="' + prop.name + '"/></div>');
    return validateRule;
};

//获取属性表单中所填数据，并组成JSON
function organizationDocument() {
    var description = $('#content_newOtherDocument_description').val();
    var name = $('#content_newOtherDocument_name').val();
    var documentType = $('#content_newOtherDocument_documentType').val();
    var content = {
        "contentTypeName": documentType,
        "name": name,
        "description": description,
        "parentId": storage.getItem('currentFolder'),
        "properties": []
    };
    var properties = [];
    $('#content_newOtherDocument_propertyListDIV').find('div[class="row"]').each(function() {
        //var obj = $(this).find('label:first').next();
        var obj = $(this).find('input:eq(1)');
        var objType = $(this).find('input:hidden').val();
        var objName = obj.attr('name');
        var objvalue = '';
        if (objType == 'BOOLEAN') {
            if (obj.attr('checked')) {
                objvalue = '1';
            } else {
                objvalue = '0';
            }
        } else {
            objvalue = obj.val();
        }
        properties.push({
            "localName": objName,
            "type": objType,
            "value": objvalue
        });
    });
    content.properties = properties;
    return content;
};

//全选按钮
var select_all = false;
$$('#select-all').on('click', function () {
    if (select_all) {
        $$('input[type=checkbox]').prop('checked', false);
        select_all = false;
        $$('#select-all')[0].innerHTML = '全选';

        hide_toolbar_buttons();
    } else {
        $$('input[type=checkbox]').prop('checked', true);
        select_all = true;
        $$('#select-all')[0].innerHTML = '取消全选';

        show_toolbar_buttons();
    }
});

//剪切按钮点击事件
$$('#btn_cut').on('click', function () {
    //判断是否有功能点权限
    if (!checkAction("docMg_multiCut")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var ids = getCheckedIDs();
    if (ids == '') {
        //do nothing
    } else {
        storage.setItem('clipboard', ids);
        storage.setItem('clipboardMethod', 'cut');
    }
});

//复制按钮点击事件
$$('#btn_copy').on('click', function () {
    //判断是否有功能点权限
    if (!checkAction("docMg_multiCopy")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var ids = getCheckedIDs();
    if (ids == '') {
        //do nothing
    } else {
        storage.setItem('clipboard', ids);
        storage.setItem('clipboardMethod', 'copy');
    }
});

function getCheckedIDs() {
    var ids = '';
    $('#itemList').find('li').each(function () {
        if ($(this).find('input[type=checkbox]').attr('checked') == 'checked') {
            if (ids == '') {
                ids = ids + $(this).find('input[name="input_contentId"]').val();
            } else {
                ids = ids + ',' + $(this).find('input[name="input_contentId"]').val();
            }
        }
    });
    return ids;
}

//清空剪切板
function cleanClipboard() {
    storage.setItem('clipboard', '');
    storage.setItem('clipboardMethod', '');
}

//粘贴按钮点击事件
$$('#to-paste').on('click', function () {
    //判断是否有功能点权限
    if (!checkAction("docMg_multiPaste")){
        showMessage('error','没有此操作的权限');

        //清空剪切板
        cleanClipboard();
        return;
    };

    var ids = storage.getItem('clipboard');
    if (ids == '') {
        //do nothing
    } else {
        var method = storage.getItem('clipboardMethod');
        var currentFolderId = storage.getItem('currentFolder');
        var data = $.param({
            'contentId': ids
        });
        if (method === 'copy') {
            $.post(ucUrl + 'folderTree/' + currentFolderId + '/children?action=copy&' + data, function () {
                $('#search_input').attr('value','');
                getContentList(currentFolderId, '');
                showMessage('success','复制成功!');
            }).error(function (jqXHR, textStatus, errorThrown) {
                showMessage('error',jqXHR.getResponseHeader('code'));
            }).complete(function () {
                //清空剪切板
                cleanClipboard();
            });
        }
        if (method === 'cut') {
            $.post(ucUrl + 'folderTree/' + currentFolderId + '/children?action=move&' + data, function () {
                $('#search_input').attr('value','');
                getContentList(currentFolderId, '');
                showMessage('success','剪切成功!');
            }).error(function (jqXHR, textStatus, errorThrown) {
                showMessage('error',jqXHR.getResponseHeader('code'));
            }).complete(function () {
                //清空剪切板
                cleanClipboard();
            });
        }
    }
});

//删除按钮点击事件
$$('#btn_delete').on('click', function () {
    //判断是否有功能点权限
    if (!checkAction("docMg_multiDelete")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var ids = getCheckedIDs();
    if (ids == '') {
        //do nothing
    } else {
        //ucApp.confirm('是否删除?',
        //    function () {
        //        $['delete'](ucUrl + 'contents/' + ids, function () {
        //            var currentFolderId = storage.getItem('currentFolder');
        //            getContentList(currentFolderId, '');
        //            ucApp.alert('删除成功!');
        //        }).error(function (jqXHR, textStatus, errorThrown) {
        //            showErrorMassage(jqXHR.getResponseHeader('code'));
        //        }).complete(function () {
        //
        //        });
        //    },
        //    function () {
        //
        //    }
        //);

        ucApp.modal({
            title:  '',
            text: '是否删除?',
            buttons: [
                {
                    text: '确定',
                    onClick: function() {
                        $['delete'](ucUrl + 'contents/' + ids, function () {
                            var currentFolderId = storage.getItem('currentFolder');
                            $('#search_input').attr('value','');
                            getContentList(currentFolderId, '');
                            showMessage('success','删除成功!');
                            mainView.router.back({
                                url: 'index.html'
                                ,force:true
                            });
                        }).error(function (jqXHR, textStatus, errorThrown) {
                            showMessage('error',jqXHR.getResponseHeader('code'));
                        }).complete(function () {

                        });
                    }
                },
                {
                    text: '取消',
                    onClick: function() {
                    }
                }
            ]
        })
    }
});

//单选按钮
function toggle_toolbar_buttons(index) {
    //防止模拟器和浏览器在点击事件表现不一致
    if ($$("#content_checkbox" + index).prop('checked')) {
        $$("#content_checkbox" + index).prop('checked', false);
    } else {
        $$("#content_checkbox" + index).prop('checked', true);
    }

    var checked_length = $$("input[type=checkbox]:checked").length;
    if (checked_length > 0) {
        //是否全选了
        if (checked_length == $$('input[type=checkbox]').length) {
            select_all = true;
            $$('#select-all')[0].innerHTML = '取消全选';
        }else{
            select_all = false;
		    $$('#select-all')[0].innerHTML = '全选';
        }
        show_toolbar_buttons();
    } else {
        select_all = false;
        $$('#select-all')[0].innerHTML = '全选';
        hide_toolbar_buttons();
    }

    //防止模拟器和浏览器在点击事件表现不一致
    if ($$("#content_checkbox" + index).prop('checked')) {
        $$("#content_checkbox" + index).prop('checked', false);
    } else {
        $$("#content_checkbox" + index).prop('checked', true);
    }
}

//隐藏工具栏
function hide_toolbar_buttons() {
    $$('#toolbar-buttons').addClass('toolbar-item-display-none');
    $$('#repository-lr').removeClass('toolbar-item-display-none');
}

//显示工具栏
function show_toolbar_buttons() {
    $$('#select-all').css('width', '120%');
    $$('#toolbar-buttons').removeClass('toolbar-item-display-none');
    $$('#repository-lr').addClass('toolbar-item-display-none');
}

//工具栏 - 粘贴和取消按钮
$$('.paste-buttons-show').on('click', function (e) {
    //隐藏全部的勾选框
    $$('.label-checkbox').css('display', 'none');

    //调整工具栏的显示
    $$('#repository-lr').addClass('toolbar-item-display-none');
    $$('#toolbar-buttons').addClass('toolbar-item-display-none');
    $$('#toolbar-buttons-paste').removeClass('toolbar-item-display-none');
});

$$('#btn_delete').on('click', function () {
    //删除完毕后，初始化多选框
    $$('input[type=checkbox]').prop('checked', false);
    select_all = false;
    $$('#select-all')[0].innerHTML = '全选';

    //调整工具栏的显示
    $$('#repository-lr').removeClass('toolbar-item-display-none');
    $$('#toolbar-buttons').addClass('toolbar-item-display-none');
    $$('#toolbar-buttons-paste').addClass('toolbar-item-display-none');
});

$$('#to-paste').on('click', function (e) {
    //显示全部的勾选框
    $$('.label-checkbox').css('display', '');

    //粘贴完毕后，初始化多选框
    $$('input[type=checkbox]').prop('checked', false);
    select_all = false;
    $$('#select-all')[0].innerHTML = '全选';

    //调整工具栏的显示
    $$('#repository-lr').removeClass('toolbar-item-display-none');
    $$('#toolbar-buttons').addClass('toolbar-item-display-none');
    $$('#toolbar-buttons-paste').addClass('toolbar-item-display-none');
});

$$('#cancel-paste').on('click', function (e) {
    //显示全部的勾选框
    $$('.label-checkbox').css('display', '');

    //初始化多选框
    $$('input[type=checkbox]').prop('checked', false);
    select_all = false;
    $$('#select-all')[0].innerHTML = '全选';

    //调整工具栏的显示
    $$('#toolbar-buttons').addClass('toolbar-item-display-none');
    $$('#repository-lr').removeClass('toolbar-item-display-none');
    $$('#toolbar-buttons-paste').addClass('toolbar-item-display-none');

    //清空剪切板
   cleanClipboard();
});

//全屏显示和取消全屏显示
function fullscreen(id) {
    if ($$('.view-left')[0].style.display == '') {
        $$('.view-left').css('display', 'none');
        $$('.view-main').addClass('view-main-fullscreen');
        $$(id).html("取消全屏");
    } else {
        $$('.view-left').css('display', '');
        $$('.view-main').removeClass('view-main-fullscreen');
        $$(id).html("全屏");
    }
}

//为了点击返回按钮时，主页上的全屏按钮文字能够同步
function syncHomeFullscreen(id) {
    if($$(id)[0].innerHTML =="取消全屏" ){
        $$('#fullscreen_view_main').html("取消全屏");
    }else{
        $$('#fullscreen_view_main').html("全屏");
    }
}

//搜索栏按钮
//$$('#search_Button').on('click', function () {
//    var searchStr = $$('#search_input').val();
//    var cid = storage.getItem('currentFolder');
//    getContentList(cid, searchStr);
//});

//搜索框响应回车事件
document.onkeydown=function(e){
    var keycode=document.all?event.keyCode:e.which;
    if(keycode==13 && document.activeElement.id == "search_input"){
        var searchStr = $$('#search_input').val();
        var cid = storage.getItem('currentFolder');
        getContentList(cid, searchStr);
    }
}

//page初始化_about
ucApp.onPageInit('about', function (page) {
    $$('#fullscreen_about').on('click', function () {
        fullscreen('#fullscreen_about');
    });

    $$('#back_about').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            , force: true
        });
        syncHomeFullscreen('#fullscreen_about');
    });
});

//page初始化_changePass
ucApp.onPageInit('changePass', function (page) {
    $$('#fullscreen_changePass').on('click', function () {
        fullscreen('#fullscreen_changePass');
    });

    $('#changePassForm').validate({
        rules: {
            newPassword: {
                required: true,
                minlength : 5,
                maxlength: 20
            },
            confirmPassword: {
                required: true,
                minlength : 5,
                equalTo: '#newPassword'
            }
        }
    });

    $$('#changePass_modify').on('click', function () {
        if (!$("#changePassForm").valid()) {
            return;
        }
        var newPwd = $$(page.container).find('#newPassword').val();
        var url = ucUrl + 'users/' + storage.getItem('userId') + '/password?' + $.param({
                'newPassword': newPwd
            });
        $.put(url, function () {
            ucApp.modal({
                title: '',
                text: '修改成功，请重新登录！',
                buttons: [
                    {
                        text: '确定',
                        onClick: function() {
                            $['delete'](ucUrl + 'authentications/users/' + window.sessionStorage.getItem('userId'), function () {
                                window.location.href = 'login.html';
                            });
                        }
                    }
                ]
            })

        }).error(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == '401') {
                status401Error();
            } else {
                showMessage('error',jqXHR.getResponseHeader('code'));
            }
        });
    });

    $$('#back_changePass').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            , force: true
        });
        syncHomeFullscreen('#fullscreen_changePass');
    });

});

//page初始化_userInfo
ucApp.onPageInit('userInfo', function (page) {
    $$('#fullscreen_userInfo').on('click', function () {
        fullscreen('#fullscreen_userInfo');
    });

    $('#userInfoForm').validate({
        rules: {
            userInfo_userName: {
                validDataByReg: '^[a-zA-Z0-9\u4e00-\u9fa5]+$',
                required: true,
                maxlength: 20
            },
            userInfo_email: {
                required: true,
                email: true,
                maxlength: 50
            }
        }
        //, messages:{
        //    userInfo_userName: {
        //        validDataByReg:'请输入合法的数据(仅能输入1-20位数字或字母)'
        //    }
        //}
    });

    $$(page.container).find('#userInfo_userId').html(user.id);
    $$(page.container).find('#userInfo_userName').attr("value", user.name);
    $$(page.container).find('#userInfo_email').attr("value", user.email);

    $$('#userInfo_modify').on('click', function () {
        if (!$("#userInfoForm").valid()) {
            return;
        }
        var pName = $$(page.container).find('#userInfo_userName').val();
        var pEmail = $$(page.container).find('#userInfo_email').val();
        var pUser = {
            email: pEmail,
            name: pName
        };
        $.ajax({
            async: true,
            type: "PUT",
            contentType: "application/json",
            url: ucUrl + "users/" + window.sessionStorage.getItem('userId') + '/properties',
            data: JSON.stringify(pUser)
        }).success(function (data) {
            ucApp.modal({
                title: '',
                text: '修改成功，请重新登录！',
                buttons: [
                    {
                        text: '确定',
                        onClick: function() {
                            $['delete'](ucUrl + 'authentications/users/' + window.sessionStorage.getItem('userId'), function () {
                                window.location.href = 'login.html';
                            });
                        }
                    }
                ]
            })
        }).error(function (jqXHR) {
            if (jqXHR.status == '401') {
                status401Error();
            } else {
                showMessage('error',jqXHR.getResponseHeader('code'));
            }
        });
    });

    $$('#back_userInfo').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            , force: true
        });
        syncHomeFullscreen('#fullscreen_userInfo');
    });

});

//登出按钮
$$('#logout').on('click', function () {
    //ucApp.confirm('是否退出?',
    //    function () {
    //        $['delete'](ucUrl + 'authentications/users/' + storage.getItem('userId'), function () {
    //            window.location.href = 'login.html';
    //        });
    //    },
    //    function () {
    //
    //    }
    //);

    ucApp.modal({
        title:  '',
        text: '是否退出?',
        buttons: [
            {
                text: '确定',
                onClick: function() {
                    $['delete'](ucUrl + 'authentications/users/' + storage.getItem('userId'), function () {
                        window.location.href = 'login.html';
                    });
                }
            },
            {
                text: '取消',
                onClick: function() {
                    tips('用户已登录')
                }
            }
        ]
    })
});

//跳转到修改密码页面
$$('#show_changePass').on('click', function () {
    mainView.router.load({
        url: 'tpl/changePass.html'
    });
});

//跳转到修改用户信息页面
$$('#show_userInfo').on('click', function () {
    mainView.router.load({
        url: 'tpl/userInfo.html',
        context: {
            groups: user.group,
            orgs: user.org,
            roles: user.role
        }
    });
});

//跳转到关于页面
$$('#show_about').on('click', function () {
    mainView.router.load({
        url: 'tpl/about.html'
    });
});


//点击模板时加载模板列表
$$('#repository-middle').on('click', function (e) {
                            $$('#template-middle').addClass('active');
                            refreshTemplates();
                            });

$$('#set-middle').on('click', function (e) {
                     $$('#template-middle').addClass('active');
                     refreshTemplates();
                     });

$$('#template-left').on('click', function (e) {
                        $$('#repository-left').addClass('active');
                        mainView.router.back({
                                             url: 'index.html'
                                             ,force:true
                                             })
                        });

$$('#template-right').on('click', function (e) {
                         $$('#set-right').addClass('active');
                         mainView.router.back({
                                              url: 'index.html',
                                              force: true,
                                              animatePages:false
                                              })
                         });

function refreshTemplates(){
    $.ajax({
           async: true,
           type: 'GET',
           url: ucUrl + 'queryTemplate',
           contentType: "application/json;utf-8"
           }).success(function (templates) {
                      $('#ul_templates').empty();
                      if (templates&&templates.length>0) {
                          for(var i=0;i<templates.length;i++){
                              var temp = templates[i];
                              var tempHtml='<li>'+
                                            '<a name="'+temp.id+'" tempname="'+temp.qTepName+'" href="#" id="template1" class="item-link">'+
                                                '<div class="item-content">'+
                                                '<div class="item-inner">'+
                                                '<div class="item-title">'+temp.qTepName+'</div>'+
                                                '</div>'+
                                                '</div>'+
                                            '</a>'+
                                        '</li>';
                              $('#ul_templates').append(tempHtml);
                          }
                      }
                      
                      $('#ul_templates').find('a').click(function(){
                                                         var tempId = $(this).attr('name');
                                                         var tempName = $(this).attr('tempname');
                                                         mainView.router.back({
                                                                              url: 'index.html',
                                                                              force: true,
                                                                              animatePages:false
                                                                              });
                                                         mainView.router.load({
                                                                              url: 'tpl/templateDetail.html',
                                                                              context: {
                                                                              tempId: tempId,
                                                                              tempName: tempName
                                                                              }
                                                                              });
                                                         });
                      }).error(function (jqXHR) {
                               if (jqXHR.status == '401') {
                               status401Error();
                               } else {
                                    showMessage('error',jqXHR.getResponseHeader('code'));
                               }
                               });
    
    //将设置页面点出的右侧页面返回到viewmain
    mainView.router.back({
                         url: 'index.html',
                         force: true,
                         animatePages:false
                         })
}

var queryBean=null;

var queryUcql="";

//加载查询模板详细信息页面
ucApp.onPageInit('templateDetail', function (page) {
                 var tempId= $('#templateId').val();
                 $.get(ucUrl + 'queryTemplate/' + tempId, function(data) {
                       if (data) {
                       queryBean = data;
                       //alert(JSON.stringify(data));
                       //if(qt&&qt.queryBean){
                       //    self.qb =qt.queryBean;
                       //
                       //}else{
                       //    self.qb = data;
                       //}
                       var conditionTable =$('#searchTable');
                       conditionTable.html('');
                       var conditions = data.conditions;
                       if(conditions&&conditions.length>0){
                       for (var i = 0; i < conditions.length; i++) {
                       var condition = conditions[i];
                       var type = condition.ptype;
                       var choices = condition.choices;
                       if(choices&&choices.length>0){
                       var conditionTr = $("<tr><td>"+condition.displayName+"</td><td style='margin-left:10px;'><select  name='pvalue'  style='min-width: :100px;' multiple='multiple'></select></td></tr>").appendTo($('#searchTable'));
                       var choiceSelect = conditionTr.find('select');
                       var sValue = [];
                       if(condition.value&&condition.value!=''&&condition.value.length>0){
                       sValue = condition.value;
                       }
                       if(condition.choices&&condition.choices.length>0){
                       for (var i = 0; i < condition.choices.length; i++) {
                       if(_.indexOf(sValue, condition.choices[i])>-1){
                       choiceSelect.append('<option value="'+condition.choices[i]+'" selected="selected">'+condition.choices[i]+'</option>');
                       }else{
                       choiceSelect.append('<option value="'+condition.choices[i]+'">'+condition.choices[i]+'</option>');
                       }
                       }
                       }
                       }else{
                       if(type=='DATETIME'){
                       var conditionTr = $("<tr><td>"+condition.displayName+"</td><td style='margin-left:10px;'>"+"From"
                                           +"<input type='date' name='pvalue' value='' />"+"to"
                                           +"<input type='date' name='pvalue' value='' /></td></tr>").appendTo($('#searchTable'));
                       //conditionTr.find('input:text').datepicker({
                       //    buttonImageOnly: true,
                       //    dateFormat: 'yy-mm-dd',
                       //    showOn: 'both'
                       //});
                       if(condition.value&&condition.value!=''){
                       var values = condition.value;
                       if(values.indexOf('_')>-1){
                       var sValue = values.split('_');
                       if(sValue[0]&&sValue[0]!='undefined'){
                       conditionTr.find('input:text').eq(0).val(sValue[0]);
                       }
                       if(sValue[1]&&sValue[1]!='undefined'){
                       conditionTr.find('input:text').eq(1).val(sValue[1]);
                       }
                       }else{
                       conditionTr.find('input:text').eq(0).val(values);
                       }
                       }
                       }else if(type=='BOOLEAN'){
                       var conditionTr =$("<tr><td>"+condition.displayName+"</td><td style='margin-left:10px;'><select  name='pvalue' style='min-width: :70px;'><option value=''></option><option value='1'>" + "True" + "</option><option value='0'>" + "False" + "</option></select></td></tr>").appendTo($('#searchTable'));
                       if(condition.value&&condition.value!=''){
                       conditionTr.find('select').find('option[name="condition.value"]').attr('selected','selected');
                       }
                       }else{
                       var conditionTr =$("<tr><td>"+condition.displayName+"</td><td style='margin-left:10px;'><input type='text' name='pvalue' value='' style='width:300px;' /><label <td class='promptmessage'>"+'多条件用","分隔'+"</label></td></tr>").appendTo($('#searchTable'));
                       if(condition.value&&condition.value!=''){
                       conditionTr.find('input:text').val(condition.value);
                       }
                       }
                       
                       }
                       
                       }
                       conditionTable.find('tr:first td:first').append("<input type='hidden' id='tId' name='tId' value='"+tempId+"'  />");
                       }
                       }
                       
                       }).complete(function(){
                                   //$('#searchBtn').show();
                                   });
                 
                 
                 $$('#templateSearch').on('click', function () {
                                          //alert(JSON.stringify(queryBean));
                                          queryUcql = getUcql(queryBean);
                                          
                                          
                                          mainView.router.load({
                                                               url: 'tpl/queryResult.html'
                                                               });
                                          
                                          });
                 });


function getUcql(qb){
    var self = this;
    var ucql = "";
    var flag = true;
    if (qb && qb.contentTypeName && qb.columns && qb.columns.length > 0) {
        ucql = "SELECT C.IDENTIFIER IDENTIFIER,C.FACETS FACETS,C.NAME NAME,C.ISCHECKOUT ISCHECKOUT,C.CREATIONDATE CREATIONDATE,C.CREATEDBY CREATEDBY";
        //        $(qb.columns).each(function() {
        //            var aliasColumn = this.queryName.replace('.', '_');
        //            ucql = ucql + "," + this.queryName + ' ' + aliasColumn;
        //        });
        ////                ucql = ucql + ","+ qb.contentTypeName + ".*" ;
        //        ucql = ucql + ","+qb.contentTypeName+".IMAGECREATIONDATE IMAGECREATIONDATE" ;
        ucql = ucql + " FROM " + qb.contentTypeName;
    }
    if(qb && qb.contentTypeName && qb.conditions && qb.conditions.length > 0){
        ucql = ucql + " WHERE 1=1 ";
        var conditionTable =$('#searchTable');
        conditionTable.find('tr').each(function(i){
                                       var condition = qb.conditions[i];
                                       if(checkCondition($(this))){
                                       var conditionSql = parseCondition(condition,$(this));
                                       if(conditionSql==null){
                                       flag= false;
                                       }else{
                                       ucql = ucql + conditionSql;
                                       }
                                       }
                                       });
        if(!flag){
            return null;
        }
    }
    return ucql;
}

function checkCondition(trObj){
    var flag = false;
    if(trObj.find('input:not(:hidden)')&&trObj.find('input:not(:hidden)').length>0){
        if(trObj.find('input:not(:hidden)').length==1){
            if($.trim($(trObj).find('input:not(:hidden)').val())!=''){
                flag = true;
            }
        }
        if(trObj.find('input:not(:hidden)').length==2){
            trObj.find('input:not(:hidden)').each(function(){
                                                  if($.trim($(this).val())!=''){
                                                  flag = true;
                                                  }
                                                  });
        }
        
    }
    if(trObj.find('select')&&trObj.find('select').length>0&&trObj.find('select').val()!=''){
        flag = true;
    }
    return flag;
}


function parseCondition(condition,trObj){
    var isFs = $('#fsCb').val();
    if($('#fsCb').attr('checked')!='checked'){
        isFs = '0';
    }
    var conditionSql = "" ;
    if(condition.ptype=='BOOLEAN'){
        if(trObj.find('select').val()!=''){
            conditionSql = conditionSql +  " AND " + condition.localName +" = "+trObj.find('select').val();
            condition.value = trObj.find('select').val();
        }
    }else if(condition.ptype=='DATETIME'){
        var startDate = trObj.find('input:not(:hidden)')[0].value;
        var endDate = trObj.find('input:not(:hidden)')[1].value;
        if($.trim(startDate)!=''&&$.trim(endDate)!=''){
            if(!checkDate(startDate,endDate)){
                messageBox.info(msg.documentManagment.search.dateError);
                return null;
            }
        }
        if($.trim(startDate)!=''){
            conditionSql = conditionSql + " AND " + condition.localName +" >= '"+startDate+" 00:00:00.000'";
            condition.value = startDate;
        }
        if($.trim(endDate)!=''){
            conditionSql = conditionSql + " AND " + condition.localName +" <= '"+endDate+" 23:59:59.997'";
            condition.value = condition.value+'_'+endDate;
        }
        
    }else if(trObj.find('select')&&trObj.find('select').length>0){
        var sValue = trObj.find('select').val();
        if(sValue&&sValue.length>0){
            conditionSql = conditionSql +  " AND (";
            for(var i=0;i<sValue.length;i++){
                if(i>0){
                    conditionSql = conditionSql + " OR ";
                }
                conditionSql = conditionSql +  condition.localName +" = '"+sValue[i]+"'";
            }
            conditionSql = conditionSql +  ")";
        }
        condition.value = sValue;
    }else{
        var sValue = trObj.find('input:not(:hidden)').val();
        condition.value = sValue;
        if($.trim(sValue)!=''){
            var values = sValue.split(',');
            conditionSql = conditionSql +  " AND (";
            for(var i=0;i<values.length;i++){
                if(values[i]!=''){
                    if(i>0){
                        conditionSql = conditionSql + " OR ";
                    }
                    conditionSql = conditionSql +  condition.localName ;
                    if(condition.ptype=='STRING'){
                        if(isFs=='1'){
                            conditionSql  = conditionSql+ " like '%"+values[i]+"%' ";
                        }else{
                            conditionSql  = conditionSql +" = '"+values[i]+"'";
                        }
                    }else{
                        conditionSql  = conditionSql +" = "+values[i];
                    }
                }
                
            }
            conditionSql = conditionSql +  ")";
        }
    }
    return conditionSql;
}

function checkDate(startDate,endDate){
    if (startDate && startDate != '') {
        var sdate =  new Date(Date.parse(startDate.replace(/-/g,"/")));
    }
    if (endDate && endDate != '') {
        var edate =  new Date(Date.parse(endDate.replace(/-/g,"/")));
    }
    if(startDate>endDate){
        return false;
    }else{
        return true;
    }
}

//查询结果
ucApp.onPageInit('queryResult', function (page) {
                 var currentFolderId = storage.getItem('currentFolder');
                 
                 //alert(queryUcql);
                 ucApp.showIndicator();
                 $.ajax({
                        type: 'GET',
                        url: ucUrl + 'query?ucql',
                        data: {
                        'filter': queryUcql,
                        'pageIndex':1,
                        'pageSize':50,
                        'sidx':'C.CREATIONDATE',
                        'sord':'desc',
                        'queryName':''
                        },
                        contentType: "application/json;utf-8"
                        }).success(function (data) {
                                   $$('#queryItemList')[0].innerHTML = Template7.templates.querylistTemplate(data);
                                   ucApp.hideIndicator();
                                   //alert(JSON.stringify(data));
                                   }).error(function (jqXHR) {
                                            ucApp.hideIndicator();
                                            if (jqXHR.status == '401') {
                                            status401Error();
                                            } else {
                                            showMessage('error',jqXHR.getResponseHeader('code'));
                                            }
                                            });
                 
                 //$.ajax({
                 //    async: true,
                 //    type: 'GET',
                 //    url: ucUrl + 'folderTree/' + currentFolderId + '/children',
                 //    data: {
                 //        'queryName': ''
                 //    },
                 //    contentType: "application/json;utf-8"
                 //}).success(function (data) {
                 //    $$('#queryItemList')[0].innerHTML = Template7.templates.querylistTemplate(data);
                 //}).error(function (jqXHR) {
                 //    if (jqXHR.status == '401') {
                 //        status401Error();
                 //    } else {
                 //        showMessage('error',jqXHR.getResponseHeader('code'));
                 //    }
                 //});
                 });




//跳转到ROOT目录
$$('#returnRoot').on('click', function () {
    $('#search_input').attr('value','');
    getContentList(root,'');
    storage.setItem('currentFolder', root);
    mainView.router.back({
        url: 'index.html'
        ,force:true
    })
    showHideReturnBack();
});

//点击back返回上级目录
$$('#returnback').on('click', function () {
    var cid = storage.getItem('currentFolder');
    $('#search_input').attr('value','');

    //当前目录为root则不跳转
    if ((cid == '') || (cid == root)) {
        showHideReturnBack();
    } else {
        if (cid) {
            //获取父文件夹id
            $.ajax({
                async: true,
                type: 'GET',
                url: ucUrl + 'contents/' + cid + '/easy',
                contentType: "application/json;utf-8"
            }).success(function (data) {
                if (data) {
                    var pid = data.parentId;
                    getContentList(pid, '');
                    storage.setItem('currentFolder', pid);
                    showHideReturnBack();
                }
            }).error(function (jqXHR) {
                if (jqXHR.status == '401') {
                    status401Error();
                } else {
                    showMessage('error',jqXHR.getResponseHeader('code'));
                }
            });
        } else {
            getContentList(root, '');
            storage.setItem('currentFolder', root);
            showHideReturnBack();
        }
    }

});

////点击进入目录
//function clickContent(index) {
//    //判断是否有功能点权限
//    if (!checkAction("docMg_dblClick")){
//        showMessage('error','没有此操作的权限');
//        return;
//    };
//
//    var cid = $$('#id' + index).val();
//    var ctName = $$('#ctName' + index).val();
//    var format = $$('#format' + index).val();
//    if (format == 'sysFolder') {
//        //如果为目录则进入目录
//        getContentList(cid, '');
//        storage.setItem('currentFolder', cid);
//        showHideReturnBack();
//
//    } else {
//        //如果为file，则进入在线浏览，首先判断当前用户对此内容是否有Read权限
//        var  url = ucUrl + 'contents/' + cid + '/allowedActions/read';
//        $.get(url, function(checkPremession) {
//            if(checkPremession){
//              var appPath = window.app.rootName + "/";
//              alert(appPath);
//                var fileuri = appPath + cid + "/" + cid + "." + format;
//                var serveruri = encodeURI(ucUrl + "contents/" + cid + "/attachments/download");
//              //判断文件是否已缓存
//              var cdvfile = cid + "/" + cid + "." + format;
//              window.app.fileSystem.root.getFile(cdvfile,{create: false},
//                                                 function(fileEntity){
//                                                     //文件已存在
//                                                     doPreview(fileEntity,format)
//                                                 },
//                                                 function(error){
//                                                    //文件不存在
//                                                     if(error.code = 1){
//                                                 alert(error.code);
//                                                         downloadToPre(fileuri,serveruri,format);
//                                                     } else{
//                                                         showMessage('','此类型文档不支持在线浏览');
//                                                     }
//                                                 });
//              
//            }else{
//                showMessage('error','没有浏览此文档的权限');
//            }
//        });
//    }
//}


//点击内容
function clickContent(index) {
    //判断是否有功能点权限
    if (!checkAction("docMg_dblClick")){
        showMessage('error','没有此操作的权限');
        return;
    };
    
    var cid = $$('#id' + index).val();
    var ctName = $$('#ctName' + index).val();
    var format = $$('#format' + index).val();
    if (format == 'sysFolder') {
        //如果为目录则进入目录
        getContentList(cid, '');
        storage.setItem('currentFolder', cid);
        showHideReturnBack();
        
    } else {
        //如果为file，则进入在线浏览，首先判断当前用户对此内容是否有Read权限
        var  url = ucUrl + 'contents/' + cid + '/attachments/imageUrls';
        $.get(url, function(data) {
              if(data){
                  var appPath = window.app.rootName + "/";
                  var totalCount = data.totalCount;
                  var urls = data.urls;
                  var attID = data.encoding.split("\\")[3];
                  if(format == "tif" || format == "tiff"){
                      var localuri = cid + "/" + attID + "/";;
                      var baseURI = appPath + localuri;
                      window.app.fileSystem.root.getDirectory(localuri,{create: false},
                                                              function(parent){
                                                              //直接发送本地地址
                                                                  UCmobile.previewTIF(onSuccess, onFailure, baseURI,urls.length);
                                                              },
                                                              function(error){
                                                              //alert(error.code);
                                                              if(error.code == 1){
                                                                  downloadTif(urls,cid,attID);
                                                              }
                      });
                  }else if(format == "pdf" || format == "jpg" || format == "JPG" || format == "jpeg" || format == "png" || format == "PNG"){
                      var localuri = cid + "/" + attID + "." + format;
                      var fileuri = appPath + localuri;
                      var serveruri = encodeURI(ucUrl + "contents/" + cid + "/attachments/download");
                      //判断文件是否已缓存
                      window.app.fileSystem.root.getFile(localuri,{create: false},
                                                               function(fileEntity){
                                                                   //文件已存在
                                                                   doPreview(fileEntity,format)
                                                               },
                                                               function(error){
                                                                  //文件不存在
                                                                   if(error.code = 1){
                                                                       //alert(error.code);
                                                                       downloadToPre(fileuri,serveruri,format);
                                                                   } else{
                                                                       showMessage('','此类型文档不支持在线浏览');
                                                                   }
                                                               });
                }else{
                      showMessage('','此类型文档不支持在线浏览');
                }
              }
      });
    }
}


//查询模版查询结果内容点击事件
function queryclickContent(index) {
    //判断是否有功能点权限
    if (!checkAction("docMg_dblClick")){
        showMessage('error','没有此操作的权限');
        return;
    };
    
    var cid = $$('#queryid' + index).val();
    var ctName = $$('#queryctName' + index).val();
    var format = $$('#queryformat' + index).val();
    
    if (format == 'sysFolder') {
        //如果为目录则进入目录
        getContentList(cid, '');
        storage.setItem('currentFolder', cid);
        showHideReturnBack();
        
    } else {
        //如果为file，则进入在线浏览，首先判断当前用户对此内容是否有Read权限
        var  url = ucUrl + 'contents/' + cid + '/attachments/imageUrls';
        $.get(url, function(data) {
              if(data){
              var appPath = window.app.rootName + "/";
              var totalCount = data.totalCount;
              var urls = data.urls;
              var attID = data.encoding.split("\\")[3];
              if(format == "tif" || format == "tiff"){
              var localuri = cid + "/" + attID + "/";;
              var baseURI = appPath + localuri;
              window.app.fileSystem.root.getDirectory(localuri,{create: false},
                                                      function(parent){
                                                      //直接发送本地地址
                                                      UCmobile.previewTIF(onSuccess, onFailure, baseURI,urls.length);
                                                      },
                                                      function(error){
                                                      //alert(error.code);
                                                      if(error.code == 1){
                                                      downloadTif(urls,cid,attID);
                                                      }
                                                      });
              }else if(format == "pdf" || format == "jpg" || format == "JPG" || format == "jpeg" || format == "png" || format == "PNG"){
              var localuri = cid + "/" + attID + "." + format;
              var fileuri = appPath + localuri;
              var serveruri = encodeURI(ucUrl + "contents/" + cid + "/attachments/download");
              //判断文件是否已缓存
              window.app.fileSystem.root.getFile(localuri,{create: false},
                                                 function(fileEntity){
                                                 //文件已存在
                                                 doPreview(fileEntity,format)
                                                 },
                                                 function(error){
                                                 //文件不存在
                                                 if(error.code = 1){
                                                 //alert(error.code);
                                                 downloadToPre(fileuri,serveruri,format);
                                                 } else{
                                                 showMessage('','此类型文档不支持在线浏览');
                                                 }
                                                 });
              }else{
              showMessage('','此类型文档不支持在线浏览');
              }
              }
              });
    }
}


function downloadTif(urls,cid,attID)
{
    var k=0;
    var t=5;
    var appPath = window.app.rootName + "/";
    if(urls.length > 5){
        t = 5;
    }else{
        t = urls.length
    }
    for(var i=0;i<urls.length;i++){
        var serveruri = encodeURI(ucUrl + urls[i]);
        var basePath = appPath + cid + "/" + attID + "/"
        var fileURL = basePath + i + ".tif";
        ucApp.showIndicator();
        var fileTransfer = new FileTransfer();

        fileTransfer.download(
                                serveruri,
                                fileURL,
                                function (entry) {
                              k++;
                              if(k == t){
                                      fileTransfer.abort();
                                      ucApp.hideIndicator();
                                      UCmobile.previewTIF(onSuccess, onFailure, basePath,t);
                              }
                              
                                },
                                function (error) {
                                    ucApp.hideIndicator();
//                                    showMessage('error','文件下载失败:' + error.source);
                                    return;
                                }
                            );
    }
}

function previewFirstAttachement(fileuri, cid, format, previewFlag) {
    //因为内容的附件可以任意的添加删除，可能第一个附件被删除后，原来的第二个附件变成了第一个附件。
    //故此处的缓存暂时没有意义，待日后手动清空缓存的功能实现后再放开。
    //window.resolveLocalFileSystemURL(
    //    fileuri,
    //    function (entry) {
    //        doPreview(entry, previewFlag);
    //    },
    //    function (error) {
            downloadToPre(fileuri, cid, format, previewFlag);
    //    }
    //);
}

function downloadToPre(fileURL, serveruri, format) {

    if (format == 'tif' || format == 'tiff') {
        showMessage('','此类型文档不支持在线浏览');
        return;
    }
    ucApp.showIndicator();
    var fileTransfer = new FileTransfer();

    fileTransfer.download(
        serveruri,
        fileURL,
        function (entry) {
            ucApp.hideIndicator();
            doPreview(entry, format);
        },
        function (error) {
            ucApp.hideIndicator();
            showMessage('error','文件下载失败:' + error.source);
            return;
        }
    );
}

function doPreview(entry, format) {
    if (format == 'pdf') {
        UCmobile.previewPDF(onSuccess, onFailure, entry.toURL(),format);
    } else if (format == 'tif' || format == 'tiff') {
        UCmobile.previewTIF(onSuccess, onFailure, entry.toURL(),format);
        
    } else if (format == 'jpg' || format == 'JPG' || format == 'jpeg' || format == 'JPEG' || format == 'png' || format == 'PNG') {
        UCmobile.previewIMG(onSuccess, onFailure, entry.toURL(),format);
    } else {}
}

function onSuccess(result) {
}
function onFailure(err) {
    showMessage('error',"在线浏览失败: " + err.source);
}

//点击rename
function renameContent(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_rename")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var cid = $$('#id'+index).val();

    //判断当前用户对此内容是否有update权限
    var  url = ucUrl + 'contents/' + cid + '/allowedActions/update';
    $.get(url, function(checkPremession) {
        if(checkPremession){
            var cName = "'"+$$('#name'+index).html()+"'";
            mainView.router.load({
                url:'tpl/rename.html',
                context: {
                    contentId : cid,
                    contentName : cName
                }
            });
        }else{
            showMessage('error','没有此文档的重命名权限');
        }
    });

}

//查询模板rename
function queryrenameContent(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_rename")){
        showMessage('error','没有此操作的权限');
        return;
    };
    
    var cid = $$('#queryid'+index).val();
    
    //判断当前用户对此内容是否有update权限
    var  url = ucUrl + 'contents/' + cid + '/allowedActions/update';
    $.get(url, function(checkPremession) {
          if(checkPremession){
          var cName = "'"+$$('#queryname'+index).html()+"'";
          mainView.router.load({
                               url:'tpl/rename.html',
                               context: {
                               contentId : cid,
                               contentName : cName
                               }
                               ,force:true
                               });
          }else{
          showMessage('error','没有此文档的重命名权限');
          }
          });
    
}

//page初始化_rename
ucApp.onPageInit('rename', function (page) {
    $$('#fullscreen_rename').on('click', function () {
        fullscreen('#fullscreen_rename');
    });

    $('#contentRenameForm').validate({
        rules: {
            newContentName: {
                required: true,
                maxlength: 50,
                invalidData: true
            }
        }
    });

    $$('#rename_modify').on('click', function () {
        if (!$("#contentRenameForm").valid()) {
            return;
        }
        var newName = $('#newContentName').val();
        //newName = encodeURI(newName);
        var cid = $('#contentId_rename').val();
        var data = $.param({
            'name': newName
        });
        $.put(ucUrl+'contents/' + cid + '/name?' + data, function() {
            var currentFolderId = storage.getItem('currentFolder');
            $('#search_input').attr('value','');
            getContentList(currentFolderId,'');
            showMessage('success','修改成功!');
            mainView.router.back({
                url: 'index.html'
                ,force:true
            })
        }).error(function(jqXHR, textStatus, errorThrown) {
            showMessage('error',jqXHR.getResponseHeader('code'));
        }).complete(function() {

        });
    });

    $$('#back_rename').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_rename');
    });

});

function getArrayToString(arr){
    if(arr!=null&&arr.length>0){
        var result="";
        $.each(arr, function(i,str){
            if (result==""){
                result = result+str;
            }else{
                result = result+","+str;
            }
        });
        return result;
    }else{
        return "";
    }
}

function getStringToArray(str){
    var resultArray = [];
    if (($.trim(str))==""){
        return null;
    }else{
        resultArray = str.split(",");
        return resultArray;
    }
}

var tempContentData = null;


//page初始化_contentDetail
ucApp.onPageInit('contentDetail', function (page) {
    $$('#fullscreen_contentDetail').on('click', function () {
        fullscreen('#fullscreen_contentDetail');
    });
    var cid = $('#contentId_contentDetail').val();

    var validateRule = {rules: {
        contentDetail_contentName: {
            required: true,
            maxlength: 50,
            invalidData: true
        },
        contentDetail_description: {
            maxlength: 200,
            invalidData: true
        }
    }};
    var validator = $('#contentDetailForm').validate(validateRule);

    //发请求获取内容扩展信息
    $.ajax({
        async: true,
        type: 'GET',
        url: ucUrl + 'contents/' + cid ,
        data: '',
        contentType: "application/json;utf-8"
    }).success(function (data) {

        //File类型的文档只能添加一个
//        if (data.contentTypeName==sysfilecontenttype){
//            $('#contentDetail_upload').find('a[name="addUpload"]').hide();
//            if(data.attachments.length){
//                $('#contentDetail_upload').find('button').hide();
//            }
//        }
               
       if(data.attachments.length){
           $('#contentDetail_upload').find('input').hide();
       }

        //判断是否可以删除附件
        if (!data.canUpdateProperty){
            $('#attachmentTable').find('a[action="delete"]').hide();
        }

        //判f断是否可以下载
        if (!data.canDownloadOrigin){
            $('#attachmentTable').find('a[action="download"]').hide();
        }


        //展示属性信息中的标签
        var facetValue="";
        if((data.facets!=null)&&(data.facets.length>0)){
            var fcs = data.facets;
            for(var m=0;m<fcs.length;m++){
                if(fcs[m].toLowerCase()=='versionable'){
                    facetValue="带版本控制的文件";
                }else if(fcs[m].toLowerCase()=='folderish'){
                    facetValue="目录";
                }else{

                }
            }
        }else{
            facetValue="普通文件";
        }
        $('#contentFacets').html(facetValue);

        validateRule = drawContentDetailPropsDiv(data,validateRule);
        $.extend(validator.settings, validateRule);
        tempContentData = data;
    }).error(function (jqXHR) {
        if (jqXHR.status == '401') {
            status401Error();
        } else {
            showMessage('error',jqXHR.getResponseHeader('code'));
        }
    });


    //$("#contentDetail_upload").append('<p><button name="file_upload0" type="button">选择文档</button><input type="hidden" name="input_upload0"/><label name="label_upload0"></label><a href="" name="addUpload">添加文档</a>&nbsp;&nbsp;<a href="" name="deleteUpload" hidden="hidden">删除文档</a></p>');
    $('#contentDetail_upload').find('a[name="addUpload"]').click(function(){
        var index = $('#contentDetail_upload').find('p').length;
        var newP = $(this).parent().clone(true);
        newP.find('a[name="deleteUpload"]').removeAttr("hidden");
        newP.find('button').attr('name','file_upload'+index);
        newP.find('label').attr('name','label_upload'+index);
        newP.find('input').attr('name','input_upload'+index);
        newP.find('label').html("");
        newP.find('input').attr("value","");
        $('#contentDetail_upload').append(newP);
    });

    $('#contentDetail_upload').find('a[name="deleteUpload"]').click(function(){
        $(this).parent().remove();
    });

    $('#contentDetail_upload').find('button').click(function(){
        var pObj = $(this).parent();
        fileChooser.open(
            function(uri) {
                var fname = decodeURI(uri.substr(uri.lastIndexOf('/')+1));
                pObj.find("input").val(uri);
                pObj.find("label").html(fname);
            }
        );
    });


    //下载附件
    $$('#attachmentTable').find('a').click(function() {
        var action = $(this).attr("action");
        var encoding = $(this).attr("encoding");
        var atname = $(this).attr("atname");
        var chooseAttObj = $(this);
        if (action=="delete"){
            $.each(tempContentData.attachments, function(key, atta) {
                if(atta.name==atname){
                    chooseAttObj.parent().parent().remove();
                    $('#contentDetail_upload').find('input').show();
                    atta.status = 2;
                }
            });
        }else if (action=="download"){
            ucApp.showIndicator();
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(ucUrl + "contents/" + cid + "/attachments/" + encoding+"?renditionType=0&attachmentName=&encoding="+atname);
            var fileURL = "/mnt/sdcard/"+atname;
            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    showMessage('success','下载成功!');
                    ucApp.hideIndicator();
                    //console.log("download complete: " + entry.toURL());
                },
                function(error) {
                    showMessage('error','下载失败:'+error.source);
                    ucApp.hideIndicator();
                    //console.log("download error source " + error.source);
                    //console.log("download error target " + error.target);
                    //console.log("upload error code" + error.code);
                }
            );
        }
    });

//    $$('#contentDetail_modify').on('click', function () {
//        if (!$("#contentDetailForm").valid()) {
//            return;
//        }
//
//        ucApp.showIndicator();
//        if($('#contentDetail_upload').find('p')&&$('#contentDetail_upload').find('p').length>0){
//            $('#contentDetail_upload').find('input').each(function(i){
//                if(i>0){
//                    if($(this).val()==''){
//                        $(this).parent().remove();
//                    }
//                }
//            });
//            var files = $('#contentDetail_upload').find('input');
//            if(files.length>1){
//                for(var i=0;i<files.length;i++){
//                    for(var j=(i+1);j<files.length;j++){
//                        var fileName1 = files[i].value.substring(files[i].value.lastIndexOf("\\")+1,files[i].value.length);
//                        var fileName2 = files[j].value.substring(files[j].value.lastIndexOf("\\")+1,files[j].value.length);
//                        if(fileName1==fileName2){
//                            showMessage('error','上传列表中存在重复的附件');
//                            ucApp.hideIndicator();
//                            return ;
//                        }
//                    }
//                }
//            }
//        }
//
//        var content = organizationDetailDocument(tempContentData);
//        var contentString = JSON.stringify(content);
//        $('#content_update_contentString').val(contentString);
//        //写入元数据
//        $.ajax({
//            type: "POST",
//            url: ucUrl + 'contents/'+cid+'/update/mobile',
//            data: {
//                'jsonContent': JSON.stringify(content)
//            }
//        }).success(function (data) {
//            //回传内容ID
//            //var contentId = data;
//
//            //开始写入流数据
//            var files = $('#contentDetail_upload').find('input');
//            if(ifHaveFiles(files)){
//                if(files.length>0){
//                    var uriArray = new Array();
//                    for(var i=0;i<files.length;i++){
//                        uriArray.push(files[i].value);
//                    }
//                    uploadMultiFiles("update",uriArray,cid,0,0,"","");
//                }
//            }else{
//                var currentFolderId = storage.getItem('currentFolder');
//                getContentList(currentFolderId,'');
//                showMessage('success','修改成功!');
//                mainView.router.back({
//                    url: 'index.html'
//                    ,force:true
//                });
//                ucApp.hideIndicator();
//            }
//
//            //ucApp.hideIndicator();
//        }).error(function (jqXHR) {
//            if (jqXHR.status == '401') {
//                status401Error();
//            } else {
//                showMessage('error',jqXHR.getResponseHeader('code'));
//            }
//            ucApp.hideIndicator();
//        });
//    });
                 
                 
     $$('#contentDetail_modify').on('click', function () {
        if (!$("#contentDetailForm").valid()) {
        return;
        }
        ucApp.showIndicator();
        
//        if($('#contentDetail_upload').find('p')&&$('#contentDetail_upload').find('p').length>0){
//        $('#contentDetail_upload').find('input:file').each(function(i){
//                                                           if(i>0){
//                                                           if($(this).val()==''){
//                                                           $(this).parent().remove();
//                                                           }
//                                                           }
//                                                           });
//        var files = $('#contentDetail_upload').find('input:file');
//        if(files.length>1){
//        for(var i=0;i<files.length;i++){
//        for(var j=(i+1);j<files.length;j++){
//        var fileName1 = files[i].value.substring(files[i].value.lastIndexOf("\\")+1,files[i].value.length);
//        var fileName2 = files[j].value.substring(files[j].value.lastIndexOf("\\")+1,files[j].value.length);
//        if(fileName1==fileName2){
//        ucApp.alert('上传重复附件');
//        ucApp.hideIndicator();
//        return ;
//        }
//        }
//        }
//        }
//        }
        
        var content = organizationDetailDocument(tempContentData);
        var contentString = JSON.stringify(content);
        $('#content_update_contentString').val(contentString);
        $('#contentDetailForm').ajaxSubmit({
               url : ucUrl + 'contents/' + cid+'?_method=PUT',
               type : 'POST',
               success : function(responseText, statusText) {
                   var currentFolderId = storage.getItem('currentFolder');
                   $('#search_input').attr('value','');
                   getContentList(currentFolderId,'');
                   showMessage('success','修改成功!');
                   ucApp.hideIndicator();
                   mainView.router.back({
                                        url: 'index.html'
                                        ,force:true
                                        })
               } ,
               error: function(jqXHR, textStatus, errorThrown) {
                   //showErrorMassage(jqXHR.getResponseHeader('code'));
                   showMessage('error',jqXHR.getResponseHeader('code'));
                   ucApp.hideIndicator();
               }
               });
        });
     

    $$('#back_contentDetail').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_contentDetail');
    });

});

//判断是否上传了附件
function ifHaveFiles(files){
    var result = false;
    if(files){
        if (files.length==0){
            result = false;
        }else if (files.length==1){
            if(files[0].value==""){
                result = false;
            }else{
                result = true;
            }
        }else{
            result = true;
        }
    }else{
        result = false;
    }
    return result;
}

//获取属性表单中所填数据，并组成JSON
function organizationDetailDocument(contentObj) {
    var contentData = contentObj;

    var description = $('#contentDetail_description').val();
    var name = $('#contentDetail_contentName').val();
    var documentType = $('#contentDetail_ctName').val();

    contentData.name = name;
    contentData.description = description;

    $('#contentDetail_propertyListDIV').find('div[class="row"]').each(function() {
        //var obj = $(this).find('label:first').next();
        var obj = $(this).find('input:eq(1)');
        var objType = $(this).find('input:hidden').val();
        var objFullName = $(this).find('input:hidden').attr('id');
        var objName = obj.attr('name');
        var objvalue = '';
        if (objType == 'BOOLEAN') {
            if (obj.attr('checked')) {
                objvalue = 'true';
            } else {
                objvalue = 'false';
            }
        } else {
            objvalue = obj.val();
        };

        $.each(contentData.properties, function(key, props) {
            if(props.fullName==objFullName){
                props.changed = true;
                props.value = objvalue;
            }
        })
    });
    return contentData;
};

function drawContentDetailPropsDiv(contentData, validateRule) {
    var propertyListDIV = $('#contentDetail_propertyListDIV');
    $.each(contentData.properties, function(key, props) {
        if (props&&props.visible) {
            var p = $('<div class="row"><input type="hidden" id="'+props.fullName+'" name="type" value="' + props.type + '"/></div>').appendTo(propertyListDIV);
            if (contentData.canUpdateProperty && props.required && (!props.readonly)) {
                p.append('<em>*</em>');
                validateRule.rules[props.name] = {
                    required: true
                };
            } else {
                p.append('<em>&nbsp;</em>');
            }

            if((!contentData.canUpdateProperty)||(props.readonly)){
                if(props.multiple){
                    p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" disabled="disabled" value="' + props.value + '" name="' + props.localName + '"/></div>');
                }else if(props.type.toUpperCase()=='BOOLEAN'){
                    if(props.value.toLowerCase()=='true'){
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="checkbox" disabled="disabled" checked="checked" name="' + props.localName + '"/></div>');
                    }else{
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="checkbox" disabled="disabled" name="' + props.localName + '"/></div>');
                    }
                }else{
                    p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" disabled="disabled" value="' + props.value + '" name="' + props.localName + '"/></div>');
                }
            }else{
                if (props.choices && props.choices != '') {
                    if (validateRule.rules[props.localName]) {
                        validateRule.rules[props.localName].maxlength = 100;
                    } else {
                        validateRule.rules[props.localName] = {
                            maxlength: 100
                        };
                    }
                    var choicesList = props.choices;

                    if (props.type == 'DATETIME') {
                        var resultList = [];
                        $(choicesList).each(function() {
                            resultList.push(toDate(this));
                        });
                        choicesList = resultList;
                    }
                    p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" value="' + props.value + '" name="' + props.localName + '"/><a href="#">选择约束值</a></div>');
                    p.find('a').click(function() {
                        if (props.choices) {
                            chosenPropObj = $(this).parent().find('input[type="text"]');
                            if (props.multiple){
                                callChoicePopup(props.choices,true);
                            }else{
                                callChoicePopup(props.choices,false);
                            }
                        }
                    });

                    if (props.type == 'INTEGER') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].digits = true;
                            validateRule.rules[props.name].min = -2147483648;
                            validateRule.rules[props.name].max = 2147483647;
                        } else {
                            validateRule.rules[props.localName] = {
                                digits: true,
                                min: 2147483648,
                                max: 2147483647
                            };
                        }
                    }
                    if (props.type == 'DATETIME') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].date = true;
                        } else {
                            validateRule.rules[props.localName] = {
                                date: true
                            };
                        }
                    }
                    if (props.type == 'FLOAT') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].validFloat = true;
                        } else {
                            validateRule.rules[props.localName] = {
                                validFloat: true
                            };
                        }
                    }

                } else {
                    if (props.type == 'STRING') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].maxlength = 100;
                        } else {
                            validateRule.rules[props.localName] = {
                                maxlength: 100
                            };
                        }
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" value="' + props.value + '" name="' + props.localName + '"/></div>');
                    }
                    if (props.type == 'BOOLEAN') {
                        if(props.value.toLowerCase()=='true'){
                            p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="checkbox" checked="checked" name="' + props.localName + '" value="1" style="min-width: 5px;"/></div>');
                        }else{
                            p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="checkbox" name="' + props.localName + '" value="1" style="min-width: 5px;"/></div>');
                        }
                    }
                    if (props.type == 'INTEGER') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].digits = true;
                        } else {
                            validateRule.rules[props.localName] = {
                                digits: true
                            };
                        }
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" value="' + props.value + '" name="' + props.localName + '"/></div>');
                    }
                    if (props.type == 'DATETIME') {
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="date" value="'+props.value+'" name="' + props.localName + '" value=""></div>');
                    }
                    if (props.type == 'FLOAT') {
                        if (validateRule.rules[props.localName]) {
                            validateRule.rules[props.localName].validFloat = true;
                        } else {
                            validateRule.rules[props.localName] = {
                                validFloat: true
                            };
                        }
                        p.append('<div class="col-20"><label for="' + props.localName + '">' + props.displayName + '</label></div><div class="col-80"><input type="text" value="' + props.value + '" name="' + props.localName + '"/></div>');
                    }
                }
            }
        }
    });
    return validateRule;
}

//点击Details
function getContentDetails(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_details")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var cid = $$('#id'+index).val();
    //发请求获取详情信息
    $.ajax({
        async: true,
        type: 'GET',
        url: ucUrl + 'contents/' + cid ,
        data: '',
        contentType: "application/json;utf-8"
    }).success(function (data) {
        mainView.router.load({
            url:'tpl/contentDetail.html',
            context: data
        });
    }).error(function (jqXHR) {
        if (jqXHR.status == '401') {
            status401Error();
        } else {
            showMessage('error',jqXHR.getResponseHeader('code'));
        }
    });
}

//page初始化_contentPermission
ucApp.onPageInit('contentPermission', function (page) {
    $$('#fullscreen_contentPermission').on('click', function () {
        fullscreen('#fullscreen_contentPermission');
    });

    //$('#contentPermissionForm').validate({
    //    rules: {
    //        contentName: {
    //            required: true,
    //            maxlength: 50,
    //            invalidData: true
    //        }
    //    }
    //});

    $$('#back_contentPermission').on('click', function () {
        mainView.router.back({
            url: 'index.html'
            ,force:true
        });
        syncHomeFullscreen('#fullscreen_contentPermission');
    });

});


//模板查询结果点击Details
function querygetContentDetails(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_details")){
        showMessage('error','没有此操作的权限');
        return;
    };
    
    var cid = $$('#queryid'+index).val();
    //发请求获取详情信息
    $.ajax({
           async: true,
           type: 'GET',
           url: ucUrl + 'contents/' + cid ,
           data: '',
           contentType: "application/json;utf-8"
           }).success(function (data) {
                      mainView.router.load({
                                           url:'tpl/contentDetail.html',
                                           context: data
                                           });
                      }).error(function (jqXHR) {
                               if (jqXHR.status == '401') {
                               status401Error();
                               } else {
                               showMessage('error',jqXHR.getResponseHeader('code'));
                               }
                               });
}



//点击Permissions
function getContentPermissions(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_details")){
        showMessage('error','没有此操作的权限');
        return;
    };

    var cid = $$('#id'+index).val();

    //发请求获取详情信息
    $.ajax({
        async: true,
        type: 'GET',
        url: ucUrl + 'contents/' + cid ,
        data: '',
        contentType: "application/json;utf-8"
    }).success(function (data) {
        mainView.router.load({
            url:'tpl/contentPermission.html',
            context: data
        });

    }).error(function (jqXHR) {
        if (jqXHR.status == '401') {
            status401Error();
        } else {
            showMessage('error',jqXHR.getResponseHeader('code'));
        }
    });
}

//模板查询点击Permissions
function querygetContentPermissions(index){
    //判断是否有功能点权限
    if (!checkAction("docMg_details")){
        showMessage('error','没有此操作的权限');
        return;
    };
    
    var cid = $$('#queryid'+index).val();
    
    //发请求获取详情信息
    $.ajax({
           async: true,
           type: 'GET',
           url: ucUrl + 'contents/' + cid ,
           data: '',
           contentType: "application/json;utf-8"
           }).success(function (data) {
                      mainView.router.load({
                                           url:'tpl/contentPermission.html',
                                           context: data
                                           });
                      
                      }).error(function (jqXHR) {
                               if (jqXHR.status == '401') {
                               status401Error();
                               } else {
                               showMessage('error',jqXHR.getResponseHeader('code'));
                               }
                               });
}

//被踢后跳转到登录页面
function status401Error() {
    ucApp.modal({
        title: '',
        text: '已登出，请重新登录！',
        buttons: [
            {
                text: '确定',
                onClick: function() {
                    window.location.href ='login.html?_=' + new Date().getTime();
                }
            }
        ]
    })
}

//根据传入的FolderId和查询的str来刷新内容列表
function getContentList(folderId, qName) {
    qName = $.trim(qName);
    $.ajax({
        async: true,
        type: 'GET',
        url: ucUrl + 'folderTree/' + folderId + '/children',
        data: {
            'queryName': qName
        },
        contentType: "application/json;utf-8"
    }).success(function (data) {
        $$('#itemList')[0].innerHTML = Template7.templates.listTemplate(data);

        //防止滑动点击第二个内容的按钮时，第一个页面已经存在，导致不触发请求
        $$('.swipeout').on('open', function () {
            mainView.router.back({
                url: 'index.html',
                force:true
            });
        });

        //在后退上一级或回到根目录时，若剪切板有数据，则后退到的目录隐藏全部的勾选框
        var ids = storage.getItem('clipboard');
        if(ids.length > 0){
            $$('.label-checkbox').css('display', 'none');
        }else{
            //防止勾选后直接跳转，导致工具栏任然存在的问题。调整工具栏的显示。
            $$('#repository-lr').removeClass('toolbar-item-display-none');
            $$('#toolbar-buttons').addClass('toolbar-item-display-none');
            $$('#toolbar-buttons-paste').addClass('toolbar-item-display-none');
        };

        ucApp.attachInfiniteScroll($$('.infinite-scroll'));
    }).error(function (jqXHR) {
        if (jqXHR.status == '401') {
            status401Error();
        } else {
            showMessage('error',jqXHR.getResponseHeader('code'));
        }
    });
}

//库页面的后退按钮的显示和隐藏
function showHideReturnBack() {
    mainView.router.back({
        url: 'index.html'
        ,force:true
    });
    if (storage.getItem('currentFolder') == root) {
        $$('#returnback').css('display', 'none');
    } else {
        $$('#returnback').css('display', '');
    }
}


//function getErrorMsgByErrorCode(tempMsg,errorCode,fileName){
//    var result = tempMsg;
//    if (result[errorCode]){
//        result[errorCode]=result[errorCode]+","+fileName;
//    }else{
//        result[errorCode] = fileName;
//    }
//}
//
//function getErrorMsg(tempMsg,errorMsg,fileName){
//    var result = tempMsg;
//    if (errorMsg.indexOf('02-content-2001')>0){
//        //return '文档中已经存在相同的附件:'+fileName;
//    }else if(errorMsg.indexOf('06-content-2001')>0){
//        //return '不能向该文档添加附件';
//    }else if(errorMsg.indexOf('01-content-2003')>0){
//        //return '文档中不存在附件';
//    }else if(errorMsg.indexOf('06-content-2002')>0){
//        //return '存储流失败';
//    }else if(errorMsg.indexOf('02-content-2004')>0){
//        //return '存储流失败';
//    }else {
//        return "上传附件失败";
//    }
//}


//展示讯息
function showMessage(type,str){
    var t = "";
    var text = "";
    if (type=="error"){
        t = "错误";
        text = msg.erorrCode[str] ? msg.erorrCode[str] : str;
    }else if (type=="success"){
        t = "";
        text = str;
    }else {
        t = "";
        text = str;
    }
    ucApp.modal({
        title: t,
        text: text,
        buttons: [
            {
                text: '确定',
                onClick: function() {
                }
            }
        ]
    })
}


document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
    ucApp.closeModal();
    ucApp.modal({
        title:  '',
        text: '是否退出应用?',
        buttons: [
            {
                text: '确定',
                onClick: function() {
                    $['delete'](ucUrl + 'authentications/users/' + storage.getItem('userId'), function () {
                        UCmobile.logout.closeApp(null,null);
                    });
                }
            },
            {
                text: '取消',
                onClick: function() {

                }
            }
        ]
    })

}