/*
* @author                yanming
* @date                2015-08-21
* @description        基于html5编写的音乐播发器demo
*/
    window.onload=function(){
        //当前播放的歌曲索引
		
        var currentIndex=-1;
        //  播放器元素对象
        var audio=document.getElementById("aud");
        // 歌曲列表
        var mlist=["热情的沙漠","Come To Me","决定爱你"];
        //歌曲路径
        var msrc=["music/1.mp3","music/2.mp3","music/3.mp3"];
		//头像路径
		var tou =["image/hou_0.jpg","image/hou_1.jpg","image/hou_2.jpg"]
        //进度条
        var stick=document.getElementById("stick");
        //初始化函数
        function finit(){
            document.getElementById("name").innerHTML=mlist[0];
        }
        //播放停止按钮
        var oPlayOrPause=document.getElementById("btn-playorpause");
		//头像旋转
		var photo=document.getElementById("photo");
        // 播放或暂停
        oPlayOrPause.onclick=fPlayMusic
        function fPlayMusic(){
            if(currentIndex==-1){
                audio.src=msrc[0];
                currentIndex=0;
            }
            if(audio.paused){
                audio.play();
                oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
				photo.className="rotate" 
				
            }else{
                audio.pause();
                oPlayOrPause.style.backgroundImage="url(image/img1/start.png)";
				photo.className="" 
            }
        }
		
			//播放时间
			function timeChange(time, timePlace) {//默认获取的时间是时间戳改成我们常见的时间格式
				var timePlace = document.getElementById(timePlace);
				//分钟
				var minute = time / 60;
				var minutes = parseInt(minute);
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				//秒
				var second = time % 60;
				seconds = parseInt(second);
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				var allTime = "" + minutes + "" + ":" + "" + seconds + ""
				timePlace.innerHTML = allTime;
			}
					
		
        // 上一曲
        document.getElementById("btn-prev").onclick=function(){
            if (currentIndex == 0) {
                currentIndex = mlist.length-1;
                document.getElementById("name").innerHTML=mlist[currentIndex];
				document.getElementById("photo").src=tou[currentIndex];
				photo.className="rotate" 
            } else {
                currentIndex--;
                document.getElementById("name").innerHTML=mlist[currentIndex];
				document.getElementById("photo").src=tou[currentIndex];
				photo.className="rotate" 
				
            }
            audio.src = msrc[currentIndex];
            stick.style.width=0;
            audio.play();
           oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
		   photo.className="rotate" 
		 
		  
        }
        // 下一曲
        document.getElementById("btn-next").onclick=function(){
                 if (currentIndex == (mlist.length-1)) {
                     currentIndex = 0;
                     document.getElementById("name").innerHTML=mlist[0];
					 document.getElementById("photo").src=tou[currentIndex];
                 } else {
                     currentIndex++;
                     document.getElementById("name").innerHTML=mlist[currentIndex];
					 document.getElementById("photo").src=tou[currentIndex];
                 }
                 audio.src = msrc[currentIndex];
                 stick.style.width=0;
                 audio.play();
                oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
				photo.className="rotate" 
				 
				
             }
        //播放进度条
            audio.addEventListener('timeupdate',function(){
                if (!isNaN(audio.duration)) {
					
                    var progressValue = audio.currentTime/audio.duration*350;
                    stick.style.width = parseInt(progressValue) + 'px';
                };
            },false);
			
			
								
        //歌曲结束时
        audio.addEventListener('ended',function(){
            stick.style.width=0;
             if (currentIndex == (mlist.length-1)) {
                     currentIndex = 0;
                     document.getElementById("name").innerHTML=mlist[0];
                 } else {
                     currentIndex++;
                     document.getElementById("name").innerHTML=mlist[currentIndex];
                 }
                 audio.src = msrc[currentIndex];
                 stick.style.width=0;
                 audio.play();
                oPlayOrPause.style.backgroundImage="url(image/img1/stop.png)";
        },false);
        //判断歌曲是否可以播放
        audio.addEventListener('canplay',function(){
            var buffer=document.getElementById("buffer");
            buffer.style.display="none";
        },false);
		
		var allTime = audio.duration;
            
            setInterval(function() {
                var currentTime = audio.currentTime;
				var getcurrentTime=document.getElementById("currentTime")
                getcurrentTime.inneeHTML=timeChange(currentTime, "currentTime")
            }, 1000);
        //监听歌曲是否缓冲
        audio.addEventListener('loadstart',function(){
            var buffer=document.getElementById("buffer");
            buffer.style.display="block";
            buffer.innerHTML="正在获取数据...";
        },false);
        //初始化
        finit();
    }