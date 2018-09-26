/**
 * Provides REST-API functionality
 */
var ServerConnection = (function(){

    var serverBase = "http://localhost:44316/api/v1/";

    var sc = function(){
        this.token = null;
    }

    sc.prototype.sendJsonRequest = function(strPath, options){
        var req = new XMLHttpRequest();
        req.open(options.method, serverBase + strPath);
        req.setRequestHeader("Content-Type", "application/json");
        if(this.token != null)
            req.setRequestHeader("Authorization", "Bearer "+this.token);

        if(options.beforeSend != undefined)
            options.beforeSend(req);

        req.onload = function () {
            if(this.status >= 200 && this.status < 400){
                if(options.fnSuccess)
                    options.fnSuccess(this);
            }
            else{
                if(options.fnFailure)
                    options.fnFailure(this);
            }
        };

        if(options.body != undefined) {
            if (options.body instanceof String)
                req.send(options.body);
            else
                req.send(JSON.stringify(options.body));
        }
        else
            req.send();
    }

    /**
     * Sends loginrequest to server.
     * Calls fnSuccess and fnFailure with the response
     * @param strUsername
     * @param strPassword
     * @param fnSuccess  Called on  200 <= statuscode < 400
     * @param fnFailure
     */
    sc.prototype.login = function(strUsername, strPassword, fnSuccess, fnFailure){

        this.sendJsonRequest("login", {
            method:"POST",
            fnSuccess: function (response) {
                this.token = JSON.parse(response.response).token;
                fnSuccess(response);
            }.bind(this),
            fnFailure: fnFailure,
            body:{
                User: strUsername,
                Password: strPassword
            }
        });
    }

    /**
     * Sends registerrequest to server.
     * Calls fnSuccess and fnFailure with response as argument
     * @param strUsername
     * @param strPassword
     * @param fnSuccess Called on 200 <= statuscode < 400
     * @param fnFailure
     */
    sc.prototype.register = function(strUsername, strPassword, fnSuccess, fnFailure){
        this.sendJsonRequest("register",{
            method:"POST",
            fnSuccess: function (response) {
                this.token = JSON.parse(response.response).token;
                fnSuccess(response);
            }.bind(this),
            fnFailure: fnFailure,
            body: {
                User: strUsername,
                Password: strPassword
            }
        })
    }

    return new sc();
}());

