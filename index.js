const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000


var data = '';

var configDashboards = {
    method: 'get',
    url: 'https://prod-useast-a.online.tableau.com//api/3.16/sites/bf29ac49-f8f7-4c81-8076-3e9dfce2c1c0/views/915d2a6f-d30b-4438-8fd3-43e18c140b6d',
    headers: { 
        'X-Tableau-Auth': 'aF38h6jyQbC7VnYw0sDDhQ|2vGoRktKhC3X77DgUE2OhIeHh4AvE9dt|bf29ac49-f8f7-4c81-8076-3e9dfce2c1c0', 
        'Cookie': 'AWSELB=7997DDC518882B74EE36ED389A14D4F74181260F23A46444A4D85C0ADBEBDAA4AD9722EB7F42E82FF23132A9CD83C5301D3A8128A9D8DDEDC2B34834EFC821825EBA04E4128313DA012173518CCE5336F514AD426C; hid=pdueaa-hap01'
    },
    data : data
}

app.get('/getDashboards', (req, res) => {
    axios(configDashboards)
    .then(function (response) {
        const dataResponse = JSON.stringify(response.data);
        res.send(dataResponse);
    })
    .catch(function (error) {
    console.log(error);
    });     
  });

  var dataLogin = JSON.stringify({
    "credentials": {
      "site": {
        "contentUrl": "testtabeauni"
      },
      "name": "tomas_10101995@hotmail.com",
      "password": "hpSalinas1918810*"
    }
  });
  
  var configLogin = {
    method: 'post',
    url: 'https://prod-useast-a.online.tableau.com//api/3.16/auth/signin',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'Cookie': 'AWSELB=7997DDC518882B74EE36ED389A14D4F74181260F23A46444A4D85C0ADBEBDAA4AD9722EB7F42E82FF23132A9CD83C5301D3A8128A9D8DDEDC2B34834EFC821825EBA04E4128313DA012173518CCE5336F514AD426C; hid=pdueaa-hap01'
    },
    data : dataLogin
  };


  app.post('/login', (req, res) => {
    axios(configLogin)
        .then(function (response) {        
        res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
  });


  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})