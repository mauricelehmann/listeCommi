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
  for( item in this.json_data ){
    this.removeItem(item) ;
  }
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

List.prototype.printList = function () {

  let strList ;

  for( item in this.json_data ){
    strList += (item + ' : ' + this.json_data[item] + '\n') ;
    //console.log( item + ' : ' + this.json_data[item] + '\n') ;
  }
  return strList ;
};

//TEST
var listCommi = new List() ;

var showAllCommand = "/printList \n /?addItem=nom de l item \n /?removeItem=numero de l item \n /clearList" ;

//Load HTTP module
var http = require("http");
var url = require('url');

//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});

   var query = url.parse(request.url, true).query;
   var addItem = query.addItem ;
   var removeItem = query.removeItem ;

   if( request.url == '/printList'){
     response.end(listCommi.printList());
   }else if( addItem ){
    listCommi.addItem(addItem) ;
    response.end(listCommi.printList());
  }else if (removeItem) {
    listCommi.removeItem(removeItem);
    response.end(listCommi.printList());
  }
   else{
     response.end(showAllCommand);
   }

}).listen(8000);

//console.log('Server running at http://127.0.0.1:8000/') ;
