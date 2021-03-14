import WebSocket, { MessageEvent } from "isomorphic-ws";
import * as pako from "pako";
import EventEmitter from "eventemitter3";

const textEncoder = new TextDecoder();

class OKExSocket extends EventEmitter<"data"> {
  socket: WebSocket;
  ready: Promise<void>;

  constructor() {
    super();

    const socket = new WebSocket("wss://real.okex.com:8443/ws/v3");
    socket.binaryType = "arraybuffer";

    this.ready = new Promise((resolve) => {
      socket.onopen = () => {
        resolve();
      };
    });

    socket.onmessage = this._handleMessage.bind(this);

    this.socket = socket;
  }

  async _handleMessage(message: MessageEvent) {
    const data = this._decodeMessage(message);
    this.emit("data", data);
  }

  _decodeMessage(message: MessageEvent) {
    const buffer = new Uint8Array(message.data as ArrayBuffer);
    const indeflateBuffer = pako.inflateRaw(buffer);
    const responseText = textEncoder.decode(indeflateBuffer);

    return JSON.parse(responseText);
  }

  send(data: any) {
    this.socket.send(JSON.stringify(data));
  }
}

export default OKExSocket;
