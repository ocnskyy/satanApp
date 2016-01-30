<?php

//for local 
$g_dbConnect = null;
$g_dbHost = "localhost";//"sql24.hostinger.com.ua";
$g_dbName = "u895145282_3arsl";
$g_dbLogin = "u895145282_nqb4f";//"u895145282_nqb4f";
$g_dbPasswrod = "S4WNX41oZbDH0p42ecok";//"S4WNX41oZbDH0p42ecok";


//for heroku
// $g_dbConnect = null;
// $url = parse_url(getenv("CLEARDB_DATABASE_URL"));
// $g_dbHost = $url["host"];
// $g_dbName = substr($url["path"], 1);
// $g_dbLogin = $url["user"];
// $g_dbPasswrod = $url["pass"];

function Instance(){
    global $g_dbConnect;
    global $g_dbHost;
    global $g_dbName;
    global $g_dbLogin;
    global $g_dbPasswrod;
    if($g_dbConnect == null){
        $g_dbConnect = mysql_connect($g_dbHost, $g_dbLogin, $g_dbPasswrod);
        if($g_dbConnect == null)
            return false;
        mysql_select_db($g_dbName, $g_dbConnect);
        mysql_set_charset('utf8', $g_dbConnect);
    }
    return $g_dbConnect;
}

function Close(){
    mysql_close($g_dbConnect);
    $g_dbConnect = null;
}

function GetPHPSESID($login, $password){
    $cn = Instance();
    if($cn === false)
        return false;
    $password = md5($password);
    $login = mysql_real_escape_string($login, $cn);
    $query = "SELECT UID FROM users WHERE login='".$login."' and password='".$password."'";
    $result = mysql_query($query, $cn);
    if($result == null)
        return false;
    $row = mysql_fetch_row($result);
    mysql_free_result($result);
    if($row === false)
        return false;
    $query = "DELETE FROM history WHERE UID=".$row[0];
    $result = mysql_query($query, $cn);
    $salt = "Swordfish";
    $phpsesid = md5($salt.$login.time());
    $query = sprintf("INSERT INTO history(UID, tm, PHPSESID) VALUES(%d, NOW(), '%s');", $row[0], $phpsesid);
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    return $phpsesid;
}

function LogOut($phpsesid){
    $cn = Instance();
    $query = sprintf("DELETE FROM history WHERE phpsesid = '%s'", $phpsesid);
    return mysql_query($query, $cn);
}

function CheckLogin($login){
    $cn = Instance();
    $query = sprintf("SELECT COUNT(UID) FROM users WHERE login='%s'", mysql_real_escape_string($login));
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    $row = mysql_fetch_row($result);
    mysql_free_result($result);
    if($row[0]>0)
        return 1;
    else
        return 0;
}

function Registration($login, $password, $soctype){
    $cn = Instance();
    if(!is_numeric($soctype))
        return false;
    $query = sprintf("INSERT INTO users(STID, login, password) VALUES(%s, '%s', '%s')", $soctype, mysql_real_escape_string($login), md5($password));
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    return true;
}

function GetSocTypes(){
    $cn = Instance();
    $query = "SELECT STID as id, name FROM soctype";
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    $res = array();
    while($row = mysql_fetch_row($result)){
        array_push($res, array("id" => $row[0], "name" => $row[1]));
    }
    mysql_free_result($result);
    return $res;
}

function GetUID($phpsesid){
    $cn = Instance();
    $query = sprintf("SELECT UID FROM history WHERE phpsesid='%s'", $phpsesid);
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    $row = mysql_fetch_row($result);
    mysql_free_result($result);
    return $row[0];
}

function GetFriends($UID){
    if(!is_numeric($UID))
        return false;
    $cn = Instance();
    $query = sprintf("SELECT f.name as name, s.name as soctype, r.name as relation FROM users as u inner join friends as f on(u.UID=f.UID) inner join soctype as s on(s.STID=f.STID) inner join relation_common as rc on(rc.STID_0=u.STID AND rc.STID_1=f.STID) inner join relation as r on(rc.RID=r.RID) WHERE u.UID = %d", $UID);
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    $res = array();
    while($row = mysql_fetch_assoc($result)){
        array_push($res, $row);
    }
    return $res;
}

function AddFriend($UID, $STID, $name){
    if(!is_numeric($UID))
        return false;
    if(!is_numeric($STID))
        return false;
    $cn = Instance();
    $query = sprintf("INSERT INTO friends(UID, STID, name) VALUE(%d, %d, '%s')", $UID, $STID, mysql_real_escape_string($name));
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    return true;
}

function DelFriend($UID, $name){
    if(!is_numeric($UID))
        return false;
    $cn = Instance();
    $query = sprintf("delete from friends where uid=%d and name=\"%s\"", $UID, mysql_real_escape_string($name));
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    return true;
}

function GetInfo($UID){
    if(!is_numeric($UID))
        return false;
    $cn = Instance();
    $query = "SELECT u.login as login, s.name as soctype FROM users as u inner join soctype as s on u.stid = s.stid WHERE u.UID =".$UID;
    $result = mysql_query($query, $cn);
    if($result === false)
        return false;
    $req = mysql_fetch_assoc($result);
    mysql_free_result($result);
    return $req;
}

?>