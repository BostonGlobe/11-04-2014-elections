var $linkbar = $('#elections-linkbar');

new ResizeSensor($linkbar, setBreakpointClasses);
setBreakpointClasses();

function setBreakpointClasses() {
	var w = $linkbar.width();
	$linkbar.toggleClass('linkbar-breakpoint-show-toggle',w<760);
}

$('.elections-linkbar__toggle').click(function() {
	var panel = $(this).data('panel');
	var alreadyActive = $(this).hasClass('elections-linkbar__toggle--active');
	$('.elections-linkbar__toggle--active').removeClass('elections-linkbar__toggle--active');
	$('.elections-linkbar__panel--active').removeClass('elections-linkbar__panel--active');
	if (!alreadyActive) {
		$('.elections-linkbar__toggle-'+panel).addClass('elections-linkbar__toggle--active');
		$('.elections-linkbar__panel-'+panel).addClass('elections-linkbar__panel--active')
			.find('input,select')
				.focus()
				.val("");
	}
});

