const test = require("node:test");
const assert = require("node:assert");
const getPort = require("../helpers/getPort");

test("uses 8082 when no port is given", () => {
  assert.strictEqual(getPort([]), 8082);
});

test("reads the port passed on its own", () => {
  assert.strictEqual(getPort(["8081"]), 8081);
});

test("reads the -p flag passed by salla app serve", () => {
  assert.strictEqual(getPort(["-p", "8081"]), 8081);
});

test("reads --port with a space or an equals sign", () => {
  assert.strictEqual(getPort(["--port", "8081"]), 8081);
  assert.strictEqual(getPort(["--port=8081"]), 8081);
});

test("rejects a value that is not a port", () => {
  assert.throws(() => getPort(["-p"]), /Missing port number/);
  assert.throws(() => getPort(["-p", "abc"]), /Invalid port "abc"/);
  assert.throws(() => getPort(["-p", "70000"]), /Invalid port "70000"/);
  assert.throws(() => getPort(["0"]), /Invalid port "0"/);
});
