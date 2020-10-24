<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from producto where id=".$_GET['id'];
        $resultado=metodoGet($query);

        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from producto";
        $resultado=metodoGet($query);

        $array = [];

        while($reg = $resultado->fetch(PDO::FETCH_ASSOC)) {
            $array[] = json_decode(json_encode($reg), FALSE);
        }

        echo json_encode($array);
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $existencias=$_POST['existencias'];
    $query="insert into producto(nombre, existencias) values ('$nombre', $existencias)";
    $queryAutoIncrement="select MAX(id) as id from producto";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $existencias=$_POST['existencias'];
    $query="UPDATE producto SET nombre='$nombre', existencias=$existencias WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM producto WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>