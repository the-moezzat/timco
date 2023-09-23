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
  albums,
}: {
  albums: Data['columns']['taskIds'];
}) {
  // console.log(albums);
  return (
    <Container>
      <Title>Albums</Title>
      <Droppable droppableId={'column-1'}>
        {(provided) => (
          <AlbumList ref={provided.innerRef} {...provided.droppableProps}>
            {albums.map((album, index) => (
              <Task key={album} task={album} index={index} />
            ))}
            {provided.placeholder}
          </AlbumList>
        )}
      </Droppable>
    </Container>
  );
}
