//初始化F7
var loginApp = new Framework7({
    modalTitle: '易存文档管理系统'
});

var $$ = Dom7;

//全局ajax请求的IP端口地址配置
//var ucUrl = 'http://192.168.1.116:8080/dm/';
var ucUrl = 'http://192.168.1.75:8080/ucontent_dm/';
//var ucUrl = 'http://221.234.47.116:8028/ucontent_dm/';

//会话级的存储 - sessionStorage
var storage = window.sessionStorage;

var storedUserId = storage.getItem('userId');
if(storedUserId){
    $$('#login_userId').val(storedUserId);
}

$$('#login_userId').focus();
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

//展示错误代码讯息
//function showErrorMessage(code){
//    var message = msg.erorrCode[code] ? msg.erorrCode[code] : code;
//    loginApp.alert(message, '错误！');
//}

function test(){
//    alert("test");
    loginApp.showIndicator();
    function onSuccess(su){
        loginApp.hideIndicator();
    };
    function onFailure(error){
        loginApp.hideIndicator();
    };
    UCmobile.previewPDF(onSuccess,onFailure, "http://lskjdfkls.com","jpg");
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