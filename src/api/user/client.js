var apigUsersClientFactory = require("aws-api-gateway-client").default;

class UsersApiClient {
  constructor() {
    var config = {
      // this is bad practice, we need to have a domain (using Route53 in AWS)
      invokeUrl: "https://k12cyc11b4.execute-api.eu-west-1.amazonaws.com/prod"
    };
    this.api = apigUsersClientFactory.newClient(config);
  }

  create(email, success, failure) {
    var pathParams = {};
    var pathTemplate = "/";
    var method = "POST";
    var additionalParams = {
      queryParams: {
        id: email,
        email: email
      }
    };
    var body = {};
    this.api
      .invokeApi(pathParams, pathTemplate, method, additionalParams, body)
      .then(function(result) {
        success(result);
      })
      .catch(function(result) {
        console.error(result);
        if (failure) failure(result);
      });
  }
}

export default new UsersApiClient();
