//引入zepto
var $ = require('./components/zepto-modules/_custom');
var IScroll = require('./components/iscroll/iscroll');



$('#mainContent').hide();
$(".swiper-container").hide();

$("#enter").tap(function(){
	$('#mainContent').show();
	$(".swiper-container").hide();

	$.post('/api/skill',{},function(response){
		console.log(response);
		var html=""
		for(var i=0;i<response.length;i++){			
			html+='<li>'+response[i].name+'</li>';
		}
		$("#scroller ul").html(html);
	
		var myScroll = new IScroll('#wrapper',{ mouseWheel:true});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})

	
})

//引入swiper
var Swiper = require('./components/swiper/swiper.min.js');
//引入swiper animate
var SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min');

var mySwiper = new Swiper ('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationType : 'custom',
  	paginationCustomRender: function (swiper, current, total) {
    	return current + ' / ' + total;
  	},
  	//effect:'flip',
  	observer:true,
  	observeParents:true,
	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
		SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	}, 
	onSlideChangeEnd: function(swiper){ 
		SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
})
//使用  flip 效果还是有点小BUG，把页面拖到中间就会是运动持续下去

$("#footer div").tap(function(){
	var apiTarget = $(this).attr('id');

	$.post('/api/'+apiTarget,{},function(response){
		var html=""
		for(var i=0;i<response.length;i++){			
			html+='<li>'+response[i].category+'</li>';
		}
		$("#scroller ul").html(html);
	})
})

//预加载
var interval = setInterval(function(){
	if(document.readyState==='complete'){
		clearInterval(interval);
		$("#preload").hide();
		$(".swiper-container").show();
		mySwiper.update();
	}else{
		$("#preload").show();
	}
},100);

//swiper-three的加载
$(".swiper-top a").tap(function(){	
	//console.log($(this).index());
	var index=$(this).index();
	$.post('/api/state',{},function(response){
		$(".swiper-bottom").html(response[index].name);
	})
})


//swiper-three的各自运动
var swiperThreeP=$(".swiper-three p");
for(var i=0;i<swiperThreeP.length;i++){
	var swiperThreePTime=(2*i)/10;
	swiperThreeP.eq(i).attr({"class":"ani","swiper-animate-effect":"fadeIn","swiper-animate-duration":"0.2s","swiper-animate-delay":(swiperThreePTime+"s")});
}