<script runat="server">
 Platform.Load("core","1");
 try {

 function filter(array) {
  let passed = [];
  for (var element of array) {
   
      passed.push(element);
    }
  
  return passed;
}
 var dsd=[{"name":"dd"},{"name":"jj"}]; 
var checker = filter(dsd);
  Write(checker);
        
</script>

<script runat="server">
 }
 catch (err) {
  Variable.SetValue("@errorMessage", Stringify(err.message) + Stringify(err.description));
 }
</script> 
<script runat="client">
 console.log(`%%=v(@errorMessage)=%%`);
</script>  
