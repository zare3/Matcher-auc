const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const USER_POOL_ID = "eu-west-1_QfL4Lk51A";
const CLIENT_ID = "22e24sdpsouqnle0d5cg9oac1t";
const POOL_DATA = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
};

class IdentityManager {
  verify(cognitoUser, code, success, failure) {
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        failure(err);
        return;
      }
      success(cognitoUser);
    });
  }

  signup(email, password, success, failure) {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
    userPool.signUp(
      email,
      password,
      [
        new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: "email",
          Value: email
        })
      ],
      null,
      function(err, result) {
        if (err) {
          console.error(err);
          failure(err);
          return;
        }
        success(result.user);
      }
    );
  }

  signin(email, password, success, failure) {
    var authenticationData = {
      Username: email,
      Password: password
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
    var userData = {
      Username: email,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        success(result.getAccessToken().getJwtToken());
      },
      onFailure: function(err) {
        failure(err);
      }
    });
  }

  getCurrentUser(success, failure) {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
    var cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      if (failure) failure("No valid user");
      return;
    }
    cognitoUser.getSession(function(err, session) {
      if (err) {
        failure(err);
        return;
      }
      if (session.isValid()) success(cognitoUser);
      else failure("Session not valid");
    });
  }

  isAuthenticated(success, failure) {
    this.getCurrentUser(success, failure);
  }
}

export default IdentityManager;
