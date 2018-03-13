var postData = require("../../data/posts-data.js");
//只能用相对路径

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var content = postData.postlist;
        this.setData({ content });
        
    },
    ontap: function (event) {
        var postid = event.currentTarget.dataset.postid;//获取wxml里用DATA-XXX设置的属性名
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postid,
        });
        var content = postData.postlist;


    },
    onswipertap: function (event) {
        var postid = event.target.dataset.postid;
         wx.navigateTo({
             url: 'post-detail/post-detail?id='+postid,
         })//target指的是当前点击的组件 currentTarget指的是事件捕获的组件
        //target指的是image currentTarget指的是swiper
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //计数器开始 POST页面onShow时判断 若存在counts数组，就加载。如果不存在，创建一个counts数组，值都为0，并存在缓存里。
        var counts = wx.getStorageSync('counts');
        var content = postData.postlist;
        if (counts){
        for (var i = 0; i < content.length; i++) {
            content[i].view_num = wx.getStorageSync('counts')[i];
        }
        this.setData({ content });}else{
            var counts = [];
            for (var i = 0; i < postData.postlist.length; i++) {
                counts[i] = 0;
            }
            wx.setStorageSync('counts', counts);
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})