<?php

include_once __DIR__ . '/../models/gig.php';
header('Content-Type: application/json');
if ($_REQUEST['action'] === 'index') {
  echo json_encode(Gigz::all());
} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_gig = new Gig(null, $body_object->name, $body_object->date, $body_object->location, $body_object->compensation, $body_object->notes);
  $all_gigz = Gigz::create($new_gig);
  echo json_encode($all_gigz);
} else if ($_REQUEST['action'] === 'update'){
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_gig = new Gig($_REQUEST['id'], $body_object->name, $body_object->date, $body_object->location, $body_object->compensation, $body_object->notes);
  $all_gigz = Gigz::update($updated_gig);
  echo json_encode($all_gigz);
  } else if ($_REQUEST['action'] === 'delete') {
    $all_gigz = Gigz::delete($_REQUEST['id']);
    echo json_encode($all_gigz);
  }

 ?>
