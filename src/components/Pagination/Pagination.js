import './Pagination.css'
import React, { Component } from 'react';

const pageSizes = [5, 10, 15, 20, 30];
const NAV_BUTTON_TYPES = {
    PREV: 'PREV',
    NEXT: 'NEXT'
};

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: this.props.total,
            limit: this.props.limit,
            offset: this.props.offset,
            active: this.props.active
        };

        this.onPageClick = this.onPageClick.bind(this);
        this.changePage = this.changePage.bind(this);
        this.movePage = this.movePage.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
    }

    render() {
        const {total, limit, active} = this.props;

        return (
            <div>
                <PageSizer currentSize={limit}
                           sizes={pageSizes}
                           onPageSizeChange={this.onPageSizeChange} />
                <nav>
                    <ul className="pagination">
                        <NavPageButton type={NAV_BUTTON_TYPES.PREV}
                                       active={active}
                                       limit={limit}
                                       total={total}
                                       onPageChange={this.movePage.bind(this, NAV_BUTTON_TYPES.PREV)} />
                        {this.getPages()}
                        <NavPageButton type={NAV_BUTTON_TYPES.NEXT}
                                       active={active}
                                       limit={limit}
                                       total={total}
                                       onPageChange={this.movePage.bind(this, NAV_BUTTON_TYPES.NEXT)} />
                    </ul>
                </nav>
            </div>
        );
    }

    onPageClick(index, event) {
        event.preventDefault();
        this.changePage(index);
    }

    changePage(index) {
        const {limit} = this.props;
        const active = index;
        const offset = limit * index - limit;

        if (index === this.props.active) {
            return;
        }

        //this.setState({active, offset});
        this.props.onPageChange({limit, offset, active});
    }

    movePage(type, event) {
        event.preventDefault();
        const {active} = this.props;
        const nextPage = type === NAV_BUTTON_TYPES.PREV ? active - 1 : active + 1;
        this.changePage(nextPage);
    }

    onPageSizeChange(event) {
        const limit = parseInt(event.target.value, 10);
        const offset = 0;

        //this.setState({limit, offset, active: 1});
        this.props.onPageChange({limit, offset, active: 1});
    }

    getPages() {
        const {total, limit, active} = this.props;
        const numberOfPages = Math.ceil(total / limit);
        const pages = [];

        for (let i = 1; i <= numberOfPages; i++) {
            const isActive = active === i;

            pages.push(
                <PageButton key={i}
                            index={i}
                            pageSelect={this.onPageClick}
                            active={isActive}>
                </PageButton>
            );
        }

        return pages;
    }
}

const PageButton = ({index, active, disabled, pageSelect}) => {
    const className = active ? 'active' : '';

    return (
        <li className={className}>
            <a onClick={pageSelect.bind(this, index)} href="#">{index}</a>
        </li>
    );
};

const NavPageButton = ({type, active, limit, total, onPageChange}) => {
    const numberOfPages = Math.ceil(total / limit);
    const liProps = {};
    const linkProps = {};

    if (type === NAV_BUTTON_TYPES.PREV) {
        if (active === 1) {
            liProps.className =  'disabled';
            linkProps.onClick = (e) => e.preventDefault();
        } else {
            linkProps.onClick = onPageChange;
        }
    }

    if (type === NAV_BUTTON_TYPES.NEXT) {
        if (active === numberOfPages) {
            liProps.className =  'disabled';
            linkProps.onClick = (e) => e.preventDefault();
        } else {
            linkProps.onClick = onPageChange;
        }
    }

    return (
        <li {...liProps}>
            <a {...linkProps} href="#">
                { type === NAV_BUTTON_TYPES.PREV
                        ? <span>&laquo;</span>
                        : <span>&raquo;</span>
                }
            </a>
        </li>
    );
};

const PageSizer = ({currentSize, sizes, onPageSizeChange}) => {
    const options = sizes.map((size, index) => <option key={index} value={size}>{size}</option>);
    return (
        <select className="form-control pull-right pagination-limit" value={currentSize} onChange={onPageSizeChange}>
            {options}
        </select>
    );
};



export default Pagination;