Buffer = Buffer.Buffer;



const creatExcel = document.getElementById("addRow");
const submit = document.getElementById("submit");
const submit2 = document.getElementById("submit2");
const logIn = document.getElementById("login");
const logIn2 = document.getElementById('login2');
const wallet =  document.getElementById('wallet');
const rows =   document.getElementsByClassName("trow");
const clear = document.querySelector("#clear");
const accName = document.getElementsByClassName("accName");
const amount = document.getElementsByClassName("amount");
const memo = document.getElementsByClassName("memo");
const keyLogIn =  document.getElementById('keyLogIn');
const notice =   document.querySelector(".overlay2");
const select = document.querySelector("#select");


creatExcel.addEventListener("click", addEx)
function addEx(){
 
  function downloadExcel(table, filename) {
    // Create a new Excel workbook
    var workbook = new ExcelJS.Workbook();
    
    // Add a new sheet to the workbook
    var sheet = workbook.addWorksheet('Sheet1');
    
    // Loop through the rows of the HTML table
    for (var i = 0; i < table.children.length; i++) {
      // Create a new row in the Excel sheet
      var row = sheet.addRow([]);
      
      // Loop through the cells of the current HTML row
      for (var j = 0; j < table.children[i].children.length; j++) {
        // Add the value of the current HTML cell to the Excel row
        row.getCell(j + 1).value = table.children[i].children[j].innerText;
      }
    }
    
    // Create a buffer containing the Excel file data
    workbook.xlsx.writeBuffer().then(function(buffer) {
      // Create a Blob object containing the buffer data
      var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create a download link and trigger the download
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename + '.xlsx';
      link.click();
    });
  }

  var table = document.querySelector('tbody');
  var filename = 'trackerData';
  downloadExcel(table, filename);

}




clear.addEventListener("click", clean)
function clean(){
  document.querySelector("tbody").innerHTML = "";
 
}


function rowDel(e){
  const p =  e.parentNode.parentNode;
    p.parentNode.removeChild(p);
}


let preventConflict = {
  staus: 0,
EOSbal: 0,
MLTbal: 0
};

/*function boxChecked(){
  const table = document.querySelector('tbody');
  const checkbox = document.querySelector('#sorted');
    const rows = Array.from(table.children);
    rows.sort((rowA, rowB) => {
      const dateA = new Date(rowA.cells[2].textContent);
      const dateB = new Date(rowB.cells[2].textContent);
      return dateA - dateB;
    });
    if (!checkbox.checked) {
      rows.reverse();
    }
    table.append(...rows);
}*/

async function mySelect(){
  }



