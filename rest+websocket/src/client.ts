import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3001", {
  perMessageDeflate: false,
});

ws.on("error", console.error);

ws.on("message", (data) => {
  console.log("received: %s", data);
});