define(['jqueryColor'], function() {
  var chsService = function($window, maxScoreService) {
    var type = 'chs';
    var sTimer = null; // timeInterval timer
    var msTimer = null; 
    var SuccessCounter = 0; //全局正确次数 全局变量大驼峰
    var ErrCounter = 0; //全局错误次数 
    var obj ={
      score: 0, 
      totleTime: 10,
      backTime: 10,
      errorCount : 0, //3次错误机会
      start: false, // 是否开始
      initCell: function() {
        this.score = 0;
        this.totleTime = 10;
        this.errorCount = 0; //3次错误机会
        this.backTime = 10;
        SuccessCounter = 0; //全局正确次数 全局变量大驼峰
        ErrCounter = 0; //全局错误次数
        var list = $('.chs-cell-item');
        var arr = [];
        var len = list.length;
        for(var i = 0; i < len; i++) {
          arr.push(i);
        }
        for(i = 0; i < len; i++) {
          var index = Math.floor(Math.random() * arr.length); // [0, 25)
          list.eq(i).find('.cell-data').text(arr[index]);
          arr.splice(index, 1);
        }

      },
      updateCell: function() {
        var min = 0;
        var max = 24;
        var self = this;
        $('body').off('click', '.chs-cell-item');
        $('body').on('click', '.chs-cell-item', function() {
        // self.totleTime = $('.time-down-num').text();
          if($(this).text() == min) {
            SuccessCounter++;
            min++;
            max++;
            obj.score++;
            // SuccessCounter % 5 == Math.round(Math.randon() * 4)
            var numArr = [0,1,2,3,4];
            console.log(SuccessCounter % 5);
            // console.log(Math.round(Math.random() * 5));
            if(SuccessCounter % 3 == Math.round(Math.random() * 5)) {
              console.log('dropBall');
              self.dropBall();
            }
            $(this).text(max);
            self.sucessClickAnim();
            $('.score span').text(obj.score);
          } else {
            var that = $(this);
            if(self.start) {
              ErrCounter++;
              self.errorClickAnim(that);
            }            
          }
        });


      },
      init: function() {
        this.initCell();
        this.updateCell();
        this.touchStart();
        // this.dropBall();
      },

      //touch start
      // 点击任意cell开始
      touchStart: function() {
        var self = this;
        this.start = false;
        this.totleTime = this.backTime;
        $('body').one('click', '.chs-cell-item', function(event) {
          self.start = true;
          self.timeDown();
          self.msTimeDown();
          $( this ).off( event );
          event.stopPropagation();
        });
      },

      //time down
      timeDown: function() {
        this.totleTime -= 1;
        var counter = this.totleTime;
        $('.time-down-num').text(counter);

        sTimer = setInterval(function() {
          if(counter <= 1) {
            clearInterval(sTimer);
          } else {

          }
          --counter;
          $('.time-down-num').text(counter);
        }, 1000);
      },
      msTimeDown: function(cont) {
        // var counter = 100;
        var cont = cont || false;
        if(cont) {
          var counter = $('.time-down-ms-num').text() || clearInterval(msTimer);
        } else {
          var counter = 100;
        }
        var self = this;
        // var secTime = parseInt($('.time-down-num').text());
        msTimer = setInterval(function() {
          //dom 缓存
          // 减少dom使用
          var secTime = isNaN(parseInt($('.time-down-num').text())) ? 
                        self.reset() : parseInt($('.time-down-num').text());
          if(counter <= 1) {
            if(secTime > 0) {
              counter = 100;
            } else {
              self.gameOver();
            }
          }
          --counter; //位置
          $('.time-down-ms-num').text(counter);
        }, 10)
      },

      //
      unbindHandleClick: function() {
        $('body').off('click', '.chs-cell-item');
      },

      sucessClickAnim: function() {
        var tar = $('body');
          var i = $("<b>").text("+" + 1);
          var y = event.pageY, x = event.pageX;
          i.css({
              top: y-50,
              left: x,
              "font-size": "24px",
              "font-weight": "400",
              position: "absolute",
              'z-index': '999', 

              color: "red"
          });
          tar.append(i);
          i.animate({
              top: y-150,
              left: x,
              opacity: 0,
              "font-size": "1.4em"
          }, 600,function(){ i.remove(); });

          event.stopPropagation();
      },
      reset: function() {
        console.log('reset speed');
        clearInterval(msTimer);
        clearInterval(sTimer);
        $('body').off('click', '.base-cell-item'); //base-cell-item


      },
      handleBack: function() {
        ionic.Platform.ready(function() {
          if(window.cordova) {
            document.addEventListener("backbutton", function() {
              this.reset();
            }, false);
          } else {
          }
        });
      },
      errorClickAnim: function(that) {
        this.errorCount ++;
        if(this.errorCount == 3 && this.start) {
          this.gameOver();
        }
        that.animate({
              backgroundColor: "red"
          }, 150, function() {
              var self = that;
              setTimeout(function(){
                  self.css("background", "");
              },50);
          });
      },
      // animate ball to add time

      //extTime 增加的菜单时间
      //彩蛋策略：
      /**
       *  1. 球分数4-9分之间
       *  2. 特殊彩蛋，每2-8个有一个特殊彩蛋(炸弹和时间的比例一样)
       *  3. 下个彩蛋出来之后，上一个立刻隐藏。
       * 
       */
      dropBall: function(extTime) {
        // var extTime = extTime || 3;
        console.log('dropBall - extTime');
        var extTime = Math.round(Math.random() * 8) + 1;
        //代优化， 宽度配置
        var randomLeft = Math.round(Math.random() * (window.innerWidth - $('.ball').width())); 

        var dom = '<div class="ball" >' + extTime+ 'S</div>';
        var time = 10 - extTime; //time = 10 - added


        $('.pane').append(dom);
        var height = window.innerHeight;
        $('.ball').css('left', randomLeft + 'px').animate({
          top: "+=" + height
        }, 10000);
        this.getBall();
      }, //end dropBalll

      getBall: function() {
        var self = this;
        $('body').one('click', '.ball', function() {
          
          this.remove();
          var time = parseInt($(this).text());

        // self.totleTime = $('.time-down-num').text();
          self.totleTime = time + parseInt($('.time-down-num').text());

          clearInterval(sTimer);
          self.timeDown();
        })
      }, //end getBall

      //game over 
      gameOver: function(score) {
        $('.time-down-ms-num').text('00');
        var score = $('.score').text();
        clearInterval(msTimer);
        clearInterval(sTimer);
        maxScoreService.stroeMaxScore(score, type);
        this.unbindHandleClick();
        $window.location.href = '#/max-score';
      }


    };
    return obj;
  }

  return chsService;
})