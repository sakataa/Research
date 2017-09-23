import React, { Component } from 'react';

const createTableSection = (rowLayout, extendedProps) => (TableSectionComponent) => {
    return class TableSectionCreator extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            const props = this.props;

            return (
                <TableSectionComponent {...props} {...extendedProps}>
                    {rowLayout}
                    {props.children}
                </TableSectionComponent>
            )
        }
    }
}

export default createTableSection;