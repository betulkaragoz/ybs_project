<?php

    header("Access-Control-Allow-Origin: *");
    $conn = mysqli_connect("localhost","root","","ybs_project_database");

    if (mysqli_connect_error()) {
        echo mysqli_connect_error();
        exit();
    }else{
        $tarih = $_POST['tarih'];
        $bolum = $_POST['bolum'];
        $isg_turu = $_POST['isg_turu'];
        $kaynak = $_POST['kaynak'];
        $personel = $_POST['personel'];
        $aciklama = $_POST['aciklama'];

        $sql = "INSERT INTO is_kazasi_kaydi(tarih, bolum, isg_turu, kaynak, personel, aciklama) VALUES('$tarih', '$bolum', '$isg_turu', '$kaynak', '$personel','$aciklama');";
        $result = mysqli_query($conn, $sql);

        if($result){
            echo "Success!";
        }else{
            echo "Error!";
        }
        $conn->close();

    }





?>