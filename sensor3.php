<?php
$ip = $_POST["ip"];
 // print $ip;
  
  $community = "public";
  $oid = "1.3.6.1.2.1.1.1.0";

  $ipInDelivers = snmp2_get($ip,$community ,$oid);

  //retira somente o dado inteiro do retorno da consulta
  $ipIn = explode("-", $ipInDelivers);
  $ipSoft = explode(" ", $ipIn[1]);

  //var_dump($ipIn);
  //gera a saída que será recebida pelo front-end
  //echo $ipSoft[1];
  $arr = array('so' => $ipSoft[2]);
  echo json_encode($arr);
?>