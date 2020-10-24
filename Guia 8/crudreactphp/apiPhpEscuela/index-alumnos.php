<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from alumno where id=".$_GET['id'];
        $resultado=metodoGet($query);

        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from alumno";
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
    $apellido=$_POST['apellido'];
    $edad=$_POST['edad'];
    $query="insert into alumno(nombre, apellido, edad) values ('$nombre', '$apellido', '$edad')";
    $queryAutoIncrement="select MAX(id) as id from alumno";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $edad=$_POST['edad'];
    $query="UPDATE alumno SET nombre='$nombre', apellido='$apellido', edad='$edad' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM alumno WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>