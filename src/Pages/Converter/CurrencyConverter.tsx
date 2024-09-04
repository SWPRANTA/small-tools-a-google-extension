import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const CURRENCY_SYMBOL_URL =
  "https://api.currencyfreaks.com/v2.0/currency-symbols";

type Inputs = {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
};
type CurrencyRatesType = {
  [key: string]: string;
};

export default function CurrencyConverter() {
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencySymbols, setCurrencySymbols] = useState<{
    [key: string]: string;
  }>({});
  const [currentRate, setCurrentRate] = useState<CurrencyRatesType>({});
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    fetch(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${CURRENCY_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentRate(data.rates);
      });
  }, []);

  useEffect(() => {
    fetch(CURRENCY_SYMBOL_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencySymbols(data.currencySymbols);
      });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const usd_to_from = Number(currentRate[data.currencyFrom]);
    const usd_to_to = Number(currentRate[data.currencyTo]);
    const amount = data.amount;
    const convertedAmount = (amount / usd_to_from) * usd_to_to;
    setConvertedAmount(convertedAmount);
  };

  const filterOptions = (
    options: { [key: string]: string },
    searchTerm: string
  ) => {
    return Object.entries(options).filter(
      ([key, value]) =>
        value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="font-roboto">
      <div className="flex items-center justify-between p-2">
        <Link
          to={"/converter"}
          className="rounded-md p-2 bg-slate-100 hover:bg-slate-300 active:bg-slate-400 w-10"
        >
          <img src="/back-square-svgrepo-com.svg" alt="back-icon" />
        </Link>
        <Link
          to={"/"}
          className="rounded-md p-2 bg-slate-100 hover:bg-slate-300 active:bg-slate-400 w-10"
        >
          <img src="/home-icon-silhouette-svgrepo-com.svg" alt="home-icon" />
        </Link>
      </div>

      <div className="rounded-lg bg-slate-800 p-5 overflow-hidden shadow-lg shadow-black">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="You Have"
                value={searchTermFrom}
                onChange={(e) => setSearchTermFrom(e.target.value)}
                className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
              />
              <select
                {...register("currencyFrom", { required: true })}
                className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
              >
                {filterOptions(currencySymbols, searchTermFrom).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value} ({key})
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="You Want"
                value={searchTermTo}
                onChange={(e) => setSearchTermTo(e.target.value)}
                className="mb-2 w-full rounded-lg bg-orange-800 p-2 text-white focus:outline-orange-900"
              />
              <select
                {...register("currencyTo", { required: true })}
                className="w-full rounded-lg bg-orange-800 p-2 text-white focus:outline-orange-900 max-h-32 overflow-y-auto"
              >
                {filterOptions(currencySymbols, searchTermTo).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value} ({key})
                    </option>
                  )
                )}
              </select>
            </div>

            <input
              type="number"
              {...register("amount", { required: true })}
              placeholder="Enter amount...."
              className="bg-slate-600 rounded-lg w-full h-12 text-left text-xl px-1 text-white mb-2 col-span-2"
            />
            {errors.amount && (
              <span className="text-rose-600">This field is required</span>
            )}
            <div className="bg-slate-600 rounded-lg w-full h-12 text-left text-xl px-1 text-white col-span-2">
              {convertedAmount}
            </div>
            <input
              type="submit"
              className="col-span-2 py-2 mt-4 bg-orange-400 hover:bg-orange-600 active:bg-orange-800 text-white font-medium rounded-md cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
