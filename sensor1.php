<?php
  
  $ip = $_POST['ip']; 

  echo $ip;

  $community = "public";
  
  $oidMemory = ".1.3.6.1.2.1.25.2.2.0";
  $oidProcessos = ".1.3.6.1.2.1.25.1.6.0";
    
  $memory = snmp2_get($ip,$community ,$oidMemory);
  $process = snmp2_get($ip,$community,$oidProcessos);
    
  echo ("Ram : $memory");
  echo ("Process : $process");

?>  