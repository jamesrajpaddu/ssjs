<script runat="server" language="ampscript">
 Platform.Load("core","1");
 try {

 
  Output(Concat('Welcome ','to SFMC-NINJA'))

        
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
