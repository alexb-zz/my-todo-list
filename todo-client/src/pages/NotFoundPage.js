import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found!</h1>
        <p>
            <Link to="/">Home</Link>
        </p>
    </div>
  );
}