import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3001", {
  perMessageDeflate: false,
});

ws.on("error", console.error);

ws.on("open", () => {
  const message = JSON.stringify({
    id: 1,
    jsonrpc: '2.0', // optional
    method: 'mutation',
    params: {
      path: "add",
      input: {
        "data": "something"
      },// <-- pass input of procedure, serialized by transformer
  },
});
  ws.send(message);
});

ws.on("message", (data) => {
  console.log("received: %s", data);
});