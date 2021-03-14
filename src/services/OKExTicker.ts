import EventEmitter from "eventemitter3";
import OKExSocket from "./OKExSocket";

type ResponseMessage = {
  table: string;
  action: "partial" | "update";
  data: Array<{
    instrument_id: string;
    last: string;
  }>;
};

type TickerData = {
  last: number;
};

class OKExTicker extends EventEmitter<{
  data: (data: TickerData) => void;
}> {
  table: string;

  constructor(
    private socket: OKExSocket,
    channel: string,
    private instrumentId: string
  ) {
    super();
    this.table = `${channel}/ticker`;
    socket.on("data", this._handleData.bind(this));
  }

  _handleData(response: ResponseMessage) {
    const { table, instrumentId } = this;

    if (response.table === table) {
      response.data.forEach((instrumentData) => {
        if (instrumentData.instrument_id === instrumentId) {
          this.emit("data", { last: parseFloat(instrumentData.last) });
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

export default OKExTicker;
