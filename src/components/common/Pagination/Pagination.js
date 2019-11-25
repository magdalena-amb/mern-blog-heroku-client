import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.scss';

class Pagination extends React.Component {

  state = {
    presentPage: this.props.initialPage
  }
  
  changePage = (newPage)=> {

    const { onPageChange } = this.props;
 
    this.setState({ presentPage: newPage });
    onPageChange(newPage);
  }

  render() {

    const { pages } = this.props; 
    const { presentPage } = this.state;
    const { changePage } = this;

    return (

        <div className="pagination">

          <ul className="pagination__list">

          { presentPage > 1  && (
                <span onClick={()=>changePage( presentPage - 1)} className="pagination__list__item"><FaChevronLeft/></span>  
              )}

              {[...Array(pages)].map((el, page) =>
              <li
                  key={++page}
                  onClick={ ()=>changePage(page) }
                  className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
                  {page}
              </li>
              )}

              { presentPage < pages  && (
                <span onClick={()=>changePage( presentPage + 1)} className="pagination__list__item"><FaChevronRight/></span>  
              )}

          </ul>
        </div>
    );
  }

}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;