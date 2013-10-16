define(['test/spec/app/test-helper.js'], function (helper) {
  describe("App", function() {

    describe("get /", function() {

      it("responds successfully", function() {
        helper.withServer(function(r, done) {
          r.get("/", function(err, res, body) {
            expect(res.statusCode).toEqual(200);
            done();
          });
        });
      });

      it("has the correct body", function() {
        helper.withServer(function(r, done) {
          r.get("/", function(err, res, body) {
            expect(body).toEqual("Hello, world!");
            done();
          });
        });
      });

    });

    describe("post /", function() {

      it("has the correct body", function() {
        helper.withServer(function(r, done) {
          r.post("/", "post body", function(err, res, body) {
            expect(body).toEqual("You posted!");
            done();
          });
        });
      });

    });

  });
});
