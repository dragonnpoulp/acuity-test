import { useState } from "react";
import useOKEx from "../../hooks/useOKEx";
import { ReactComponent as Mark } from "./mark.svg";

const DEPTHS = [0.5, 1, 2, 5];

const OrderBook = () => {
  const [groupValue, setGroupValue] = useState(0.5);
  const { market, orders } = useOKEx("futures", "BTC-USD-210625", groupValue);
  const { asks, bids } = orders || { asks: [], bids: [] };
  const { last, mark } = market;

  return (
    <div className="order-book">
      <div className="title">
        <h5>Order book</h5>
        <div className="depth">
          <label htmlFor="depth">Depth</label>
          <select
            name="depth"
            value={groupValue}
            onChange={(e) => setGroupValue(parseFloat(e.target.value))}
          >
            {DEPTHS.map((d) => (
              <option key={d.toString()} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="asks">
          {asks.map(([price, qty, total, pct]) => (
            <tr key={price.toString()}>
              <td>{price}</td>
              <td>{qty}</td>
              <td className="progress">
                <div style={{ width: `${pct}%` }} />
                {total}
              </td>
            </tr>
          ))}
        </tbody>
        <tbody className="market">
          <tr>
            <td>{last}</td>
            <td className="mark">
              <Mark />
              {mark}
            </td>
            <td></td>
          </tr>
        </tbody>
        <tbody className="bids">
          {bids.map(([price, qty, total, pct]) => (
            <tr key={price.toString()}>
              <td>{price}</td>
              <td>{qty}</td>
              <td className="progress">
                <div style={{ width: `${pct}%` }} />
                {total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
