<?php
  $to = 'sgreskov@gmail.com';
  $subject = 'GSVLabs Boston Mailing List Signup';
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $message = '<table><tbody>';

  $data = file_get_contents( "php://input" );
  $data = json_decode($data);

  for($i = 0; $i < sizeof($data); $i++){
    if($data[$i]->value && $data[$i]->name):
      $message.= '<tr><td>' . ucwords(str_replace('-',' ',$data[$i]->name)) . '</td><td>' . $data[$i]->value . '</td></tr>';
    endif;
  }

  $message.= '</tbody></table>';

  if(mail($to,$subject, $message, $headers)){
    echo 'error';
  } else {
    echo 'sent';
  }
?>