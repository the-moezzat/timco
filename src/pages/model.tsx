import { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

//Components
import ScrollForMore from '../components/scrollForMore';
import Header from '@/components/header';
// import ParallaxText from '../components/movingText';

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
  const scale = useTransform(scrollYProgress, [0, 8], [1, 1.2]);

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
      <Header />
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className="single"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container fluid">
          {/* <section className="w-full">
          <ParallaxText baseVelocity={5}>Framer Motion</ParallaxText>
        </section> */}
          <div className="row center top-row">
            <div className="top">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.2, ...transition },
                }}
                className="details"
              >
                <div className="location">
                  <span>28.538336</span>
                  <span>-81.379234</span>
                </div>
                <div className="mua">MUA: @mylifeascrystall</div>
              </motion.div>
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
              <motion.div className="image-container-single">
                <motion.div
                  initial={{
                    y: '-50%',
                    width: imageDetails.width,
                    height: imageDetails.height,
                  }}
                  animate={{
                    y: 0,
                    width: '90%',
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
                      initial={{ scale: 1 }}
                      animate={{
                        transition: { delay: 0.2, ...transition },
                        y: window.innerWidth > 1440 ? -1200 : -300,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <ScrollForMore />
          </div>
        </div>
        <div className="detailed-information">
          <div className="container">
            <div className="row">
              <h2 className="title">
                The insiration behind the artwork & <br /> what it means.
              </h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Model;
