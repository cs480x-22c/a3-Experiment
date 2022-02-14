<?php
    $chart_num = '';
    $correct_answer = '';
    $observed_value = '';
    $error_rate = '';

    $file_open = fopen("./results.csv", "a");
  $no_rows = count(file("./results.csv"));
  if($no_rows > 1)
  {
   $no_rows = ($no_rows - 1) + 1;
  }
  $form_data = array(
   'sr_no'  => $no_rows,
   'chart_num'  => $chart_num,
   'correct_answer'  => $correct_answer,
   'observed_value' => $observed_value,
   'error_rate' => $error_rate
  );
  fputcsv($file_open, $form_data);
  $error = '<label class="text-success">Thank you for contacting us</label>';
  $chart_num = '';
  $correct_answer = '';
  $observed_value = '';
  $error_rate = '';
?>