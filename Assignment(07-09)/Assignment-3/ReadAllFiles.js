const fs = require("fs");
const path = require("path");
const { connected } = require("process");
const dirPath = path.join(__dirname, "./../Nodejs/D1");

//Read all files and subfolders from dirpath
fs.readdir(dirPath, (err, files) => {
  if (err) {
    return;
  }

  //iterate over all files and folder under dirpath
  files.forEach((file, i) => {
    fs.stat(`${dirPath}/${file}`, (err, stat) => {
      if (err) {
        console.log(`Some Error ${err.message}`);
        return;
      }
      //check if file and read it
      else if(stat.isFile()) {
          console.log(`${file}`);
      }
      //if subfolder then call readAll function which read files in subfolder
      else{
        let p = path.join(dirPath, `./${file}`);
        readAll(p);
      }
    
    });
  });
});

let readAll = (p)=>{

  fs.readdir(p, (err, files) => {
    if (err) {
      return;
    }
    //iterate over subfolder
    files.forEach((f, i) => {
      fs.stat(`${p}/${f}`, (err, stat) => {
        if (err) {
          console.log(`Some Error ${err.message}`);
          return;
        }
        else if(stat.isFile()) {
            console.log(`${f}`);
        }
        //if under subfolder there is another folder then again we call readAll function to read all files
      else{
        p = path.join(p, `./${f}`);
        readAll(p);
      }
      
      });
    });
  });
}
