import { Link } from "react-router-dom";
import Button from "../components/button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <p className="text-lg font-bold">
        This site contains my D3.js assigments for Big Data Visualization
      </p>
      <div className="flex gap-4">
        <Link to="/assignment-3">
          <Button>Assigment 3</Button>
        </Link>
        <Link to="/assignment-4">
          <Button>Assigment 4</Button>
        </Link>
      </div>
    </div>
  );
}
