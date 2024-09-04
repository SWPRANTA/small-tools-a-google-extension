import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  massFrom: number;
};

const massUnits = [
  { value: "kg", label: "Kilogram" },
  { value: "g", label: "Gram" },
  { value: "mg", label: "Milligram" },
  { value: "μg", label: "Microgram" },
  { value: "t", label: "Metric Ton" },
  { value: "lb", label: "Pound" },
  { value: "oz", label: "Ounce" },
  { value: "st", label: "Stone" },
  { value: "ct", label: "Carat" },
  { value: "amu", label: "Atomic Mass Unit" },
];

export default function MassConverter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [massTo, setMassTo] = useState(0);
  const [baseMassType, setBaseMassType] = useState("kg");
  const [toMassType, setToMassType] = useState("g");

  const convertMass = (value: number, from: string, to: string) => {
    if (from === to) return value;

    let kg = value;
    switch (from) {
      case "g": kg = value / 1000; break;
      case "mg": kg = value / 1000000; break;
      case "μg": kg = value / 1000000000; break;
      case "t": kg = value * 1000; break;
      case "lb": kg = value * 0.45359237; break;
      case "oz": kg = value * 0.028349523125; break;
      case "st": kg = value * 6.35029318; break;
      case "ct": kg = value * 0.0002; break;
      case "amu": kg = value * 1.660539040e-27; break;
    }

    let result = kg;
    switch (to) {
      case "g": result = kg * 1000; break;
      case "mg": result = kg * 1000000; break;
      case "μg": result = kg * 1000000000; break;
      case "t": result = kg / 1000; break;
      case "lb": result = kg / 0.45359237; break;
      case "oz": result = kg / 0.028349523125; break;
      case "st": result = kg / 6.35029318; break;
      case "ct": result = kg / 0.0002; break;
      case "amu": result = kg / 1.660539040e-27; break;
    }

    return result;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const massFrom = data.massFrom;
    const convertedMass = convertMass(
      massFrom,
      baseMassType,
      toMassType
    );
    setMassTo(convertedMass);
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
                  {...register("massFrom", { required: true })}
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                {errors.massFrom && (
                  <span className="text-rose-600">This field is required</span>
                )}
                <select
                  value={baseMassType}
                  onChange={(e) => setBaseMassType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  {massUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={massTo}
                  readOnly
                  className="mb-2 w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900"
                />
                <select
                  value={toMassType}
                  onChange={(e) => setToMassType(e.target.value)}
                  className="w-full rounded-lg bg-sky-700 p-2 text-white focus:outline-sky-900 max-h-32 overflow-y-auto"
                >
                  {massUnits.map((unit) => (
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
