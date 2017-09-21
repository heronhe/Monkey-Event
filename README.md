# Monkey-Event

一、load使用文档

1.初始化：
var loadingPage = new MK_Loading ({
			LDpage:true,
			LDdom:document.getElementById("img1"),
			LDtween:true,
			LDup:function(v){
				$("#val").html(v);
			},
			LDsuccess:function(){
				console.log("加载完成");
			}
		});

参数说明
LDpage：boolean类型，true加载页面所以图片、音频、视频
LDdom：设定需要加载img对象或者是某个容器下面的所有img对象，可以为JQ对象或者JSdom对象，如：$(‘img’)、document.getElementById("img1")、{type:"img",src:"logo.png"}
LDtween：boolean类型，百分比缓动效果（1到100的过渡效果）
LDup：加载更新方法，默认传递加载值，（值为：0到100）
LDsuccess：加载完成回调方法

2.方法
（1）add()
传递类型和初始化的LDdom一致，返回数组类型加载对象，获取对象中的dom对象的方法为getDom，例如：
var logo = loadingPage.add({type:"img",src:"logo.png"});
var logoElem = logo[0]. getDom(); 或者
var logoElem = logo[0]. e;
注意：只有加载dom对象才拥有方法和属性，请在加载完成之后开始调用；

（2）addImgSheet()
加载特定序列帧图片
实例：
loading.addImgSheet({
		imgPrefix:"images/乐事0602_000",
		imgType:"png",
		start:1,
		length:40,
		step:1,
		mask:'00'
	})
imgPrefix：图片名称前缀；注意编号小于10的时候前面需要加0，如01
imgType：图片类型
start：图片其实值
length：图片帧长度
step：图片帧加载步长，也可以跳帧加载
mask：图片编号字符长度，例如图片最大数为250，mask值为000，图片最大数为50， mask为00

（3）start()
加载开始事件

（4）addEventListener(name,function)
加载添加侦听事件
Name值为update，加载更新事件，类似初始化的LDup
Name值为complete，加载完成时间，类似初始化的LDup

（5）addAjax(function)
添加ajax，将ajax作为load一部分，ajax请求完成之后调用回掉方法，也可以作为延时loading来使用，通过setTimeOut来控制延时时间，使用方法如下：
loading.addAjax(function(cb){
        $.ajax({
            url: "./login",
            type: "POST",
            data:{"Uname":'dfd', 'Upassword': 'fdd'},
            dataType: "JSON",
            success: function (result) {
                cb(null, true);
            },
error: function(){
	cb(new Error());
            }
        });

});
备注：当前loading只支持图片

二、动画帧播放文档

1、MK_animateSheet
按一张张图片帧播放

2、MK_animateSprite
图片拼接播放

说明：两个播放类型初始化和方法基本一致，animateSprite在初始化多了两个属性row、column

1始化：
new MK_animateSprite ({
				parents:document.getElementById("animate1"),
				type:"canvas",
				width:300,
				height:364,
				imgList:imgs,
				row:6,
				column:5,
				step:1,
				times:100,
				loop:false
			});
参数说明：
Parents：动画显示位置的dom对象
Type:播放图片显示类型，canvas：用canvas进行播放，img：是用images进行播放
Width：宽
Height：高
imgList：需要播放的加载完成图片对象，此参数必须为当前load加载返回对象
row：拼接图片行数 此参数只在MK_animateSprite对象
column：拼接图片列 此参数只在MK_animateSprite对象
step：播放步长，可跳帧播放
times：播放动画刷新时间
loop：boolean类型，是否循环播放

2.方法
（1）play()
动画开始播放
（2）pause()
暂停
（3）stop()
停止
（4）clear()
清空动画
（5）toProgress(val)
设置动画播放位置，val参数不能大于播放帧数
（6）setStart(val)
设置动画播放起始位置，注意设置动画起始位置之后，循环播放的时候会以设置位置为起始播放位置
（7）addEventListener(name,function)
动画事件
Name值为：
Update：动画更新事件
complete：动画播放完成事件
n：n为当前帧数以内的任何值，如：
animateImg1.addEventListener(15,function(){
					console.log("15");
				});
播放到15帧的时候，打印出15

（8）setEnd (val)
设置播放结束帧数
