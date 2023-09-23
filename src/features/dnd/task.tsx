import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import initialData from './inital-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

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
  task: Data['columns']['taskIds'][0];
}) {
  const [, setAlbum] = useState<{ [key: number]: FileList | undefined }>({});

  return (
    <Draggable draggableId={task} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              // value={album[index] as FileList}
              className="text-base text-gray-8"
              onChange={(e) => {
                setAlbum((state) => ({
                  ...state,
                  [index]: e.target.files as FileList,
                }));
              }}
              key={index}
            />
            <Button
              type="button"
              size={'icon'}
              variant={'destructive'}
              className="text-xl"
              onClick={() => {
                setAlbum((state) => ({
                  ...state,
                  [index]: undefined,
                }));
              }}
            >
              <Trash />
            </Button>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
