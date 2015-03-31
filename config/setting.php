<?php
$db_username = "root";
$db_password = "";
$db_hostname = "localhost"; 

//connection to the database
$db_handle = mysql_connect($db_hostname, $db_username, $db_password) 
 or die("Unable to connect to MySQL");

//select a database to work with
$db_selected = mysql_select_db("gtpcom_desain",$db_handle) 
  or die("Could not select database");

$base_site_name = "cm";
$base_url = "localhost/".$base_site_name;
$base_name_site = "Desain";
?>