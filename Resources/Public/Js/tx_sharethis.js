var tx_sharethis = {
	init:function() {
		/**
		 * load javaScript (we load it here because so we can change between the protocols 'HTTP' and 'HTTPS')
		 */
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol + '//w.sharethis.com/button/buttons.js';
		document.getElementById('tx_sharethis_javascriptPlaceholder').appendChild(e);

		/**
		 * set options (we has defined them inside the plugin-template Resources/Private/Templates/Button/Index.html)
		 */
		stLight.options({
			publisher: publisherId
		});
	}
}

$(document).ready(function() {
	tx_sharethis.init();
});