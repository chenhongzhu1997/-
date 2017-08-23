requirejs.config({
    paths:{
        jquery:'jquery-1.12.4'
    }
});
define(["jquery"],function($){
    function Carousel(settings){
    this.$container=$('<div class="carousel-container"></div>');
    this.$tabs=$('<ul class="tabs"></ul>');
    this.$imgs=$('<div class="carousel-img"></div>');
    this.$arrows=$('<div class="carousel-arrow"></div>');
    this.$prev=$('<span class="prev">&lt;</span>');
    this.$next=$('<span class="next">&gt;</span>');
    this.defaultSettings={
        selector:document.body,
        imgArr:[],
        speed:1000,
        btnStyle:"square",
        arrowPos:"bottom"
    };
    $.extend(this.defaultSettings,settings);

    }
    Carousel.prototype.init=function() {
        this.$container.append(this.$tabs).append(this.$imgs).append(this.$arrows);
        this.$arrows.append(this.$prev).append(this.$next);
        for (var i = 0; i < this.defaultSettings.imgArr.length; i++) {
            var $li = $("<li></li>").html(i + 1);
            this.$tabs.append($li);
            var $img = $("<img />").attr("src", this.defaultSettings.imgArr[i]);
            this.$imgs.append($img);
        }
        if(this.defaultSettings.btnStyle=="circle"){
            $("li",this.$tabs).html("").css({
                borderRadius: "50%"
            });
        }
        this.$prev.addClass(this.defaultSettings.arrowPos);
        this.$next.addClass(this.defaultSettings.arrowPos);

        $("img", this.$imgs).eq(0).addClass("selected");
        $("li", this.$tabs).eq(0).addClass("selected");
        $(this.defaultSettings.selector).append(this.$container);

        var nowIndex = 0;
        $("li", this.$tabs).on("mouseover", function (e) {
            nowIndex = $(e.target).index();
            changImg.call(this);
        }.bind(this));
        this.$prev.on("click", function () {
            nowIndex--;
            if (nowIndex == -1) {
                nowIndex = this.defaultSettings.imgArr.length - 1;
            }
            changImg.call(this);
        }.bind(this));
        this.$next.on("click", function () {
            nowIndex++;
            if (nowIndex == this.defaultSettings.imgArr.length) {
                nowIndex = 0;
            }
            changImg.call(this);
        }.bind(this));
        function changImg() {
            $("li", this.$tabs).eq(nowIndex).addClass("selected").siblings().removeClass("selected");
            $("img", this.$imgs).eq(nowIndex).addClass("selected").siblings().removeClass("selected");
        }

        var timer;
        play.call(this);
        function play() {
            timer = setInterval(function () {
                this.$next.trigger("click");
            }.bind(this), this.defaultSettings.speed);
        }

        this.$container.hover(function () {
            clearInterval(timer);
        }, function () {
            play.call(this);
        }.bind(this));
    };
    return Carousel;
});
