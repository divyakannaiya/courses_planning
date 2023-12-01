const fs = require('fs');
fs.writeFileSync('myFile.txt', 'This is content of file');

console.log("file write done");

fs.writeFile('myFile.txt', "This is content of file async", function(err){
    if(err){
        console.log("err occured", err);
    }
    console.log("file created successfully");
});

console.log("after file write");


let data = fs.readFileSync('myfile.txt');
console.log('Data of file is:',data.toString());                              

fs.readFile('myfile.txt',function(err, data){
    if(err){
        console.log("err occured",err);
        return;
    }
    console.log("Content of file is:",data.toString());
})

console.log("after file read");