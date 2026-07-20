<?php
$translations = [
    'en' => [
        'success'    => 'Your information is sent successfully.',
        'error'      => 'Something went wrong! Enter a valid email or reload the page and try again.',
        'validation' => 'Please fill in all required fields with valid information.',
    ],
    'sq' => [
        'success'    => 'Të dhënat tuaja u dërguan me sukses.',
        'error'      => 'Diçka shkoi keq! Vendosni një email të vlefshëm ose rifreskoni faqen dhe provoni përsëri.',
        'validation' => 'Ju lutemi plotësoni të gjitha fushat e kërkuara me informacion të vlefshëm.',
    ],
    'ru' => [
        'success'    => 'Ваши данные успешно отправлены.',
        'error'      => 'Что-то пошло не так! Введите действительный email или обновите страницу и попробуйте снова.',
        'validation' => 'Пожалуйста, заполните все обязательные поля достоверной информацией.',
    ],
    'es' => [
        'success'    => 'Su información se ha enviado correctamente.',
        'error'      => 'Algo salió mal. Introduzca un correo electrónico válido o vuelva a cargar la página e inténtelo de nuevo.',
        'validation' => 'Complete todos los campos obligatorios con información válida.',
    ],
    'fr' => [
        'success'    => 'Vos informations ont été envoyées avec succès.',
        'error'      => "Une erreur s'est produite ! Saisissez une adresse e-mail valide ou actualisez la page et réessayez.",
        'validation' => 'Veuillez remplir tous les champs obligatoires avec des informations valides.',
    ],
    'ar' => [
        'success'    => 'تم إرسال بياناتك بنجاح.',
        'error'      => 'حدث خطأ ما! أدخل بريدًا إلكترونيًا صالحًا أو أعد تحميل الصفحة وحاول مرة أخرى.',
        'validation' => 'يرجى تعبئة جميع الحقول المطلوبة بمعلومات صحيحة.',
    ],
];

$allowedLangs = ['en', 'sq', 'ru', 'es', 'fr', 'ar'];
$lang = (isset($_POST['lang']) && in_array($_POST['lang'], $allowedLangs, true)) ? $_POST['lang'] : 'en';
$t = $translations[$lang];

function respond($error, $msgKey, $t) {
    echo json_encode([
        'error' => $error,
        'msg' => $t[$msgKey]
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $formId = isset($_POST["id"]) ? $_POST["id"] : '';

    if ($formId === 'jobApplicationForm') {
        $name = trim(htmlspecialchars($_POST["ApplicantName"] ?? ''));
        $email = trim(htmlspecialchars($_POST["ApplicantEmail"] ?? ''));
        $phone = trim(htmlspecialchars($_POST["ApplicantPhone"] ?? ''));
        $linkedin = trim(htmlspecialchars($_POST["ApplicantLinkedIn"] ?? ''));
        $position = trim(htmlspecialchars($_POST["ApplicantPosition"] ?? ''));
        $coverLetter = trim(htmlspecialchars($_POST["ApplicantCoverLetter"] ?? ''));

        if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $position === '') {
            respond(1, 'validation', $t);
        }

        $message = '<p>Position: ' . $position . '</p>';
        if ($linkedin !== '') $message .= '<p>LinkedIn: ' . $linkedin . '</p>';
        if ($coverLetter !== '') $message .= '<p>Cover Letter:</p><p>' . nl2br($coverLetter) . '</p>';

        if (isset($_FILES['ApplicantCV']) && $_FILES['ApplicantCV']['error'] === UPLOAD_ERR_OK) {
            $allowedExt = ['pdf', 'doc', 'docx'];
            $originalName = $_FILES['ApplicantCV']['name'];
            $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
            if (in_array($ext, $allowedExt, true) && $_FILES['ApplicantCV']['size'] <= 5 * 1024 * 1024) {
                $uploadDir = __DIR__ . '/uploads/cv/';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }
                $safeName = uniqid('cv_', true) . '.' . $ext;
                if (move_uploaded_file($_FILES['ApplicantCV']['tmp_name'], $uploadDir . $safeName)) {
                    $message .= '<p>CV: ' . htmlspecialchars($originalName) . '</p>';
                }
            }
        }
    } else {
        $name = trim(htmlspecialchars($_POST["InputName"] ?? ''));
        $email = trim(htmlspecialchars($_POST["InputEmail"] ?? ''));
        $phone = trim(htmlspecialchars($_POST["InputNumber"] ?? ''));

        switch ($formId) {
            case 'callRequestForm':
                $name .= ' ' . htmlspecialchars($_POST["InputSurname"] ?? '');
                $message = '<p>Preferred Time: ' . htmlspecialchars($_POST["InputTime"] ?? '') . '</p>';
                $message .= '<p>Country: ' . htmlspecialchars($_POST["InputCountry"] ?? '') . '</p>';
                $message .= '<p>Phone Number: ' . htmlspecialchars($_POST["InputNumber"] ?? '') . '</p>';
                break;

            case 'downloadForm':
                $name .= ' ' . htmlspecialchars($_POST["InputSurname"] ?? '');
                $message = '<p>Thank You</p>';
                break;

            default:
                $surname = trim(htmlspecialchars($_POST["InputSurname"] ?? ''));
                if ($surname !== '') $name .= ' ' . $surname;
                $userMessage = trim(htmlspecialchars($_POST["InputMessage"] ?? ''));
                $message = nl2br($userMessage);
                break;
        }

        if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(1, 'validation', $t);
        }
    }

    $to = "example@gmail.com"; // Replace with your email address
    $subject = "Industria contact";

    $message_2 = '<html>
    <head>
        <title>Industria Contact</title>
        <style>
            body{
                color: #000;
            }
            .custom-container-1{
                max-width: 600px;
                padding: 30px;
                text-align: center;
                border: 1px solid #dadce0;
                background-color: rgb(242, 241, 235) ;
                margin: 1.5rem auto 1.5rem auto;
            }
            .logo{
                margin: 20px 0;
                text-align: center;
            }
            .logo img{
                width: 219px;
                height: 31px;
            }
            .table-contents{
                padding: 0 20px 20px 20px;
                display: block;
            }
            table{
                border: none;
                text-align: left;
            }
            td,th{
                border-bottom: 1px solid #dadce0;
                padding: 7px 15px;
                vertical-align: top;
            }
            th{
                padding-left: 0;
                width: 150px;
            }
            h2{
                margin: 0 0 16px 0;
            }
            table p{
                padding: 0;
                margin-top: 0;
            }
            .custom-container-1 p{
                padding: 20px 0 0 0;
                margin-bottom: 0;
                font-size: 15px;
                color: #000;
            }
        </style>
    </head>
    <body>
        <div class="container custom-container-1 container-position">
            <div class="logo">
                <img src="https://themeperch.net/html/industria/assets/images/logo.png" alt="Industria">
            </div>
            <div class="table-contents">
                <h2>Industria Contact</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <td>'.$name.'</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>'.$email.'</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>'.$phone.'</td>
                </tr>
                <tr>
                    <th style="border-bottom: 0;">Message</th>
                    <td style="border-bottom: 0;">'.$message.'</td>
                </tr>
                </table>

                <p>&copy; 2023, Industria, All Rights Reserved</p>
            </div>
        </div>
    </body>
