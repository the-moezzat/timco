import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Gallery({ render }: any) {
  const lg = useMediaQuery('(max-width:1000px)');
  const md = useMediaQuery('(max-width:750px)');
  const sm = useMediaQuery('(max-width:450px)');
  return (
    <Box>
      <Masonry columns={sm ? 1 : md ? 2 : lg ? 3 : 4} spacing={1} sx={{}}>
        {render()}
      </Masonry>
    </Box>
  );
}
