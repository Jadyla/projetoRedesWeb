<?php
  //$ip = $_POST["ip"];
  $ip = "localhost";
  $community = "public";
  $oidTotal = "1.3.6.1.2.1.4.3.0";
  $oidUdpRecebidos = ".1.3.6.1.2.1.7.1.0";

  $dataTotal = snmp2_get( $ip,$community ,$oidTotal);
  $dataUdp = snmp2_get( $ip,$community ,$oidUdpRecebidos);

  $aux = explode(" ", $dataTotal);
  $aux2 = explode(" ", $dataUdp);

  $dataTotalInt = intval($aux[1]);
  $daraUdpInt = intval($aux2[1]);

  $porcent = $daraUdpInt/$dataTotalInt;

  $arr = array('total' => $dataTotalInt, 'udp' => $daraUdpInt, 'porcent' => $porcent*100);
  echo json_encode($arr);
?>
