import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Calculator from "./Pages/Calculator/Calculator";
import Converter from "./Pages/Converter/Converter";
import PassWordGenerator from "./Pages/PassWordGenerator/PassWordGenerator";
import CurrencyConverter from "./Pages/Converter/CurrencyConverter";
import Temperature from "./Pages/Converter/Temperature";
import LengthConverter from "./Pages/Converter/LengthConverter";
import MassConverter from "./Pages/Converter/MassConverter";
import ColorPicker from "./Pages/ColorPicker/ColorPicker";

export const router = (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/converter" element={<Converter />} />
      <Route path="/converter/currency" element={<CurrencyConverter />} />
      <Route path="/converter/temperature" element={<Temperature />} />
      <Route path="/converter/length" element={<LengthConverter />} />
      <Route path="/converter/mass" element={<MassConverter />} />
      <Route path="/password-generator" element={<PassWordGenerator />} />
      <Route path="/color-picker" element={<ColorPicker />} />
    </Routes>
  </HashRouter>
);
