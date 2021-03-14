import EventEmitter from "eventemitter3";
import OKExSocket from "./OKExSocket";

type ResponseMessage = {
  table: string;
  action: "partial" | "update";
  data: Array<{
    instrument_id: string;
    asks: Array<[string, string, string, string]>;
    bids: Array<[string, string, string, string]>;
  }>;
};

type DepthData = {
  bids: Map<number, number>;
  asks: Map<number, number>;
};

class OKExDepth extends EventEmitter<{
  data: (data: DepthData) => void;
}> {
  data: DepthData;
  table: string;

  constructor(
    private socket: OKExSocket,
    channel: string,
    private instrumentId: string
  ) {
    super();
    this.data = {
      bids: new Map<number, number>(),
      asks: new Map<number, number>(),
    };
    this.table = `${channel}/depth_l2_tbt`;
    socket.on("data", this._handleData.bind(this));
  }

  _handleData(response: ResponseMessage) {
    const { table, instrumentId, data } = this;
    const { asks, bids } = data;

    if (response.table === table) {
      response.data.forEach((instrumentData) => {
        if (instrumentData.instrument_id === instrumentId) {
          if (response.action === "partial" || response.action === "update") {
            instrumentData.asks.forEach((ask) => {
              const price = parseFloat(ask[0]);
              const qty = parseFloat(ask[1]);
              if (ask[1] === "0") {
                asks.delete(price);
              } else {
                asks.set(price, qty);
              }
            });

            instrumentData.bids.forEach((bid) => {
              const price = parseFloat(bid[0]);
              const qty = parseFloat(bid[1]);
              if (bid[1] === "0") {
                bids.delete(price);
              } else {
                bids.set(price, qty);
              }
            });

            this.emit("data", data);
          }
        }
      });
    }
  }

  async subscribe() {
    const { table, instrumentId } = this;
    const message = {
      op: "subscribe",
      args: [`${table}:${instrumentId}`],
    };

    this.socket.send(message);
  }
}

export default OKExDepth;
