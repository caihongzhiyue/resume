//引入zepto
var $ = require('./components/zepto-modules/_custom');
var IScroll = require('./components/iscroll/iscroll');


$('#mainContent').hide();
$(".swiper-container").show();

$("#enter").tap(function(){
	$('#mainContent').show();
	$(".swiper-container").hide();
	postSkill();
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
	$("#scroller").show();
	$("#interestCanvas").hide();
	var apiTarget = $(this).attr('id');
	$("#header").text(apiTarget.toLocaleUpperCase());
	if(apiTarget =="project" || apiTarget =="work"){
		$.ajax({url:'./mock/'+apiTarget+'.json',
			dataType:"json",
			success:function(response){
				console.log(response);
				var html="<div class='project'>"
				for(var i=0;i<response.length;i++){			
					html+='<h5>'+response[i].name+'</h5>';
					html+='<div class="projectImg"><img src="'+response[i].image+'" /></div>';
					html+='<div class="projectDec">'+response[i].description+'</div>';
					html+='<div>'+response[i].skill+'</div>';
					html+='<div>'+response[i].total+'</div>';
				}
				html+="</div>";
				$("#scroller").html(html);

				var myScroll = new IScroll('#wrapper',{mouseWheel:true});
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			}
		})
	}
	//interest
	if(apiTarget =="interest"){
		$("#scroller").hide();
		$("#interestCanvas").show();
		var canEle=document.getElementById('interestCanvas');
		var ctx=canEle.getContext("2d");
		var width=400;
		var height=400;
		var colorArr=["#8A2BE2","#7FFF00","#6495ED","#FF7F50","#DC143C","#FF1493","#ADFF2F","#FF69B4"];
		var textArr=[
			"我喜欢阅读",
			"喜欢打乒乓球",
			"我还喜欢听音乐",
			"我更加喜欢敲代码",
			"我爱好广泛",
			"看动漫",
			"多谢您的关注",
			"做事情全心全意",
			"活到老 学到老",
			"志之难也 不在胜人 在自胜",
			"没有一劳永逸的开始；也没有无法拯救的结束。",
			"我要做极客",
			"努力 加油"
		]
		canEle.width=width;
		canEle.height=height;
		var image=new Image();

		ctx.font = "25px Courier New";
		var numArrL=[80,100,5,300,500,430];//初始的X
		var numArrT=[80,100,20,300,380,210];//初始的Y
		setInterval(function(){
		ctx.clearRect(0,0,canEle.width,canEle.height);
		ctx.save();
		for(var j=0;j<textArr.length;j++){
			numArrL[j]-=(j+1)*0.6;
			ctx.fillStyle = colorArr[j]
			ctx.fillText(textArr[j],numArrL[j],numArrT[j]);
		}
		for(var i=0;i<textArr.length;i++){
			if(numArrL[i]<=-500){
				numArrL[i]=canEle.width;
			}
		}
		ctx.restore();
		},20)
	}
	if(apiTarget =="mine"){
		$.ajax({url:'./mock/'+apiTarget+'.json',
			dataType:"json",
			success:function(response){
				console.log(response);
				var html="<div class='mine'>"
				for(var i=0;i<response.length;i++){			
					html+='<p>'+response[i].category+'</p>';
				}
				html+="</div>";
				$("#scroller").html(html);

				var myScroll = new IScroll('#wrapper',{mouseWheel:true});
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			}
		})
	}
})
$("#skill").tap(function(){
	postSkill();
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

//swiper-three的各自运动
var swiperThreeP=$(".swiper-three p");
for(var i=0;i<swiperThreeP.length;i++){
	var swiperThreePTime=(2*i)/10;
	swiperThreeP.eq(i).attr({"class":"ani","swiper-animate-effect":"rollIn","swiper-animate-duration":"0.2s","swiper-animate-delay":(swiperThreePTime+"s")});
};

function postSkill(){
	$.ajax({url:'./mock/skill.json',
		dataType:"json",
		success:function(response){
			var html=""
			for(var i=0;i<response.length;i++){			
				html+="<dl>";
				html+='<dt><img src="'+response[i].imagesrc+'"></dt>';		
				html+='<dd style="font-size:18px;font-weight:900">'+response[i].category+'</dd>';
				html+='<dd>'+response[i].name+'</dd>';
				html+='<dd>'+response[i].lastText+'</dd>';
				html+="</dl>";
			}
			$("#scroller").html(html);

			var myScroll = new IScroll('#wrapper',{mouseWheel:true});
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		}
	})
}






