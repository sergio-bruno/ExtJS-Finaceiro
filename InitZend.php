<?php
 
error_reporting(E_ALL);
ini_set('display_errors', 'off');

$dir = dirname(__FILE__);
date_default_timezone_set("America/Recife");
$webroot = $_SERVER['DOCUMENT_ROOT'];
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $configfile = "$dir/amf_config_win.ini";
} else {
    $configfile = "$dir/amf_config_linux.ini";
}
$servicesdir = $dir.'/gerador/services';
$librarydir = $dir.'/gerador/library';
//default zend install directory
$zenddir = $webroot.'/eHoplon/lib/ZendFramework/library';
//Load ini file and locate zend directory
if (file_exists($configfile)) {
    $arr = parse_ini_file($configfile, true);
    if (isset($arr['zend']['webroot'])) {
        $webroot = $arr['zend']['webroot'];
        $zenddir = $webroot.'/eHoplon/lib/ZendFramework/library';
    }
    if (isset($arr['zend']['zend_path'])) {
        $zenddir = $arr['zend']['zend_path'];
    }
    if (isset($arr['zend']['library'])) {
        $librarydir = $arr['zend']['library'];
    }
    if (isset($arr['zend']['services'])) {
        $servicesdir = $arr['zend']['services'];
    }
}
// Setup include path
// add zend directory, library and services to include path
set_include_path(get_include_path()
	.PATH_SEPARATOR.$zenddir
	.PATH_SEPARATOR.$librarydir
	.PATH_SEPARATOR.$servicesdir);
// Initialize Zend Framework loader
require_once 'Zend/Loader/Autoloader.php';
include('Zend/Db.php');
Zend_Loader_Autoloader::getInstance()->setFallbackAutoloader(true)->suppressNotFoundWarnings(true);
// Load configuration
$default_config = new Zend_Config(array("production" => false), true);
$default_config->merge(new Zend_Config_Ini($configfile, 'zendamf'));
$default_config->setReadOnly();
$amf = $default_config->amf;
// Store configuration in the registry
Zend_Registry::set("amf-config", $amf);

//Database
$dbConfig = new Zend_Config_Ini($configfile, 'database');
$db = Zend_db::factory($dbConfig);
Zend_Db_Table::setDefaultAdapter($db);

// Initialize AMF Server
$server = new Zend_Amf_Server();
$server->setProduction($amf->production);
if (isset($amf->directories)) {
    $dirs = $amf->directories->toArray();
    foreach ($dirs as $dir) {
        if ($dir == "./") {
            $server->addDirectory($webroot);
        } else 
            if (realpath("{$webroot}/{$dir}")) {
                $server->addDirectory("{$webroot}/{$dir}");
            } else 
                if (realpath($dir)) {
                    $server->addDirectory(realpath($dir));
                }
    }
}
// Initialize introspector for non-production
if (! $amf->production) {
    $server->setClass('Zend_Amf_Adobe_Introspector', '', 
    array("config" => $default_config, "server" => $server));
    $server->setClass('Zend_Amf_Adobe_DbInspector', '', 
    array("config" => $default_config, "server" => $server));
}

?>