<?php
header('Content-type: application/json');
include 'D:\SKILL\PROJECT\SOCKETDEMO\SERVER\Common\obj.php';
// 重置随机数种子。
srand((double)microtime()*1000000);
$AppKey = 'ik1qhw09i234p';
$AppSecret = 'BalLYY8imiA6'; // 开发者平台分配的 App Secret
$Nonce = (string)mt_rand(); // 获取随机数。
$Timestamp = (string)time(); // 获取时间戳。

$Signature = sha1($AppSecret . $Nonce . $Timestamp);

$userId      = $_POST["userId"];
$name        = $_POST["name"];
$portraitUri = "http://img.xmpig.com/forum/201610/20/201816z4zvp3zov8vtpp5g.jpg";
$role        = $_POST["role"];
$rcArr       = array(
    'Token'  => "xm7t5tBajFVZvQ6AeifwWHquDCdi0JfiOlIY+u/RT1ov/JV3R9myhLmXkl7wMY1B+Zd+N08soIvxkf1Fcp8qLRt7hcWpKfz3",
    'AppKey' => $AppKey
);
$rcJSON = json_encode($rcArr);
//
// $header = array(
//     'App-Key' => $AppKey,
//     'Nonce' => $Nonce,
//     'Timestamp' => $Timestamp,
//     'Signature' => $Signature,
//     'Content-Type' => 'application/x-www-form-urlencoded'
// );
// $data = array(
//     "userId" => $userId,
//     "name" => $name,
//     "portraitUri" => $portraitUri
// );
//
// $loadToken = function () use ($header, $data)
// {
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, "http://api.cn.ronghub.com/user/getToken.json");
//     curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
//     // curl_setopt($ch, CURLOPT_HEADER, true);
//     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
//     curl_setopt($ch, CURLOPT_POST, true);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
//     $resultJson = curl_exec($ch);
//     curl_close($ch);
//     return $resultJson["token"];
// }
//
//
// $selectArgs = array(
//     'role' => 'tokenSelect',
//     'data' => array(
//         'userId' => $userId,
//     ),
// );
//
// try {
//     $rongCloud->base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $rongCloud->base->beginTransaction();
//     $selectResult = $rongCloud->getNextData($selectArgs);                //获取customer表中用户数据
//     if ($selectResult){                //密码错误
//         $token = $selectResult["token"];
//     }
//     else {
//         $token = $loadToken();
//         if (!$token) {\
//             die('token获取失败');
//         }
//     }
//     $insertArgs = array(
//         'role' => 'tokenInsert',
//         'data' => array(
//             'userId' => $userId,
//             'name'   => $name,
//             'token'  => $token,
//             'role'   => $role,
//         ),
//     );
//     $insertResult = $rongCloud->executeBase($insertArgs);
//     $rongCloud->base->commit();
//     if (!$insertResult) {                           //插入失败回滚
//         $rongCloud->base->rollBack();
//         die('token存取失败');
//     }
// }
// catch (PDOException $e) {
//     $rongCloud->base->rollBack();
//     die('Error!: '.$e->getMessage().'<br />');
// }

echo $rcJSON;

 ?>
