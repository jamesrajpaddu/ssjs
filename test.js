<script runat="server">

    Platform.Load('core', '1');

    var config = {
        endpoint: "https://mc97sb5jfx5jwlk8yysdds5268h1.auth.marketingcloudapis.com/v2/token",
        credentials: {
           
                "grant_type": "client_credentials",
                "client_id": "nf1w4nrtxg8c5utdczl1pgln",
                "client_secret": "y9Eojszg4HAO7WBDWHX6o1Gf"
            
        },
       contentType : "application/json"
    }

    try {

        var auth = requestToken();
        var accestoken =String(auth.token);
        var accessurl = String(auth.url);
        Write(accestoken +"<br>");
        Write(accessurl+"<br>");
      
if (accestoken != null) {
      var url = accessurl + "data/v1/customobjectdata/key/1F8DCAC5-9256-4C0F-A37A-C9418B2BA388/rowset";

var payload = '';

var auth = 'Bearer ' + accestoken;

  var req = new Script.Util.HttpRequest(url);
  req.emptyContentHandling = 0;
  req.retries = 2;
  req.continueOnError = true;
  req.contentType = "application/json"
  req.setHeader("Authorization", auth);
  req.method = "GET"; /*** You can change the method here ***/
// req.postData = payload;

  var resp = req.send();
  var resultString = String(resp.content);
  var resultJSON = Platform.Function.ParseJSON(String(resp.content));
//  Write(resultJSON);
  Write(resultString);
    } 
    }
  catch(error) 
            {
              Write(Stringify(error));
        }

    function requestToken()
  {

        var request = HTTP.Post(config.endpoint,config.contentType , Stringify(config.credentials));

        if (request.StatusCode == 200)
        {

            var result = Platform.Function.ParseJSON(request.Response[0]);
            return {
                "token": result.access_token,
                "url": result.rest_instance_url
                   }

        } 
      else 
           {
   
            throw "Couldn't request the token. Status: " + request.StatusCode;
           }
    }
//legacy/v1/beta/object//
//data/v1/customobjectdata/key/4716BF65-F1F5-4446-9475-D6D8B582F2CA/rowset?$filter= Country%20eq%20'TCS'
</script>
