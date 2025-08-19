<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

// اتصال به دیتابیس
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "خطا در اتصال به دیتابیس"]));
}

// دریافت داده‌های ارسال شده
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['firstName']) && isset($data['lastName'])) {
    $firstName = $conn->real_escape_string($data['firstName']);
    $lastName = $conn->real_escape_string($data['lastName']);

    $sql = "INSERT INTO tbl_form (first_name, last_name) VALUES ('$firstName', '$lastName')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "اطلاعات با موفقیت ذخیره شد"]);
    } else {
        echo json_encode(["success" => false, "message" => "خطا در ذخیره اطلاعات"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "داده‌های ارسال شده ناقص است"]);
}

$conn->close();
?>