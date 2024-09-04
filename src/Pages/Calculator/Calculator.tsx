import { useState } from "react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const btnStyle =
    "text-white rounded-full w-10 h-10 text-2xl text-center font-bold font-roboto shadow-md shadow-black";

  const appendToDisplay = (value: string) => {
    if (value === "%") {
      setDisplay((prev) => {
        const lastNumberMatch = prev.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          const percentageValue = (parseFloat(lastNumber) / 100).toString();
          return prev.slice(0, -lastNumber.length) + percentageValue;
        }
        return prev;
      });
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const calculate = () => {
    try {
      const sanitizedDisplay = display.replace(/[^-()\d/*+.]/g, "");
      const result = evaluateExpression(sanitizedDisplay);
      setDisplay(result.toString());
    } catch (error) {
      console.log(error);
      setDisplay("Error");
    }
  };

  const evaluateExpression = (expression: string) => {
    const numbers = expression.split(/(\+|-|\*|\/)/).map((item) => item.trim());
    let result = parseFloat(numbers[0]);

    for (let i = 1; i < numbers.length; i += 2) {
      const operator = numbers[i];
      const nextNumber = parseFloat(numbers[i + 1]);

      switch (operator) {
        case "+":
          result += nextNumber;
          break;
        case "-":
          result -= nextNumber;
          break;
        case "*":
          result *= nextNumber;
          break;
        case "/":
          result /= nextNumber;
          break;
        default:
          throw new Error("Invalid operator");
      }
    }

    return result;
  };
  const clearDisplay = () => {
    setDisplay("");
  };

  const removeLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  return (
    <div className="">
      <div className="grid place-content-end p-2">
        <Link
          to={"/"}
          className="rounded-md p-2 bg-slate-100 hover:bg-slate-300 active:bg-slate-400 w-10"
        >
          <img
            src="/home-icon-silhouette-svgrepo-com.svg"
            alt="home-icon"
            className=""
          />
        </Link>
      </div>
      <div className="w-full rounded-lg bg-slate-800 p-5 overflow-hidden shadow-lg shadow-black">
        <input
          value={display}
          type="text"
          readOnly
          className="bg-slate-600 rounded-lg w-full h-12 text-left text-xl font-roboto px-1 text-white"
        />
        <div id="keys" className="grid grid-cols-4 gap-2 mt-2 p-5">
          <button
            onClick={clearDisplay}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            C
          </button>
          <button
            onClick={removeLast}
            className={`${btnStyle} text-sm  bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            DEL
          </button>
          <button
            onClick={() => appendToDisplay("%")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            %
          </button>
          <button
            onClick={() => appendToDisplay("+")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            +
          </button>
          <button
            onClick={() => appendToDisplay("7")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            7
          </button>
          <button
            onClick={() => appendToDisplay("8")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            8
          </button>
          <button
            onClick={() => appendToDisplay("9")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            9
          </button>
          <button
            onClick={() => appendToDisplay("-")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            -
          </button>
          <button
            onClick={() => appendToDisplay("4")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            4
          </button>
          <button
            onClick={() => appendToDisplay("5")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            5
          </button>
          <button
            onClick={() => appendToDisplay("6")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            6
          </button>
          <button
            onClick={() => appendToDisplay("*")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            *
          </button>
          <button
            onClick={() => appendToDisplay("1")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            1
          </button>
          <button
            onClick={() => appendToDisplay("2")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            2
          </button>
          <button
            onClick={() => appendToDisplay("3")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            3
          </button>
          <button
            onClick={() => appendToDisplay("/")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            /
          </button>
          <button
            onClick={() => appendToDisplay("0")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            0
          </button>
          <button
            onClick={() => appendToDisplay("00")}
            className={`${btnStyle} bg-gray-400 hover:bg-gray-600 active:bg-gray-800`}
          >
            00
          </button>
          <button
            onClick={() => appendToDisplay(".")}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            .
          </button>
          <button
            onClick={calculate}
            className={`${btnStyle} bg-orange-400 hover:bg-orange-600 active:bg-orange-800`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
