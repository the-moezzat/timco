import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from '@phosphor-icons/react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

interface AlbumInputProps {
  onChange: (value: FileList[]) => void;
}

export default function AlbumsInput({ onChange }: AlbumInputProps) {
  const [album, setAlbum] = useState<{ [key: number]: FileList | undefined }>(
    {}
  );
  const [albumNum, setAlbumNum] = useState<number[]>([]);

  console.log(albumNum);
  function handleDragEnd(result: DropResult) {
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

    const newTaskIds = Array.from(albumNum);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, +draggableId);

    setAlbumNum(newTaskIds);
  }
  return (
    <div className=" space-y-2">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className=" bg-red-50 border p-4">
          <Droppable droppableId="album">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=" bg-blue-50 border p-4"
              >
                {Array.from(albumNum).map((element, index) => (
                  <Draggable
                    draggableId={`${element}`}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className=" bg-white border p-4"
                      >
                        <div className="flex gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            className="text-base text-gray-8"
                            onChange={(e) => {
                              setAlbum((state) => ({
                                ...state,
                                [index]: e.target.files as FileList,
                              }));

                              onChange(
                                Object.values({
                                  ...album,
                                  [index]: e.target.files as FileList,
                                }).filter(
                                  (item) => item !== undefined
                                ) as FileList[]
                              );
                            }}
                            key={index}
                          />
                          <Button
                            type="button"
                            size={'icon'}
                            variant={'destructive'}
                            className="text-xl"
                            onClick={() => {
                              console.log(albumNum);
                              setAlbumNum((state) => [...state].splice(1));
                              setAlbum((state) => ({
                                ...state,
                                [index]: undefined,
                              }));
                            }}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <Button
        type="button"
        onClick={() => setAlbumNum((state) => [...state, state.length])}
        className=" self-start"
      >
        Add album
      </Button>
    </div>
  );
}