keyLogIn.addEventListener("click", logInKey)
     async function logInKey(){
if(document.getElementById("logInStatus").textContent === "User: ~" && preventConflict.staus === 0){
      const from = document.getElementById('name').value.toLowerCase().trim();
      const key = document.getElementById('key').value;
      const   endpoint = "https://api.eospglmlt.com"

      

      //console.log(from)
      if(!from || !from.length) return alert('Invalid account');
      if(!key || !key.length) return alert('Invalid key');

document.getElementById("logInStatus").innerHTML = `<i class="fas fa-user"></i> Welcome ${from}` ;
document.getElementById("logInStatus").style.color = "gray" ;
document.getElementById("logInStatus").style.display = "block" ;
document.getElementById("logInStatus").style.fontFamily = "Roboto"
document.getElementById("logInStatus").style.fontWeight = 600 ;
logIn.style.display = "none";
submit.style.display = "none"
submit2.style.display = "block"
document.querySelector(".overlay").style.display = "none"
document.querySelector(".popup").style.visibility = "hidden";


const rpc = new eosjs_jsonrpc.JsonRpc(endpoint);
const signatureProvider = new eosjs_jssig.JsSignatureProvider([key]);
const api = new eosjs_api.Api({ rpc, signatureProvider });


  document.querySelector(".mltImg").style.display = "none"
  document.querySelector(".eosImg").style.display = "block"
  await rpc.get_currency_balance('eosio.token', from, 'EOS').then((balance) => document.querySelector(".accDetails").innerHTML= "Balance: "+balance);
  await rpc.get_currency_balance('eosio.token', from, 'EOS').then((balance) => document.querySelector(".row .accDetails").innerHTML= "Balance: "+balance);
  

 

await rpc.get_currency_balance('eosio.token', from, 'EOS').then((balance) => preventConflict.EOSbal=balance);
await rpc.get_currency_balance('mltcontract1', from, 'MLT').then((balance) => preventConflict.MLTbal=balance);
document.querySelector(".popup").style.visibility = "hidden";

submit2.addEventListener("click", send2)
      async function send2(){
       alert("Tracking Transfers")
        notice.style.display = "block";
        function HyperionManager() {
          const hyperion_url = "https://eos.eosusa.io/v2/history";
      
          this.getTransfers = async function(token_contract, to, before = "") {
              return await fetch(hyperion_url + "/get_actions?account=" + token_contract + "&transfer.to=" + to + "&limit=1000" + (before === "" ? "" : `&before=${before}`));
          }
      }
      
      async function choice(choose){
        let date = new Date();
        
      
      if (choose === "all"){
      const exchanges = ["eosupbitsusr",
      "binancecleos",
         "swap.defi",
        "newdexpublic",
        "bithumbrecv1",
        "bitfinexdep1",
        "mxcexdeposit",
        "huobideposit",
        "kunaexchange",
        "gateiowallet",
        "krakenkraken",
       "bullishfunds",
        "coinbasebase",
       "kucoindoteos"]
       //var last;
      

      let hyperion = new HyperionManager();
      for(let j=0; j<exchanges.length; j++){
        
      let response = await (await hyperion.getTransfers("eosio.token", exchanges[j], date)).json();
      let response1 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response.actions[response.actions.length-1].timestamp)).json();
      let response2 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response1.actions[response1.actions.length-1].timestamp)).json();  
      let response3 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response2.actions[response2.actions.length-1].timestamp)).json();  
      let response4 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response3.actions[response3.actions.length-1].timestamp)).json();  
      let response5 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response4.actions[response4.actions.length-1].timestamp)).json(); 
      let response6 = await (await hyperion.getTransfers("eosio.token", exchanges[j], response5.actions[response5.actions.length-1].timestamp)).json();  
      
      
      for (let i=0; i<response.actions.length; i++){
        
        const text = await response.actions[i].act.data.from;
      
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
       if(text.substring(text.length-4, text.length) === "hufi" || text.substring(text.length-3, text.length) === "mlt" ){
          //console.log(response.actions[i].act.data.from, "to", response.actions[i].act.data.to,"Amount:", response.actions[i].act.data.amount, response.actions[i].timestamp, response.actions[i].trx_id)
         print(response)
        }
      }
      
      for (let i=0; i<response1.actions.length; i++){
        
        const text1 = await response1.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text1.substring(text1.length-4, text1.length) === "hufi" || text1.substring(text1.length-3, text1.length) === "mlt" ){
         print(response1)
        }
      }
      
      for (let i=0; i<response2.actions.length; i++){
        
        const text2 = await response2.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
       
        if(text2.substring(text2.length-4, text2.length) === "hufi" || text2.substring(text2.length-3, text2.length) === "mlt" ){
          print(response2)
         }
      }
      
      for (let i=0; i<response3.actions.length; i++){
        
        const text3 = await response3.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");

          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text3.substring(text3.length-4, text3.length) === "hufi" || text3.substring(text3.length-3, text3.length) === "mlt" ){
         print(response3)
        }
      }
      
      for (let i=0; i<response4.actions.length; i++){
        
        const text4 = await response4.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text4.substring(text4.length-4, text4.length) === "hufi" || text4.substring(text4.length-3, text4.length) === "mlt" ){
         print(response4)
        }
      }
      
      for (let i=0; i<response5.actions.length; i++){
        
        const text5 = await response5.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text5.substring(text5.length-4, text5.length) === "hufi" || text5.substring(text5.length-3, text5.length) === "mlt" ){
         print(response5)
        }
      }
      
      for (let i=0; i<response6.actions.length; i++){
        
        const text6 = await response6.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank">${as.actions[i].trx_id}</a>`
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text6.substring(text6.length-4, text6.length) === "hufi" || text6.substring(text6.length-3, text6.length) === "mlt" ){
         print(response6)
        }
      }
      
      
      }

      const table = document.querySelector('tbody');
      
        const rows = Array.from(table.children);
        rows.sort((rowA, rowB) => {
          const dateA = new Date(rowA.cells[2].textContent);
          const dateB = new Date(rowB.cells[2].textContent);
          return dateB - dateA;
        });
        table.append(...rows);
      notice.style.display = "none"

      }else{
      
      let hyperion = new HyperionManager();
      
      let response = await (await hyperion.getTransfers("eosio.token", choose, date)).json();
      let response1 = await (await hyperion.getTransfers("eosio.token", choose, response.actions[response.actions.length-1].timestamp)).json();
      let response2 = await (await hyperion.getTransfers("eosio.token", choose, response1.actions[response1.actions.length-1].timestamp)).json();  
      let response3 = await (await hyperion.getTransfers("eosio.token", choose, response2.actions[response2.actions.length-1].timestamp)).json();  
      let response4 = await (await hyperion.getTransfers("eosio.token", choose, response3.actions[response3.actions.length-1].timestamp)).json();  
      let response5 = await (await hyperion.getTransfers("eosio.token", choose, response4.actions[response4.actions.length-1].timestamp)).json(); 
      let response6 = await (await hyperion.getTransfers("eosio.token", choose, response5.actions[response5.actions.length-1].timestamp)).json(); 
      
      for (let i=0; i<response.actions.length; i++){
        
        const text = await response.actions[i].act.data.from;
      
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");


          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
         
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
       if(text.substring(text.length-4, text.length) === "hufi" || text.substring(text.length-3, text.length) === "mlt" ){
          //console.log(response.actions[i].act.data.from, "to", response.actions[i].act.data.to,"Amount:", response.actions[i].act.data.amount, response.actions[i].timestamp, response.actions[i].trx_id)
         print(response)
        }
      }
      
      for (let i=0; i<response1.actions.length; i++){
        
        const text1 = await response1.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text1.substring(text1.length-4, text1.length) === "hufi" || text1.substring(text1.length-3, text1.length) === "mlt" ){
         print(response1)
        }
      }
      
      for (let i=0; i<response2.actions.length; i++){
        
        const text2 = await response2.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange);// Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
       
        if(text2.substring(text2.length-4, text2.length) === "hufi" || text2.substring(text2.length-3, text2.length) === "mlt" ){
          print(response2)
         }
      }
      
      for (let i=0; i<response3.actions.length; i++){
        
        const text3 = await response3.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text3.substring(text3.length-4, text3.length) === "hufi" || text3.substring(text3.length-3, text3.length) === "mlt" ){
         print(response3)
        }
      }
      
      for (let i=0; i<response4.actions.length; i++){
        
        const text4 = await response4.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text4.substring(text4.length-4, text4.length) === "hufi" || text4.substring(text4.length-3, text4.length) === "mlt" ){
         print(response4)
        }
      }
      
      for (let i=0; i<response5.actions.length; i++){
        
        const text5 = await response5.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text5.substring(text5.length-4, text5.length) === "hufi" || text5.substring(text5.length-3, text5.length) === "mlt" ){
         print(response5)
        }
      }
      
      for (let i=0; i<response6.actions.length; i++){
        
        const text6 = await response6.actions[i].act.data.from;
       
        function print(as){
          const tr = document.createElement("tr");
          tr.classList.add("trow");
          const td1 = document.createElement("td");
          td1.innerHTML = as.actions[i].act.data.from;
          tr.appendChild(td1);
      
          const td2 = document.createElement("td");
          td2.innerHTML = as.actions[i].act.data.to;
          tr.appendChild(td2);
      
          const td3 = document.createElement("td");
          td3.innerHTML = as.actions[i].timestamp;
          tr.appendChild(td3);
      
          const td4 = document.createElement("td");
          const mediaQuery = window.matchMedia("(min-width: 768px)");

          function handleViewportChange(e) {
            if (e.matches) {
              // Code to execute when viewport width is at least 768px
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            } else {
              // Code to execute when viewport width is less than 768px
              td4.style.width = "30%";
              td4.innerHTML =`<a href="https://www.bloks.io/transaction/${as.actions[i].trx_id}" target="_blank" style="width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis; ">${as.actions[i].trx_id}</a>`
            }
          }
          
          mediaQuery.addEventListener("change", handleViewportChange); // Call the function on viewport change
          handleViewportChange(mediaQuery); // Call the function initially to handle the current viewport side
          
          tr.appendChild(td4);
      
          document.querySelector("tbody").appendChild(tr);
      
         // https://bloks.io/transaction/743b75104f9b564e13976f70dfc753962229082e3bbb8bbc59284069abc5da8b
          //last = response.actions[i].timestamp.slice(0, response.actions[i].timestamp.length - 1) + "1";
        }
        if(text6.substring(text6.length-4, text6.length) === "hufi" || text6.substring(text6.length-3, text6.length) === "mlt" ){
         print(response6)
        }
      }

      const table = document.querySelector('tbody');
      
        const rows = Array.from(table.children);
        rows.sort((rowA, rowB) => {
          const dateA = new Date(rowA.cells[2].textContent);
          const dateB = new Date(rowB.cells[2].textContent);
          return dateB - dateA;
        });
        table.append(...rows);
      notice.style.display = "none"

      }
      
      }
      
    choice (select.value) ;

    
  }
    //await rpc.get_currency_balance('eosio.token', from, 'EOS').then((balance) => console.log(balance));
  }

  
  }

  


 