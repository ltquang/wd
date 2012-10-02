// Generated by CoffeeScript 1.3.3
(function() {
  var assert, should, test;

  should = require('should');

  assert = require('assert');

  test = function(remoteWdConfig, desired) {
    var browser, leakDetector, wd;
    leakDetector = (require('../common/leak-detector'))();
    wd = require('../../lib/main');
    if (typeof remoteWdConfig === 'function') {
      remoteWdConfig = remoteWdConfig();
    }
    browser = null;
    describe("remote", function() {
      return it("should create browser", function(done) {
        browser = wd.remote(remoteWdConfig);
        should.exist(browser);
        browser.on("status", function(info) {
          return console.log("\u001b[36m%s\u001b[0m", info);
        });
        browser.on("command", function(meth, path) {
          return console.log(" > \u001b[33m%s\u001b[0m: %s", meth, path);
        });
        return done(null);
      });
    });
    describe("init", function() {
      return it("should initialize browser", function(done) {
        this.timeout(15000);
        return browser.init(desired, function() {
          return done(null);
        });
      });
    });
    describe("browsing", function() {
      describe("getting page", function() {
        return it("should navigate to test page and check title", function(done) {
          this.timeout(15000);
          return browser.get("http://saucelabs.com/test/guinea-pig", function() {
            return browser.title(function(err, title) {
              assert.ok(~title.indexOf("I am a page title - Sauce Labs"), "Wrong title!");
              return done(null);
            });
          });
        });
      });
      return describe("clicking submit", function() {
        return it("submit element should be clicked", function(done) {
          this.timeout(15000);
          return browser.elementById("submit", function(err, el) {
            return browser.clickElement(el, function() {
              return browser["eval"]("window.location.href", function(err, title) {
                assert.ok(~title.indexOf("#"), "Wrong title!");
                return done(null);
              });
            });
          });
        });
      });
    });
    describe("leaving", function() {
      return it("closing browser", function(done) {
        this.timeout(15000);
        return browser.quit(function() {
          return done(null);
        });
      });
    });
    return leakDetector.lookForLeaks();
  };

  exports.test = test;

}).call(this);
