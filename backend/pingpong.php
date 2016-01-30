<?php

error_reporting(0);
require "libs/ResponseCommon.php";
require "libs/DBCommon.php";

    $req = json_decode(file_get_contents("php://input"));
    if($req === false)
        SendDataAndDie(1, "");
    if(!isset($req->command))
        SendDataAndDie(2, "");
    if(!isset($req->data))
        SendDataAndDie(3, "");
    $cmd = strtolower($req->command);
    if($cmd == "login"){
        if(!isset($req->data->login) || !isset($req->data->password))
            SendDataAndDie(4, "");
        $res = GetPHPSESID($req->data->login, $req->data->password);
        if($res === false)
            SendDataAndDie(300, "");
        SendDataAndDie(200, $res);
    }
    else if($cmd == "logout"){
        if(!isset($req->phpsesid))
            SendDataAndDie(301, "");
        $res = LogOut($req->phpsesid);
        if($res === false)
            SendDataAndDie(302, "");
        SendDataAndDie(200, "");
    }
    else if($cmd == "checklogin"){
        if(strlen($req->data) < 4)
            SendDataAndDie(4, "");
        $res = CheckLogin($req->data);
        if($res === false)
            SendDataAndDie(666, "");
        SendDataAndDie(200, $res);
    }
    else if($cmd == "registration"){
        if(!isset($req->data->login) || !isset($req->data->password) || !isset($req->data->soctype))
            SendDataAndDie(4, "");
        $res = CheckLogin($req->data->login);
        if($res === 1)
            SendDataAndDie(666, "");
        $res = Registration($req->data->login, $req->data->password, $req->data->soctype);
        if($res === false)
            SendDataAndDie(666, "");
        SendDataAndDie(200, "");
    }
    else if($cmd == "getsoctypes"){
        $res = GetSocTypes();
        if($res === false)
            SendDataAndDie(666, "");
        SendDataAndDie(200, $res);
    }
    else if($cmd == "getfriends"){
        if(!isset($req->phpsesid))
            SendDataAndDie(301, "");
        $res = GetUID($req->phpsesid);
        if($res === false)
            SendDataAndDie(666, "");
        $res = GetFriends($res);
        if($res === false)
            SendDataAndDie(666, "");
        SendDataAndDie(200, $res);
    }
    else if($cmd == "addfriend"){
        if(!isset($req->data->name) || !isset($req->data->soctype))
            SendDataAndDie(4, "");
        if(!isset($req->phpsesid))
            SendDataAndDie(301, "");
        $res = GetUID($req->phpsesid);
        if($res === false)
            SendDataAndDie(666, "user id");
        $res = AddFriend($res, intval($req->data->soctype), $req->data->name);
        if($res === false)
            SendDataAndDie(666, "db");
        SendDataAndDie(200, "");
    }
    else if($cmd == "deletefriend"){
        if(!isset($req->data))
            SendDataAndDie(4, "");
        if(!isset($req->phpsesid))
            SendDataAndDie(301, "");
        $res = GetUID($req->phpsesid);
        if($res === false)
            SendDataAndDie(666, "user id");
        $res = DelFriend($res, $req->data);
        if($res === false)
            SendDataAndDie(666, "db");
        SendDataAndDie(200, "");
    }
    else if($cmd == "info"){
        if(!isset($req->phpsesid))
            SendDataAndDie(301, "");
        $res = GetUID($req->phpsesid);
        if($res === false)
            SendDataAndDie(666, "user id");
        $res = GetInfo($res);
        if($res === false)
            SendDataAndDie(666, "db");
        SendDataAndDie(200, $res);
    }
    else{
        SendDataAndDie(100, "");
    }
?>