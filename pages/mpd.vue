<template>

    <section class="box-intro">
        <div class="table-cell">
            <h1 class="box-headline letters rotate-2">
                <span class="box-words-wrapper">
                    <b class="is-visible">MPD.</b>
                    <b>knowledge.</b>
                    <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CODE.</b>
                </span>
            </h1>
            <h5>The best IT club in FizMat</h5>
        </div>
    </section>
    <hr/>
    <div class="container main-container clearfix"> 
    <div class="col-md-6">
        <h3 class="uppercase">About US</h3>
        <h5>Клуб, где все можно сделать своими руками</h5>
        <div class="h-30"></div>
        <p class="contact-text">Мы хотим отойти от стандартных основ олимпиадного программирования и давать основу для продвижения в друге сферы такие как создание сайтов, серверные приложения, парсинг, мобильные приложение и тд
            Этот клуб разовьет желание учеников создавать различные проекты объединяться в группы. Мы хотим пропагандировать и давать базу для людей которые хотят начать програмиировать, но не могут потому-что они не понимают с чего начать обучение, мы будем давать статьи и помогать развиться учащемуся для достижение своей цели.</p>
    </div>
    <div class="col-md-6">

    </div>
</div>
<hr/>
<div class="container main-container">
    <div class="col-md-4">
        
    </div>
    <div class="col-md-8">
        <h3 class="text-uppercase">contact us</h3>
        <div class="h-30"></div>
        <p class="contact-text">Как вступить в клуб, время проведения, дальнейшие распорядки можно узнать по данным контактам:</p>
        <div class="contact-info">
            <a href="tel:+77077626672"><p><i class="ion-android-call"></i> +7 707 762 6672</p></a>
            <a href="tel:+77077220888"><p><i class="ion-android-call"></i> +7 707 722 0888</p></a>
            <a href="mailto:torossyan.david@mail.ru"><p><i class="ion-ios-email"></i> torossyan.david@mail.ru</p></a>
            <a href="mailto:aidaruly.ali2006@mail.ru"><p><i class="ion-ios-email"></i> aidaruly.ali2006@mail.ru</p></a>
            <div class="h-10"></div>
            <p>• Наши группы:</p>
            <ul class="social-ul">

            </ul>
        </div>
    </div>
</div>
</template>

