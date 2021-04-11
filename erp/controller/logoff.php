<?php
  session_start();
  $val = $_SESSION['val'];
  session_destroy();
  session_start();
  $_SESSION['val'] = $val;  
?>