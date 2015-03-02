<?php

use Symfony\Component\Yaml\Yaml;

require_once 'vendor/autoload.php';

/**
 * User: Victor Häggqvist
 * Date: 3/1/15
 * Time: 9:30 PM
 */

$loader = new Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new Twig_Environment($loader);
$twig->addGlobal('projectname','Selfhosted');

$configFile = 'src/conf.yml';

function sectionFile($section) {
  return file_get_contents('src/'.$section.'.yml');
}

$conf = Yaml::parse(file_get_contents('src/conf.yml'));
$sections = $conf['sections'];

$renderBlob = array();

foreach ($sections as $sec) {
  $section = Yaml::parse(sectionFile($sec));
  $renderBlob[] = $section;
//  var_dump($section);
}

//var_dump($conf);

$view = $twig->render('base.twig', array('sections' => $renderBlob));

echo $view;

?>
