import './Table.css';
import React, { Component } from 'react';

import Pagination from '../Pagination/Pagination';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    onSort(sort) {
        this.props.onSortChange(sort);
    }

    render() {
        const {dataSource, columns, paging, total, sort, onPageChange} = this.props;

        //todo: change index
        const headers = columns.map((column, index) => {
            const isActive = sort.dataIndex === column.dataIndex;
            const attrs = {
                key: index
            };
            const classes = [];

            if (column.sortable) {
                attrs.onClick = this.onSort.bind(this, {
                    dataIndex: column.dataIndex,
                    order: isActive && sort.order === 'ASC' ? 'DESC' : 'ASC'
                });

                if (isActive && sort.order === 'ASC') {
                    classes.push('Asc');
                } else if (isActive && sort.order === 'DESC') {
                    classes.push('Desc');
                }

                classes.push('Sortable');
            }

            attrs.className = classes.join(' ');

            if (column.render) {
                return (column.render(attrs, column.title));
            } else {
                return (<th {...attrs}>{column.title}</th>);
            }
        });
        const rows = dataSource.map(row => {
            const tds = columns.map((column, index) => <td key={index}>{row[column.dataIndex]}</td>);
            return (
                <tr key={row.id}>
                    {tds}
                </tr>
            );
        });

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        {headers}
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <Pagination {...paging} total={total} onPageChange={onPageChange}></Pagination>
            </div>
        );
    }
}

export default Table;