</html>
    ';

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <webmaster@themeperch.net>' . "\r\n";
    //$headers .= 'Cc: myboss@example.com' . "\r\n";
    $sender_message = '<html>
    <head>
        <title>Industria Contact</title>
        <style>
            body{
                color: #000;
            }
            .custom-container-1{
                max-width: 600px;
                padding: 30px;
                text-align: center;
                border: 1px solid #dadce0;
                background-color: rgb(242, 241, 235)
            }

            .logo{
                margin: 20px 0;
                text-align: center;
            }
            .logo img{
                width: 219px;
                height: 31px;
            }
            .table-contents{
                padding: 0 20px 20px 20px;
                display: block;
            }
            table{
                border: none;
                text-align: left;
            }
            td,th{
                border-bottom: 1px solid #dadce0;
                padding: 7px 15px;
                vertical-align: top;
            }
            th{
                padding-left: 0;
                width: 150px;
            }
            h2{
                margin: 0 0 16px 0;
            }
            table p{
                padding: 0;
                margin-top: 0;
            }
            .custom-container-1 p{
                padding: 20px 0 0 0;
                margin-bottom: 0;
                font-size: 15px;
                color: #000;
            }
            .custom-container-2{
                margin: 0;
                padding: 30px 0 40px 0;
                max-width: 600px;
            }

            .custom-container-2 p{
                padding: 0;
                color: #000;
                font-size: 16px;
                margin-top: 0;
            }
            .message-body p{
                margin-bottom: 25px;
            }
            .message-footer p{
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container custom-container-2">
            <div class="message-body">
                <p>Hi</p>
                <p>Thanks for getting in touch! This is an automatic email just to let you know that we have received your email. We will get you an answer shortly.</p>
                <p>If you would like to email an update before you hear back from us, please reply to this email. In the meantime, feel free to check out our Help Center resources for more help.</p>
            </div>
            <div class="message-footer">
                <p>Kind regards,</p>
                <p>Themeperch Ltd.</p>
            </div>
        </div>
        <div class="container custom-container-1">
            <div class="logo">
                <img src="https://themeperch.net/html/industria/assets/images/logo.png" alt="Industria">
            </div>
            <div class="table-contents">
                <h2>Industria Contact</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <td>'.$name.'</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>'.$email.'</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>'.$phone.'</td>
                </tr>
                <tr>
                    <th style="border-bottom: 0;">Message</th>
                    <td style="border-bottom: 0;">'.$message.'</td>
                </tr>
                </table>

                <p>&copy; 2023, Industria, All Rights Reserved</p>
            </div>
        </div>
    </body>
</html>';

    if(@mail($email,$subject,$sender_message,$headers)){
        if(@mail($to,$subject,$message_2,$headers)){
            respond(0, 'success', $t);
        } else {
            respond(1, 'error', $t);
        }
    }else{
        respond(1, 'error', $t);
    }

} else {
    respond(1, 'error', $t);
}
