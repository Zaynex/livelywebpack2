/**
 * Created by Zefei Guo on 2015/5/4.
 */
const weixinConfig = function() {
    wx.config({
        debug: false,
        appId: _wx_auth.appId,
        timestamp: _wx_auth.timestamp,
        nonceStr: _wx_auth.nonceStr,
        signature: _wx_auth.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]
    });
    wx.ready(function () {
        var wxInfo = {
            title: '有道云笔记帮你收藏精彩内容！', // 分享标题
            desc: '互联网各大主流APP中的内容，均可一键保存至有道云笔记中，方便随时查看和编辑。',
            link: 'http://note.youdao.com/collect?type=1&keyfrom=wechat', // 分享链接
            imgUrl: 'https://shared-https.ydstatic.com/market/logo/300.png'
        };
        wx.onMenuShareTimeline({
            title: wxInfo.title, // 分享标题
            desc: wxInfo.desc, // 分享描述
            link: wxInfo.link, // 分享链接
            imgUrl: wxInfo.imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });


        wx.onMenuShareAppMessage({
            title: wxInfo.title, // 分享标题
            desc: wxInfo.desc, // 分享描述
            link: wxInfo.link, // 分享链接
            imgUrl: wxInfo.imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });

        wx.onMenuShareWeibo({
            title: wxInfo.title, // 分享标题
            desc: wxInfo.desc, // 分享描述
            link: 'http://'+ window.location.host +'/collect/?keyfrom=weibo&type=1', // 分享链接
            imgUrl: wxInfo.imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });

        wx.onMenuShareQQ({
            title: wxInfo.title, // 分享标题
            desc: wxInfo.desc, // 分享描述
            link: 'http://'+ window.location.host +'/mobile/?type=1', // 分享链接
            imgUrl: wxInfo.imgUrl, // 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
    });
}
export default weixinConfig;