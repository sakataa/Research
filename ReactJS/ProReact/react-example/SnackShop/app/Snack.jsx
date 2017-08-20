import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import constants from '../constants';

// snack Drag'nDrop spec
//
// - Required: beginDrag
// - Optional: endDrag
// - Optional: canDrag
// - Optional: isDragging
const snackSpec = {
    beginDrag(props) {
        return {
            name: props.name
        };
    },

    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
        }
    }
};

// Snack DragSource collect collecting function.
// - connect: An instance of DragSourceConnector.
// You use it to assign the drag source role to a DOM node.
//
// - monitor: An instance of DragSourceMonitor.
// You use it to connect state from the React DnD to your component’s properties.
// Available functions to get state include canDrag(), isDragging(), getItemType(),
// getItem(), didDrop() etc.
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Snack extends Component {
    render() {
        const { name, isDragging, connectDragSource } = this.props;
        const oapacity = isDragging ? 0.5 : 1;
        const style = {
            opacity: 1
        };

        return connectDragSource(
            <div className='snack' style={style}>
                {name}
            </div>
        )
    }
}

export default DragSource(constants.SNACK, snackSpec, collect)(Snack)