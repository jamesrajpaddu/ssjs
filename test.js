<b>Searching_Criteria:</b><br>
* For search Exact Data Extension Name Ex: Text<br>
* For search Data Extension Name matched input value Ex: %ex%<br>
* For search Data Extension Name starts with input value Ex: Te%<br>
* For sSearch Data Extension Name ends with input value Ex: %xt
 <style>
  
   .loader {
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid #FF7A59;
  width: 100px;
  height: 100px;
  animation: spinner 4s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  input[type=text], select {
    width: 65%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width: 25%;
    background-color: orange;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #f2db05;
    color: black;
  }

  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 2px;
  }  
 </style>
<div>
 
<table style="padding: 20px;"><tr><td style="width:500px">
  <h2><b>Data Extension search.</b><br>   
  </h2>
  <form action="%%=RequestParameter('https://mc97sb5jfx5jwlk8yysdds5268h1.pub.sfmc-content.com/a0tkoulvuv3')=%%" method="post">
    <select name="DEprop">
       <option value="Name">Data Extension Name</option>      
       <option value="CustomerKey">External Key</option>
    </select>
       <h2>  equals </h2>
       <input id="inputValue" name="DEval" type="text" maxlength="128" value="%%=RequestParameter('DEval')=%%">&emsp;&emsp;<input type="submit" onclick="loadimage()" value="Submit">

      <h2>Submitted Value is : %%=RequestParameter('DEval')=%% </h2>
      <div id="divId" class="midDiv" style="display:none;"> 
     <div class="loader"></div>
</div>
  </form>
  
 <br>


