/** @preserve jQuery animateNumber plugin v0.0.14
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */

// ['...'] notation using to avoid names minification by Google Closure Compiler
(function($) {
  var reverse = function(value) {
    return value.split('').reverse().join('');
  };

  var defaults = {
    numberStep: function(now, tween) {
      var floored_number = Math.floor(now),
          target = $(tween.elem);

      target.text(floored_number);
    }
  };

  var handle = function( tween ) {
    var elem = tween.elem;
    if ( elem.nodeType && elem.parentNode ) {
      var handler = elem._animateNumberSetter;
      if (!handler) {
        handler = defaults.numberStep;
      }
      handler(tween.now, tween);
    }
  };

  if (!$.Tween || !$.Tween.propHooks) {
    $.fx.step.number = handle;
  } else {
    $.Tween.propHooks.number = {
      set: handle
    };
  }

  var extract_number_parts = function(separated_number, group_length) {
    var numbers = separated_number.split('').reverse(),
        number_parts = [],
        current_number_part,
        current_index,
        q;

    for(var i = 0, l = Math.ceil(separated_number.length / group_length); i < l; i++) {
      current_number_part = '';
      for(q = 0; q < group_length; q++) {
        current_index = i * group_length + q;
        if (current_index === separated_number.length) {
          break;
        }

        current_number_part = current_number_part + numbers[current_index];
      }
      number_parts.push(current_number_part);
    }

    return number_parts;
  };

  var remove_precending_zeros = function(number_parts) {
    var last_index = number_parts.length - 1,
        last = reverse(number_parts[last_index]);

    number_parts[last_index] = reverse(parseInt(last, 10).toString());
    return number_parts;
  };

  $.animateNumber = {
    numberStepFactories: {
      /**
       * Creates numberStep handler, which appends string to floored animated number on each step.
       *
       * @example
       * // will animate to 100 with "1 %", "2 %", "3 %", ...
       * $('#someid').animateNumber({
       *   number: 100,
       *   numberStep: $.animateNumber.numberStepFactories.append(' %')
       * });
       *
       * @params {String} suffix string to append to animated number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      append: function(suffix) {
        return function(now, tween) {
          var floored_number = Math.floor(now),
              target = $(tween.elem);

          target.prop('number', now).text(floored_number + suffix);
        };
      },

      /**
       * Creates numberStep handler, which format floored numbers by separating them to groups.
       *
       * @example
       * // will animate with 1 ... 217,980 ... 95,217,980 ... 7,095,217,980
       * $('#world-population').animateNumber({
       *    number: 7095217980,
       *    numberStep: $.animateNumber.numberStepFactories.separator(',')
       * });
       * @example
       * // will animate with 1% ... 217,980% ... 95,217,980% ... 7,095,217,980%
       * $('#salesIncrease').animateNumber({
       *   number: 7095217980,
       *   numberStep: $.animateNumber.numberStepFactories.separator(',', 3, '%')
       * });
       *
       * @params {String} [separator=' '] string to separate number groups
       * @params {String} [group_length=3] number group length
       * @params {String} [suffix=''] suffix to append to number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      separator: function(separator, group_length, suffix) {
        separator = separator || ' ';
        group_length = group_length || 3;
        suffix = suffix || '';

        return function(now, tween) {
          var negative = now < 0,
              floored_number = Math.floor((negative ? -1 : 1) * now),
              separated_number = floored_number.toString(),
              target = $(tween.elem);

          if (separated_number.length > group_length) {
            var number_parts = extract_number_parts(separated_number, group_length);

            separated_number = remove_precending_zeros(number_parts).join(separator);
            separated_number = reverse(separated_number);
          }

          target.prop('number', now).text((negative ? '-' : '') + separated_number + suffix);
        };
      }
    }
  };
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
  $.fn.animateNumber = function() {
    var options = arguments[0],
        settings = $.extend({}, defaults, options),

        target = $(this),
        args = [settings];

    for(var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    }

    // needs of custom step function usage
    if (options.numberStep) {
      // assigns custom step functions
      var items = this.each(function(){
        this._animateNumberSetter = options.numberStep;
      });

      // cleanup of custom step functions after animation
      var generic_complete = settings.complete;
      settings.complete = function() {
        items.each(function(){
          delete this._animateNumberSetter;
        });

        if ( generic_complete ) {
          generic_complete.apply(this, arguments);
        }
      };
    }

    return target.animate.apply(target, args);
  };

}(jQuery));
(function ($) {
	$.fn.backToyourSeat = function(){
		this.transition({
			left: '',
			top: '',
			x: '-50%',
			y: '-50%',
			scale: 1,
			duration: 250
		});
	}
})(jQuery);
var Tenten = Tenten || {};
Tenten.init = function(){
	var self = this;
	// Make square
	var table = $("#table");
	this.square = [];
	for(var i = 0; i < 10; i++){
		self.square[i] = [];
		self.square[i][10] = $('<div class="tr"></div>');
		self.square[i][10].appendTo(table);
		for(var j = 0; j < 10; j++){
			self.square[i][j] = $('<div class="td" id="'+ i + j +'" data-active="false"></div>');
			self.square[i][j].appendTo(self.square[i][10]);
			self.square[i][j].css({
				opacity : 1
			});
		}
	}
	var puzzle = [];
	
	for(var i = 1; i <= 3; i++){
		puzzle[i] = [];
		puzzle[i][0] = $('<div class="pz" id="pz-'+i+'"></div>');
		puzzle[i][0].appendTo($("#puzzles"));
		puzzle[i][0].append($('<div class="wh-block bl-'+i+'" data-moved="false"></div>'));
	}
	/*
	for(var i = 1; i <= 3; i++){
		puzzle[i] = [];
		puzzle[i][0] = $('<div class="pz" id="pz-'+i+'"></div>');
		puzzle[i][0].appendTo($("#puzzles"));
		for(var j = 1; j <= 5; j++){
			puzzle[i][j] = [];
			puzzle[i][j][0] = $('<div class="tr"></div>');
			puzzle[i][j][0].appendTo(puzzle[i][0]);
			for(var k = 1; k <= 5; k++){
				square[i][j][k] = $('<div class="td" id="'+ i + j + k +'"></div>');
				square[i][j][k].appendTo(puzzle[i][j][0]);
				square[i][j][k].css({
					opacity : 1
				});
			}
		}
	}
	*/
	this.square.side = 30;
	var pz1 = $(".pz-1");
	var pz2 = $(".pz-2");
	var pz3 = $(".pz-3");
	this.round = 1;
	this.point = 0;
	$("#points").css('fontFamily', '"Raleway", Helvetica, sans-serif');
	$("#points").html(this.point);
	this.canplay = false;
	$(".pz .wh-block").draggable({
		start: function(e, ui){
			ui.helper.transition({
				scale: 1.5,
				duration: 250
			});
		},
		stop: function(e, ui){
			var top = Math.round((ui.helper.offset().top - table.offset().top) / (self.square.side + 2));
			var left = Math.round((ui.helper.offset().left - table.offset().left) / (self.square.side + 2));
			if(top < 0 || left < 0 || top > 9 || left > 9){
				ui.helper.backToyourSeat();
			} else {
				switch(ui.helper.attr('data-num')){
					case '1':
						var checkBlocks = [top+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '2A':
						var checkBlocks = [top+','+left, (top+1)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '2B':
						var checkBlocks = [top+','+left, top+','+(left+1)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3A':
						var checkBlocks = [top+','+left, (top+1)+','+left, (top+1)+','+(left+1)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3B':
						var checkBlocks = [top+','+left, top+','+(left+1), (top+1)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3C':
						var checkBlocks = [top+','+left, top+','+(left+1), (top+1)+','+(left+1)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3D':
						var checkBlocks = [top+','+(left+1), (top+1)+','+left, (top+1)+','+(left+1)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3E':
						var checkBlocks = [top+','+left, top+','+(left+1), top+','+(left+2)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '3F':
						var checkBlocks = [top+','+left, (top+1)+','+left, (top+2)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '4A':
						var checkBlocks = [top+','+left, top+','+(left+1), (top+1)+','+left, (top+1)+','+(left+1)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '4B':
						var checkBlocks = [top+','+left, top+','+(left+1), top+','+(left+2), top+','+(left+3)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '4C':
						var checkBlocks = [top+','+left, (top+1)+','+left, (top+2)+','+left, (top+3)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5A':
						var checkBlocks = [top+','+left, (top+1)+','+left, (top+2)+','+left, (top+2)+','+(left+1), (top+2)+','+(left+2)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5B':
						var checkBlocks = [top+','+left, top+','+(left+1), top+','+(left+2), (top+1)+','+left, (top+2)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5C':
						var checkBlocks = [top+','+left, top+','+(left+1), top+','+(left+2), (top+1)+','+(left+2), (top+2)+','+(left+2)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5D':
						var checkBlocks = [top+','+(left+2), (top+1)+','+(left+2), (top+2)+','+left, (top+2)+','+(left+1), (top+2)+','+(left+2)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5E':
						var checkBlocks = [top+','+left, top+','+(left+1), top+','+(left+2), top+','+(left+3), top+','+(left+4)];
						self.applyBlock(ui.helper, checkBlocks);
						break;
					case '5F':
						var checkBlocks = [top+','+left, (top+1)+','+left, (top+2)+','+left, (top+3)+','+left, (top+4)+','+left];
						self.applyBlock(ui.helper, checkBlocks);
						break;
				}
				
			}
		},
		opacity: 1,
		helper: '.pz',
		cursorAt: {left: 0, bottom: -80},
		containment: 'document'
	});
	
	this.makePuzzle();
}

Tenten.makePuzzleArray = function(){
	/*
	*   1  2A  2B  3A  3B  3C  3D  3E   3F  4A  4B   4C  5A   5B   5C   5D   5E     5F
	*   .  :   ..  :.  :'  ':  .:  ...  :   ::  .... :   :    ...  ...    :  .....  :
	*                                   .            :   ...  :      :  ...         :
	*                                                                               '
	*/
	var Puzzles = ['1', '2A', '2B', '3A', '3B', '3C', '3D', '3E', '3F', '4A', '4B', '4C', '5A', '5B', '5C', '5D', '5E', '5F'];
	var colors = ['#E57373', '#F48FB1', '#CE93D8', '#9FA8DA', '#BBDEFB', '#81C784', '#AED581', '#FFEE58', '#FFB74D', '#BCAAA4', '#B0BEC5'];
	selected = [];
	for(var i = 0; i < 3; i++){
		var n = Math.floor(Math.random() * Puzzles.length);
		selected[i] = {};
		selected[i].n = Puzzles[n];
		Puzzles.splice(n, 1);
	}
	for(var i = 0; i < 3; i++){
		var n = Math.floor(Math.random() * colors.length);
		selected[i].color = colors[n];
		colors.splice(n, 1);
	}
	return selected;
}
Tenten.makePuzzle = function(){
	var self = this;
	
	var pz = this.makePuzzleArray();
	for(var i = 0; i < 3; i++){
		var target = $("#pz-"+ (i+1) +" .wh-block");
		target.attr('data-num', pz[i].n);
		target.empty();
		switch(pz[i].n){
			case '1':
				target.append($('<div class="td key"></div>'));
				break;
			case '2A':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
			case '2B':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div></div>'));
				break;
			case '3A':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div><div class="td"></div></div>'));
				break;
			case '3B':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
			case '3C':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div></div><div class="tr"><div class="td disabled"></div><div class="td"></div></div>'));
				break;
			case '3D':
				target.append($('<div class="tr"><div class="td disabled"></div><div class="td key"></div></div><div class="tr"><div class="td"></div><div class="td"></div></div>'));
				break;
			case '3E':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div><div class="td"></div></div>'));
				break;
			case '3F':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
			case '4A':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div></div><div class="tr"><div class="td"></div><div class="td"></div></div>'));
				break;
			case '4B':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>'));
				break;
			case '4C':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
			case '5A':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div><div class="td"></div><div class="td"></div></div>'));
				break;
			case '5B':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div><div class="td"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
			case '5C':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div><div class="td"></div></div><div class="tr"><div class="td disabled"></div><div class="td disabled"></div><div class="td"></div></div><div class="tr"><div class="td disabled"></div><div class="td disabled"></div><div class="td"></div></div>'));
				break;
			case '5D':
				target.append($('<div class="tr"><div class="td disabled"></div><div class="td disabled"></div><div class="td key"></div></div><div class="tr"><div class="td disabled"></div><div class="td disabled"></div><div class="td"></div></div><div class="tr"><div class="td"></div><div class="td"></div><div class="td"></div></div>'));
				break;
			case '5E':
				target.append($('<div class="tr"><div class="td key"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>'));
				break;
			case '5F':
				target.append($('<div class="tr"><div class="td key"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div><div class="tr"><div class="td"></div></div>'));
				break;
		}
		$("#pz-"+ (i+1) +" .wh-block .td").css({background: pz[i].color});
		target.append($('<div class="padding"></div>'))
		target.removeAttr('style').css({display: 'none'});
		target.attr('data-moved', false);
		target.fadeIn();
	}
}
Tenten.isActiveBlock = function(id){
	var self = this;
	if(Array.isArray(id)){
		var f = 0;
		var t = 0;
		$.each(id, function(i, value){
			var axis = [];
			axis = value.split(",");
			if(axis[0] > 9){
				t++;
			} else {
				if((self.square[axis[0]][axis[1]].attr('data-active'))=="true"){
					t++;
				} else {
					f++
				}
			}
		});
		if(t > 0 && f != id.length){
			return true;
		} else {
			return false;
		}
		
	} else {
		var axis = [];
		axis = id.split(",");
		if((self.square[axis[0]][axis[1]].attr('data-active'))=="true"){
			return true;
		} else {
			return false;
		}
	}
}
Tenten.setActiveBlock = function(id){
	var self = this;
	if(Array.isArray(id)){
		$.each(id, function(i, value){
			var axis = [];
			axis = value.split(",");
			self.square[axis[0]][axis[1]].attr('data-active', true);
			
		});
	} else {
		var axis = [];
		axis = id.split(",");
		self.square[axis[0]][axis[1]].attr('data-active', true);
	}
}
Tenten.setBlockColor = function(id, color){
	var self = this;
	if(Array.isArray(id)){
		$.each(id, function(i, value){
			var axis = [];
			axis = value.split(",");
			self.square[axis[0]][axis[1]].css({background: color});
		});
	} else {
		var axis = [];
		axis = id.split(",");
		self.square[axis[0]][axis[1]].css({background: color});
	}
}
Tenten.applyBlock = function(ele, checkBlocks){
	var self = this;
	if(self.isActiveBlock(checkBlocks)){
		ele.backToyourSeat();
	} else {
		ele.transition({
			opacity: 0,
			duration: 100,
			complete: function(){
				this.css({display: 'none'});
			}
		});
		self.setActiveBlock(checkBlocks);
		self.setBlockColor(checkBlocks, ele.find(".td").css("background"));
		ele.attr('data-moved', true);
		self.addPoint(checkBlocks.length);
		$.each(checkBlocks, function(i, value){
			var x = 0;
			var y = 0;
			var axis = [];
			axis = value.split(',');
			for(var i = 0; i < 10; i++){
				if(self.isActiveBlock(axis[0]+','+i)){
					x++;
				}
				if(self.isActiveBlock(i+','+axis[1])){
					y++;
				}
			}
			if(x==10){
				for(var j = 0; j < 10; j++){
					self.square[axis[0]][j].attr('data-active', false);
					self.square[axis[0]][j].animateCss('bounceOut').css({background: ''});
				}
				self.addPoint(10);
			}
			if(y==10){
				for(var j = 0; j < 10; j++){
					self.square[j][axis[1]].attr('data-active', false);
					self.square[j][axis[1]].animateCss('bounceOut').css({background: ''});
				}
				self.addPoint(10);
			}
			if(x * y == 100){
				self.addPoint(-1);
			}
		});
		if($("#pz-1 .wh-block").attr('data-moved')=='true' && $("#pz-2 .wh-block").attr('data-moved')=='true' &&$("#pz-3 .wh-block").attr('data-moved')=='true'){
			self.makePuzzle();
		}
		
	}
}
Tenten.addPoint = function(p){
	var self = this;
	$("#points").prop('number', this.point).animateNumber({
		number: self.point+p
	});
	this.point = this.point+p;
}
$(function () {
	Tenten.init();
});