import { useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { Link } from "react-router-dom";

interface ColorValues {
  hex: string;
  rgb: string;
  hsv: string;
  hsl: string;
}

const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

const hexToHsl = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)}, ${(s * 100).toFixed(1)}%, ${(
    l * 100
  ).toFixed(1)}%`;
};

const hexToHsv = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  let h = 0;
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${(h * 360).toFixed(1)}, ${(s * 100).toFixed(1)}%, ${(
    v * 100
  ).toFixed(1)}%`;
};

export default function ColorPicker() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [colorValues, setColorValues] = useState<ColorValues>({
    hex: "#aabbcc",
    rgb: "170,187,204",
    hsv: "210, 25%, 73%",
    hsl: "210, 17%, 80%",
  });

  const handleCopyToClipboard = (colorType: string) => {
    if (colorType === "rgb") {
      navigator.clipboard.writeText(colorValues.rgb);
      setCopySuccess(true);
    } else if (colorType === "hsv") {
      navigator.clipboard.writeText(colorValues.hsv);
      setCopySuccess(true);
    } else if (colorType === "hsl") {
      navigator.clipboard.writeText(colorValues.hsl);
      setCopySuccess(true);
    }
  };

  const updateColorValues = (hex: string) => {
    setColorValues({
      hex: hex,
      rgb: hexToRgb(hex),
      hsv: hexToHsv(hex),
      hsl: hexToHsl(hex),
    });
  };

  const pickColor = async () => {
    if (window.EyeDropper) {
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        updateColorValues(result.sRGBHex);
      } catch (error) {
        console.error("Error picking color: ", error);
      }
    } else {
      alert("EyeDropper API is not supported in this browser.");
    }
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <div className="font-roboto text-white">
      <div className="flex items-center justify-end p-2">
        <Link
          to={"/"}
          className="rounded-md p-2 bg-slate-100 hover:bg-slate-300 active:bg-slate-400 w-10"
        >
          <img src="/home-icon-silhouette-svgrepo-com.svg" alt="home-icon" />
        </Link>
      </div>
      <div className="rounded-lg bg-slate-800 p-5 overflow-hidden shadow-lg shadow-black">
        <div className="grid grid-cols-2 gap-8">
          <div className="w-full m-auto">
            <HexAlphaColorPicker
              color={colorValues.hex}
              onChange={updateColorValues}
            />
          </div>

          {colorValues.hex && (
            <div className="grid grid-cols-1 text-left p-2">
              <p>HEX</p>
              <HexColorInput
                color={colorValues.hex}
                onChange={updateColorValues}
                placeholder="Type a color"
                className="border border-white rounded-md border-dotted text-sm bg-slate-600 p-1"
                prefixed
                alpha
              ></HexColorInput>
              <p>RGB:</p>
              <span
                onClick={() => handleCopyToClipboard("rgb")}
                className="border border-white rounded-md border-dotted text-sm bg-slate-400 cursor-pointer p-1"
              >
                {colorValues.rgb}
              </span>
              <p>HSV:</p>
              <span
                onClick={() => handleCopyToClipboard("hsv")}
                className="border border-white rounded-md border-dotted text-sm bg-slate-400 cursor-pointer p-1"
              >
                {colorValues.hsv}
              </span>
              <p>HSL:</p>
              <span
                onClick={() => handleCopyToClipboard("hsl")}
                className="border border-white rounded-md border-dotted text-sm bg-slate-400 cursor-pointer p-1"
              >
                {colorValues.hsl}
              </span>
              <p
                className={`text-green-500 h-6 ${
                  copySuccess ? "visible" : "invisible"
                }`}
              >
                Copied to clipboard!
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div
            className="flex-1 h-10 rounded-md mr-4"
            style={{ backgroundColor: colorValues.hex }}
          ></div>
          <div className="justify-end">
            <button
              onClick={pickColor}
              className="rounded-full bg-white p-2"
            >
              <img
                src="/iconmonstr-eyedropper-1.svg"
                alt="color-picker"
                className="w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
