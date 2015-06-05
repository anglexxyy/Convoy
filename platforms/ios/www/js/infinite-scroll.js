// 加载flag
var loading = false;
// 上次加载的序号
var lastIndex = $$(".swipeout").length;
// 最多可加载的条目
var maxItems = 999;
// 每次加载添加多少条目
var itemsPerLoad = 10;

// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function () {
    $$('.infinite-scroll-preloader')[0].style.display = 'block';/*每次滚动时，将默认隐藏的css放开*/

    // 如果正在加载，则退出
    if (loading) return;

    // 设置flag
    loading = true;

    var searchStr = $$('#search_input').val();

    var currentFolderId = window.sessionStorage.getItem('currentFolder');
    appendNextPageContentList(currentFolderId, searchStr);

});


function appendNextPageContentList(folderId, qName) {
    // 重置加载flag
    loading = false;

    if (lastIndex >= maxItems) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        ucApp.detachInfiniteScroll($$('.infinite-scroll'));
        // 删除加载提示符
        //$$('.infinite-scroll-preloader').remove();
        $$('.infinite-scroll-preloader .preloader').remove();
        $$('.infinite-scroll-preloader')[0].innerHTML = '已达到加载数量的上限';
        return;
    }

    //alert(lastIndex);
    var pageSize=10;
    if (lastIndex==0){
        pageSize=20;
    }else{
        pageSize=lastIndex+10;
        pageSize=(Math.ceil(pageSize/10))*10;
    }
    
    ucApp.showIndicator();

    qName = $.trim(qName);
    $.ajax({
        async: true,
        type: 'GET',
        url: ucUrl + 'folderTree/' + folderId + '/children',
        data: {
            'pageSize': pageSize,
            'queryName': qName
        },
        contentType: "application/json;utf-8"
    }).success(function (data) {
        // 将获取的新数据append到原来的数据后面
        //$$('#itemList').empty();
        //$$('#itemList').append(Template7.templates.listTemplate(data));
        $$('#itemList')[0].innerHTML = Template7.templates.listTemplate(data);

        // 更新最后加载的序号
        lastIndex = $$(".swipeout").length;

        $.ajax({
            async: true,
            type: 'GET',
            url: ucUrl + 'folderTree/' + folderId + '/children',
            data: {
                'pageSize': 10000,
                'queryName': qName
            },
            contentType: "application/json;utf-8"
        }).success(function (countData) {
            if(countData.records<=lastIndex){
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                ucApp.detachInfiniteScroll($$('.infinite-scroll'));
                // 删除加载提示符
                //$$('.infinite-scroll-preloader').remove();
                $$('.infinite-scroll-preloader .preloader').remove();
                $$('.infinite-scroll-preloader')[0].innerHTML = '已加载全部数据';
            }else{
                ucApp.attachInfiniteScroll($$('.infinite-scroll'));
            }
                   ucApp.hideIndicator();
        }).error(function (jqXHR) {
                 ucApp.hideIndicator();
        });


        //防止滑动点击第二个内容的按钮时，第一个页面已经存在，导致不触发请求
        $$('.swipeout').on('open', function () {
            mainView.router.back({
                url: 'index.html',
                force: true
            });
        });

        //在后退上一级或回到根目录时，若剪切板有数据，则后退到的目录隐藏全部的勾选框
        var ids = storage.getItem('clipboard');
        if (ids.length > 0) {
            $$('.label-checkbox').css('display', 'none');
        } else {
            //防止勾选后直接跳转，导致工具栏任然存在的问题。调整工具栏的显示。
            $$('#repository-lr').removeClass('toolbar-item-display-none');
            $$('#toolbar-buttons').addClass('toolbar-item-display-none');
            $$('#toolbar-buttons-paste').addClass('toolbar-item-display-none');
        };
    }).error(function (jqXHR) {
        if (jqXHR.status == '401') {
            status401Error();
        } else {
            var code = jqXHR.getResponseHeader('code');
            showMessage('error',"在线浏览失败: " +code);
        }
             ucApp.hideIndicator();
    });
}
