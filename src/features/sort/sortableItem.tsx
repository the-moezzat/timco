import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical } from '@phosphor-icons/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SortImage from '../album-sort/drag';
import React from 'react';
import { AlbumSortItem } from '../album-sort/album-sort-item';

export function SortableItem({
  id,
  album,
  onChange,
}: {
  id: number;
  index: number;
  album: string[];
  onChange: (album: string[]) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
              <div className="text-sm text-start flex-1">
                Album-{id + 1} ({album.length} photos)
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
                        <React.Fragment key={id}>
                          <AlbumSortItem key={id} id={id} />
                        </React.Fragment>
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
