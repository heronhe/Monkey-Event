# Monkey-Event

MonkeyEventInit(elem)

elem: dom对象

使用案例：

        var mkevent1 = MonkeyEventInit(document.getElementById('box1'));

        mkevent1.down = function(){
            console.log('down')
        }

        mkevent1.up = function(v){
           console.log(v) // 返回参数v为对象，具体信息：距离、速度， 注意当然距离为总距离
        };
        
        //左滑动
        mkevent1.left = function(){
            console.log('left')
        }
        
        //右滑动
        mkevent1.right = function(){
            console.log('right')
        }

        mkevent1.top = function(){
            console.log('top')
        }

        mkevent1.bottom = function(){
            console.log('bottom')
        }

        mkevent1.move = function(v){
            console.log(v) // 返回参数v为对象，具体信息：距离、速度， 注意当前距离为此时间段距离
        }
        
        //缩放
        mkevent1.scale = function(v){
            console.log('scale')
        }
        
        //旋转
        mkevent1.rotate = function(v){
            console.log('rotate')
        }

        
