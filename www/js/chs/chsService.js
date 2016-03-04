define(['jqueryColor'], function() {
  var chsService = function($window, maxScoreService) {
    var type = 'chs';
    var sTimer = null; // timeInterval timer
    var msTimer = null; 
    var obj ={
      score: 0, 
      totleTime: 9,
      backTime: 9,
      initCell: function() {
        this.score = 0;
        var list = $('.chs-cell-item');
        var arr = [];
        var len = list.length;
        for(var i = 0; i < len; i++) {
          arr.push(i);
        }
        for(i = 0; i < len; i++) {
          var index = Math.floor(Math.random() * arr.length); // [0, 25)
          list.eq(i).text(arr[index]);
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
            min++;
            max++;
            obj.score++;
            console.log(self);
            if(min == 3 || min == 7) {
              self.dropBall();
            }
            $(this).text(max);
            self.sucessClickAnim();
            $('.score span').text(obj.score);
          } else {
            var that = $(this);
            self.errorClickAnim(that);
          }
        });


      },
      init: function() {
        this.initCell();
        this.updateCell();
        this.touchStart();
      },

      //touch start
      // 点击任意cell开始
      touchStart: function() {
        var self = this;
        this.totleTime = this.backTime;
        $('body').on('click', '.chs-cell-item', function(event) {
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
        console.log(this);
        console.log('-----------');
        $('.time-down-num').text(counter);

        sTimer = setInterval(function() {
          if(counter <= 1) {
            clearInterval(sTimer);
          }
          --counter;
          $('.time-down-num').text(counter);
        }, 1000);
      },
      msTimeDown: function(cont) {
        // var counter = 100;
        var cont = cont || false;
        if(cont) {
          var counter = $('.time-down-ms-num').text();
        } else {
          var counter = 100;
        }
        var self = this;
        // var secTime = parseInt($('.time-down-num').text());
        msTimer = setInterval(function() {
          var secTime = parseInt($('.time-down-num').text());
          if(counter <= 1) {
            if(secTime > 0) {
              counter = 100;
            } else {
              clearInterval(msTimer);
              var score = $('.score').text();
              maxScoreService.stroeMaxScore(score, type);
              self.unbindHandleClick();
              // $window.location.href = '#/max-score';
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
      errorClickAnim: function(that) {
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
      dropBall: function(extTime) {
        // var extTime = extTime || 3;

        var extTime = Math.round(Math.random() * 8) + 1;
        //代优化， 宽度配置
        var randomLeft = Math.round(Math.random() * (window.innerWidth - $('.ball').width())); 

        var dom = '<div class="ball" >' + extTime+ 'S</div>';
        var time = 10 - extTime; //time = 10 - added


        $('body').append(dom);
        var height = window.innerHeight;
        $('.ball').css('left', randomLeft + 'px').animate({
          top: "+=" + height
        }, 9 * 1000);
        this.getBall();
      }, //end dropBalll

      getBall: function() {
        var self = this;
        $('body').one('click', '.ball', function() {
          
          this.remove();
          var time = parseInt($(this).text());
          console.log(time);

        // self.totleTime = $('.time-down-num').text();
          self.totleTime = time + parseInt($('.time-down-num').text());

          clearInterval(sTimer);
          self.timeDown();
        })
      } //end getBall

    };
    return obj;
  }

  return chsService;
})