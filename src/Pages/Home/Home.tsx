import Button from "../../Components/Button/Button";

export default function Home() {
    return (
      <div className="">
        <h1 className="font-andika text-3xl text-pp">Small Tools</h1>
        <h3 className="text-sm text-white p-3">Your pocket powerhouse for everyday calculations!</h3>
  
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button name="Calculator" image='/calculator-svgrepo-com.svg' path="/calculator" />
          <Button name="Converter" image="/unitconverterultimate-svgrepo-com.svg" path="/converter" />
          <Button name="Password Generator" image ="/password-svgrepo-com.svg" path="/password-generator" />
          <Button name="Color Picker" image ="/eyedropper-svgrepo-com.svg" path="color-picker" />
        </div>
      </div>
    );
  }
  