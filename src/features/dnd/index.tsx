/* eslint-disable */
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import initialData from './inital-data';
import Column from './colums';
import { useState } from 'react';

export default function Dnd() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // @ts-ignore: Disables the "used 'any' type" error for this line
    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        // @ts-ignore: Disables the "used 'any' type" error for this line
        const column = state.columns[columnId];
        // @ts-ignore: Disables the "used 'any' type" error for this line
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
