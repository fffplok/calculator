//Every button is associated with a button element and has a value
var BtnCalc = function($el, val, x, y) {
		this.$el = $el;
		this.val = val;

    this.x = x || 0;
    this.y = y || 0;
};

BtnCalc.prototype.initInk = function() {
	this.$el.prepend("<span class='ink'></span>");

	this.$el.click(function(e){
		$el = $(this);

		var ink, d, x, y;

		ink = $el.find(".ink");

		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");

		//set size of .ink - in case of resize, get dimensions every time
		//use $el's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
		d = Math.max($el.outerWidth(), $el.outerHeight());
		ink.css({height: d, width: d});

		//get coordinates for ripple center
		//logic = click coordinates relative to page - $el's position relative to page - half of self height/width to make it controllable from the center;
		if (e.pageX === undefined) {
			//center of ink. used on keypress invokes click because event won't have a pageX or pageY value defined
			x = 0;
			y = -ink.height()/4;
		} else {
			x = e.pageX - $el.offset().left - ink.width()/2;
			y = e.pageY - $el.offset().top - ink.height()/2;
		}

		//set the position and add class .animate
		ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});

}

var BtnNumber = function($el) {
	BtnCalc.call(this, $el, parseInt($el.html()));
};

BtnNumber.prototype = Object.create(BtnCalc.prototype);
BtnNumber.prototype.constructor = BtnNumber;

var BtnOperator = function($el) {
	BtnCalc.call(this, $el, parseInt($el.html()));
};

BtnOperator.prototype = Object.create(BtnCalc.prototype);
BtnOperator.prototype.constructor = BtnOperator;

var BtnOperatorInstant = function($el) {
	BtnCalc.call(this, $el, parseInt($el.html()));
};

BtnOperatorInstant.prototype = Object.create(BtnCalc.prototype);
BtnOperatorInstant.prototype.constructor = BtnOperatorInstant;

var BtnEquals = function($el) {
	BtnCalc.call(this, $el, parseInt($el.html()));
};

BtnEquals.prototype = Object.create(BtnCalc.prototype);
BtnEquals.prototype.constructor = BtnEquals;

var keypad = (function() {
	var buttons = [], //let's make this an associative array

			api = {
				buttons: buttons,
				init: function() {
					var btnEls = document.getElementsByTagName('button'),
							$btn, ix;

					for (var i = 0; i < btnEls.length; i++) {
						$btn = $(btnEls[i]);
						ix = $btn.data('ix');
						console.log('i, ix, $btn', i, ix, $btn);
						if (!(isNaN(parseInt(btnEls[i].innerHTML)))) {
							buttons.push(new BtnNumber($btn));
						} else {
							buttons.push(new BtnCalc($btn, btnEls[i].innerHTML));
						}

						buttons[i].initInk();
						//buttons[ix].initInk(); //associative array
					}
				}
			};

		return api;
})();

//jQuery ready...
$(function() {
    keypad.init();
    //readout.init();
    //calculator.init();

    //keypress handler
		document.addEventListener('keyup', function(e) {
			//note that operators are from number pad
			var allowedKeys = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6",
        55: "7", 56: "8", 57: "9", 96: "0", 97: "1", 98: "2", 99: "3",
        100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9",
        106: "x", 107: "+", 109: "-", 110: ".", 111: "÷", 8: "backspace",
        13: "=", 46: "c", 67: "c"
	    };

	    /*
	    	additional key codes to consider:
	    		187 for =
	    		shiftKey + 187 for +
	    		189 for -
	    		shiftKey + 53 for %
	    		shiftKey + 56 for x (multiply)
	    */

	    console.log('e.shiftKey, e.altKey:', e.shiftKey, e.altKey);
	    console.log('e.keyCode, allowedKeys[e.keyCode]:', e.keyCode, allowedKeys[e.keyCode]);

	    //player.handleInput(allowedKeys[e.keyCode]);
	    //modal.handleInput(allowedKeys[e.keyCode]);
		});

});
