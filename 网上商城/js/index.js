$("#skin li").on("click",function(){
       var skin=$(this).attr("id");
       $("#cssfile").attr("href","styles/skin/"+skin+".css");
       $(this).addClass("selected").siblings().removeClass("selected");
});
