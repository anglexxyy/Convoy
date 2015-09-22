//初始化F7
var loginApp = new Framework7({
    modalTitle: '易存文档管理系统'
});

var $$ = Dom7;

//全局ajax请求的IP端口地址配置
var ucUrl = '';

//会话级的存储 - sessionStorage
var storage = window.sessionStorage;

var storedUserId = storage.getItem('userId');
if(storedUserId){
    $$('#login_userId').val(storedUserId);
}

//$$('#login_userId').focus();
$$('#login_password').val('');

////登录框响应回车事件
document.onkeydown = function (e) {
    var keycode = document.all ? event.keyCode : e.which;
    if (keycode == 13 && document.activeElement.id == "login_password") {
        $$('#login_login').click();
    }
};

$$('#login_login').on('click', function () {
    tips();
    var userId = $$('#login_userId').val();
    var password = $$('#login_password').val();
    if (!userId) {
        tips('请输入用户名！');
        $$('#login_userId').focus();
        return false;
    }
    if (!password) {
        tips('请输入用户密码！');
        $$('#login_password').focus();
        return false;
    }

    tips('登录中！');

    login(userId, password);
});

function tips(html) {
    var $t = $$('#confirm');
    if (html) $t.show().html(html);
    else $t.show().html('').hide();
}

function login(userId, password) {
    loginApp.showIndicator();
    $.ajax({
        async: true,
        type: 'POST',
        url: ucUrl + 'authentications',
        data: {
            'userId': userId,
            'password': password,
            'locale': 'zh-cn'
        }
    }).success(function (data) {
        tips(userId + ',欢迎回来，正在进入系统！');
        storage.setItem('userId', userId);

        //获取用户信息
        $.get(ucUrl + 'users/' + userId, function (data) {
            var user = data;

            //存储登录用户信息
            storage.setItem('userInfo', JSON.stringify(user));
            storage.setItem('currentFolder', 'nko-ucontent-root');
            storage.setItem('isLogin', 'Y');
            storage.setItem('clipboard', '');
            storage.setItem('clipboardMethod', '');

            //判断用户是否admin
            $.get(ucUrl + 'dmactions/isInAdminGroup/' + userId, function(isAdminData) {
                storage.setItem('isAdmin', isAdminData);

                //获取用户的功能点信息
                $.get(ucUrl + 'dmactions/' + userId, function(actionsData) {
                    storage.setItem('actions', actionsData);

                    window.location.href = "index.html";
                }).error(function(jqXHR) {

                });

            }).error(function(jqXHR) {

            });

        }).error(function (jqXHR) {

        });
        loginApp.hideIndicator();
    }).error(function (jqXHR) {
        var code = jqXHR.getResponseHeader('code');
        if ('user_already_login' == code) {
            loginApp.modal({
                title:  '错误！',
                text: '用户' + userId + '已经登录,是否要强制该用户下线?',
                buttons: [
                    {
                        text: '确定',
                        onClick: function() {
                            $['delete'](ucUrl + 'authentications/users/' + userId, function () {
                                //$$('#login_login').click();
                                loginAgain(userId,password);
                            });
                        }
                    },
                    {
                        text: '取消',
                        onClick: function() {
                            tips('用户已登录');
                            loginApp.hideIndicator();
                        }
                    }
                ]
            })
        } else {
            showMessage('error',code);
            loginApp.hideIndicator();
        }
    });
}

function loginAgain(userId, password){
    $.ajax({
        async: true,
        type: 'POST',
        url: ucUrl + 'authentications',
        data: {
            'userId': userId,
            'password': password,
            'locale': 'zh-cn'
        }
    }).success(function (data) {
        tips(userId + ',欢迎回来，正在进入系统！');
        storage.setItem('userId', userId);

        //获取用户信息
        $.get(ucUrl + 'users/' + userId, function (data) {
            var user = data;

            //存储登录用户信息
            storage.setItem('userInfo', JSON.stringify(user));
            storage.setItem('currentFolder', 'nko-ucontent-root');
            storage.setItem('isLogin', 'Y');
            storage.setItem('clipboard', '');
            storage.setItem('clipboardMethod', '');

            //判断用户是否admin
            $.get(ucUrl + 'dmactions/isInAdminGroup/' + userId, function(isAdminData) {
                storage.setItem('isAdmin', isAdminData);

                //获取用户的功能点信息
                $.get(ucUrl + 'dmactions/' + userId, function(actionsData) {
                    storage.setItem('actions', actionsData);

                    window.location.href = "index.html";
                }).error(function(jqXHR) {

                });

            }).error(function(jqXHR) {

            });

        }).error(function (jqXHR) {

        });
        loginApp.hideIndicator();
    }).error(function (jqXHR) {

    });
}



function disabledLogin() {
    $$('#login_login').addClass('ui-state-disabled').prop('disabled', true);
}

function enabledLogin() {
    $$('#login_login').removeClass('ui-state-disabled').prop('disabled', false);
}


// 读取配置文件的服务配置
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    var configURI = cordova.file.applicationDirectory + "serverIP.config";
    window.resolveLocalFileSystemURI(configURI, readConfig, onError);
}

function readConfig(fileEntry){
    fileEntry.file(gotFileRead, fail);
}

function gotFileRead(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        ucUrl = evt.target.result;
    };
    reader.readAsText(file);
}

function onError(error){
    console.log(error);
}

function fail(error){
    console.log(error);
}

//弹出配置界面
function onConfigServer() {
    loginApp.modal({
                title:  '',
                text: '<div><input type="text" id="serverIP" value='+ucUrl+'></div>',
                buttons: [
                          {
                          text: '确定',
                          onClick: function() {
                          var ip = $$('#serverIP').val();
                          WriteIPConfig(ip);
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

function WriteIPConfig(){
    var configURI = cordova.file.applicationDirectory + "serverIP.config";
    window.resolveLocalFileSystemURI(configURI, writeConfig, onError);
}

function writeConfig(fileEntry){
    fileEntry.createWriter(gotFileWriter, fail);
}
function onError(error){}

function gotFileWriter(writer) {
    var userText = $('#serverIP').val();
    writer.seek(writer.length);
    writer.write(userText);
    writer.onwriteend = function(evt){
        ucUrl = userText;
    }
}

function fail(error){
}



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
    loginApp.modal({
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