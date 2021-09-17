<html>
   <head>
      <script>
         
         function dis(val)
         {
             document.getElementById("result").value+=val
             
         }
           
         //function that evaluates the digit and return result
         function solve()
         {
             let x = document.getElementById("result").value
             let y = eval(x)
             document.getElementById("result").value = y
         }
           
         //function that clear the display
         function clr()
         {
             document.getElementById("result").value = ""
         }

         function sqr()
         {
            let x=document.getElementById("result").value
            let y= Math.pow(x,2)
            document.getElementById("result").value = y
         }

         function usqr()
         {
            let x=document.getElementById("result").value
            let y= Math.pow(x,(1/2))
            document.getElementById("result").value = y
         }

         function den()
         {
            let x=document.getElementById("result").value
            let y= 1/x
            document.getElementById("result").value = y
         }

         function per()
         {
            let x=document.getElementById("result").value
            let y= x/100
            document.getElementById("result").value = y
         }
      </script>
      <!-- for styling -->
      <style>
         .title{
         margin-bottom: 10px;
         text-align:center;
         width: 210px;
         color:white;
         background-color: lightseagreen;
      
         }
  
         input[type="button"]{
         
         width:100%
         }
  
         input[type="text"]{
         background-color: linen;
      
         width:100%
         }
      </style>
   </head>
   
   <body style="margin-left: 450px;">
      <div class = title >Simple Calculator</div>
      <table border="1.5">
         <tr>
            <td colspan="3"><input type="text" id="result"/></td>
            <td><input type="button" value="C" onclick="clr()"/> </td>
         </tr>
         <tr>
            <td><input type="button" value="1" onclick="dis('1')"/> </td>
            <td><input type="button" value="2" onclick="dis('2')"/> </td>
            <td><input type="button" value="3" onclick="dis('3')"/> </td>
            <td><input type="button" value="/" onclick="dis('/')"/> </td>
         </tr>
         <tr>
            <td><input type="button" value="4" onclick="dis('4')"/> </td>
            <td><input type="button" value="5" onclick="dis('5')"/> </td>
            <td><input type="button" value="6" onclick="dis('6')"/> </td>
            <td><input type="button" value="-" onclick="dis('-')"/> </td>
         </tr>
         <tr>
            <td><input type="button" value="7" onclick="dis('7')"/> </td>
            <td><input type="button" value="8" onclick="dis('8')"/> </td>
            <td><input type="button" value="9" onclick="dis('9')"/> </td>
            <td><input type="button" value="+" onclick="dis('+')"/> </td>
         </tr>
         <tr>
            <td><input type="button" value="." onclick="dis('.')"/> </td>
            <td><input type="button" value="0" onclick="dis('0')"/> </td>
            <!-- solve function call function solve to evaluate value -->
            <td><input type="button" value="=" onclick="solve()"/> </td>
            <td><input type="button" value="x" onclick="dis('*')"/> </td>
         </tr>
         <tr>
            <td><input type="button" value="x^2" onclick="sqr()"/> </td>
            <td><input type="button" value="x^1/2" onclick="usqr()"/> </td>
            <td><input type="button" value="1/x" onclick="den()"/> </td>
            <td><input type="button" value="%" onclick="per()"/> </td>
         </tr>
      </table>
   </body>
</html>   
