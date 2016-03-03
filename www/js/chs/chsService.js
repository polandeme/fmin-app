define(['jqueryColor'], function() {
  var chsService = function($window, maxScoreService) {
    var totleTime = 9;
    // var score = 0; 
    var type = 'chs';
    var obj ={
      score: 0, 
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
        console.log('test updateCell');
        var min = 0;
        var max = 24;
        var self = this;
        $('body').off('click', '.chs-cell-item');
        $('body').on('click', '.chs-cell-item', function() {
          if($(this).text() == min) {
            min++;
            max++;
            obj.score++;
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
        console.log('touchStart');
        var self = this;
        $('body').on('click', '.chs-cell-item', function(event) {
          self.timeDown();
          self.msTimeDown();
          $( this ).off( event );
          event.stopPropagation();
          // $('body').off('click', '*', function() {
          //   alert('off click');
          // });
        });
      },

      //time down
      timeDown: function(cont) {
        console.log('time down');
        var cont = cont || false;
        if(cont) {
          var counter = $('.time-down-num').text();
        } else {
          console.log(cont);
          console.log(totleTime);
          var counter = (totleTime)--;
          console.log(counter)
          $('.time-down-num').text(counter);
        }
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
              maxScoreService.stroeMaxScore($('.score').text(), type);
              self.unbindHandleClick();
              $window.location.href = '#/max-score';
            }
          }
          --counter; //位置
          $('.time-down-ms-num').text(counter);
        }, 10)
      },

      //
      unbindHandleClick: function() {
        $('body').off('click', '.chs-cell-item');
        $('body').off('click', '*');
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
    };
    return obj;
  }

  return chsService;
})