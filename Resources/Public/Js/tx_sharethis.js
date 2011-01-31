var tx_sharethis = {
	init:function() {
		tx_sharethis.setOptions();
	},
	/**
	 * init stWidget (after javascript has created the frame with ID 'stLframe')
	 */
	initStWidget:function() {
		if(typeof window.frames.stLframe != 'object') {
			setTimeout('tx_sharethis.initStWidget()', 300);
		} else {
			stWidget.init();
		}
	},
	/**
	 * set options (we has defined them inside the plugin-template Resources/Private/Templates/Button/Index.html)
	 */
	setOptions:function() {
		if(typeof(stLight)!="undefined") {
			stLight.options({
				publisher: publisherId
			});
		} else {
			// wait, loading sharethis-API is not finished
			setTimeout("tx_sharethis.setOptions()", 500);
		}
	},
	/**
	 * reload sharethis-buttons (we need this if we use this plugin in AJAX-requests)
	 */
	reloadButtons:function() {
		if($('.tx_sharethis .button-bar span:first').html() == '') {
		    stButtons.makeButtons();
		    tx_sharethis.initStWidget();
		}
	}
}

$(document).ready(function() {
	tx_sharethis.init();
});