import { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

interface ModelProps {
  imageDetails: {
    width: number;
    height: number;
  };
}

//Ease
const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { ...transition, duration: 1 },
  },
};

const Model = ({ imageDetails }: ModelProps) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 8], [1, 1.3]);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector('body')?.classList.add('no-scroll');
    } else {
      document.querySelector('body')?.classList.remove('no-scroll');
    }
  }, [canScroll]);

  return (
    <>
      {/* <Header /> */}
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className="single"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container fluid">
          <div className="row center top-row">
            <div className="top">
              <motion.div className="model">
                <motion.span className="first" variants={firstName}>
                  <motion.span variants={letter}>T</motion.span>
                  <motion.span variants={letter}>I</motion.span>
                  <motion.span variants={letter}>M</motion.span>
                </motion.span>
                <motion.span className="last" variants={lastName}>
                  <motion.span variants={letter}>C</motion.span>
                  <motion.span variants={letter}>H</motion.span>
                  <motion.span variants={letter}>I</motion.span>
                </motion.span>
              </motion.div>
            </div>
          </div>

          <div className="row bottom-row">
            <div className="bottom">
              <div className="image-container-single">
                <motion.div
                  initial={{
                    y: '-50%',
                    width: imageDetails.width,
                    height: imageDetails.height,
                  }}
                  animate={{
                    y: 0,
                    width: '100%',
                    radius: '',
                    height: window.innerWidth > 1440 ? 800 : 500,
                    transition: { delay: 0.2, ...transition },
                  }}
                  className="thumbnail-single"
                >
                  <motion.div
                    className="frame-single"
                    whileHover="hover"
                    transition={transition}
                  >
                    <motion.img
                      src={'/tim.png'}
                      alt="an image"
                      style={{ scale: scale }}
                      initial={{
                        scale: 1,
                        y: 0,
                      }}
                      animate={{
                        transition: { delay: 0.2, ...transition },
                        // y: window.innerWidth > 1440 ? -1200 : -500,
                      }}
                      className="max-md:h-[500px] h-[1000px] w-auto object-cover object-bottom max-lg:object-center max-md:object-center"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Model;
