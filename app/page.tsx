import RotatingText from '@/components/RotatingText'
import SplitText from '@/components/SplitText';
import BlurText from '@/components/BlurText';
import AnimatedContent from '@/components/AnimatedContent';
import Squares from '@/components/Squares';
import GradientText from '@/components/GradientText';
import CircularText from '@/components/CircularText';
import Lanyard from '@/components/Lanyard';
import ScrollVelocity from '@/components/ScrollVelocity';


export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#19222D]">
      <div className="absolute top-0 right-0 left-0 bottom-0 h-full">
        <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal' // up, down, left, right, diagonal
        borderColor='#F1FFB2'
        hoverFillColor='#C6F10E'
        />
      </div>
      <div className="container mx-auto h-screen">
        <div className="grid grid-cols-12 h-screen">
          <div className="col-span-6 ">
            <div className='flex h-full items-center'>
              <div className='flex flex-col gap-5'>
                  <AnimatedContent
                      distance={150}
                      direction="horizontal"
                      reverse={false}
                      duration={1.2}
                      ease="bounce.out"
                      initialOpacity={0.2}
                      animateOpacity
                      scale={1.1}
                      threshold={0.2}
                      delay={0.3}
                    >
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl text-white font-bold">I am Ready For Job</h1>
                        <RotatingText
                          texts={['Frontend', 'Design', 'Fotography', 'Typography']}
                          mainClassName="px-2 sm:px-2 md:px-3 bg-[#C6F10E] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-2xl font-bold inline-flex transition-all"
                          staggerFrom={"last"}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-120%" }}
                          staggerDuration={0.025}
                          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                          transition={{ type: "spring", damping: 30, stiffness: 400 }}
                          rotationInterval={2000}
                        />
                      </div>
                  </AnimatedContent>
                <div className='flex flex-col items-start'>
                  <SplitText
                    text="I Am Rizky Adi!"
                    className="text-6xl font-semibold text-start text-white"
                    delay={50}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                  <SplitText
                    text="Frontend Developer!"
                    className="text-6xl font-semibold text-start text-[#C6F10E]"
                    delay={75}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                </div>
                <BlurText 
                  text="Saya adalah manusia dan manusia adalah sebuah karya dari sang pencipta yang sangat sempurna dan manusia adalah makhluk yang paling mulia!"
                  delay={50}
                  animateBy="words"
                  direction="top"
                  className="text-xl mb-8 text-white"
                />
                <div className="flex items-center">
                <GradientText 
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="px-5 py-3 rounded-lg border"
                >
                  Consultation now
                </GradientText>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 relative">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            <CircularText 
             text="Aku mah pemula * Kalau kakak mah * dah jago banget * "
             onHover="speedUp"
             spinDuration={20}
             className="absolute top-[-500] right-[500]"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid mx-auto h-screen">
        <ScrollVelocity 
          texts={['Rizky Adi Zaealani', 'Rizky Adi Zaelani']} 
          className="text-white"
        />
      </div>
    </div>
  );
}
