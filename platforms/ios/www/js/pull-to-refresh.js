// 下拉刷新页面
var ptrContent = $$('.pull-to-refresh-content');

// 添加'refresh'监听器
ptrContent.on('refresh', function (e) {

    var currentFolderId = window.sessionStorage.getItem('currentFolder');
    getContentList(currentFolderId,'');

    // 加载完毕需要重置
    ucApp.pullToRefreshDone();
});