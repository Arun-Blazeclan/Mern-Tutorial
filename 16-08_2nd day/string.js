var mainstring="Once upon a time in ancient Greece, there lived a king named Midas. He had a lovely daughter whom he lovingly named Marigold. Although King Midas had immense wealth in his kingdom’s treasury, he was always dissatisfied and unhappy. He was always greedy for more wealth and wished he had more gold in his treasure.";

function changeCase(c){
    if(c=='L' || c=='l')
        return mainstring.toLowerCase();
    
    if(c=='U' || c=='u')
        return mainstring.toUpperCase();

    return mainstring; 
}

function getCharCount(c){
    var count=0
    for (var i=0;i<mainstring.length;i++){
        if(mainstring[i]==c.toLowerCase() || mainstring[i]==c.toUpperCase())
            count+=1;
    }
    return count; 
}

function getIndexofChar(c){
    var indices=[];
    for(var i =0;i<mainstring.length;i++){
        if(mainstring[i]==c.toLowerCase() || mainstring[i]==c.toUpperCase())
            indices.push(i);
    }
    return indices; 
}

function vowels(){
    var count=0;
    var v=['a','A','e','E','i','I','o','O','u','U'];
    for(var i =0;i<mainstring.length;i++){
        if(v.includes(mainstring[i]))
      //  for(var j=0;j<v.length;j++){
     //      if(mainstring[i]==v[j]){
              count+=1;
    //         continue;
    //}
    //}
    }
    return count;   
}

function getNoOfStatements(){
    var count=0;
    for(var i =0;i<mainstring.length;i++){
        if(mainstring[i]=='.')
            count++;
    }
    return count;   
}