<script>
useHead({
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.0.1/css/ionicons.min.css' },{ rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'} ]
})
jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2000,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 20,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();
	

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.box-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.box-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.box-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.box-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .box-words-wrapper the width of its longest word
				var words = headline.find('.box-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.box-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.box-headline').hasClass('type')) {
			var parentSpan = $word.parent('.box-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.box-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.box-headline').hasClass('clip')) {
			$word.parents('.box-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.box-headline').hasClass('loading-bar')){
			$word.parents('.box-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.box-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.box-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.box-headline').hasClass('clip')) {
			$word.parents('.box-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		} else if($bool) { 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) { 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		} else { 
			if($word.parents('.box-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.box-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});
</script>

<style scoped>


@import url(https://fonts.googleapis.com/css?family=Poppins:400,500,600,700);

html,
body {
    background-color: #1c2128;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    line-height: 1.8;
    color: #22272e;
}
html,
body {
    background-color: #1c2128;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    line-height: 1.8;
    color: #22272e;
}
.no-padding {
    padding-left: 0;
    padding-right: 0;
}

.no-padding [class^="col-"] {
    padding-left: 0;
    padding-right: 0;
}

.main-container {
    padding: 100px 0;
}

.center {
    text-align: center;
}

a {
    -webkit-transition: all .3s;
    transition: all .3s
}

.uppercase {
    text-transform: uppercase;
}

.h-30 {
    height: 30px
}

.h-10 {
    height: 10px
}

.color {
    color: #ffbf00;
    font-size: 11px;
}


/* typography
==================================================*/

h1 {
    color: #adbabd;
    font-size: 60px;
    text-transform: uppercase;
}

p{
    color: #adbabd;
}
h3 {
    color: #adbabd;
}

h5 {
    color: #ffbf00;
}


/* preloader
==================================================*/


/* headr
==================================================*/



/* box-intro
==================================================*/

.box-intro {
    text-align: center;
    display: table;
    height: 100vh;
    width: 100%;
}

.box-intro .table-cell {
    display: table-cell;
    vertical-align: middle;
}

.box-intro em {
    font-style: normal;
    text-transform: uppercase
}

b i:last-child {
    color: #ffbf00 !important;
}

.box-intro h5 {
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #999;
    line-height: 1.7
}


/* mouse effect */

.mouse {
    position: absolute;
    width: 22px;
    height: 42px;
    bottom: 40px;
    left: 50%;
    margin-left: -12px;
    border-radius: 15px;
    border: 2px solid #888;
    -webkit-animation: intro 1s;
    animation: intro 1s;
}

.scroll {
    display: block;
    width: 3px;
    height: 3px;
    margin: 6px auto;
    border-radius: 4px;
    background: #888;
    -webkit-animation: finger 2s infinite;
    animation: finger 2s infinite;
}

@-webkit-keyframes intro {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes intro {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@-webkit-keyframes finger {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
    }
}

@keyframes finger {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
    }
}


/* text rotate */

.box-headline {
    font-size: 130px;
    line-height: 1.0;
}

.box-words-wrapper {
    display: inline-block;
    position: relative;
}

.box-words-wrapper b {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    left: 0;
    top: 0;
}

.box-words-wrapper b.is-visible {
    position: relative;
}

.no-js .box-words-wrapper b {
    opacity: 0;
}

.no-js .box-words-wrapper b.is-visible {
    opacity: 1;
}

.box-headline.rotate-2 .box-words-wrapper {
    -webkit-perspective: 300px;
    perspective: 300px;
}

.box-headline.rotate-2 i,
.box-headline.rotate-2 em {
    display: inline-block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.box-headline.rotate-2 b {
    opacity: 0;
}

.box-headline.rotate-2 i {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-20px) rotateX(90deg);
    transform: translateZ(-20px) rotateX(90deg);
    opacity: 0;
}

.is-visible .box-headline.rotate-2 i {
    opacity: 1;
}

.box-headline.rotate-2 i.in {
    -webkit-animation: box-rotate-2-in 0.4s forwards;
    animation: box-rotate-2-in 0.4s forwards;
}

.box-headline.rotate-2 i.out {
    -webkit-animation: box-rotate-2-out 0.4s forwards;
    animation: box-rotate-2-out 0.4s forwards;
}

.box-headline.rotate-2 em {
    -webkit-transform: translateZ(20px);
    transform: translateZ(20px);
}

.no-csstransitions .box-headline.rotate-2 i {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 0;
}

.no-csstransitions .box-headline.rotate-2 i em {
    -webkit-transform: scale(1);
    transform: scale(1);
}

.no-csstransitions .box-headline.rotate-2 .is-visible i {
    opacity: 1;
}

@-webkit-keyframes box-rotate-2-in {
    0% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(90deg);
    }
    60% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(-10deg);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(0deg);
    }
}

@keyframes box-rotate-2-in {
    0% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(90deg);
        transform: translateZ(-20px) rotateX(90deg);
    }
    60% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(-10deg);
        transform: translateZ(-20px) rotateX(-10deg);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(0deg);
        transform: translateZ(-20px) rotateX(0deg);
    }
}

@-webkit-keyframes box-rotate-2-out {
    0% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(0);
    }
    60% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(-100deg);
    }
    100% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(-90deg);
    }
}

@keyframes box-rotate-2-out {
    0% {
        opacity: 1;
        -webkit-transform: translateZ(-20px) rotateX(0);
        transform: translateZ(-20px) rotateX(0);
    }
    60% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(-100deg);
        transform: translateZ(-20px) rotateX(-100deg);
    }
    100% {
        opacity: 0;
        -webkit-transform: translateZ(-20px) rotateX(-90deg);
        transform: translateZ(-20px) rotateX(-90deg);
    }
}


/* portfolio section
==================================================*/

/* footer
==================================================*/

footer {
    padding: 30px 0;
    text-align: center;
    background: #22272e;
}

.copyright {
    color: #ccc;
    margin-bottom: 0;
}

footer img {
    margin: 0 auto;
}


/* backto top
==================================================*/

