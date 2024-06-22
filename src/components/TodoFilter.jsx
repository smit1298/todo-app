import PropTypes from "prop-types";

function TodoFilter({ setFilter }) {
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}

TodoFilter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default TodoFilter;
