// page/post/post-detail/post-detail.js
var postData = require("../../../data/posts-data.js");
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
        var postid = options.id;
        this.setData({ post_id: postid });//利用data传递postid
        var postdatas = postData.postlist[postid];
        this.setData({ postdatas });

        //post_collected = {1:"false",2:"true"};

        var collectStatus = wx.getStorageSync("post_Collected");
        if (collectStatus[postid]) {
            var postcollected = collectStatus[postid];//collectStatus是数组还是对象
            this.setData({ collected: postcollected });
        } else {
            var collectStatus = {}
            collectStatus[postid] = false;
            wx.setStorageSync("post_Collected", collectStatus);
        }
    },
    onCollectionTap: function (events) {


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