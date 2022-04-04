<script runat="server">
 Platform.Load("core","1");
 try {

  
 for(var i=0;i<10;i++){
  Write("kk);
        }
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
