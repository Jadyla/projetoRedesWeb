<?php
  $ip = $_POST["ip"];
  //$ip = "444";
  $community = "public";
  $oid = "1.3.6.1.2.1.1.5.0";

  $retorno = snmp2_get( $ip,$community ,$oid);

  $aux = explode("failed", $retorno);
  $tam = count($aux);

  if($tam > 1){
    echo "erro";
  }else{
    echo "sucesso";
  }
?>
