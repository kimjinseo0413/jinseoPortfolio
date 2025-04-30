//1.gnb 마우스오버,포커스시 밑줄 => span. bar
$(function(){
    $('.gnb li a').on('mouseenter focus', function(){
        var bar = $(this).position().left;
        var widNum = $(this).width();
        $('span.bar').css({'left' : bar + 'px', 'width' : widNum + 'px', 'opacity':1});
    });
    $('.gnb li a').on('mouseleave', function(){
        $('span.bar').css({'left':0, 'width':0, 'opacity':0});
    });
});

//2.circle box의 SVG길이 구하기
$(function(){
    $('.svgAnimate').find('path').each(function(i,path){
        var length = path.getTotalLength();
        //alert(length);
    });
});

//3.스크롤 애니메이션
$(function(){
    $('.animate').scrolla({
        mobile: true, // 모바일 버전시 활성화
        once: true // 스크롤시 딱 한 번만
    });
});

//4.배경색 변경
$(window).on('scroll resize',function(){
    var scrollTop = $(document).scrollTop();
    bgColor();
    function bgColor (){
        if(scrollTop > 1400){
            $('body').addClass('on');
        }else{
            $('body').removeClass('on');
        }
        if(scrollTop > 2700){
            $('body').removeClass('on');
        }
    }
});

//5.햄버거 메뉴
$(function(){
    $('.menuOpen button.open').on('click', function(){
        $('.menuOpen .menuWrap').addClass('on');
    });
    $('.menuOpen .menuWrap .close').on('click', function(){
        $('.menuOpen .menuWrap').removeClass('on');
    });
});












