import { useEffect, useState } from "react";
import OKExSocket from "../services/OKExSocket";
import OKExDepth from "../services/OKExDepth";
import OKExTicker from "../services/OKExTicker";
import { useSetState, useThrottle, useThrottleFn } from "react-use";
import OKExMark from "../services/OKExMark";

const LIMITED_ROWS = 6;

type OrderState = {
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
};

function groupOrders(
  orders: Array<[number, number]>,
  factor: (n: number) => number,
  groupValue: number
) {
  const orderMap = new Map<number, number>();
  for (let [price, qty] of orders) {
    const roundPrice = factor(price / groupValue) * groupValue;
    orderMap.set(roundPrice, (orderMap.get(roundPrice) || 0) + qty);
  }
  return Array.from(orderMap.entries());
}

function addTotal(orders: Array<[number, number]>, totalQty: number) {
  let sum = 0;
  return orders.map(([price, qty]) => {
    sum += qty;
    return [price, qty, sum, (sum * 100) / totalQty];
  });
}

function useOKEx(channel: string, instrumentId: string, groupValue: number) {
  const [orders, setOrders] = useState<OrderState>({
    bids: [],
    asks: [],
  });

  const [market, setMarket] = useSetState<{
    last: number;
    mark: number;
  }>({
    last: 0,
    mark: 0,
  });

  const throttleOrders = useThrottleFn(
    (orders: OrderState, groupValue: number) => {
      const asks = groupOrders(orders.asks, Math.ceil, groupValue).slice(
        0,
        LIMITED_ROWS
      );
      const bids = groupOrders(orders.bids, Math.floor, groupValue).slice(
        -LIMITED_ROWS
      );
      const totalAsks = orders.asks.reduce((acc, [, qty]) => acc + qty, 0);
      const totalBids = orders.asks.reduce((acc, [, qty]) => acc + qty, 0);
      return {
        asks: addTotal(asks, totalAsks).reverse(),
        bids: addTotal(bids.reverse(), totalBids),
      };
    },
    250,
    [orders, groupValue]
  );
  const throttleMarket = useThrottle(market, 10);

  useEffect(() => {
    (async function () {
      const socket = new OKExSocket();
      const futureService = new OKExDepth(socket, channel, instrumentId);
      const tickerService = new OKExTicker(socket, channel, instrumentId);
      const markService = new OKExMark(socket, channel, instrumentId);

      await socket.ready;
      futureService.on("data", (data) => {
        setOrders({
          asks: Array.from(data.asks.entries()).sort(),
          bids: Array.from(data.bids.entries()).sort(),
        });
      });
      futureService.subscribe();

      markService.on("data", (data) => setMarket({ mark: data.mark }));
      markService.subscribe();

      tickerService.on("data", (data) => setMarket({ last: data.last }));
      tickerService.subscribe();
    })();
  }, [channel, instrumentId, setOrders, setMarket]);

  return {
    orders: throttleOrders,
    market: throttleMarket,
  };
}

export default useOKEx;