<script>
  function loadimage(){
document.getElementById("divId").style.display = "block";
    
  }
  </script> 

  <script runat="server">
  Platform.Load("core","1");
 try{
      
  var DEprop = Request.GetQueryStringParameter("DEprop");
   
  //Get value from Textbox User enterd     
  var DEvaluefromTextbox = Request.GetQueryStringParameter("DEval").toLowerCase();
   
  //remove percentage from textbox value for further validation    
  var finalTextboxvalueforPorS = DEvaluefromTextbox.replace("%","");
  var finalTextboxvalueforPnS =finalTextboxvalueforPorS.replace("%","");
  
  //like and equals operators for data extension values filter     
  var likeOperator= "like";
  var equalOperator ="equals";
      
      
  if(DEvaluefromTextbox == "%"+finalTextboxvalueforPnS+"%")
  {
       likeValues(likeOperator,finalTextboxvalueforPnS);   
  }
   else if(DEvaluefromTextbox == "%"+finalTextboxvalueforPorS)
   {
     //get filterd Data Extensions  
   var foundDataExtensions = DataExtension.Retrieve({Property:DEprop,SimpleOperator:"like",Value:finalTextboxvalueforPorS});
    //get final matched Data Extension and store in finaldename array
     var finaldename=[];
      var inputvalLength=finalTextboxvalueforPorS.length;
      for(var i=0; i<foundDataExtensions.length;i++)
      { 
        //Convert found Data extension Names to lowecase and find matched String
        var lowecaseDEnames=foundDataExtensions[i].Name.toLowerCase();
        var finalmatchedDEname =lowecaseDEnames.slice(lowecaseDEnames.length - inputvalLength)
        if(finalmatchedDEname == finalTextboxvalueforPorS )
        {
          //Store matched Folders Name and Catogory ID's
          finaldename.push({"Name":foundDataExtensions[i].Name,"CategoryID":foundDataExtensions[i].CategoryID})
        }
      } 
     //call prefixLike function to display result
      prefixLike(finaldename);
     if(DEvaluefromTextbox.length > 0 && finaldename.length <1)
     {
        Write("<h2>"+"<i>"+"Matched Data Extension not found"+"<i>"+"</h2>");
     }
   }
   else if(DEvaluefromTextbox == finalTextboxvalueforPorS+"%")
   {
   //get filterd Data Extensions  
   var foundDataExtensions = DataExtension.Retrieve({Property:DEprop,SimpleOperator:"like",Value:finalTextboxvalueforPorS});
    //get final matched Data Extension and store in finaldename array
     var finaldename=[];
      var inputvalLength=finalTextboxvalueforPorS.length;
      for(var i=0; i<foundDataExtensions.length;i++)
      {
         //Convert found Data extension Names to lowecase and find matched String
        var lowecaseDEnames=foundDataExtensions[i].Name.toLowerCase();
        var finalmatchedDEname =lowecaseDEnames.slice(0,inputvalLength)
        if(finalmatchedDEname == finalTextboxvalueforPorS )
        {
          //Store matched Folders Name and Catogory ID's
          finaldename.push({"Name":foundDataExtensions[i].Name,"CategoryID":foundDataExtensions[i].CategoryID})
        }
      } 
     //call prefixLike function to display result
      prefixLike(finaldename);
     if(DEvaluefromTextbox.length > 0 && finaldename.length <1)
     {
        Write("<h2>"+"<i>"+"Matched Data Extension not found"+"<i>"+"</h2>");
     }
   }
 else 
 {
     likeValues(equalOperator,DEvaluefromTextbox)     
 }
  
  //Function for both Like and Equal operators    
   function likeValues(operator,finalvalue)
  { 
    
    //get filterd Data Extensions  
    var foundDataExtensions = DataExtension.Retrieve({Property:DEprop,SimpleOperator:operator,Value:finalvalue});
    Write("<b>"+"<h3>"+"Total Data extensions found is :"+foundDataExtensions.length +"</h3>"+"</b>");
    if(DEvaluefromTextbox.length >0 && foundDataExtensions.length >0 )
    {
      //Object to store unique folder ID's  
    var uniqueFolders={};
      
      for(var i=0;i<foundDataExtensions.length;i++)
   {
     
  //get filterd folders based on Data Extension retrived
  var folderss = Folder.Retrieve({Property:"ID",SimpleOperator:"equals",Value:foundDataExtensions[i].CategoryID});
        for(var j=0;j<folderss.length;j++)
      {    
        
       //store foldersID and it's Names to uniqueFolders 
       uniqueFolders[folderss[j].Name] = [folderss[j].ID];  
      }
 }

 //retrive values from uniqueFolders object and display
 for(var keys in uniqueFolders){
   
   //display Folders Name
   Write("<h3>"+"Folder Name : "+keys+"</h3>"+"<hr>");
   for( var k=0;k<foundDataExtensions.length;k++)
   {
     //matched category ID's and display Data Extension Name
     if(foundDataExtensions[k].CategoryID == uniqueFolders[keys])
      {
       Write(foundDataExtensions[k].Name +'</br>');
        Write("   "+"<br>")
      }
   }
 }
    }
    else {
      Write("<h2>"+"<i>"+"Matched Data Extension not found"+"<i>"+"</h2>");
    }
    
    }
   
  //Function for Prefix or Suffix like operator  
   function prefixLike(finalDEnamesarray){
  Write("<b>"+"<h3>"+"Total Data extensions found is :"+finalDEnamesarray.length +"</h3>"+"</b>");
  //store unique folder names and ID's in  uniqueFolderNames Object  
  var uniqueFolderNames={};
      
      for(var i=0;i<finalDEnamesarray.length;i++)
  {
    var folderss = Folder.Retrieve({Property:"ID",SimpleOperator:"equals",Value:finalDEnamesarray[i].CategoryID});
    for(var j=0;j<folderss.length;j++)
      { 
        //retrive and store unique folders Name and ID's
        uniqueFolderNames[folderss[j].Name] = [folderss[j].ID];  
       }
  }
      //Iteration for dispaly foldername and its Data extensions
      for(var keys in uniqueFolderNames){
        
      //Display Folder names  
      Write("<h3>"+"Folder Name : "+keys+"</h3>"+"<hr>");
        for( var k=0;k<finalDEnamesarray.length;k++)
        {
          if(finalDEnamesarray[k].CategoryID == uniqueFolderNames[keys])
            {
            //Display Data extension Names
            Write(finalDEnamesarray[k].Name +'</br>');
             Write("   "+"<br>")
            }
        }
      
      }
    }
   
  
   
  </script>
  </td></tr></table></div>
  <script runat="server">
  }
  catch(e) {
   Variable.SetValue("errorMessage", Stringify(e.message) + Stringify(e.description));
  }
  </script>
   
  <script runat="client">
  console.log(`%%=v(@errorMessage)=%%`);
    console.log("james");
   
  </script>
  
