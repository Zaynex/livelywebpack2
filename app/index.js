import './main.scss';
import generateText from './sub';
import moment from 'moment';
import _ from 'lodash';
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
var insideImg = {
    '36kr': './app/imgs/36kr.jpg',        
    'book': './app/imgs/book.jpg',
    'note': './app/imgs/note.jpg',
    'cd': './app/imgs/cd.jpg',
    'logo': './app/imgs/logo.jpg',
    'yw': './app/imgs/yw.jpg',
    'youdao': './app/imgs/youdao.jpg',
    'pm': './app/imgs/pm.jpg',
    'banner': './app/imgs/banner-img.jpg'
};

var _$ = function(node){
    return document.querySelector(node)
}



window.onload = function(){
    var aLi = document.querySelectorAll('li');
    var aPos=[];
    for(var i=0; i< aLi.length; i++)
    {
        aPos[i]={left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }
    console.log(aPos);
}
function init(){
    var imglist = "";
    for(let j in insideImg){
        imglist += '<li  style="postion:absolute"><img src="' + insideImg[j] + '"></li>';
    }
    _$(".matrix").innerHTML = imglist;
  var oUl = _$(".matrix");
  
  var iMinZindex=2;
  var fontSize = document.documentElement.style.fontSize;
  var defaultFont = 16;
    

  //布局转换
  // 因为是动态插入的，所以只能在window.onload之后再获取节点
 
  
  
//   for(i=0;i<aLi.length;i++)
//     {
//         aLi[i].style.left=aPos[i].left +'px';
//         aLi[i].style.top=aPos[i].top +'px';
        
//         aLi[i].style.position='absolute';
//         aLi[i].style.margin='0';
        
//         aLi[i].index=i;
//     }

    var once,lastAim;
    var notFinsh = true;

    function startup(e){
      // 防止点击空白部分也跳出
      if(e && !e.target.src){
        return false;
      }
      if(notCenter(e)) {
          // 点击的图片跑到中间
          startMove(e.target.parentNode, aPos[4]);
          if(!once){
              startMove(findImg(), {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop});
              once = true;
          }else {
              // 中间的图片跑到点击的位置
              lastAim.style.transform = 'scale(1, 1)';
              startMove(lastAim, {left: e.target.parentNode.offsetLeft, top: e.target.parentNode.offsetTop});
          }
          lastAim = e.target.parentNode;
      }
      bigImg(e.target.parentNode);
    }
    function notCenter(e){
        if(e.target.parentNode.style.left !== '230px' || e.target.parentNode.style.top !== '180px') {
            console.log("不在中间");
            return true;
        }
        return false;
    }
    function findImg(){
        return aLi[4];
    }
    var lastNode;
    function bigImg(node){
        node.style.transform = 'scale(1.5, 1.5)';
        node.style.zIndex = iMinZindex++;
    }
    oUl.addEventListener('touchend',startup, false);
}


init();







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

















// const myPromise = Promise.resolve(42);
// myPromise.then((number) => {
//   const testArrStr = _.map([1, 2, 3], function(n) { return n * 3; }).toString();
//   const currentTime = moment().format();
//   //testing template strings
//   $('body').append(`<p> promise result is ${number}, now is ${currentTime}, lodash result is ${testArrStr}`);
//   //call our jquery plugin!
//   $('p').greenify();
// });
