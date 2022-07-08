<?php
//$ip = $_POST["ip"];
//$ip = "10.14.160.69"; //ip Douglas
$ip = "localhost";
 // print $ip;
  
  $community = "public";

  $oidDesc = "1.3.6.1.2.1.1.1.0";
  $oidNome = "1.3.6.1.2.1.1.5.0";

  $compDesc = snmp2_get($ip,$community ,$oidDesc);
  $compNome = snmp2_get($ip,$community ,$oidNome);
  echo $compDesc;
  //software
  $aux = explode("-", $compDesc);
  $aux2 = explode("\"", $aux[1]);
  $soft = explode(" ", $aux2[0]);
  $tam = count($soft);
  
  if ($tam > 2){
    //nome
    $nome = explode("\"", $compNome);

    //hardware
    $hard = explode("\"", $aux[0]);

    //gera a saída que será recebida pelo front-end
    //echo $ipSoft[1];
    $arr = array('so' => $soft[2], 'nome' => $nome[1], 'soft' => $aux2[0], 'hard' => $hard[1]);
    echo json_encode($arr);
    //echo $soft[2];
    //echo $nome[1];
  }else{
    $nome = explode("\"", $compNome);
    $soft = "Nao identificado";
    $hard = "Nao identificado";
    $so = "Linux";

    $arr = array('so' => $so, 'nome' => $nome[1], 'soft' => $soft, 'hard' => $hard);
    echo json_encode($arr);
  }
  
?>