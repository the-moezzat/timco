import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from '@phosphor-icons/react';

export function SortableItem({
  id,
  onDelete,
  onAddition,
}: {
  id: string;
  index: number;
  onDelete: (index: string) => void;
  onAddition: React.Dispatch<
    React.SetStateAction<{
      [key: number]: FileList | undefined;
    }>
  >;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-slate-500"></div>
        <Input
          type="file"
          accept="image/*"
          multiple
          // value={album[index] as FileList}
          className="text-base text-gray-8"
          onChange={(e) => {
            onAddition((state) => ({
              ...state,
              [id]: e.target.files as FileList,
            }));
          }}
        />
        <Button
          type="button"
          size={'icon'}
          variant={'destructive'}
          className="text-xl"
          onMouseDown={() => {
            onDelete(id);
            console.log('deleted');
          }}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
