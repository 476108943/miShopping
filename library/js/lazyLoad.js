var imgs = document.querySelectorAll("img");
		var clientH = document.documentElement.clientHeight;
		var scrollT = document.documentElement.scrollTop;
		var arr = [];
		for(var i=0;i<imgs.length;i++){
			arr.push(imgs[i]);
		}
		function lazyLoad(elements,cH,sT){
			for(var i=0;i<arr.length;i++){
				if(arr[i].offsetTop < cH + sT){
					arr[i].src = arr[i].getAttribute("data-src");
					arr.splice(i,1);
					i--;
				}
			}
		}
		lazyLoad(imgs,clientH,scrollT);
		onscroll = function(){
			var scrollT = document.documentElement.scrollTop;
			lazyLoad(imgs,clientH,scrollT);
		}