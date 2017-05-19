import insideTips from './default';
import weixinConfig from './wxConfig.js';
var _$ = function(node){
    return document.querySelector(node);
};
var _$$ = function(nodes){
    return document.querySelectorAll(nodes);
};
var trlUrl,
    iMinZindex = 2,
    $matrix = _$('.matrix'),
    baseGifUrl = './assets/imgs/mp4/',
    clickKeyfrom = getQueryStrings() && getQueryStrings().keyfrom || 'wechat',
    Sporting = false,
    isAndroid = !!navigator.userAgent.match(/android/ig),
    ios_scheme = 'youdaonote://',
    android_scheme = 'ynote://',
    iosLoadUrl = 'https://itunes.apple.com/cn/app/you-dao-yun-bi-ji-you-dao/id450748070',
    androidUrl = 'http://codown.youdao.com/note/youdaonote_union52.apk',
    isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
    $video =  _$(".playSrc"),
    type = (getQueryStrings() && getQueryStrings().type) || '1';
/**
 * 根据不同的url初始化显示中间的图片
 * 下方的gif图
 * 下方操作提示
 */
init();   
function init(){
    var imglist = "",
        gifSource = new Image();

    if(clickKeyfrom) {
        insideTips[clickKeyfrom].url = 'assets/imgs/small/more.png';
        insideTips.more.url = 'assets/imgs/big/' + clickKeyfrom + '.png';
        _$('.keyfrom_').innerHTML = insideTips[clickKeyfrom] && insideTips[clickKeyfrom].content;
        _$('.vertical-second').innerHTML = insideTips[clickKeyfrom] && insideTips[clickKeyfrom].second;
        _$('.vertical-third').innerHTML = insideTips[clickKeyfrom] && insideTips[clickKeyfrom].third;
    }
    for(let j in insideTips){
        imglist += '<li  style="postion:absolute"><img src="' + insideTips[j]['url'] + '"></li>';
    }
    $matrix.innerHTML = imglist;
    bigImg($matrix.children[4]);

    (isAndroid || type ==='0') && ($video.poster = "assets/imgs/android-video.jpg");
    $video.src = baseGifUrl + clickKeyfrom + '.mp4';
    var img = new Image();
    img.src = _$(".bg").src;
    img.onload = function(){
        _$('.bg').classList.add('loaded');
    }
    //阻止滚轮事件
    document.body.onmousewheel = function(){
        return false;
    }
    weixinConfig();
}

/**
 * 点击切换九宫格等交互操作
 */
