import { ArrowsOut } from '@phosphor-icons/react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export default function Album({ album }: { album: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div
        className={`grid ${album.length === 1 ? 'grid-cols-1' : ''} ${
          album.length === 2 ? 'grid-cols-2' : ''
        } ${
          album.length > 2 ? 'grid-cols-3 max-md:grid-cols-2' : ''
        } max-sm:grid-cols-1 gap-2 my-6`}
      >
        {album.map((item, index) => {
          return (
            <div
              className={`min-w-[200px] ${
                album.length > 1 ? 'h-[250px]' : ''
              } cursor-pointer relative group`}
              key={index}
              onClick={() => {
                setOpen(true);
                setIndex(index);
              }}
            >
              <div className="absolute inset-0 text-3xl w-full bg-gradient-to-br from-black/30 to-transparent text-white h-full hidden p-2 group-hover:flex transition-all">
                <ArrowsOut />
              </div>
              <img
                src={item}
                alt="album"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        index={index}
        plugins={[Fullscreen, Slideshow, Zoom]}
        close={() => setOpen(false)}
        slides={album?.map((pic) => ({
          src: pic,
        }))}
      />
    </div>
  );
}
