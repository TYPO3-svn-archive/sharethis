<?php
if (!defined ('TYPO3_MODE')) die ('Access denied.');
Tx_Extbase_Utility_Extension::registerPlugin(
	$_EXTKEY,
	'Pi1',
	'share this'
);

$TCA['tt_content']['types']['list']['subtypes_excludelist']['sharethis_pi1'] = 'layout,recursive,select_key,pages';
$TCA['tt_content']['types']['list']['subtypes_addlist']['sharethis_pi1'] = 'pi_flexform';
t3lib_extMgm::addPiFlexFormValue( 'sharethis_pi1', 'FILE:EXT:sharethis/Configuration/FlexForms/Button.xml');
//t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'JW Player JS Files');
?>