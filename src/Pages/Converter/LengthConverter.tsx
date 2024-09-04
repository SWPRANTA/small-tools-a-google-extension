import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  lengthFrom: number;
};

const lengthUnits = [
  { value: "km", label: "Kilometre" },
  { value: "m", label: "Metre" },
  { value: "cm", label: "Centimetre" },
  { value: "mm", label: "Millimetre" },
  { value: "μm", label: "Micrometre" },
  { value: "nm", label: "Nanometre" },
  { value: "mi", label: "Mile" },
  { value: "yd", label: "Yard" },
  { value: "ft", label: "Foot" },
  { value: "in", label: "Inch" },
  { value: "nmi", label: "Nautical Mile" },
];

export default function LengthConverter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [lengthTo, setLengthTo] = useState(0);
  const [baseLengthType, setBaseLengthType] = useState("m");
  const [toLengthType, setToLengthType] = useState("cm");

  const convertLength = (value: number, from: string, to: string) => {
    if (from === to) return value;

    let meters = value;
    switch (from) {
      case "km": meters = value * 1000; break;
      case "cm": meters = value / 100; break;
      case "mm": meters = value / 1000; break;
      case "μm": meters = value / 1000000; break;
      case "nm": meters = value / 1000000000; break;
      case "mi": meters = value * 1609.344; break;
      case "yd": meters = value * 0.9144; break;
      case "ft": meters = value * 0.3048; break;
      case "in": meters = value * 0.0254; break;
      case "nmi": meters = value * 1852; break;
    }

    let result = meters;
    switch (to) {
      case "km": result = meters / 1000; break;
      case "cm": result = meters * 100; break;
      case "mm": result = meters * 1000; break;
      case "μm": result = meters * 1000000; break;
      case "nm": result = meters * 1000000000; break;
      case "mi": result = meters / 1609.344; break;
      case "yd": result = meters / 0.9144; break;
      case "ft": result = meters / 0.3048; break;
      case "in": result = meters / 0.0254; break;
      case "nmi": result = meters / 1852; break;
    }

    return result;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const lengthFrom = data.lengthFrom;
    const convertedLength = convertLength(
      lengthFrom,
      baseLengthType,
      toLengthType
    );
    setLengthTo(convertedLength);
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
                  {...register("lengthFrom", { required: true })}
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                {errors.lengthFrom && (
                  <span className="text-rose-600">This field is required</span>
                )}
                <select
                  value={baseLengthType}
                  onChange={(e) => setBaseLengthType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  {lengthUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={lengthTo}
                  readOnly
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                <select
                  value={toLengthType}
                  onChange={(e) => setToLengthType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  {lengthUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
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
