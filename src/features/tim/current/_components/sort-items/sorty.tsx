import SortImage from '@/components/album-sort/drag';
import { Item as ItemType } from '../../_types/types';
import { Fragment } from 'react';
import Item from '../item';
import { SortableItem } from './sortableItem';

export default function Sorty({
  items,
  onOrderChange,
}: {
  items: ItemType[];
  onOrderChange: (newOrder: string[], items: ItemType[]) => void;
}) {
  function findItem(itemId: string) {
    return items.find((item) => item.id === +itemId);
  }

  return (
    <SortImage
      album={items.map((item) => String(item.id))}
      onChange={(item) => onOrderChange(item, items)}
      render={(itemsId) =>
        itemsId.map((itemId) => (
          <Fragment key={itemId}>
            <SortableItem key={itemId} id={itemId}>
              <Item item={findItem(itemId)!} />
            </SortableItem>
          </Fragment>
        ))
      }
    />
  );
}
