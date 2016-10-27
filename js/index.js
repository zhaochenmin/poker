$(function(){
	//红桃:H 黑桃:S 梅花:C 方块:D
	function makePoker(){
		var color=['h','s','c','d'];
		var dirt={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'};
		var poker=[];
		var info={};
		while(poker.length!=52){
			var num=Math.ceil(Math.random()*13);
			var cc=Math.floor(Math.random()*4);
			var m={
				num:dirt[num],
				color:color[cc]
			}
			if(!(info[m.num+m.color])){
				poker.push(m);
				info[dirt[num]+color[cc]]=true;
			}
		}
		return poker;
	}
	function setPoker(poker){
		var index=0;
		for(var i=0,poke;i<7;i++){
			for(var j=0;j<=i;j++){
				poke=poker[index];
				index++;
				$("<div>").attr('id',i+'_'+j).attr('number',poke.num).attr('lj',poke.num+poke.color).addClass('poke').appendTo(".box").css({backgroundImage:'url(./image/'+poke.num+poke.color+'.png)'}).delay(20*index).animate({top:40*i,left:(6-i)*65+130*j+50,opacity:1})
			}
		}
		for(;index<poker.length;index++){
			poke=poker[index];
			$("<div>").attr('number',poke.num).attr('lj',poke.num+poke.color).addClass('poke left').appendTo(".box").css({backgroundImage:'url(./image/'+poke.num+poke.color+'.png)'}).delay(20*index).animate({top:432,left:190,opacity:1})
		}
	}
	setPoker(makePoker())
	var btnr=$(".box .move-right");
	btnr.on("click",function(){
		var zIndex=1;
		return function(){	
			if($(".box .left").length){
				$(".box .left").last().css({zIndex:zIndex++}).animate({left:690}).queue(function(){
					$(this).removeClass("left").addClass("right").dequeue();
				})
			}
		}
	}())
	var btnl=$(".box .move-left");
	var num=0;
	btnl.on("click",function(){
		return function(){
			if(num>=3){
				return;
			}
			num++;
			if($(".box .left").length){
				return;
			}
			$(".box .right").each(function(i,v){
				$(this).css({zIndex:0}).delay(i*20).animate({left:190}).queue(function(){
					$(this).addClass("left").removeClass("right").dequeue();
				})
			})
		}
	}())
	function getNum(el){
		var num=el.attr('number');
		if(num=='A'){num='1'}
		if(num=='T'){num='10'}
		if(num=='J'){num='11'}
		if(num=='Q'){num='12'}
		if(num=='K'){num='13'}
		return parseInt(num);
	}
	function canClick(el){
		var x=parseInt(el.attr("id").split("_")[0]);
		var y=parseInt(el.attr("id").split("_")[1]);
		if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
			return false;
		}else{
			return true;
		}
	}
	var prev=null;
	$(".box").on("click",".poke",function(){
		if($(this).attr('id')&&!canClick($(this))){
			return;
		}
		if(getNum($(this))===13){
			$(this).animate({top:-100}).queue(function(){
				$(this).detach().dequeue()
			})
			return;
		}else{
			if(prev){
				if((getNum(prev)+getNum($(this)))==13){
					prev.add($(this)).animate({top:-100}).queue(function(){
						$(this).detach().dequeue()
					})
				}else{
					$(this).animate({top:'-=20'}).animate({top:'+=20'});
					prev.delay(400).animate({top:'+=20'})
				}
				prev=null;
			}else{
				prev=$(this);
				prev.animate({top:'-=20'});
			}
		}
	})
	$(".cxks").on('click',function(){
		num=0;
		$('.box .poke').detach();
		setPoker(makePoker());
	})
	$(".ksyx").on('click',function(){
		$(".cxks").trigger('click')
	})
	$(".tcyx").on('click',function(){
		window.close();
	})
	$(".yxbz").on('click',function(){
		$(".help-box").css("display","block");
	})
	$(".close").on('click',function(){
		$(".help-box").css("display","none");
	})
})