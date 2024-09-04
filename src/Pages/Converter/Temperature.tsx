import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  tempFrom: number;
};

export default function Temperature() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [tempTo, setTempTo] = useState(0);
  const [baseTempType, setBaseTempType] = useState("cel");
  const [toTempType, setToTempType] = useState("fer");

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value;

    let result:number = value;

    if (from === "cel" && to === "fer") {
      result = (value * 9) / 5 + 32;
    } else if (from === "cel" && to === "kel") {
      result = Number(value + 273.15);
    } else if (from === "fer" && to === "cel") {
      result = ((value - 32) * 5) / 9;
    } else if (from === "fer" && to === "kel") {
      result = ((value - 32) * 5) / 9 + 273.15;
    } else if (from === "kel" && to === "cel") {
      result = Number(value - 273.15);
    } else if (from === "kel" && to === "fer") {
      result = (Number(value - 273.15) * 9) / 5 + 32;
    }

    return result;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const tempFrom = data.tempFrom;
    const convertedTemp = convertTemperature(tempFrom, baseTempType, toTempType);
    console.log(convertedTemp);
    
    setTempTo(convertedTemp);
  };

  return (
    <div>
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
                  type="number"
                  placeholder="You Have"
                  {...register("tempFrom", { required: true })}
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                {errors.tempFrom && (
                  <span className="text-rose-600">This field is required</span>
                )}
                <select
                  value={baseTempType}
                  onChange={(e) => setBaseTempType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  <option value="cel">Celsius</option>
                  <option value="fer">Fahrenheit</option>
                  <option value="kel">Kelvin</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={tempTo}
                  readOnly
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                <select
                  value={toTempType}
                  onChange={(e) => setToTempType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  <option value="cel">Celsius</option>
                  <option value="fer">Fahrenheit</option>
                  <option value="kel">Kelvin</option>
                </select>
              </div>
              <input
                type="submit"
                className="col-span-2 py-2 mt-4 bg-orange-400 hover:bg-orange-600 active:bg-orange-800 text-white font-medium rounded-md cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
