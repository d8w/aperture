/*
 * pixelate.js
 * 43081j
 * Pixelate images with ease
 * License: MIT
 */
(function(window, $) {
	var pixelate = function(arguments) {
		if(!this.src)
			return;

		var defaults = {
			value: 0.05,
			reveal: true,
			revealonclick: false
		};
		var options = {};

		if(arguments)
            for(var k in defaults)
                if(typeof arguments[k] !== undefined && arguments[k] != null)
                    options[k] = arguments[k];
                else
                    options[k] = defaults[k];

		var element = this, 
			elementParent = element.parentNode;
		if(element.style.display) {
            element.style.display = 'block';
		}
        if(element.offsetWidth == 0) {} // enforce applying the style to the image
		options = (function() {
			var opts = {};
			for(var k in defaults) {
				if(element.hasAttribute('data-' + k)) {
					opts[k] = element.getAttribute('data-' + k);
					continue;
				}
				if(k in options) {
					opts[k] = options[k];
					continue;
				}
				opts[k] = defaults[k];
			}
			return opts;
		})();
		var display = element.style.display,
			imgWidth = element.width,
			imgHeight = element.height,
			revealed = false;
		var canv = document.createElement('canvas');
		canv.width = imgWidth;
		canv.height = imgHeight;
		var ctx = canv.getContext('2d');
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		var width = imgWidth * options.value,
			height = imgHeight * options.value;
		ctx.drawImage(element, 0, 0, width, height);
		ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
		element.style.display = 'none';
        if(element.offsetWidth == 0) {} // enforce applying the style to the image
		/*
		 * Replace if exist, insert o.w.
		 */
		var previousNode=element.previousSibling;
		if(previousNode && previousNode.nodeName === 'CANVAS') {
            elementParent.replaceChild(canv, previousNode);
		} else {
            elementParent.insertBefore(canv, element);
		}

		if(options.revealonclick !== false && options.revealonclick !== 'false') {
			/*
			 * Reveal on click
			 */
			canv.addEventListener('click', function(e) {
				revealed = !revealed;
				if(revealed) {
					ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
				} else {
					ctx.drawImage(element, 0, 0, width, height);
					ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
				}
			});
		}
		if(options.reveal !== false && options.reveal !== 'false') {
			/*
			 * Reveal on hover
			 */
			canv.addEventListener('mouseenter', function(e) {
				if(revealed) return;
				ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
			});
			canv.addEventListener('mouseleave', function(e) {
				if(revealed) return;
				ctx.drawImage(element, 0, 0, width, height);
				ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
			});
		}
	};
	var depixelate = function() {
		var element = this, 
			elementParent = element.parentNode;
		if(element.style.display) {
            element.style.display = 'block';
		}
		var previousNode=element.previousSibling;
		if(previousNode && previousNode.nodeName === 'CANVAS')
            elementParent.removeChild(previousNode);
	};
	window.HTMLImageElement.prototype.pixelate = pixelate;
	if(typeof $ === 'function') {
		$.fn.extend({
			pixelate: function(args) {
				return this.each(function() {
                    pixelate.apply(this, [args]);
				});
			},
			depixelate: function() {
				return this.each(function() {
                    depixelate.apply(this);
				});
			}
		});
	}
	document.addEventListener('DOMContentLoaded', function(e) {
		var img = document.querySelectorAll('img[data-pixelate]');
		for(var i = 0; i < img.length; i++) {
			img[i].addEventListener('load', function() {
				this.pixelate();
			});
		};
	});
})(window, typeof jQuery === 'undefined' ? null : jQuery);

