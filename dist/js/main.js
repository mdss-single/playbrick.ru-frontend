(function($){
	"use strict";

	$(document).click(function(e) {
		if (!$(e.target).closest('.header__catalog-link').length) {
			$('.header__catalog-link').removeClass('header__catalog-link--active');
		}
		if (!$(e.target).closest('.header__catalog').length) {
			$('.header__catalog').removeClass('header__catalog--active');
		}
	});

	$(window).on('load resize', function() {
		if ($(window).width() <= 768) {
			$('.js-menu').click(function(e) {
				e.preventDefault();
				$('.menu').addClass('menu--active');
				if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
				$('html').css('overflow','hidden');
			});
			$('body').on('click', '.menu__cover, .menu__close', function(e) {
				e.preventDefault();
				$('.menu').removeClass('menu--active');
				$('.menu__cover').remove();
				$('html').css('overflow','auto');
			});
			$('body').swipe({
				swipeRight:function() {
					$('.menu').addClass('menu--active');
					if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
					$('html').css('overflow','hidden');
				},
				threshold:40,
				excludedElements:$.fn.swipe.defaults.excludedElements+', .js-slider, .js-viewed',
				preventDefaultEvents: false,
			});
			$('.menu').swipe({
				swipeLeft:function() {
					$('.menu').removeClass('menu--active');
					$('.menu__cover').remove();
					$('html').css('overflow','auto');
				},
				threshold:40,
			});
		}
	});

	$('.js-catalog').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('header__catalog-link--active');
		$(this).next().toggleClass('header__catalog--active');
	});

	$('.js-viewed').flickity({
		cellAlign: 'left',
		wrapAround: true,
		autoPlay: 4500,
		pageDots: false,
		arrowShape: { 
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20
		}
	});

	$('.js-slider').flickity({
		cellSelector: '.about-us__slider-item',
		autoPlay: 4500,
		wrapAround: true,
		pageDots: false,
		arrowShape: { 
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20
		}
	});

	$('.home-products__cats').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
			$(this).find('div').removeClass('home-products__cats-item--active').eq(storage).addClass('home-products__cats-item--active').closest('.home-products').find('.home-products__content').removeClass('home-products__content--active').eq(storage).addClass('home-products__content--active');
		}
	});
	$('.home-products__cats').on('click', 'div:not(.home-products__cats-item--active)', function() {
		$(this).addClass('home-products__cats-item--active').siblings().removeClass('home-products__cats-item--active').closest('.home-products').find('.home-products__content').removeClass('home-products__content--active').eq($(this).index()).addClass('home-products__content--active');
		var ulIndex = $('ul.tabs__caption').index($(this).parents('ul.tabs__caption'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	});

	$('.js-catalog-preview').fancybox({
		thumbs : {
        	autoStart: true,
        },
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE: 'Закрыть',
				ERROR: 'Невозможно загрузить данные. Попробуйте еще раз.',
				NEXT: 'Следующее',
				PREV: 'Предыдущее',
				FULL_SCREEN: 'На весь экран',
				THUMBS: 'Галерея'
			}
		}
	});

	$('.select, .radio, .checkbox').styler();

	$('.js-phone-mask').mask('+7 (999) 999-9999');

	$('.cart__product-count').on('click', function() {
		var $button = $(this);
		var oldValue = $button.closest('.cart__product-counter').find('.input-text').val();
		if ($button.hasClass('cart__product-count--plus')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		$button.closest('.cart__product-counter').find('.input-text').val(newVal);
	});

	$('.cart__form').validate({
		rules: {
			name: {
				required: true,
				minlength: 4,
			},
			email: {
				required: true,
				email: true
			},
			phone: 'required',
			address: {
				required: true,
				minlength: 10,
			},
			captcha_code: {
				required: true,
				minlength: 6,
			},
		},
		messages: {
			name: 'Пожалуйста введите ФИО',
			email: {
				required: 'Пожалуйста укажите ваш email',
				email: 'Ваш email адрес должен быть формата name@domain.ru',
			},
			phone: 'Укажите ваш номер телефона',
			address: 'Укажите адрес доставки',
			captcha_code: 'Введите код с картинки',
		}
	});

})(jQuery);