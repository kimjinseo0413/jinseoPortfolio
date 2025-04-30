// 00 Splitting 실행
Splitting();

// 01 메인 텍스트 애니메이션 설정값
const typoOptions = {
  large: { duration: 1.8, staggerEach: 0.08 },
  small: { duration: 0.8, staggerEach: 0.02 }
};

function animateCharSet(targetSelector, options = {}) {
  const { duration = 1.8, staggerEach = 0.08, y = 50, blur = 8 } = options;
  const chars = document.querySelectorAll(`${targetSelector} .char`);
  if (!chars.length) return;
  chars.forEach(char => {
    gsap.set(char, { opacity: 0, y: y, filter: `blur(${blur}px)` });
  });
  gsap.to(chars, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: duration,
    ease: 'power3.out',
    stagger: { each: staggerEach, from: "random" }
  });
}

function setTypoTrigger(selector, size = "small") {
  const opts = typoOptions[size];
  if (document.querySelector(selector)) {
    ScrollTrigger.create({
      trigger: selector,
      start: "top 80%",
      onEnter: () => animateCharSet(selector, opts),
      onEnterBack: () => animateCharSet(selector, opts)
    });
  }
}

if (document.querySelector(".visual .mainText")) {
  setTypoTrigger(".visual .mainText", "large");
}

if (document.querySelector(".aboutMeTit .mainText")) {
  setTypoTrigger(".aboutMeTit .mainText", "small");
}

if (document.querySelector(".workTit .mainText")) {
  setTypoTrigger(".workTit .mainText", "small");
}


// 03 Header 스크롤 이벤트
$(function(){
  var prevScrollTop = 0;
  document.addEventListener("scroll", function(){
    var nowScrollTop = $(window).scrollTop();
    if(nowScrollTop > prevScrollTop){
      $('header').addClass('active');
    } else {
      $('header').removeClass('active');
    }
    prevScrollTop = nowScrollTop;
  });
});

// 04 Visual 숫자 호버시 텍스트 활성화
$(function(){
  if ($('.visual .mainImg .text.ens').length > 0) {
    var $h2s = $('.visual .mainImg .text.ens li h2');
    var $inners = $('.visual .mainImg .text.ens li p.inner');
    $h2s.on('mouseenter focus', function(){
      var index = $h2s.index($(this));
      $inners.removeClass('on');
      $inners.eq(index).addClass('on');
    });
    $('.visual .mainImg .text.ens').on('mouseleave', function(){
      $inners.removeClass('on');
    });
  }
});

// 05 scrolla 애니메이션 실행
$(function(){
  $('.animate').scrolla({
    mobile: true,
    once: false
  }); 
});

// ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

// 06 aboutMe 섹션 upBox 애니메이션
if (document.querySelector('.aboutMe')) {
  const upBox = document.querySelectorAll('.upBox');
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.aboutMe',
      pin: true,
      scrub: 3,
      start: 'top top',
      end: '+=400%',
    }
  });
  tl.from(upBox, { y: '200%', duration: 8, ease: 'none', stagger: 7 });
  tl.to(upBox, { y: '0' });
  tl.to({}, { duration: 8 });
}

// 07 aboutMe 스킬 게이지바
if (document.querySelector('.aboutMe .skills')) {
  const skillBars = document.querySelectorAll('.aboutMe .skills .skill-meter .now');
  gsap.utils.toArray('.aboutMe .skills').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      scrub: 3,
      onEnter: () => {
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.setProperty('--target-width', targetWidth);
            bar.classList.add('animate-bar');
          }
        });
      }
    });
  });
}

// 08 work 섹션 가로 스크롤
$(function () {
  if (document.querySelector('.work')) {
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        setTimeout(() => {
          const workTit = document.querySelector(".work .Tit");
          if (workTit) {
            Splitting({ target: workTit }); 
            setTypoTrigger(".work .Tit", "small"); 
            ScrollTrigger.refresh(); 
          }
        }, 300); 

        const list = gsap.utils.toArray('.work ul li');
        const scrollTween = gsap.to(list, {
          xPercent: -100 * (list.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.work',
            pin: true,
            scrub: 1,
            start: 'center center',
            end: '300%',
          }
        });

        gsap.utils.toArray('.work ul li a .imgBox').forEach(function (imgBox) {
          gsap.timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'left 20%',
              scrub: true,
            }
          }).to(imgBox, { clipPath: 'inset(0%)', ease: 'none', duration: 1 }, 0);
        });

        gsap.utils.toArray('.work ul li a .textBox').forEach(function (textBox) {
          gsap.timeline({
            scrollTrigger: {
              trigger: textBox,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'left 20%',
              scrub: true,
            }
          }).to(textBox, { opacity: 1, x: -100 }, 0);
        });

        gsap.utils.toArray('.work ul li a .num').forEach(function (text) {
          const num = text.getAttribute('data-text');
          const counter = document.querySelector('.counter .now');
          ScrollTrigger.create({
            trigger: text,
            start: 'center center',
            end: 'center 20%',
            scrub: true,
            containerAnimation: scrollTween,
            onEnter: () => counter.innerText = num,
            onEnterBack: () => counter.innerText = num,
          });
        });
      }
    });
  }
});


// 09 QA 질문 (아코디언 토글)
if (document.querySelector('.quList')) {
  document.querySelectorAll('.quList .q').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('li');
      const img = btn.querySelector('.icon'); // icon div
      const imgTag = img.querySelector('img'); // 실제 img
      const isActive = li.classList.contains('active');

      // 모든 항목 닫기
      document.querySelectorAll('.quList li').forEach(item => {
        if (item !== li) {
          item.classList.remove('active');
          const otherBtn = item.querySelector('.q');
          const otherImg = item.querySelector('.icon img');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherImg.setAttribute('src', 'img/FAQ_button01.png');
          otherImg.style.transform = 'rotate(0deg)';
        }
      });

      // 현재 클릭한 항목 토글
      if (isActive) {
        // 닫기
        li.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        imgTag.setAttribute('src', 'img/FAQ_button01.png');
        imgTag.style.transform = 'rotate(0deg)';
      } else {
        // 열기
        li.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        imgTag.setAttribute('src', 'img/FAQ_button01.png');
        imgTag.style.transform = 'rotate(180deg)';
      }
    });
  });
}


//_10 workMain 모션 애니메이션 - 한 번만 실행
if (document.querySelector('.workMain.motion')) {
  const boxes = document.querySelectorAll('.workMain.motion .inner .box');
  const lastIndex = boxes.length - 1;

  boxes.forEach((box, index) => {
    box.style.animation = `textAni03 1.7s ease-out both ${1 + index}s`;

    
    if (index === lastIndex) {
      box.addEventListener('animationend', () => {
        box.style.animation = '';
        document.querySelector('.workMain.motion')?.classList.remove('motion');
      }, { once: true });
    }
  });
}


//_11 페이지 전환 시 첫 섹션으로 이동
window.addEventListener('load', function () {
  const path = window.location.pathname;
  let firstSection = null;

  if (path.includes('index.html') || path === '/' || path === '/index.html') {
    firstSection = document.querySelector('.visual');
  } else if (path.includes('aboutMePage.html')) {
    firstSection = document.querySelector('.intro');
  } else if (path.includes('workPage.html')) {
    firstSection = document.querySelector('.workTit');
  } else if (path.includes('contactPage.html')) {
    firstSection = document.querySelector('.contact');
  }

  if (firstSection) {
    setTimeout(() => {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }, 100); // 약간의 지연을 줘야 애니메이션과 충돌 방지 가능
  }
});
