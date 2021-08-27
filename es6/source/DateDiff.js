window.onload =function(){
    let arr=[31,28,31,30,31,30,31,31,30,31,30,31];

    let checkYear = (y)=>{
        if ((y % 4) == 0){
            if ((y % 100) == 0){
                if ((y % 400) == 0){
                    return true;
                }
                else
                return false;
            }
            else
            return true;
        }
        else
        return false;
    }
    

    document.getElementById("btnsub").addEventListener('click',function(){
        let d1=document.getElementById("fdate").value;
        let t1=document.getElementById("ftime").value;
        let d2=document.getElementById("tdate").value;
        let t2=document.getElementById("ttime").value;
        
        let y1=d1.substring(0,4);
        let y2=d2.substring(0,4);
        let year=parseInt(y2)-parseInt(y1);
        let month=0;
        let days=0;
        let hr=0;
        let min= 0;
        let sec= 0;

        let m1=d1.substring(5,7);
        let m2=d2.substring(5,7);

        if(m1>m2){
            year-=1;
            month=12-parseInt(m1);
            month+=parseInt(m2);
        }
        else
            month=parseInt(m2)-parseInt(m1);
            
        let da1=d1.substring(8,10);
        let da2=d2.substring(8,10);

        if(checkYear(y2)){
            if(m2-1==2){
                console.log("True");

            }
        }
        
        if(da1>da2){
            month-=1;
            days=arr[m2-2]-parseInt(da1);
            console.log(m2-1,days);
            days+=parseInt(da2);

        }
        else
            days=parseInt(da2)-parseInt(da1);
        
        let h1=t1.substring(0,2);
        let h2=t2.substring(0,2);

        if(h1>h2){
            days-=1;
            hr=24-parseInt(h1);
            hr+=parseInt(h2);
        }
        else{
            hr=parseInt(h2)-parseInt(h1);
        }

        let mi1=t1.substring(3,5);
        let mi2=t2.substring(3,5);

        if(mi1>mi2){
            hr-=1;
            min=60-parseInt(mi1);
            min+=parseInt(mi2);
        }
        else{
            min=parseInt(mi2)-parseInt(mi1);
        }
        document.getElementById("show").innerText=`The Differnce is :- ${year} years ${month} months ${days} days ${hr} hours ${min} minutes and ${sec} seconds`;

    },false)
}