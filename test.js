<script runat="server">
 Platform.Load("core","1");
 try {

 var f=function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}
 var dsd=[{"name":"dd"},{"name":"jj"}]; 
var checker = f(dsd,dsd.name == "dd");
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
