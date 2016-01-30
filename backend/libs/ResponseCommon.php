<?php

$g_Codes = array(
    1 => "This isn't correct JSON",
    2 => "Element 'command' wasn't found",
    3 => "Element 'data' wasn't found",
    4 => "Necessary data aren't present",
    100 => "Incorrect command",
    200 => "OK",
    300 => "Incorrect login or password",
    301 => "User must be logged in",
    666 => "Unknown error");


function GetResponse($code, $data){
    global $g_Codes;
    $msg = "";
    if(isset($g_Codes[$code]))
        $msg = $g_Codes[$code];
    $res = array("code" => $code,
                 "msg" => $msg,
                 "data" => $data);
    return json_encode($res);
}

function SendDataAndDie($code, $data){
    print GetResponse($code, $data);
    die();
}


?>