import { useNavigate } from "react-router-dom";

interface ButtonProps {
  name: string;
  path: string;
  image: string;
}
export default function Button({ name, image, path }: ButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-lg bg-orange-300 text-gray-800 text-center p-3 cursor-pointer hover:bg-orange-500 hover:text-yellow-50 border-b-4 border-orange-700 font-roboto"
    >
      <img src={image} alt="" className="w-16 m-auto" />
      {name}
    </div>
  );
}
