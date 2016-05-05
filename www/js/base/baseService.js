define(['jqueryColor'], function() {
    var baseService = function($window, $cordovaFile, $cordovaFileTransfer, $http, $location, maxScoreService) {
        console.log($cordovaFileTransfer);
        console.log(maxScoreService);
        // var girdItme = '<li class="col col-25 base-cell-item"></li>'
        var itemGroup = $('.base-cell-item');
        var sTimer = null; // timeInterval timer
        var msTimer = null; 
        var type = 'base';
        var obj = {
            score: 0,
            totleTime: 9,
            backTime: 9,
            url: 'http://192.168.1.113:3000/api/v1/img/maxScore',
            //image module 
            // @TODO 单独一个module
            getImage: function() {
                $http({
                    method: 'GET',
                    url: this.url
                }).then(function successCallback(data) {
                    console.log(data);
                }, function errorCallback(error) {
                    console.log(error);
                })
            },
            saveImage: function() {
                ionic.Platform.ready(function() {
                    if(window.cordova) {
                        var url = "http://statics.zhid58.com/img/zhidian_blue.png";
                        var targetPath = cordova.file.externalDataDirectory + "testImage.png";
                        var trustHosts = true
                        var options = {};

                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                          .then(function(result) {
                            // Success!
                            alert('success');
                          }, function(err) {
                            alert('err');
                            for(k in err) {
                                alert(k);
                                alert(err[k]);
                            }
                            // Error
                          }, function (progress) {
                            // $timeout(function () {
                            //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                            // })
                          }, false);
                    } else {
                        console.log('not deviceready');
                    }
                });
            },
            createRandomNum: function(base) {
                var base = base || 10;
                var num_one = Math.floor(Math.random() * base);
                var num_two = Math.floor(Math.random() * base);
                while(num_one === num_two) {
                    num_two = Math.floor(Math.random() * base);
                }
                return {
                    num_one: num_one,
                    num_two: num_two
                }
            },
            //create grid
            initInsertNum: function() {
                $('.base-cell-item').html('').removeClass('has-num right-cell wrong-cell');
                var index_one = Math.floor(Math.random() * 16);
                var index_two = Math.floor(Math.random() * 16);
                while(index_two === index_one) {
                    index_two = Math.floor(Math.random() * 16);
                }
                var randomNum = this.createRandomNum();
                var num_one = randomNum.num_one;
                var num_two = randomNum.num_two;

                //(num_two = [num_one, num_one = num_two][0]) swap two num
                (num_one > num_two) ? (num_two = [num_one, num_one = num_two][0]) : null;

                $('.base-cell-item').eq(index_one)
                               .addClass('has-num right-cell')
                               .attr('value', num_one)
                               .html('<span>' + num_one + '</span>');

                $('.base-cell-item').eq(index_two)
                               .addClass('has-num wrong-cell')
                               .attr('value', num_two)
                               .html('<span>' + num_two + '</span>');
            },

            handleClick: function() {
                this.unbindHandleClick();
                var self = this;
                $('body').on('click', '.right-cell', function(e) {
                    // count++;
                    // self.saveImage();
                    // alert('handleClick click right-cell');
                    var score = $('.score').text();
                    score++;
                    $('.score').text(score);
                    $('.base-cell-item').removeClass('click-right-ani');
                    $('.right-cell').addClass('click-right-ani');
                    self.sucessClickAnim();
                    var curNum = parseInt($('.right-cell').attr('value'));
                    $(this).attr('value', -1).html('').removeClass('has-num right-cell');
                    self.reDraw(curNum);
                });
                $('body').on('click', '.base-cell-item:not(.right-cell)', function() {
                    var that = $(this);
                    self.errorClickAnim(that);
                })
            },
            handleBack: function() {
                var self = this;
                ionic.Platform.ready(function() {
                    if(window.cordova) {
                        document.addEventListener("backbutton", function() {
                            self.reset();
                            clearInterval(sTimer);
                            clearInterval(Timer);
                            self.unbindHandleClick();
                        }, false);
                    } else {
                    }
                });
            },

            randomAgain: function(curNum, base) {
                var newNum = Math.ceil(Math.random() * 10) + 1;
                return newNum + curNum;
            },
            reDraw: function(curNum) {
                var n = n || 15;
                var index = Math.floor(Math.random() * n);
                var num = Math.floor(Math.random() * 10);
                var num = this.randomAgain(curNum);
                var wrong_num = parseInt($('.wrong-cell').attr('value'));

                while(wrong_num == num) {
                    num = this.randomAgain(curNum);
                }
                var expression = num;
                if(num > 40) {
                    expression = this.getExp(num);
                }
                var html = '<span>' + expression + '</span>';
                if(num < wrong_num) {
                    $('.base-cell-item:not(.wrong-cell)').eq(index)
                                                         .addClass('has-num right-cell')
                                                         .attr('value', num)
                                                         .html(html);
                } else {
                    $('.wrong-cell').addClass('right-cell');
                    $('.base-cell-item').removeClass('wrong-cell');//.addClass('right-cell');
                    $('.base-cell-item:not(.right-cell)').eq(index)
                                                         .addClass('has-num wrong-cell')
                                                         .attr('value', num)
                                                         .html(html);
                }
            },

            /**
             * 分解数字
             * @TODO 添加分解类型参数
             */
             getExp: function(num) {
                    n = num; 
                    k = 2; 
                    var arr = [];
                    var str = '';
                    while(k <= n) { 
                        if(k == n) {
                            str += (n).toString();
                            arr.push(n);
                            break;
                        } else if( n % k == 0) {
                            str += k + "*";
                            n = n / k;
                            arr.push(k);
                        } else {
                            k++; 
                        }
                    } 
                    var exp = this.arr2Exp(arr);
                    return exp;
                    // console.log(str);
             },
             arr2Exp: function(arr) {
                console.log(arr);
                if(arr.length == 1) {
                    return arr;
                } else {
                    //dichotomy
                    var dich = Math.floor(arr.length / 2);
                    // multiplier
                    var mult1 = 1;
                    var mult2 = 1;
                    for(var i = 0; i < dich; i++) {
                        console.log( i + '=' + arr[i]);
                        mult1 *= arr[i]; 
                    }
                    for(var i = dich; i < arr.length; i++) {
                        console.log( i + '=' + arr[i]);
                        mult2 *= arr[i];
                    }
                    console.log(mult1);
                    console.log(mult2);
                    var str = '';
                    str += mult1.toString();
                    str += '*';
                    str += mult2.toString();
                    return str;
                }
             },
            //倒计时模块 
            timeDown: function(cont) {
                var cont = cont || false;
                if(cont) {
                    var counter = $('.time-down-num').text();
                } else {
                    var counter = (this.totleTime)--;
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
                        if(secTime > 0) { //bug
                            counter = 100;
                        } else {
                            maxScoreService.stroeMaxScore($('.score').text(), type);
                            self.unbindHandleClick();
                            clearInterval(msTimer);
                            $window.location.href = '#/max-score';
                        }
                    }
                    --counter; //位置
                    $('.time-down-ms-num').text(counter);
                }, 10)
            },

            //start time 点击任意方块开始计时
            start: function(cont) {
                var self = this;
                this.totleTime = this.backTime;
                if(arguments.length == 0) {
                    $('body').on('click', '.base-cell-item', function() {
                        $('.time-down-num').text(--this.totleTime);
                        self.timeDown();
                        self.msTimeDown();
                        $('body').off('click', '.base-cell-item');
                    })  
                } else {
                    self.timeDown(cont);
                    self.msTimeDown(cont);
                }

            },

            refrest: function() {
                clearInterval(sTimer);
                clearInterval(msTimer);
                $('body').off('click', '*'); //base-cell-item
            },

            pause: function() {
                window.clearInterval(sTimer);
                window.clearInterval(msTimer);
            },
            reset: function() {
                // this.pause();
                $('body').off('click', '.base-cell-item'); //base-cell-item
                // this.initInsertNum();
                // this.start();
                // $('.time-down-num').text(totleTime);
                // $('.time-down-ms-num').text('00');
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
            unbindHandleClick: function() {
                $('body').off('click', '.right-cell');
                $('body').off('click', '.base-cell-item:not(.right-cell)');
            }

        }
        return obj;
    }

    return baseService;
});
