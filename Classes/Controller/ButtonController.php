<?php
/***************************************************************
 * Copyright notice
 *
 * (c) 2011 Juergen Kussmann <juergen.kussmann@aoemedia.de>, AOE media GmbH
 * 
 * All rights reserved
 *
 * This script is part of the TYPO3 project. The TYPO3 project is
 * free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * The GNU General Public License can be found at
 * http://www.gnu.org/copyleft/gpl.html.
 *
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * Controller for the Button object
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class Tx_Sharethis_Controller_ButtonController extends Tx_Extbase_MVC_Controller_ActionController {
	const UPLOAD_PATH = 'uploads/tx_sharethis/';

	/**
	 * @var array
	 */
	private $conf;

	/**
	 * default action
	 */
	public function indexAction() {
		if($this->getPublisherId() === '') {
			$this->forward ( 'publisherIdNotSet' );
		}

		// 1. load files
		$this->loadCssFiles();
		$this->loadJsFiles();

		// 2. add meta-tags
		if((boolean) $this->settings['add_metatags'] === TRUE) {
			$this->addMetaTag('metatag_title');
			$this->addMetaTag('metatag_description');
			$this->addMetaTag('metatag_image');
			$this->addMetaTag('metatag_type');
			$this->addMetaTag('metatag_sitename');
			$this->addMetaTag('metatag_email');
			$this->addMetaTag('og:url', $this->getUrlToShare());
		}

		// 3. assign data to view		
		$this->view->assign ( 'publisherId', $this->getPublisherId() );
		$this->view->assign ( 'showButtonForEmail', (integer) $this->settings['show_button_for_email'] );
		$this->view->assign ( 'showButtonForFacebook', (integer) $this->settings['show_button_for_facebook'] );
		$this->view->assign ( 'showButtonForTwitter', (integer) $this->settings['show_button_for_twitter'] );
		$this->view->assign ( 'showButtonForSharethis', (integer) $this->settings['show_button_for_sharethis'] );
		$this->view->assign ( 'shareTitle', $this->getTitleToShare() );
		$this->view->assign ( 'shareUrl', $this->getUrlToShare() );
		$this->view->assign ( 'addMetatags', (integer) $this->settings['add_metatags'] );
		$this->view->assign ( 'metatagTitle', $this->settings['metatag_title'] );
		$this->view->assign ( 'metatagDescription', $this->settings['metatag_description'] );
	}
	/**
	 * action which is called if publisher-ID is not set
	 */
	public function publisherIdNotSetAction() {
	}

	/**
	 * @param string $metaTag
	 * @param string $value
	 */
	protected function addMetaTag($metaTag, $value=NULL) {
		if($value !== NULL) {
			$metaTagKey = $metaTag;
			$metaTagVal = $value;
		} elseif(!empty($this->settings[$metaTag])) {
			switch($metaTag) {
				case 'metatag_title':
					$metaTagKey = 'og:title';
					$metaTagVal = $this->settings[$metaTag];
					break;
				case 'metatag_description':
					$metaTagKey = 'og:description';
					$metaTagVal = $this->settings[$metaTag];
					break;
				case 'metatag_sitename':
					$metaTagKey = 'og:site_name';
					$metaTagVal = $this->settings[$metaTag];
					break;
				case 'metatag_email':
					$metaTagKey = 'og:email';
					$metaTagVal = $this->settings[$metaTag];
					break;
				case 'metatag_image':
					$metaTagKey = 'og:image';
					$metaTagVal =  t3lib_div::getIndpEnv('TYPO3_SITE_URL') . self::UPLOAD_PATH . $this->settings[$metaTag];
					break;
				case 'metatag_type':
					$metaTagKey = 'og:type';
					$metaTagVal = $this->settings[$metaTag];
					break;
			}
		}

		if(!empty($metaTagKey) && !empty($metaTagVal)) {
			$GLOBALS['TSFE']->getPageRenderer()->addMetaTag( '<meta property="'.$metaTagKey.'" content="'.$metaTagVal.'"/>' );
		}
	}
	/**
	 * Initializes the controller before invoking an action method.
	 */
	protected function initializeAction() {
		$this->conf = unserialize ( $GLOBALS ['TYPO3_CONF_VARS'] ['EXT'] ['extConf'] ['sharethis'] );
	}
	/**
	 * load css-files
	 */
	protected function loadCssFiles() {
		$file = t3lib_extMgm::siteRelPath ( 'sharethis' ) . 'Resources/Public/Css/tx_sharethis.css';
		$GLOBALS ['TSFE']->getPageRenderer ()->addCssFile ( $file, 'stylesheet', 'screen', null);
	}
	/**
	 * load javascript-files
	 */
	protected function loadJsFiles() {
		$file = t3lib_extMgm::siteRelPath ( 'sharethis' ) . 'Resources/Public/Js/tx_sharethis.js';
		$GLOBALS ['TSFE']->getPageRenderer ()->addJsFile ( $file );
	}

	/**
	 * @return string
	 */
	private function getPublisherId() {
		return $this->conf['publisher_id'];
	}
	/**
	 * @return string
	 */
	private function getTitleToShare() {
		$title = '';
		if(!empty($this->settings['metatag_title'])) {
			$title = $this->settings['metatag_title'];
		} elseif(isset($GLOBALS['TSFE']) && isset($GLOBALS['TSFE']->page) && isset($GLOBALS['TSFE']->page['title'])) {
			$title = $GLOBALS['TSFE']->page['title'];
		}
		return $title;
	}
	/**
	 * @return string
	 */
	private function getUrlToShare() {
		$url = $this->settings['share_url'];
		if(empty($url)) {
			$url = t3lib_div::getIndpEnv('TYPO3_REQUEST_URL');
		}
		return $url;
	}
}
?>