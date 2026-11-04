// getPort
// Reads the port to listen on from the command line arguments.
// `salla app serve --port 8081` starts `nodemon app.js -p 8081`, while
// `node app.js 8081` passes the port on its own, so both forms are accepted.
const DEFAULT_PORT = 8082;

function toPort(value) {
  if (value === undefined) {
    throw new Error("Missing port number after -p/--port");
  }
  const port = Number(value);
  if (!/^\d+$/.test(String(value)) || port < 1 || port > 65535) {
    throw new Error(
      `Invalid port "${value}": expected a number from 1 to 65535`
    );
  }
  return port;
}

module.exports = function getPort(args = process.argv.slice(2)) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-p" || args[i] === "--port") {
      return toPort(args[i + 1]);
    }
    if (args[i].startsWith("--port=")) {
      return toPort(args[i].slice("--port=".length));
    }
  }
  return args.length ? toPort(args[0]) : DEFAULT_PORT;
};
