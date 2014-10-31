'use strict';

$('.elections-nav__race-select').change(function() {
	location.href = $( this ).val();
});
