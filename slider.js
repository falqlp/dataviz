$(document).ready(function(){
    var totalSlides = $('#slider .slide').length;
    var slideWidth = $('#slider .slide').width();
    var currentSlide = 0;
    var sliderInterval;

    $('#slider .slide').wrapAll('<div id="slidesHolder"></div>')
    $('#slidesHolder').css('width', slideWidth * totalSlides);

    function moveSlide() {
        if(currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        $('#slidesHolder').animate({marginLeft: -currentSlide * slideWidth}, 500);
    }

    $('#next').click(function(){
        moveSlide();
        resetInterval();
    });

    $('#prev').click(function(){
        if(currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
        }
        $('#slidesHolder').animate({marginLeft: -currentSlide * slideWidth}, 500);
        resetInterval();
    });

    function startSlider() {
        sliderInterval = setInterval(moveSlide, 10000);
    }

    function resetInterval() {
        clearInterval(sliderInterval);
        startSlider();
    }

    startSlider();
});
