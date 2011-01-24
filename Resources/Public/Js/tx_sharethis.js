var tx_sharethis = {
	init:function() {
		tx_sharethis.loadJavaScript();
		tx_sharethis.setOptions();
	},
	/**
	 * load javaScript (we load it here because so we can change between the protocols 'HTTP' and 'HTTPS')
	 */
	loadJavaScript:function() {
		var e = document.createElement('script'); e.async = false;
		e.src = document.location.protocol + '//w.sharethis.com/button/buttons.js';
		document.getElementById('tx_sharethis_javascriptPlaceholder').appendChild(e);
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
			setTimeout("tx_sharethis.setOptions()", 500);
		}
	}
}

$(document).ready(function() {
	tx_sharethis.init();
});