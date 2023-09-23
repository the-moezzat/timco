/* eslint-disable */
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// import initialData from './inital-data';
import Column from './colums';
import { useState } from 'react';

export default function Dnd({ albumsId }: { albumsId: string[] }) {
  const [state, setState] = useState(albumsId);

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
    const newTaskIds = [...state];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    setState(newTaskIds);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column albums={state} />
    </DragDropContext>
  );
}
