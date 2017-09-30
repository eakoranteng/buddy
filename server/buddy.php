<?php 

require_once('connection.php');

// RECEIVE DATA FROM ANGULAR
$ajax_data = file_get_contents("php://input");
$data = json_decode($ajax_data);

$location = $data->location;
$rating = $data->rating;
$ip = $_SERVER['REMOTE_ADDR'];

// WRITE RECORDS
try {
	$insert = $conn->prepare("INSERT INTO rating (LOCATION, RATING, IP) VALUES (:location, :rating, :ip)");
	$insert->bindParam(':location', $location);
	$insert->bindParam(':rating', $rating);
	$insert->bindParam(':ip', $ip);

	$insert->execute();
	echo "Thank you!";
} catch (PDOException $e) {
	echo "There's a little problem. We still appreciate your feedback!";
}


?>