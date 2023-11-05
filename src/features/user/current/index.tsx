import { getSections } from '@/features/tim/current/currentApi';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading';
import Section from './_components/section';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';

function MainCurrent() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });
  const md = useMediaQuery('(max-width:750px)');

  return (
    <div className="my-8 max-w-3xl mx-auto px-4 ">
      {sectionsLoading && <Loading size="medium" type="full" />}
      <Box>
        <Masonry columns={md ? 1 : 2} spacing={4}>
          {data
            ? data.map((section) => (
                <Section key={section.id} section={section} />
              ))
            : []}
        </Masonry>
      </Box>
    </div>
  );
}

export default MainCurrent;
