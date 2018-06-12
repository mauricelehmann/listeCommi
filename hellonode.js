class List {
  constructor() {
    this.dataPath = './data/data.json' ;
    this.json_data = require(this.dataPath);
    this.lastUpdate ;
  }
}

List.prototype.getNbItems = function () {
  let nbItems = 0 ;
  for( item in this.json_data ){
    nbItems ++ ;
  }
  return nbItems ;
};

List.prototype.updateLog = function () {

};

List.prototype.updateData = function(){

  var dictstring = JSON.stringify(this.json_data);
  var fs = require('fs');
  fs.writeFileSync(this.dataPath, dictstring);

}

List.prototype.clearList = function(){

};

List.prototype.removeItem = function ( itemId ) {
  delete this.json_data[itemId] ;
  this.updateData() ;
};

List.prototype.addItem = function ( itemName ) {

  let itemId = this.getNbItems() +  1 ;
  this.json_data[itemId] = itemName ;
  this.updateData() ;

};

List.prototype.fetchItem = function () {

};

List.prototype.printList = function () {
  for( item in this.json_data ){
    console.log( item + ' : ' + this.json_data[item] + '\n') ;
  }
};

//TEST
var listCommi = new List() ;
listCommi.printList() ;

console.log('\n');

listCommi.addItem('yeah') ;
listCommi.printList() ;

console.log(listCommi.json_data);
console.log('\n');

//listCommi.removeItem() ;
//listCommi.printList() ;





// myObj = { "name":"John", "age":31, "city":"New York" };
// myJSON = JSON.stringify(myObj);
// localStorage.setItem("testJSON", myJSON);
//
//
//
// text = localStorage.getItem("testJSON");
// obj = JSON.parse(text);

// Print URL for accessing server




//Load HTTP module
var http = require("http");

//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   // Send the response body "Hello World"
   response.end('Hello World\n');

}).listen(8000);

//console.log('Server running at http://127.0.0.1:8000/') ;
