var Menu = ( function() {

	var m = function( parentMenu ) {
		this.parent = parentMenu;
		this.DOMElem = document.createElement("div");
	}

	m.prototype.addItem = function() {

	}

	m.prototype.createHTML = function(){

	}

	m.prototype.show = function() {
		this.DOMElem.style.display = "block";
	}

	m.prototype.hide = function() {
		this.DOMElem.style.display = "none";
	}

	return m;

}() );