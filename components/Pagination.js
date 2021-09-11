import Link from "next/link";
import PropTypes from "prop-types";

/*
1. We’re creating a new component called Pagination.
2. If currentPage is greater than 1, we’ll render a PREVIOUS button  with the href set to the current page minus 1.
3. if currentPage is less than lastPage, we’ll render a NEXT button with the href set to the current page plus 1.
*/
const Pagination = ({ currentPage, total, eventsPerPage }) => {
	const lastPage = Math.ceil(total / eventsPerPage);
	return (
		<div>
			{currentPage > 1 && (
				<Link className="btn-secondary" href={`/events?page=${currentPage - 1}`}>
					<a className="btn-secondary">Previous</a>
				</Link>
			)}
			{currentPage < lastPage && (
				<Link href={`/events?page=${currentPage + 1}`}>
					<a className="btn-secondary">Next</a>
				</Link>
			)}
		</div>
	);
};

Pagination.propTypes = {
	total: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	eventsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
