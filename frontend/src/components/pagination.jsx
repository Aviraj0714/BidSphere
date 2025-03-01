import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const Pagination = (props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="d-flex justify-content-center align-items-center border-top border-secondary pt-3 my-4">
      {props.currentPage > 1 && (
        <button
          onClick={() => props.prevPage()}
          className="btn btn-primary mx-2 d-flex align-items-center"
        >
          <FaCaretLeft size={18} />
        </button>
      )}

      <span className="mx-2">
        Page <strong>{props.currentPage}</strong> of <strong>{pages.length}</strong>
      </span>

      {props.currentPage < pages.length && (
        <button
          onClick={() => props.nextPage()}
          className="btn btn-primary mx-2 d-flex align-items-center"
        >
          <FaCaretRight size={18} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
