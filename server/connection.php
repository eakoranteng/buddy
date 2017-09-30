<?php 

try {
	$conn = new PDO('mysql:host=localhost;port=3306;dbname=buddy', 'root', 'melcom2016');
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	http_response_code(500);
    echo "Could not reach server. Contact IT";
}

?>