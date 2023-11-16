import usePics from '@/hooks/usePics';
import ImageList from './_components/image-list';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

function Gallery() {
  const { data, isLoading } = usePics();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="my-8">
          <ImageList
            render={() =>
              data?.map((pic) => (
                <img
                  src={pic.img as string}
                  alt={pic.name as string}
                  loading="lazy"
                  onClick={() => {
                    setOpen(true);
                    setIndex(data?.findIndex((p) => p.id === pic.id) || 0);
                  }}
                  key={String(pic.id)}
                />
              ))
            }
          />

          <Lightbox
            open={open}
            index={index}
            plugins={[Fullscreen, Slideshow, Zoom]}
            close={() => setOpen(false)}
            slides={data?.map((pic) => ({
              src: pic.img as string,
            }))}
          />
        </div>
      )}
    </div>
  );
}

export default Gallery;
