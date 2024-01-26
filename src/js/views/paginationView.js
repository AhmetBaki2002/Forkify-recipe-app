// import * as model from './model.js';
import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if(!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generatePrevButton(curtPage) {
    return `
      <button data-goto="${curtPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span> Page ${curtPage - 1}</span>
      </button>
    `;
  }

  _generateNextButton(curtPage) {
    return `
      <button data-goto="${curtPage + 1}" class="btn--inline pagination__btn--next">
        <span> Page ${curtPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkup() {
    const curtPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (curtPage === 1 && numPages > 1) {
      return this._generateNextButton(curtPage);
    }
    // Last page
    if (curtPage === numPages && numPages > 1) {
      return this._generatePrevButton(curtPage);
    }

    // Other page
    if (curtPage < numPages) {
      return (
        this._generatePrevButton(curtPage) + this._generateNextButton(curtPage)
      );
    }

    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
