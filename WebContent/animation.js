
isMoving=false;

function slideOutIn(id,changes,callback){
		if(!isMoving){
			isMoving=true;
			margin=0;
			iv=setInterval(function(){
				document.getElementById(id).style.marginLeft=margin+"px";
				margin+=50;
				if(margin>=1500){					
					var elem = document.getElementById(id);
					//document.getElementById(id).innerHTML=change;
  					//elem.parentNode.removeChild(elem);
					clearInterval(iv);

					part2();	
				}
			}, 1);
			function part2(){

				for(var i=0;i<changes.length;i++){
					//alert(changes[i][0]);
					document.getElementById(changes[i][0]).innerHTML=changes[i][1];
				}

				margin=-1500;
				iv=setInterval(function(){
					document.getElementById(id).style.marginLeft=margin+"px";
					margin+=50;
					if(margin>=0){					
						document.getElementById(id).style.marginLeft="0px";
						clearInterval(iv);
						isMoving=false;
						callback();	
					}
				}, 1);
			}
		}
	}