.cd-top {
    display: inline-block;
    height: 40px;
    width: 40px;
    position: fixed;
    bottom: 20px;
    line-height: 40px;
    font-size: 20px;
    right: 10px;
    text-align: center;
    color: #fff;
    background: rgba(255, 191, 0, 0.8);
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity .3s 0s, visibility 0s .3s;
    transition: opacity .3s 0s, visibility 0s .3s;
}

.cd-top.cd-is-visible,
.cd-top.cd-fade-out,
.no-touch .cd-top:hover {
    -webkit-transition: opacity .3s 0s, visibility 0s 0s;
    transition: opacity .3s 0s, visibility 0s 0s;
}

.cd-top.cd-is-visible {
    /* the button becomes visible */
    visibility: visible;
    opacity: 1;
}

.cd-top.cd-fade-out {
    opacity: .5;
}

.no-touch .cd-top:hover,
.no-touch .cd-top:focus {
    background-color: #ffbf00;
    opacity: 1;
    color: #000;
}


/* About page
==================================================*/

.top-bar {
    color: #333;
    padding: 150px 0 150px;
    background: -webkit-linear-gradient( rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(../img/01.jpg);
    background: linear-gradient( rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(../img/01.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    text-align: center;
}

.top-bar h1 {
    font-size: 60px;
    text-transform: uppercase;
    font-weight: 700;
    color: #999;
    line-height: 50px;
}

.top-bar p {
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 500;
    color: #777;
}

.top-bar p a {
    color: #777;
}

.top-bar p a:hover,
.top-bar p a:focus {
    color: #555;
    text-decoration: none;
}

.social-ul {
    list-style: none;
    display: inline-block;
    padding-left: 0;
}

.social-ul li {
    margin: 0 10px;
    float: left;
}

.social-ul li a {
    font-size: 25px;
    color: #555;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.social-ul li a:hover {
    color: #888;
}


/* Services page
==================================================*/

.size-50 {
    font-size: 50px;
}

.service-box {
    margin-bottom: 30px;
}

.service-box h3 {
    margin-top: 0;
}


/* Responsive media queries
==================================================*/

@media (max-width: 991px) {
    .portfolio .categories-grid span {
        margin-bottom: 0;
        text-align: center;
        width: 100%;
    }
    .portfolio .categories-grid .categories ul li {
        text-align: center;
    }
    .portfolio .categories-grid .categories ul li a {
        margin-left: 0;
    }
    .col-md-6 h3 {
        margin-top: 30px;
    }
}

@media only screen and (max-width: 670px) {
    .box-headline {
        font-size: 100px;
    }
    .box-intro h5 {
        font-size: 12px;
    }
    .box-primary-nav a {
        padding: 5px 1em;
        font-size: 14px;
    }
    .box-primary-nav {
        padding: 80px 0 0;
    }
    .box-primary-nav .box-social a {
        font-size: 23px;
    }
    .top-bar h1 {
        font-size: 40px;
        line-height: 30px;
    }
    .portfolio .categories-grid .categories ul li {
        float: none;
    }
}

@media only screen and (max-width: 520px) {
    .box-headline {
        font-size: 80px;
    }
    .box-intro h5 {
        font-size: 12px;
    }
    .main-container {
        padding: 20px 0;
    }
}

@media only screen and (max-width: 420px) {
    .box-headline {
        font-size: 50px;
    }
    .box-intro h5 {
        font-size: 12px;
    }
    .top-bar h1 {
        font-size: 30px;
        line-height: 30px;
    }
}

body::-webkit-scrollbar {
    width: 0px;
}

body.thin::-webkit-scrollbar {
    width: 0px;
}

section {
    position: relative; }
  
.section-content {
padding-top: 80px;
padding-bottom: 80px; }
.title-wrap,
.section-title {
  text-align: center; }

.overlay.bg-white {
color: #000; }
.overlay.bg-white:before {
    background: #fff;
    opacity: .7; }
    hr {
        border: none; /* Убираем границу */
        background-color: gray; /* Цвет линии */
        color: gray; /* Цвет линии для IE6-7 */
        height: 2px; /* Толщина линии */
        margin-left: 5%;
        margin-right: 5%;
       }
</style>