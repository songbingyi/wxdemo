// page/post/post-detail/post-detail.js
var postData = require("../../../data/posts-data.js");
var app = getApp()
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
        if (app.globalData.g_musicStatus){
            this.setData({ musicStatus: true })
        }//如果全局变量为真 设置音乐监听变量为真


        //post_collected = {1:"false",2:"true"};

        var collectStatus = wx.getStorageSync("post_Collected");
        if (collectStatus) {
            var postcollected = collectStatus[postid];//collectStatus是数组还是对象。更新：直接通过属性访问加引号，如a["b"]可以访问 a={b:"1"};也可以通过变量名访问属性，如：var x = "b", a[x] //1。
            this.setData({ collected: postcollected });
        } else {
            var collectStatus = {}
            collectStatus[postid] = false;
            wx.setStorageSync("post_Collected", collectStatus);
        }
        var that = this;
        wx.onBackgroundAudioPlay(function(){
            that.setData({musicStatus:true})
        })
        wx.onBackgroundAudioPause(function(){
            that.setData({musicStatus:false});
        })

        //计数器开始

        var counts = wx.getStorageSync('counts')
        counts[postid]++;
        wx.setStorageSync('counts', counts);
       
        
    },
    onCollectionTap: function (events) {
        this.onCollectionTapSync();//使用同步方法
    },
    onCollectionTapAsy: function (events) {
        var that = this;
        wx.getStorage({
            key: 'post_Collected',
            success: function (res) {
                var collectStatus = res.data;
                var postid = that.data.post_id;
                var postcollected = collectStatus[postid];
                postcollected = !postcollected;
                collectStatus[postid] = postcollected;
                that.setData({ collected: postcollected });
                wx.setStorageSync("post_Collected", collectStatus);
                that.showToast(postcollected);
            },
        })
    },//异步方法
    onCollectionTapSync: function (events) {
        var collectStatus = wx.getStorageSync("post_Collected");
        var postid = this.data.post_id;
        var postcollected = collectStatus[postid];
        postcollected = !postcollected;
        collectStatus[postid] = postcollected;
        this.setData({ collected: postcollected });
        wx.setStorageSync("post_Collected", collectStatus);
        this.showToast(postcollected);
    },//同步方法

    showToast: function (postcollected) {
        wx.showToast({
            title: postcollected ? '收藏成功' : '取消收藏',
            duration: 800,
        })
    },
    onShareTap: function (event) {
        var shareList = ["分享到微博", "分享到微信", "分享到QQ"]
        wx.showActionSheet({
            itemList: shareList,
            itemColor: "#405f80",
            success: function (res) {
                wx.showModal({
                    title: '用户' + shareList[res.tapIndex],
                    content: shareList[res.tapIndex] + '功能暂时不可用',
                })

            }
        })
    },
    // showModal: function (collectStatus, postcollected) {
    //     var that = this;
    //     wx.showModal({
    //         title: '收藏',
    //         content: postcollected?'是否收藏该文章':'取消收藏该文章?',
    //         confirmText: '确认',
    //         cancelText: '取消',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 that.setData({ collected: postcollected });
    //                 wx.setStorageSync("post_Collected", collectStatus);
    //             }
    //         }
    //     })
    // },
    onMusicTap: function () {
        var postid = this.data.post_id;
        var musicDatas = postData.postlist[postid].musicData;
        console.log(musicDatas);
        var musicData = this.data.musicStatus;
        musicData = !musicData;
        if (musicData) {
            this.setData({ musicStatus: musicData });
            wx.playBackgroundAudio({
                coverImgUrl: musicDatas.coverImgUrl,
                dataUrl: musicDatas.src,
                title: musicDatas.title
            });
            app.globalData.g_musicStatus = true;//同时设置全局变量为真
        } else {
            this.setData({ musicStatus: musicData });
            wx.pauseBackgroundAudio();
        }
    },//控制音乐播放
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