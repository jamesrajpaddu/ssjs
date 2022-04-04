<script runat="server">
 Platform.Load("core","1");
 try {

  
  var map = Array.prototype.map;
var a = map.call('Hello World', function(x) { return x.length });
   Write(a);
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
