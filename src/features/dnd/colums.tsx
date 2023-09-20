import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
import initialData from './inital-data';

type Data = typeof initialData;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const AlbumList = styled.div`
  padding: 8px;
`;

export default function Column({
  column,
  tasks,
}: {
  column: Data['columns']['column-1'];
  tasks: Data['tasks']['task-1'][];
}) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <div>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <AlbumList ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </AlbumList>
          )}
        </Droppable>
      </div>
    </Container>
  );
}
