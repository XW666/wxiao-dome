(function(){
       var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };
        wxlocker.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
            this.ctx.setStrokeStyle('#D9D9D9');
            this.ctx.setLineWidth(1);
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.draw(true);
        }
        wxlocker.prototype.drawPoint = function(x,y,style) { // 初始化圆心
            
            // for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setFillStyle(style || '#138DD9');
                this.ctx.beginPath();
                this.ctx.arc(x, y, this.r / 3, 0, Math.PI * 2, true);
                // this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.draw(true);
            // }
        }
        wxlocker.prototype.drawStatusPoint = function(type) { // 初始化状态线条
           
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setStrokeStyle(type);
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
                this.ctx.draw(true);
            }
         
        }
        wxlocker.prototype.drawLine = function(po1, po2,style) {// 解锁轨迹
           
            this.ctx.beginPath();
            this.ctx.setStrokeStyle(style || '#138DD9');
            this.ctx.setLineWidth(2);
            this.ctx.moveTo(po1.x,po1.y);
            // for (var i = 1 ; i < this.lastPoint.length ; i++) {
            //     this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            // }
            this.ctx.lineTo(po2.x, po2.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.draw(true); 
        }
        wxlocker.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
            var  cavW = this.setCanvasSize().w;
            var  cavH = this.setCanvasSize().h;
            
            var n = this.chooseType;
            var count = 0;
            // this.r = cavW / ((2* n + 1) * 2);// 公式计算
            this.r = cavW / (1 + 4 * n);// 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 2.6 * r, //x: j * 4 * r + 3 * r
                        y: i * 3.5 * r + 2.5 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, cavW, cavH);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
           

        }
        wxlocker.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
            // var rect = e.target;
            var po = {
                x: e.touches[0].x,
                y: e.touches[0].y
              };
            return po;
        }
        wxlocker.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
           
            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                
                    this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                    this.drawLine(this.lastPoint[this.lastPoint.length - 1],this.restPoint[i]);
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }

        }
        wxlocker.prototype.checkPass = function(psw1, psw2) {// 检测密码
            var p1 = '',
            p2 = '';
            for (var i = 0 ; i < psw1.length ; i++) {
                p1 += psw1[i].index + psw1[i].index;
            }
            for (var i = 0 ; i < psw2.length ; i++) {
                p2 += psw2[i].index + psw2[i].index;
            }
            return p1 === p2;
        }
        wxlocker.prototype.changeDraw =function(){
          //绘制出错时，改变线条和圆心的颜色
          for(var i = 0; i<this.lastPoint.length; i++) {
            let val =i+1;
            if(val=== this.lastPoint.length){
              val = this.lastPoint.length-1
            }
               this.drawPoint(this.lastPoint[i].x, this.lastPoint[i].y,'#FFA65A');// 每帧画圆心
               this.drawLine(this.lastPoint[i],this.lastPoint[val],'#FFA65A');//线条颜色
         }
        },
        wxlocker.prototype.storePass = function(psw,cb) {// touchend结束之后对密码和状态的处理
            if (this.pswObj.step == 1) {//step==1表示还没有设置密码状态
                if (this.checkPass(this.pswObj.fpassword, psw)) {
                    //手势密码设置成功
                    this.pswObj.step = 2;
                    this.pswObj.spassword = psw;
                    this.resetHidden = false;
                    this.title = "手势密码设置成功";
                    this.titleColor = "";
                    wx.setStorageSync('passwordxx', JSON.stringify(this.pswObj.spassword));
                    //手势密码有5次机会
                    wx.setStorageSync('signNum',5)
                    // wx.showToast({
                    //     title: '手势密码设置成功',
                    //     icon: 'none',
                    //     duration: 2000,
                    //     mask:true
                    //   })   
                    
                } else {
                    this.msg = "二次输入码不一致，请重新输入";
                    this.title='重新设置'
                    this.titleColor = "succ";
                    this.resetHidden =true
                    this.changeDraw()
                    delete this.pswObj.step;
                    // this.reset();
                   
                }
            } else if (this.pswObj.step == 2) {
                let signNum= Number(wx.getStorageSync('signNum'))
                if (this.checkPass(this.pswObj.spassword, psw) && signNum > 0) {
                    this.title = "解锁成功";
                    this.titleColor = "succ";
                    cb();
                } else {
                   
                    if(signNum > 0){
                        signNum = signNum-1
                    }else{
                        signNum =0
                    }
                    wx.setStorageSync('signNum',signNum)
                    this.title = "忘记手势密码";
                    this.titleColor = "succ";
                    this.msg='手势密码错误，您还有'+signNum+'次机会'
                    this.changeDraw()
                }
            } else {
                if(this.lastPoint.length<5){
                    this.msg="至少绘制5个点";
                    this.resetHidden = false;
                    this.titleColor = "";
                   this.changeDraw()
                
                }else{
                    this.pswObj.step = 1;
                    this.pswObj.fpassword = psw;
                    this.titleColor = "";
                    this.title = "第二次手势密码设置";
                    this.msg='';
                }
                
            }

        }
        wxlocker.prototype.makeState = function() {
            if (this.pswObj.step == 2) {
                this.resetHidden = true;
                this.title = "忘记手势密码";
                this.titleColor = "succ";
                this.msg=''
            } else if (this.pswObj.step == 1) {
                this.title="第二次手势密码设置";
                this.resetHidden = false;
               
                this.titleColor = "";
                this.msg=''
            } else {
                this.title="第一次手势密码设置";
                this.resetHidden = false;
                this.titleColor = "";
                
                this.msg=''
            }
        }
        wxlocker.prototype.updatePassword = function(){//点击重置按钮，重置密码
            wx.removeStorageSync("passwordxx");
            wx.removeStorageSync("signNum");
            // wx.removeStorageSync("chooseType");
            this.pswObj = {};
            this.title="第一次手势密码设置";
            this.resetHidden = false;
            this.titleColor = "";
            this.msg='';
            this.reset();
        }
        wxlocker.prototype.init = function() {//初始化锁盘
            this.pswObj = wx.getStorageSync('passwordxx') ? {
                step: 2,
                spassword: JSON.parse(wx.getStorageSync('passwordxx'))
            } : {};
            this.lastPoint = [];//记录手指经过的圆圈
            this.makeState();
            this.touchFlag = false;
            this.resetHidden=false
            this.ctx = wx.createCanvasContext('locker',this);
            // this.ctx = wx.createContext();//创建画布
            this.createCircle();//画圆圈
        }
        
        wxlocker.prototype.reset = function() {
            this.createCircle();
        }
        //适配不同屏幕大小的canvas
        wxlocker.prototype.setCanvasSize = function(){
             var size={};
                try {
                    var res = wx.getSystemInfoSync();
                    var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
                    var width = res.windowWidth/scale;
                    var height = width;//canvas画布为正方形
                    size.w = width;
                    size.h = height;
                } catch (e) {
                    // Do something when catch error
                    console.log("获取设备信息失败"+e);
                } 
            return size;
        }
        wxlocker.prototype.bindtouchstart = function(e){
            if(e.touches.length==1){
                var self = this;
                var po = self.getPosition(e);
                for (var i = 0 ; i < self.arr.length ; i++) {
                    //判断手指触摸点是否在圆圈内
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                        self.touchFlag = true;
                        // self.drawPoint();
                        self.drawPoint(self.arr[i].x, self.arr[i].y);
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                }
            }
          
        }
        wxlocker.prototype.bindtouchmove = function(e){
            // console.log(e)
            if(e.touches.length==1){
               var self = this;
               if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
            }
            // wx.drawCanvas({
            //     canvasId: "locker",
            //     actions: this.ctx.getActions(),
            //     reserve:true
            // });
        }
        wxlocker.prototype.bindtouchend = function(e,cb){
            var self = this;
            if (self.touchFlag) {
                self.touchFlag = false;
                self.storePass(self.lastPoint,cb);
                setTimeout(function(){
                        self.reset();
                }, 1000);
            }
        }
        
        module.exports = {
            lock:new wxlocker()
        }
})();