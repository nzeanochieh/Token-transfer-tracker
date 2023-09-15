
//import { JsonRpc } from 'eosjs'
var { JsonRpc } = require('eosjs');
var { User } = require('universal-authenticator-library');
//import { UALJs } from 'ual-plainjs-renderer'
var {UALJs} = require('ual-plainjs-renderer');
//import { Scatter } from 'ual-scatter'
var {Scatter} = require('ual-scatter');
//import { Anchor } from 'ual-anchor'
var {Anchor} = require('ual-anchor');
//import { TokenPocket } from 'ual-token-pocket'
var {TokenPocket} = require('ual-token-pocket');
//var {MockAuthenticator} = require('./build/MockAuthenticator');
//var {demoTransaction} = require('./demo-transaction')
//var {fetch}= require("node-fetch");
//import fetch from 'node-fetch'
if (!window.fetch) {
  window.fetch = require("node-fetch");
}






//const addRow = document.getElementById("addRow");
//const submit = document.getElementById("submit");
//const submit2 = document.getElementById("submit2");
//const logIn = document.getElementById("login");
//const logIn2 = document.getElementById('login2');
//const wallet =  document.getElementById('wallet');
//const rows =   document.getElementsByClassName("trow");
//const clear = document.querySelector("#clear");
//const accName = document.getElementsByClassName("accName");
//const amount = document.getElementsByClassName("amount");
//const memo = document.getElementsByClassName("memo");
const exchangeSelect = document.querySelector(".p #select");


clear.addEventListener("click", clean)
function clean(){
  document.querySelector("form").reset();
}



const myCallback = arrayOfUsers => {
  // Execute on successful user authentication
  loggedInUser = arrayOfUsers[0];
 /* console.info('User Information:');
  console.info('Account Name:', loggedInUser.getAccountName());
  console.info('Chain Id:', loggedInUser.getChainId());*/
  logged()
}

// mainnet chain id "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
// testnet chain id '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840'
//testnet endpoint "https: //jungle3.cryptolions.io"
//mainnet endpoint "https: //api.eospglmlt.com"
const myChain = {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  rpcEndpoints: [{
    protocol: 'https',
    host: 'api.eospglmlt.com',
    port: ''
  }]
}

const myAppName = 'My UAL App'

const scatter = new Scatter([myChain], { appName: myAppName })
const anchor = new Anchor([myChain], { appName: myAppName })
const tokenPocket = new TokenPocket([myChain], { appName: myAppName })
//const authenticator = new MockAuthenticator([myChain], { appName: myAppName })


logIn.style.display = "block";
logIn2.style.display = "none";
const myAppRoot = {
  containerElement: logIn2
}

const ual = new UALJs(myCallback, [myChain], myAppName, [scatter,anchor,tokenPocket], myAppRoot)


exchangeSelect.addEventListener("change", async function(){

  
    })


   


submit.style.display = "none"
submit.addEventListener("click", send)
async function send(){
  alert ("Tracking Transfers");
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
notice.style.display = "none";

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

const table = document.querySelector('tbody');

  const rows = Array.from(table.children);
  rows.sort((rowA, rowB) => {
    const dateA = new Date(rowA.cells[2].textContent);
    const dateB = new Date(rowB.cells[2].textContent);
    return dateB - dateA;
  });
  table.append(...rows);
notice.style.display = "none";
}



}

choice (exchangeSelect.value) ;
}
   
    



    document.querySelector(".popup .close-btn").addEventListener("click", async function(){
     
      document.querySelector(".overlay").style.display = "none"
      document.querySelector(".popup").classList.remove("active");

      if(document.getElementById("logInStatus").textContent === ""){
        const userAccountName = await loggedInUser.getAccountName();
        document.getElementById("logInStatus").innerHTML =  `<i class="fas fa-user"></i> Welcome ${userAccountName}` ;
      }
      document.getElementById("logInStatus").style.color = "green" ;
      document.getElementById("logInStatus").style.fontFamily = "Roboto"
      document.getElementById("logInStatus").style.fontWeight = 600 ;
      
    });


    wallet.addEventListener("click",  wall)
     function wall(){
      if(document.getElementById("logInStatus").textContent === "User: ~"){
      this.style.display = "none"
     logIn2.style.display = "block";
     
     
     ual.init()
     
    
     
     logIn.style.display = "none";
     preventConflict.staus = 1 ;
     submit.style.display = "block"
     submit2.style.display = "none"
     
      }
    
    }
   
    
    
  
    

    logIn.addEventListener("click", welcome)
function welcome(){
  document.querySelector(".overlay").style.display = "block"
  document.querySelector(".popup").classList.add("active");

    }


    
   
   
    async function logged(){
          const userAccountName = await  loggedInUser.getAccountName();
      if(userAccountName !== ""){
          
           const RPC_PROTOCOL = 'https';
         const RPC_HOST = 'api.eospglmlt.com';
         const RPC_PORT = '';
         const balanceTag = document.querySelector(".accDetails")
         const balanceTag2 = document.querySelector(".row .accDetails")
         
          
          document.querySelector(".mltImg").style.display = "none"
          document.querySelector(".eosImg").style.display = "block"
           balanceTag.innerHTML= "Balance: "+preventConflict.EOSbal;
       
            
           
             try {
               const rpc = new JsonRpc(`${RPC_PROTOCOL}://${RPC_HOST}:${RPC_PORT}`, {fetch})
               const accountName = await loggedInUser.getAccountName()
               const data = await rpc.get_account(accountName)
           
               const { core_liquid_balance: balance } = data
               balanceTag.innerHTML = `Account Balance: ${balance}`
               balanceTag2.innerHTML = `Account Balance: ${balance}`
           
             } catch (e) {
               console.error(e)
               balanceTag.innerHTML = 'Unable to retrieve account balance at this time'
             }
           
       
          
    
          document.getElementById("logInStatus").innerHTML =  `<i class="fas fa-user"></i> Welcome ${userAccountName}` ;
          document.getElementById("logInStatus").style.color = "gray" ;
          document.getElementById("logInStatus").style.fontFamily = "Roboto"
          document.getElementById("logInStatus").style.fontWeight = 600 ;
          document.getElementById("logInStatus").style.display = "block" ;
      
          document.querySelector(".overlay").style.display = "none"
          document.querySelector(".popup").style.display = "none";
        }
      
       }  
     
        
    
  
  
  