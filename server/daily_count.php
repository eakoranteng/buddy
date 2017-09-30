<?php 

require_once('connection.php');

// RECEIVE DATA FROM ANGULAR
$ajax_data = file_get_contents("php://input");
$data = json_decode($ajax_data);

$location = $data->location;
$today = date('Y-m-d');

$count = $conn->prepare("SELECT COUNT(*) AS TOTAL_TODAY FROM rating WHERE FEEDBACK_DATETIME LIKE "."'%".$today."%'"." AND LOCATION = ?");
$count->execute([$location]);
echo $count->fetchColumn();

?>