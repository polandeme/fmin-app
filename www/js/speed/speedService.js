define(['jqueryColor'], function() {
  var speedService = function($window, maxScoreService) {
    var type = 'chs';
    var sTimer = null; // timeInterval timer
    var msTimer = null; 
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
        var list = $('.com-cell-item');
        var arr = [];
        var len = list.length;
        for(var i = 0; i < len; i++) {
          arr.push(i);
        }
        for(i = 0; i < 2; i++) {
          var index = Math.floor(Math.random() * arr.length); // [0, 25)
          list.eq(index).addClass('right');
          // arr.splice(index, 1);
        }

      },
      updateCell: function() {
        $(".com-cell-item").removeClass('right');
        var list = $('.com-cell-item');
        var arr = [];
        var len = list.length;
        for(var i = 0; i < len; i++) {
          arr.push(i);
        }
        for(i = 0; i < 2; i++) {
          var index = Math.floor(Math.random() * arr.length); // [0, 25)
          list.eq(index).addClass('right');
        }
      },
      init: function() {
        this.initCell();
        this.cellOut();
        // this.touchStart();
      },


      cellOut: function() {
        var self = this;
        $('body').on('click', '.right', function(e) {
          self.updateCell();
        });
      },
      //touch start
      // 点击任意cell开始
      touchStart: function() {
        var self = this;
        this.start = false;
        this.totleTime = this.backTime;
        $('body').one('click', '.com-cell-item', function(event) {
          self.start = true;
          event.stopPropagation();
        });
      },
      //
      unbindHandleClick: function() {
        $('body').off('click', '.com-cell-item');
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

        // self.totleTime = $('.time-down-num').text();
          self.totleTime = time + parseInt($('.time-down-num').text());

          clearInterval(sTimer);
          self.timeDown();
        })
      }, //end getBall

      //game over 
      gameOver: function(score) {
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

  return speedService;
})