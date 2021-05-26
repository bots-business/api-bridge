const Gateway = require('../src/gateway')
const assert = require('assert').strict;

describe("Unit Test", function() {
  describe("Gateway", function() {
    process.env.BB_API_KEY = 'testApiKey'
    let gateway = new Gateway();

    it("can load example policy", function() {
        let policy = gateway.policies['BBApi']

        assert.strictEqual(typeof(policy)=="object", true)

        assert.strictEqual(policy.name, "BBApi");
        assert.strictEqual(policy.api_url, "https://api.bots.business/v1");
        assert.deepEqual(policy.safe_params[0], { key: "api_key", value: "testApiKey" } );

        assert.strictEqual(policy.methods.length, 3);

        assert.deepEqual(policy.methods[0],
          { path: "/bots", needAsk: false, method: "GET" }
        );

        
    });

    it("validate example urls", function() {
      let policy = gateway.policies['BBApi']

      assert.deepEqual(
        policy.haveMethod("/bots/4454?with_params=true"),
        { method: "GET", needAsk: false, path: "/bots/:id" }
      );
      
      assert.strictEqual(policy.haveMethod("/other/4454?with_params=true"), false);
    });


  })

});