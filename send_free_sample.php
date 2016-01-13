<?php
/*
This first bit sets the email address that you want the form to be submitted to.
You will need to change this value to a valid email address that you can access.
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$webmaster_email = "dimas.maulana@repacorp.com";
$subject_1 = "Request: Samples";
$subject_2 = "Request: Branded Sales Sheets";

/*
This bit sets the URLs of the supporting pages.
If you change the names of any of the pages, you will need to change the values here.
*/
$feedback_page = "distrib_app.html";
$error_page = "error_message.html";
$thankyou_page = "http://www.repacorp.com/thank_you.htm";
$successful_page = "Success.html";
/*
This next bit loads the form field data into variables.
If you add a form field, you will need to add it here.
*/
$real_name = $request['name'];
$company = $request['company'] ;
$address = $request['address'] ;
$city = $request['city'];
$state = $request['state'] ;
$Zip = $request['zipcode'] ;
$phone = $request['phone'] ;
$email = $request['email'] ;
$website = $request['website'];
$sampleOption = $request['options'];


// $real_name = $_POST['name'] ;
// $company = $_POST['company'] ;
// $address = $_POST['address'] ;
// $city = $_POST['city'];
// $state = $_POST['state'] ;
// $Zip = $_POST['zipcode'] ;
// $phone = $_POST['phone'] ;
// $email = $_POST['email'] ;
// $website = $_POST['website'];
// $sampleOption = $_POST['options'];


/*
The following function checks for email injection.
Specifically, it checks for carriage returns - typically used by spammers to inject a CC list.
*/
function isInjected($str) {
	$injections = array('(\n+)',
	'(\r+)',
	'(\t+)',
	'(%0A+)',
	'(%0D+)',
	'(%08+)',
	'(%09+)'
	);
	$inject = join('|', $injections);
	$inject = "/$inject/i";
	if(preg_match($inject,$str)) {
		return true;
	}
	else {
		return false;
	}
}


$headers = "From: $email \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


//Free Sample Top Message
$sampleTop = '<html><body>';
$sampleTop .= "<img src='http://www.repacorp.com/images/repacorp.png' alt='Repacorp Logo' width='500'/>";
$sampleTop .= "<h2 style='font-family:Arial, sans-serif;color:#262627;'>Request: Free Samples From $real_name</h2>";



//Main Message of Email
$message .= "<table rules='all' style='font-family:Arial, sans-serif;border-collapse:collapse;color:#262627;' cellpadding='15'>";
$message .= "<tr><td><strong>Name:</strong></td><td>$real_name</td></tr>";
$message .= "<tr><td><strong>Company:</strong></td><td>$company</td></tr>";
$message .= "<tr><td><strong>Address:</strong></td><td>$address<br>$city, $state $Zip</td></tr>";
$message .= "<tr><td><strong>Phone:</strong></td><td>$phone</td></tr>";
$message .= "<tr><td><strong>Email:</strong></td><td>$email</td></tr>";
$message .= "<tr><td><strong>Website:</strong></td><td>$website</td></tr>";

//Free Sample Bottom Message
$sampleBottom = "<tr><td><strong>Sample Request</strong></td><td>$sampleOption</td></tr>";
$sampleBottom .= "</table></body></html>";


$messageFreeSample = $sampleTop . $message . $sampleBottom;

mail($webmaster_email, $subject_1,$messageFreeSample, $headers);  
// if(mail($webmaster_email, $subject_1,$messageFreeSample, $headers)){
//     echo("MAIL SENT");
// }else{
//     echo("MAIL FAILED TO SENT");
// }
// If the user tries to access this script directly, redirect them to the feedback form,
// if (!isset($_REQUEST['email'])) {
// // header( "Location: $feedback_page" );
// }

// // If the form fields are empty, redirect to the error page.
// elseif (empty($email) || empty($real_name) || empty($company) || empty($phone)) {
// // header( "Location: $error_page" );
// }

// // If email injection is detected, redirect to the error page.
// elseif ( isInjected($email) ) {
// // header( "Location: $error_page" );
// }

// // If we passed all previous tests, send the email then redirect to the thank you page.
// else {
//  mail($webmaster_email, $subject_1,$messageFreeSample, $headers);   
// //  header("Location:$thankyou_page");
// }


 

?>