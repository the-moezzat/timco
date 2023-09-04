import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/header';

interface HomeProps {
  imageDetails: {
    width: number;
    height: number;
  };
  image?: string;
}

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Home = ({ imageDetails, image }: HomeProps) => (
  <>
    <Header />

    <main>
      <div className="container">
        <div className="row center">
          <div className="image-container">
            <div
              className={`thumbnail`}
              ref={image}
              style={{
                width: imageDetails.width,
                height: imageDetails.height,
              }}
            >
              <div className="frame">
                <Link to={`/model/tim-co`}>
                  <motion.img
                    src={'/tim.png'}
                    alt="tim chi"
                    whileHover={{ scale: 1.15 }}
                    transition={transition}
                  />
                </Link>
              </div>
            </div>
            <motion.div
              exit={{ opacity: 0 }}
              transition={transition}
              className="information"
            >
              <div className="title">Tim Chi</div>
              <div className="location">
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Home;
