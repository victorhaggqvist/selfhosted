<?php

use Symfony\Component\Yaml\Yaml;

/**
 * User: Victor Häggqvist
 * Date: 3/5/15
 * Time: 1:12 AM
 */

class LintSrcTest extends PHPUnit_Framework_TestCase {

  public function testLintSrc(){
    $conf = Yaml::parse(file_get_contents(__DIR__.'/../src/conf.yml'));
    $files = $conf['sections'];

    foreach ($files as $f) {
      $section = Yaml::parse(file_get_contents(__DIR__.'/../src/'.$f.'.yml'));
    }

    $this->addToAssertionCount(1);
  }
}

?>
