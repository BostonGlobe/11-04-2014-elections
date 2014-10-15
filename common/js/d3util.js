module.exports = {

	moveToFront: function() {
		this.parentNode.appendChild(this);
	}

};