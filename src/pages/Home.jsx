import { Link, useNavigate } from "react-router-dom";

const Home = () => {
const Navigate = useNavigate()
  const handleReload = (e) => {
    e.preventDefault();
    Navigate("/todo")
    window.location.reload();
  };

  return (
    <div>
      <h2>Welcome to our application!</h2>
      <p>
        This is the Home view. click{" "}
        <Link  onClick={handleReload}>
          here&nbsp;
        </Link>
        to explore app
      </p>
    </div>
  );
};

export default Home;
