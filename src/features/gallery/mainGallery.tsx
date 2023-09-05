import usePics from '@/hooks/usePics';
import Gallery from './gallery';

function MainGallery() {
  const { data, isLoading } = usePics();
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <Gallery
          render={() =>
            data?.map((pic) => (
              <img src={pic.img as string} alt={pic.name as string} />
            ))
          }
        />
      )}
    </div>
  );
}

export default MainGallery;
