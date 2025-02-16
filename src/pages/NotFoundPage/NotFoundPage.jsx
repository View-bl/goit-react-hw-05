import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h2>Сторінку не знайдено</h2>
      <Link to="/">Додому</Link>
    </div>
  );
}

export default NotFoundPage;
