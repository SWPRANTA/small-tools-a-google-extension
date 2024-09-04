import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

export default function Converter() {
  return (
    <div>
      <div className="flex items-center justify-end p-2">
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
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          name="Currency Converter"
          image="/priceconverter-svgrepo-com.svg"
          path="/converter/currency"
        />
        <Button
          name="Length Converter"
          image="/ruler-svgrepo-com.svg"
          path="/converter/length"
        />
        <Button
          name="Mass Converter"
          image="/scales-scale-svgrepo-com.svg"
          path="/converter/mass"
        />
        <Button
          name="Temperature Converter"
          image="/temperature-low-svgrepo-com.svg"
          path="/converter/temperature"
        />
      </div>
      
    </div>
  );
}
