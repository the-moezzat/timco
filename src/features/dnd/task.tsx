import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import initialData from './inital-data';

type Data = typeof initialData;

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default function Task({
  task,
  index,
}: {
  index: number;
  task: Data['tasks']['task-1'];
}) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
