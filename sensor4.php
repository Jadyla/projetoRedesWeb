<?php
  //informações necessárias
  $ip = $_POST["ip"];
  //$ip = "localhost";
  $community = "public";
  $oidUdpRecebidos = ".1.3.6.1.2.1.7.1.0";
  $oidUdpEnviados = "1.3.6.1.2.1.7.4.0";

  //pegando o retorno com o snmp
  $auxR = snmp2_get( $ip,$community ,$oidUdpRecebidos);
  $auxE = snmp2_get( $ip,$community ,$oidUdpEnviados);

  //quebrando o vetor para pegar somente o valor
  $recebidos = explode(" ", $auxR);
  $enviados = explode(" ", $auxE);

  //gera o array que será recebido pelo front-end  
  $arr = array('recebidos' => $recebidos[1], 'enviados' => $enviados[1]);
  echo json_encode($arr);
?>
