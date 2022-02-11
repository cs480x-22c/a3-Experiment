// function sendData(payload) {
//     var formBody = [];
//     for (var property in details) {
//       var encodedKey = encodeURIComponent(property);
//       var encodedValue = encodeURIComponent(details[property]);
//       formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
    
//     fetch('https://docs.google.com/forms/u/4/d/e/1FAIpQLSe9BLtXqwfV94_f-feQM6vsAeIYTcbPXhwGF2-WQy-RVgPFcQ/formResponse', {
//        method: 'POST',
//        headers: {
//       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//        },
//         body: formBody
//     })
// }


//   //Example code on 
//   var details = {
//       'entry.1362470865': 'userID',
//       'entry.1174877292': 'testType',
//       'entry.357989325': 'true percentage',
//       'entry.138102301': 'response percentage'
//   };
//   sendData(details)

