import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical, Trash } from '@phosphor-icons/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SortImage from '../../../../../components/album-sort/drag';
import { AlbumSortItem } from '../../../../../components/album-sort/album-sort-item';
import { Button } from '@/components/ui/button';

export function SortableItem({
  id,
  album,
  onChange,
  onDelete,
}: {
  id: number;
  index: number;
  album: string[];
  onChange: (album: string[]) => void;
  onDelete: (id: number, album: string[]) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // function handleDelete(id: string) {}

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex gap-2">
        <div
          className=" cursor-grab active:first-line:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <DotsSixVertical size={32} />
        </div>
        <Accordion
          type="single"
          collapsible
          onValueChange={(value) => console.log(value)}
          className="w-full"
        >
          <AccordionItem value={`item-1`}>
            <AccordionTrigger>
              <div className="text-sm text-start flex-1 flex gap-4 items-center">
                <Button
                  size={'icon'}
                  variant={'destructive'}
                  onClick={() => onDelete(id, album)}
                  className={'h-7 w-7'}
                  type="button"
                >
                  <Trash className="text-lg" />
                </Button>
                <span>
                  Album-{id + 1} ({album.length} photos)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent asChild>
              <SortImage
                album={album}
                onChange={onChange}
                render={(items) => {
                  return (
                    <div className="grid grid-cols-4 gap-2">
                      {items.map((id) => (
                        <div key={id} className="relative group">
                          <Button
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block hidden"
                            variant={'destructive'}
                            size={'sm'}
                            type="button"
                          >
                            Delete
                          </Button>
                          <AlbumSortItem key={id} id={id} />
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
