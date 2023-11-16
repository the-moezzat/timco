import Box from '@mui/material/Box';
import Masonry from 'react-responsive-masonry';
import { ResponsiveMasonry } from 'react-responsive-masonry';

export default function ImageList({
  render,
}: {
  render: () => React.ReactNode;
}) {
  const columnsCountBreakPoints = { 450: 1, 750: 2, 1000: 3 };

  return (
    <Box>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry gutter={'6px'}>{render()}</Masonry>
      </ResponsiveMasonry>
    </Box>
  );
}
