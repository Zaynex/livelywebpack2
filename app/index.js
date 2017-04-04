import './main.scss';
import generateText from './sub';
import moment from 'moment';
// import _ from 'lodash';
/*
 * 引入jquery plugin 有两种方法
 * 第一种把jQuery直接作成一个全局变量 这样在每个脚本中都可以直接使用
 * $,jQuery,window.jQuery这几个变量 配置在webpack.config.js中可以看到
 * 使用了 webpack.ProvidePlugin
 * 第二种方法使用imports-loader,这个插件会给引入的文件前面自动插入一个require,
 * 这里我就把jQuery这个变量插到了plugin.js的最前面
 * 也可以在config.js中module.loaders里面配置
*/

//第一种方法 请看webpack.config.js 使用第一种时候可以完全注释掉第二种

//2nd way start
import $ from 'jquery';
import 'imports?jQuery=jquery!./plugin.js';
//2nd way end
var insideImg 
        = {
        '36kr': './app/imgs/small/36kr.png',        
        'email': './app/imgs/small/email.png',
        'get': './app/imgs/small/get.png',
        'news': './app/imgs/small/news.png',
        'icon': './app/imgs/small/icon.png',
        'wechat': './app/imgs/small/wechat.png',
        'weibo': './app/imgs/small/weibo.png',
        'zhihu': './app/imgs/small/zhihu.png',
        'read': './app/imgs/small/read.png'
        },
    iMinZindex = 2
var _$ = function(node){
    return document.querySelector(node);
};
var _$$ = function(nodes){
    return document.querySelectorAll(nodes);
};

var $matrix = _$('.matrix');
function init(){
    var centerImg = getQueryStrings() && getQueryStrings().keyfrom;
    if(centerImg) {
        insideImg.icon = 'app/imgs/big/' + centerImg + '.png';
    }
    var imglist = "";
    for(let j in insideImg){
        imglist += '<li  style="postion:absolute"><img src="' + insideImg[j] + '"></li>';
    }
    $matrix.innerHTML = imglist;
    bigImg($matrix.children[4])
}
init();


window.onload = function(){
    var aLi = _$$('li'),
        aPos = [];
    // 获得当前的状态获得他们的left和top
    for(let i = 0;i < aLi.length; i++) {
        aPos[i] = {left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }

    for(let j = 0; j <aLi.length; j++) {
        aLi[j].style.left = aPos[j].left + 'px';
        aLi[j].style.top = aPos[j].top + 'px';

        aLi[j].style.position = 'absolute';
        aLi[j].style.margin = '0';
        aLi[j].index = j;
    }

    var once, 
        lastAim,
        lastNode,
        notFinsh = true;
    function startup(e) {
        console.log(e.target.parentNode);
        e.target.src = changeImg(e.target.src, 'small', 'big');
        for(var i = 0; i < aLi.length; i++) {
            if(~aLi[i].style.transform.indexOf('scale')) {
                aLi[i].style.transform = '';
            }
        }
        if(e && !e.target.src) {
            return false;
        }
        startMove(e.target.parentNode, aPos[4]);
        if(!once) {
            startMove(findImg(), {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop})
            once = true;
        }else {
            lastAim.firstChild.src = changeImg(lastAim.firstChild.src, 'big', 'small');
            lastAim.style.transform = 'scale(1,1)';
            startMove(lastAim, {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop});
        }
        lastAim = e.target.parentNode;
        bigImg(e.target.parentNode);
        startMove(_$("#main"), {offsetTop: 0});
    }

    function findImg(){
        aLi[4].firstChild.src = changeImg(aLi[4].firstChild.src, 'big', 'small');
        return aLi[4];
    }
    
    $matrix.addEventListener('touchend',startup, false);
}



function bigImg(node){
    node.style.transform = 'scale(1.5, 1.5)';
    node.style.zIndex = iMinZindex++;
}

function changeImg(str, reg, newreg){
    return str && str.replace(reg, newreg);
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
            var iSpeed=(json[attr]-iCur)/8;
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













// const myPromise = Promise.resolve(42);
// myPromise.then((number) => {
//   const testArrStr = _.map([1, 2, 3], function(n) { return n * 3; }).toString();
//   const currentTime = moment().format();
//   //testing template strings
//   $('body').append(`<p> promise result is ${number}, now is ${currentTime}, lodash result is ${testArrStr}`);
//   //call our jquery plugin!
//   $('p').greenify();
// });
