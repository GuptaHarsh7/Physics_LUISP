$(document).ready(function() {
    $(window).scroll(function(){
        let position = $(this).scrollTop();
        
        if(position>=80){
            $('.navbar').css({"position": "fixed","width": "100%"});
        }
        else{
            $('.navbar').css({"position": "sticky","width": "100%"});
        }
    })
  });