import EventEmitter from "eventemitter3";
import OKExSocket from "./OKExSocket";

type ResponseMessage = {
  table: string;
  action: "partial" | "update";
  data: Array<{
    instrument_id: string;
    mark_price: string;
  }>;
};

type TickerData = {
  mark: number;
};

class OKExMark extends EventEmitter<{
  data: (data: TickerData) => void;
}> {
  table: string;

  constructor(
    private socket: OKExSocket,
    channel: string,
    private instrumentId: string
  ) {
    super();
    this.table = `${channel}/mark_price`;
    socket.on("data", this._handleData.bind(this));
  }

  _handleData(response: ResponseMessage) {
    const { table, instrumentId } = this;

    if (response.table === table) {
      response.data.forEach((instrumentData) => {
        if (instrumentData.instrument_id === instrumentId) {
          this.emit("data", {
            mark: parseFloat(instrumentData.mark_price),
          });
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

export default OKExMark;
