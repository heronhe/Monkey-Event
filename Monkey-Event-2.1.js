var MonkeyEventInit = (function(){

	var MonkeyEvent = {};

	var ISPC = (function()  {  
	   var userAgentInfo = navigator.userAgent;  
	   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	   var flag = true;  
	   for (var v = 0; v < Agents.length; v++) {  
		   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
	   }  
	   return flag;  
	})();

	MonkeyEvent.MOUSE_DOWN = "mousedown";
	MonkeyEvent.MOUSE_UP = "mouseup";
	MonkeyEvent.MOUSE_MOVE = "mousemove";
	MonkeyEvent.MOUSE_OVER = "mouseover";
	MonkeyEvent.MOUSE_OUT = "mouseout";
	if(!ISPC){
		MonkeyEvent.MOUSE_DOWN = "touchstart";
		MonkeyEvent.MOUSE_UP = "touchend";
		MonkeyEvent.MOUSE_MOVE = "touchmove";
	}

	MonkeyEvent.addEventListener = function (o, t, f, b) {
		if (b == null) {
			b = false;
		}
		if (o.addEventListener) {
			o.addEventListener(t, f, b);
			return true;
		} else if (o.attachEvent) {
			o.attachEvent("on" + t, f);
			return true;
		}
	};

	MonkeyEvent.removeEventListener = function (o, t, f) {
		if (o.removeEventListener) {
			o.removeEventListener(t, f);
			return true;
		} else if (o.detachEvent) {
			o.detachEvent("on" + t, f);
			return true;
		}
	};

	var EvList=[],
        dx = [],
        dy = [],
        mx = [],
        my = [],
        strx = stry = 0,
		startTime, endTime,
		_speed = {x: 0, y: 0},
		_cz = 50, //移动触发值
        _moveEnd = {},
		currentEvent = null, //选中对象
        previousDist,
        previousAngle,
		BODY_MOUSE_UP = function(e){
			if(!currentEvent)
				return;

			var mvalx = mx[0] - strx,
				mvaly = my[0] - stry;

			if(typeof currentEvent.up === "function")
				currentEvent.up({
					distanceX: mvalx,
					distanceY: mvaly,
					speedX: _speed.x,
					speedY: _speed.y,
                    x: _moveEnd.x,
                    y: _moveEnd.y
				});

			if(Math.abs(mvalx) >= Math.abs(mvaly)){
				if(mvalx>=_cz){
					if(typeof currentEvent.right === "function")
					currentEvent.right(mvalx);
				}else if(mvalx<=-_cz){
					if(typeof currentEvent.left === "function")
					currentEvent.left(mvalx);
				}
			}else{
				if(mvaly>=_cz){
					if(typeof currentEvent.bottom === "function")
					currentEvent.bottom(mvaly);
				}else if(mvaly<=-_cz){
					if(typeof currentEvent.top === "function")
					currentEvent.top(mvaly);
				}
			}

			MonkeyEvent.removeEventListener(window, MonkeyEvent.MOUSE_MOVE, BODY_MOUSE_MOVE);
			MonkeyEvent.removeEventListener(window, MonkeyEvent.MOUSE_UP, BODY_MOUSE_UP);
			currentEvent = previousAngle = previousDist = null;

			_speed = {
				x: 0,
				y: 0
			}

		},
		BODY_MOUSE_MOVE = function(e){

			if(!currentEvent)
				return;
			if(!ISPC){
				mx[0] = e.targetTouches[0].pageX;
				my[0] = e.targetTouches[0].pageY;

                if(e.targetTouches.length > 1){
                    mx[1] = e.targetTouches[1].pageX;
                    my[1] = e.targetTouches[1].pageY;
                    //距离
                    var _distance = Math.sqrt(Math.pow(mx[1] - mx[0], 2) + Math.pow(my[1] - my[0], 2));
                    //角度
                    var _angle = Math.atan((my[1] - my[0])/(mx[1] - mx[0]));

                    //缩放
                    if(previousDist && typeof currentEvent.scale === 'function'){
                        currentEvent.scale({
                            distance: _distance,
                            speed: _distance - previousDist
                        });
                    }
                    //旋转
                    if(previousAngle && typeof currentEvent.rotate === 'function'){

                        var _speed = _angle - previousAngle;
                        if(_speed > 2.5)
                            _speed = -(1.57 - _angle + 1.57 + previousAngle)
                        else if(_speed < -2.5)
                            _speed = 1.57 - previousAngle + 1.57 + _angle

                        currentEvent.rotate({
                            angle: _angle,
                            speed: _speed
                        });
                    }

                    previousDist = _distance;
                    previousAngle = _angle;

                }
			}else{
				mx[0] = e.clientX;
				my[0] = e.clientY;
			}

            _moveEnd = {
                x: mx[0],
                y: my[0]
            };

			endTime = Date.now();
			var timestamp = endTime - startTime || 5;
			startTime = endTime;

			var _distance = {
				x: mx[0]-dx[0],
				y: my[0]-dy[0]
			};

			dx[0] = mx[0];
			dy[0] = my[0];

			_speed = {
				x: _distance.x / timestamp,
				y: _distance.y / timestamp
			};

			if(typeof currentEvent.move === "function")
			currentEvent.move({
				distanceX: _distance.x,
				distanceY: _distance.y,
				speedX: _speed.x,
				speedY: _speed.y,
			});
			
		};
		
		
	function EventFactory(o){
		var _s = this;
		this.top = this.left = this.right = this.bottom = this.down = this.move = this.up = null;
		this.e = o;

		this.MOUSE_DOWN = function(e){
			MonkeyEvent.addEventListener(window, MonkeyEvent.MOUSE_MOVE, BODY_MOUSE_MOVE);
			MonkeyEvent.addEventListener(window, MonkeyEvent.MOUSE_UP, BODY_MOUSE_UP);
			currentEvent = _s;

			if(!ISPC){
				strx = dx[0] = mx[0] = e.targetTouches[0].pageX;
				stry = dy[0] = my[0] = e.targetTouches[0].pageY;

			}else{
				strx = dx[0] = mx[0] = e.clientX;
				stry = dy[0] = my[0] = e.clientY;
			}


			if(typeof _s.down === "function")
			_s.down(e);

			startTime = Date.now();

            _moveEnd = {
                x: mx[0],
                y: my[0]
            };

		}
		this.addEvent();

	}

	//添加事件
	EventFactory.prototype.addEvent = function(){
		var _s = this;
		MonkeyEvent.addEventListener(_s.e,MonkeyEvent.MOUSE_DOWN, _s.MOUSE_DOWN);
	}

	//删除事件
	EventFactory.prototype.removeEvent=function(){
		var _s = this;
		_s.top = _s.left = _s.right = _s.bottom = _s.down = _s.move = _s.up = null;

		MonkeyEvent.removeEventListener(_s.e,MonkeyEvent.MOUSE_DOWN, _s.MOUSE_DOWN);
	}

	function MonkeyEventInit(o){
		for(var i = 0; i < EvList.length; i++){
			if(EvList[i].e == o)
			return EvList[i];
		}

		var Ev = new EventFactory(o);
		EvList.push(Ev);
		return Ev;
	}

	return MonkeyEventInit;

})();