afterInit();
function afterInit(){
    var aLi = _$$('li'),
        aPos = [],
        once, 
        lastAim,
        lastNode,
        checkCenterLeft = aLi[4].offsetLeft,
        checkCenterTop = aLi[4].offsetTop,
        startY,
        $entry = _$('#entry'),
        $try = _$('.btn-try'),
        iTarget = _$('#second-show').offsetTop;

    for(let i = 0;i < aLi.length; i++) {
        aPos[i] = {left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }
    for(let j = 0; j <aLi.length; j++) {
        aLi[j].style.left = aPos[j].left + 'px';
        aLi[j].style.top = aPos[j].top + 'px';
        aLi[j].style.position = 'absolute';
        aLi[j].style.zIndex = 1;
    }

    function startup(e) {
        if(Sporting){
            return false;
        }
        if(e && !e.target.src) {
            return false;
        }
        if((checkCenter(e.target.parentNode))){
            gotoNode();
            return false;
        }
        clearChickedStyles();
        e.target.src = changeImg(e.target.src, 'small', 'big');
        var clickImgSrc = e.target.src.substring(e.target.src.indexOf('big/') + 4);      
        clickKeyfrom = clickImgSrc.split('.png') && clickImgSrc.split('.png')[0];
        analyze(clickKeyfrom);

        // change words & video
        _$('.vertical-second').innerHTML = clickKeyfrom && insideTips[clickKeyfrom] && insideTips[clickKeyfrom].second;
        _$('.vertical-third').innerHTML = clickKeyfrom && insideTips[clickKeyfrom] && insideTips[clickKeyfrom].third;
        _$('.keyfrom_').innerHTML = clickKeyfrom && insideTips[clickKeyfrom] && insideTips[clickKeyfrom].content;
        $video.src = baseGifUrl + clickKeyfrom + '.mp4';

        startMove(e.target.parentNode, aPos[4]);
        if(!once) {
            startMove(findImg(), {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop})
            once = true;
        }else {
            lastAim.firstChild.src = changeImg(lastAim.firstChild.src, 'big', 'small');
            startMove(lastAim, {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop});
        }
        lastAim = e.target.parentNode;
        bigImg(e.target.parentNode);
        gotoNode();
        Sporting = true;
    }

    function clearChickedStyles(){
        for(var i = 0; i < aLi.length; i++) {
            aLi[i].classList.remove('scale-img');
            aLi[i].classList.remove('shadow-img');
        }
    }
    function findImg(){
        aLi[4].firstChild.src = changeImg(aLi[4].firstChild.src, 'big', 'small');
        return aLi[4];
    }
    
    function gotoNode(){
        _$("#second-show").classList.add('up-to-top');
        _$("#second-show").style.transform = 'translateY(-'+ iTarget +'px)';
        _$("#second-show").style.webkitTransform = 'translateY(-'+ iTarget +'px)';
        setTimeout(function(){!isAndroid && type!== '0' && $video.play()}, 100);
    }

    function checkCenter(node){
        return parseInt(node.style.left, 10) === checkCenterLeft && parseInt(node.style.top, 10) === checkCenterTop;
    }
    

    function downLoad(){
        var  redirectUrl = 'http://note.youdao.com/collect/index.html',
            android_yingyongbao = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.note&ckey=CK1362580791055';
        if(type === '1'){
            if(isAndroid) {
                isWeixin ? holdApp(android_scheme, android_yingyongbao, redirectUrl) : holdApp(android_scheme, androidUrl, redirectUrl);
            } else {
                holdApp(ios_scheme, iosLoadUrl, redirectUrl);                
            }
        } else if(type === '0'){
            if(clickKeyfrom !== 'wechat') {
                redirectUrl = insideTips && insideTips[clickKeyfrom] && insideTips[clickKeyfrom].link; 
                window.location = redirectUrl + '?time=' + ((new Date()).getTime());
            } else {
                var wechatScheme = 'weixin://',
                    wechatLoad = 'http://weixin.qq.com/cgi-bin/readtemplate?t=w_down';
                holdApp(wechatScheme, wechatLoad, redirectUrl);
            }
        }
    }

    function holdApp(scheme, loadUrl, successUrl, onFail, onSuccess){
         var last = Date.now(),
                doc = window.document,
                ifr = doc.createElement('iframe');
                //创建一个隐藏的iframe
        ifr.src = scheme;
        ifr.style.cssText = 'display:none;';
        doc.body.appendChild(ifr);
        setTimeout(function() {
            doc.body.removeChild(ifr);
            //setTimeout回小于2000一般为唤起失败 
            if (Date.now() - last < 2000) {
                if (typeof onFail == 'function') {
                    onFail();
                } else {
                    window.location = loadUrl;
                }
            } else {
                if (typeof onSuccess == 'function') {
                    onSuccess();
                } else {
                    window.location = successUrl
                }
            }
        }, 1000);
    }


    function recordLocation(e){
        e.preventDefault; 
        startY = e.touches[0].pageY;
        type === '1' && !isAndroid && $video.play();
    }
    
    function recordMove(e) {
        e.preventDefault();
        var moveEndY = e.changedTouches[0].pageY;
        var Y = moveEndY - startY;
        
        if(Y > 0) {
            _$("#second-show").classList.remove('up-to-top')
            _$("#second-show").style.transform = 'none';
            _$("#second-show").style.webkitTransform = 'none';
            return false;
        }
        else if(Y < 0 ) {
            _$("#second-show").classList.add('up-to-top');
            _$("#second-show").style.transform = 'translateY(-'+ iTarget +'px)';
            _$("#second-show").style.webkitTransform = 'translateY(-'+ iTarget +'px)';
            setTimeout(function(){
               type === '1' && !isAndroid &&  $video.play(); 
            }, 500);
        } else {
            return false;
        }
    }
    function recordTouch(e) {
        e.preventDefault();
        startup(e);
    }
    
    $matrix.addEventListener('touchend',recordTouch, false);

    $entry.addEventListener('touchstart', recordLocation, false);
    $entry.addEventListener('touchmove', recordMove, false);

    $try.addEventListener('touchend', downLoad, false);    
    $video.addEventListener('x5videoenterfullscreen', function(){
        $video.play();
    }, false)
    $video.addEventListener('touchend', function(){ if(isAndroid || type === '0') $video.play();}, false);
}



function bigImg(node){
    node.style.zIndex = iMinZindex++;    
    node.classList.add('scale-img');
    node.classList.add('shadow-img');
}


function changeImg(str, reg, newreg){
    return str && str.replace(reg, newreg);
}


/**
 * 阻止IOS微信双击屏幕上滑
 */
(function()
{
    var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
    var iLastTouch = null;                                //缓存上一次tap的时间
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
    {
        document.body.addEventListener('touchend', function(event)
        {
            var iNow = new Date()
                .getTime();
            iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
            var delta = iNow - iLastTouch;
            if (delta < 500 && delta > 0)
            {
                event.preventDefault();
                return false;
            }
            iLastTouch = iNow;
        }, false);
    }

})();


/**
 * 
 * 通用函数 
 */

function analyze(cKeyfrom) {
    if (cKeyfrom) {
        window._hmt.push(['_trackEvent', cKeyfrom, '-cKeyfrom-' + cKeyfrom]);
    } else {
        window._hmt.push(['__trackEvent', 'default', '-cKeyfrom-wechat']);
    }
}
function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, json, fn)
{   
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;     //判断是否在运动
        for(var attr in json)
        {
            var iCur=0;
            
            if(attr=='opacity')
            {
                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                iCur=parseInt(getStyle(obj, attr));
            }
            
            //2.速度
            var iSpeed=(json[attr]-iCur)/5;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            
            //3.判断是运动完毕
            if(iCur!=json[attr])
            {
                bStop=false;
            }
            
            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else 
            {
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }
        
        if(bStop)
        {
            clearInterval(obj.timer);
            Sporting = false;
            if(fn)
            {
                fn();
            }
        }
    }, 30);
}

function getQueryStrings(){
    var qs = (window.location.href.search.length > 0 ?  location.search.substring(1) : ""),
        params = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for(i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length) {
            params[name] = value;
        }
    }
    return params;
}