/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, MapPin, Clock, Info, Heart, CheckCircle2, Flower2 } from "lucide-react";

// FlipCard Component
function FlipCard({ front, back, className, containerClassName, rounded = "rounded-[2rem]", ...motionProps }: {
  front: ReactNode,
  back: ReactNode,
  className?: string,
  containerClassName?: string,
  rounded?: string,
  [key: string]: any
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      {...motionProps}
      className={`perspective-1000 cursor-pointer ${containerClassName || ""}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`w-full h-full transform-style-3d relative ${className || ""}`}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden w-full h-full ${rounded} overflow-hidden`}>
          {front}
        </div>

        {/* Back */}
        <div
          style={{ transform: "rotateY(180deg)" }}
          className={`absolute inset-0 backface-hidden w-full h-full bg-paper/95 backdrop-blur-md border border-sage/20 ${rounded} flex flex-col justify-center items-center text-center p-3 md:p-8 shadow-2xl overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
          <div className="relative z-10 w-full h-full flex flex-col">
            {back}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsFlapOpen(true);
    setTimeout(() => {
      setIsOpened(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200); // Wait for flap animation
  };

  return (
    <div className="min-h-screen bg-paper text-zinc-800 selection:bg-sage/20 overflow-x-hidden relative">
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
            className="fixed inset-0 z-[100] bg-paper/95 backdrop-blur-md flex items-center justify-center p-6 overflow-hidden"
          >
            {/* Majestic Fading Typography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="absolute top-12 md:top-24 left-0 right-0 text-center z-10 pointer-events-none"
            >
              <h1 className="serif text-4xl md:text-6xl text-sage/80 font-light tracking-[0.2em] drop-shadow-xl">Aaron & Denice</h1>
              <p className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.6em] text-sage/60 font-bold">14 December 2025</p>
            </motion.div>

            {/* Slow Spinning Elegant Ambient Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[90vw] md:h-[90vw] rounded-full border-2 border-sage/10 border-dashed pointer-events-none z-0 opacity-50"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full border border-sage/10 pointer-events-none z-0 opacity-40 flex items-center justify-center p-8"
            >
              <div className="w-full h-full rounded-full border-[0.5px] border-sage/5" />
            </motion.div>

            {/* Glowing Aura Behind Envelope */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[80vw] md:w-[600px] h-[80vw] md:h-[600px] bg-sage/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"
            />

            {/* Cinematic Sunlight, Optical Bokeh, and Dust Motes */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Soft Light Leaks */}
              <motion.div
                animate={{
                  x: ["-10%", "10%", "-10%"],
                  y: ["-5%", "5%", "-5%"],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[30%] -left-[20%] w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(229,178,173,0.5)_0%,transparent_60%)] blur-3xl"
              />
              <motion.div
                animate={{
                  x: ["10%", "-10%", "10%"],
                  y: ["5%", "-5%", "5%"],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-[30%] -right-[20%] w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(164,178,165,0.4)_0%,transparent_60%)] blur-3xl"
              />

              {/* Natural floating dust motes / glowing ambient petals */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute rounded-full shadow-[0_0_15px_2px_rgba(229,178,173,0.6)]"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#E5B2AD' : '#A4B2A5', // Blush and Sage
                    width: Math.random() * 8 + 3 + "px",
                    height: Math.random() * 8 + 3 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: `blur(${Math.random() * 1}px)`,
                  }}
                  animate={{
                    y: [0, -Math.random() * 400 - 200],
                    x: [0, (Math.random() - 0.5) * 150],
                    opacity: [0, Math.random() * 0.7 + 0.3, 0],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 12 + Math.random() * 18,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Heavy out-of-focus organic "bokeh" foreground orbs */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`bokeh-${i}`}
                  className="absolute rounded-full mix-blend-multiply"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#A4B2A5' : '#E5B2AD', // Sage and Blush
                    opacity: 0.6,
                    width: Math.random() * 100 + 40 + "px",
                    height: Math.random() * 100 + 40 + "px",
                    left: `${Math.random() * 100}%`,
                    bottom: `-20%`,
                    filter: `blur(${Math.random() * 10 + 6}px)`,
                  }}
                  animate={{
                    y: [0, typeof window !== 'undefined' ? -(window.innerHeight + 200) : -1000],
                    x: [0, (Math.random() - 0.5) * 300],
                    opacity: [0, Math.random() * 0.6 + 0.4, 0],
                  }}
                  transition={{
                    duration: 20 + Math.random() * 30,
                    repeat: Infinity,
                    delay: Math.random() * 15,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <motion.div
              layoutId="envelope-box"
              style={{ perspective: 1500 }}
              animate={!isFlapOpen ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-2xl h-80 md:h-[450px] bg-sage rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10"
            >
              {/* Back paper texture */}
              <div className="absolute inset-0 rounded-[2rem] opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] overflow-hidden pointer-events-none" />

              {/* Inside content - Hidden initially by the flap and seal, but revealed when flap opens */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 md:space-y-6">
                <span className="serif text-white/50 text-lg md:text-3xl tracking-[0.4em] md:tracking-[0.6em] uppercase text-center px-4">The Invitation</span>
                <div className="w-10 md:w-16 h-px bg-white/20" />
              </div>

              {/* Bottom fold (static) */}
              <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-white/5 clip-path-envelope-bottom pointer-events-none rounded-b-[2rem]" />
              {/* set shadow to make it look layered */}
              <div className="absolute bottom-0 left-0 right-0 h-[65%] shadow-[inset_0_20px_30px_rgba(0,0,0,0.1)] clip-path-envelope-bottom pointer-events-none rounded-b-[2rem]" />

              {/* Top Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isFlapOpen ? 180 : 0, opacity: isFlapOpen ? 0 : 1 }}
                transition={{ duration: 1, ease: [0.3, 0.1, 0.2, 1] }}
                style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
                className="absolute top-0 left-0 right-0 h-[55%] bg-sage drop-shadow-2xl z-20 rounded-t-[2rem] clip-path-envelope flex flex-col items-center justify-start overflow-hidden pt-8 pointer-events-none"
              >
                <div className="absolute inset-0 rounded-t-[2rem] opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
              </motion.div>

              {/* Beautiful Wax Seal Stamp */}
              {!isFlapOpen && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer"
                  onClick={handleOpen}
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-4 mt-8 md:mt-12 group"
                  >
                    {/* Elegant Minimalist Seal */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500 bg-white/20 border border-white/40 p-1.5 backdrop-blur-md">
                      <div className="w-full h-full rounded-full bg-sage shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center border border-sage/50">
                        <Heart className="text-paper/90 w-10 h-10 md:w-14 md:h-14 drop-shadow-md mt-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Cute Tap Hint Below Stamp */}
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <p className="serif text-white/70 tracking-[0.3em] uppercase text-[10px] md:text-xs whitespace-nowrap">Tap to break seal</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/background.png"
          alt="Background"
          className="w-full h-full object-cover opacity-[0.15] md:opacity-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/10 to-paper/60" />
      </div>

      {/* Main Container */}
      <motion.main
        initial={false}
        animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="max-w-[1600px] mx-auto px-6 py-16 md:px-12 md:py-24 flex flex-col gap-16 relative z-10 min-h-screen"
      >

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isOpened ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-sage font-bold"
          >
            With joy in our hearts
          </motion.p>
          <h1 className="serif italic text-6xl md:text-9xl text-sage font-light leading-tight drop-shadow-sm">
            You're Invited!
          </h1>
          <div className="w-32 h-px bg-sage/40 mx-auto mt-8" />
        </motion.div>

        {/* Top Envelope Graphic - Centered at the top */}
        <div className="flex justify-center w-full mb-8 mt-16 md:mt-32">
          {!isOpened ? (
            <div className="w-full max-w-3xl relative h-80 md:h-[450px]" />
          ) : (
            <motion.div
              layoutId="envelope-box"
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-3xl relative h-80 md:h-[450px] bg-sage rounded-[2rem] shadow-2xl group cursor-default"
            >
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none rounded-[2rem] overflow-hidden" />

              {/* Opened Flap pointing up */}
              <div className="absolute bottom-[99%] left-0 right-0 h-[55%] bg-sage clip-path-envelope-bottom pointer-events-none origin-bottom -mb-px z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* The Invitation Paper Sticking Out */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: -60, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute -top-[60px] left-6 right-6 md:left-12 md:right-12 bottom-12 bg-paper rounded-[1rem] shadow-[0_-15px_30px_rgba(0,0,0,0.15)] flex flex-col items-center pt-12 md:pt-20 space-y-8 z-10 border border-sage/10 overflow-hidden"
              >
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-sage/5 rounded-full blur-3xl pointer-events-none" />
                <span className="serif text-sage text-3xl md:text-4xl tracking-[0.4em] uppercase text-center mt-4 drop-shadow-sm">The<br />Invitation</span>
                <div className="w-24 h-px bg-sage/30 mt-8 mb-4" />
                <p className="serif text-lg md:text-xl italic text-sage/70 font-light tracking-wider">A Celebration of Love</p>
              </motion.div>

              {/* Envelope Front Layer ensuring it covers the bottom half of the paper */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-20">
                <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-sage clip-path-envelope-bottom pointer-events-none">
                  <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[65%] shadow-[inset_0_30px_40px_rgba(0,0,0,0.15)] clip-path-envelope-bottom pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-white/5 clip-path-envelope-bottom pointer-events-none border-t border-white/10" />
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]" />
              </div>
              <div className="absolute bottom-10 left-0 right-0 text-center text-white/50 serif italic text-sm z-30 tracking-widest uppercase pointer-events-none">Official Invite 2025</div>
            </motion.div>
          )}
        </div>

        {/* Bento Grid Layout - Flipped Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 relative">

          {/* Details Flip Card */}
          <FlipCard
            containerClassName="w-full col-span-1 h-[180px] md:h-[350px] lg:h-[350px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1 }}
            front={
              <div className="bg-zinc-800 text-white w-full h-full p-10 flex flex-col justify-center items-center text-center group hover:bg-sage transition-all duration-700">
                <p className="serif italic text-[10px] md:text-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity">Explore every</p>
                <h3 className="serif text-2xl md:text-4xl tracking-[0.2em] uppercase font-medium">Details</h3>
                <div className="mt-4 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Info size={24} />
                </div>
              </div>
            }
            back={
              <>
                <h4 className="serif text-xl md:text-3xl text-sage mb-4 md:mb-6">Ceremony Details</h4>
                <div className="space-y-1 md:space-y-4 text-[10px] md:text-sm text-zinc-600 w-full px-1 md:px-4">
                  <div className="flex justify-between border-b border-sage/20 pb-1 md:pb-2">
                    <span className="font-bold tracking-widest uppercase text-[8px] md:text-xs">Dress Code</span>
                    <span className="serif italic text-[10px] md:text-sm">Formal / Earth</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1 md:pb-2">
                    <span className="font-bold tracking-widest uppercase text-[8px] md:text-xs">Gifts</span>
                    <span className="serif italic text-[10px] md:text-sm">Monetary</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1 md:pb-2">
                    <span className="font-bold tracking-widest uppercase text-[8px] md:text-xs">Adults Only</span>
                    <span className="serif italic text-[10px] md:text-sm">Strictly 18+</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-8 text-[8px] md:text-xs uppercase tracking-[0.2em] font-bold text-sage underline underline-offset-4">Close Details</button>
              </>
            }
          />

          {/* Save the Date Flip Card */}
          <FlipCard
            containerClassName="w-full col-span-1 h-[180px] md:h-[350px] lg:h-[350px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.1 }}
            front={
              <div className="bg-white/70 backdrop-blur-sm w-full h-full p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 border border-white">
                <p className="serif italic text-xl md:text-3xl text-sage">Save the Date</p>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold">Sunday</p>
                  <div className="flex flex-col items-center">
                    <div className="h-px w-10 md:w-16 bg-sage/30 mb-1 md:mb-2" />
                    <p className="serif text-lg md:text-3xl font-light tracking-[0.15em]">DECEMBER</p>
                    <p className="serif text-4xl md:text-7xl font-medium -mt-1 md:-mt-2 text-sage">14</p>
                    <div className="h-px w-10 md:w-16 bg-sage/30 mt-1 md:mt-2" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold">2025</p>
                </div>
                <div className="pt-1 md:pt-2">
                  <p className="text-[8px] md:text-xs uppercase tracking-[0.3em] font-bold text-sage/70">Jardin de Josefina</p>
                </div>
              </div>
            }
            back={
              <>
                <Heart size={20} className="text-sage mb-2 md:mb-6 mx-auto opacity-70 md:w-8 md:h-8" />
                <p className="serif text-[14px] md:text-2xl italic text-sage mb-2 md:mb-4 leading-relaxed">Save the date <br /> to celebrate our union.</p>
                <p className="text-[8px] md:text-xs text-zinc-500 uppercase tracking-widest leading-loose">
                  Ensure to mark your calendar.<br />Formal invitation to follow.
                </p>
              </>
            }
          />

          {/* RSVP Flip Card */}
          <FlipCard
            containerClassName="w-full col-span-1 h-[180px] md:h-[350px] lg:h-[350px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.2 }}
            front={
              <div className="bg-white/80 backdrop-blur-sm w-full h-full p-4 md:p-10 border border-white flex flex-col justify-center items-center text-center group hover:bg-white hover:shadow-2xl transition-all duration-700">
                <p className="serif italic text-[10px] md:text-lg text-sage mb-1 md:mb-2 group-hover:scale-110 transition-transform">Kindly</p>
                <h3 className="serif text-4xl md:text-6xl tracking-tighter font-medium text-sage">RSVP</h3>
                <div className="mt-6 flex flex-col items-center">
                  <p className="text-xs text-zinc-400 uppercase tracking-[0.5em]">here</p>
                  <div className="w-0 h-px bg-sage mt-2 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            }
            back={
              <>
                <CheckCircle2 size={24} className="text-sage mb-2 md:mb-4 mx-auto opacity-70 md:w-8 md:h-8" />
                <h4 className="serif text-xl md:text-3xl text-sage mb-2 md:mb-4">Are you attending?</h4>
                <p className="text-[8px] md:text-xs text-zinc-500 uppercase tracking-widest mb-4 md:mb-8">
                  Please let us know by<br />November 1st, 2025
                </p>
                <div className="w-full flex gap-2 md:gap-4 px-2 md:px-4">
                  <button className="flex-1 bg-sage text-white py-2 md:py-3 rounded-xl text-[8px] md:text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors">Yes</button>
                  <button className="flex-1 border border-sage text-sage py-2 md:py-3 rounded-xl text-[8px] md:text-xs uppercase tracking-widest font-bold hover:bg-sage/10 transition-colors">No</button>
                </div>
              </>
            }
          />

          {/* FAQ Flip Card (Circular style adapter) */}
          <FlipCard
            containerClassName="w-full col-span-1 flex items-center justify-center h-[180px] md:h-[350px] lg:h-[350px]"
            rounded="rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1.3 }}
            className="w-36 h-36 md:w-56 md:h-56 shadow-2xl"
            front={
              <div className="w-full h-full bg-sage flex flex-col items-center justify-center text-white group hover:scale-105 hover:rotate-6 transition-all duration-500 relative">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="serif italic text-[10px] md:text-sm opacity-80 mb-1 md:mb-2">Have questions?</p>
                <h3 className="serif text-2xl md:text-4xl tracking-widest uppercase">Faqs</h3>
                <div className="mt-2 md:mt-4 p-2 rounded-full border border-white/20 group-hover:bg-white group-hover:text-sage transition-all">
                  <HelpCircle size={24} />
                </div>
              </div>
            }
            back={
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-paper">
                <HelpCircle size={28} className="text-sage mb-2 opacity-70" />
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-2">Parking?</p>
                <p className="serif text-xs italic mb-4">Yes, free parking available.</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-2">Indoors?</p>
                <p className="serif text-xs italic">Partial outdoors.</p>
              </div>
            }
          />

          {/* Venue Flip Card */}
          <FlipCard
            containerClassName="w-full col-span-2 lg:col-span-2 h-[220px] md:h-[350px] lg:h-[350px]"
            initial={{ opacity: 0, x: -30 }}
            animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, delay: 1.4 }}
            front={
              <div className="w-full h-full relative group min-h-[350px]">
                <img
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800"
                  alt="Venue"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 text-white space-y-1 md:space-y-2 z-10">
                  <p className="serif text-[8px] md:text-xs uppercase tracking-[0.4em] opacity-70">A Celebration of Love</p>
                  <p className="serif text-2xl md:text-5xl leading-tight drop-shadow-lg">Aaron & Denice</p>
                  <div className="w-10 md:w-16 h-px bg-white/30 pt-2 md:pt-4" />
                </div>
              </div>
            }
            back={
              <>
                <MapPin size={24} className="text-sage mb-4 md:mb-6 opacity-70 md:w-9 md:h-9" />
                <h4 className="serif text-2xl md:text-4xl text-sage mb-2 md:mb-4">Jardin de Josefina</h4>
                <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest leading-loose mb-4 md:mb-6">
                  San Pablo City, Laguna<br />Philippines
                </p>
                <button className="px-6 py-2 md:px-8 md:py-3 bg-sage text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">View Map</button>
              </>
            }
          />

          {/* Couple Image / Timeline Flip Card */}
          <FlipCard
            containerClassName="w-full col-span-2 lg:col-span-2 h-[220px] md:h-[350px] lg:h-[350px]"
            initial={{ opacity: 0, x: 30 }}
            animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 1.5 }}
            front={
              <div className="w-full h-full relative group">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
                  alt="Couple"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <p className="serif text-white text-xl md:text-3xl italic tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 drop-shadow-md">
                    Event Timeline
                  </p>
                </div>
              </div>
            }
            back={
              <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-8">
                <Clock size={24} className="text-sage mb-4 md:mb-6 opacity-70 md:w-8 md:h-8" />
                <h4 className="serif text-2xl md:text-3xl text-sage mb-4 md:mb-8">Timeline</h4>

                <div className="w-full max-w-sm space-y-4 md:space-y-6 text-left">
                  <div className="flex items-start gap-2 md:gap-4">
                    <span className="serif text-sage font-bold text-[10px] md:text-base w-12 md:w-20 text-right shrink-0 pt-1">3:00 PM</span>
                    <div className="w-px h-full bg-sage/30 relative mt-2 -ml-[1px] md:-ml-2 shrink-0">
                      <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-sage" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Ceremony</p>
                      <p className="serif text-[10px] md:text-xs italic text-zinc-500">Exchange of Vows</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-4">
                    <span className="serif text-sage font-bold text-[10px] md:text-base w-12 md:w-20 text-right shrink-0 pt-1">4:30 PM</span>
                    <div className="w-px h-12 md:h-16 bg-sage/30 relative -ml-[1px] md:-ml-2 shrink-0">
                      <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-sage" />
                    </div>
                    <div className="-mt-1">
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Cocktails</p>
                      <p className="serif text-[10px] md:text-xs italic text-zinc-500">Drinks & Photos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-4">
                    <span className="serif text-sage font-bold text-[10px] md:text-base w-12 md:w-20 text-right shrink-0 pt-1">6:00 PM</span>
                    <div className="w-px h-full bg-transparent relative mt-2 -ml-[1px] md:-ml-2 shrink-0">
                      <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-sage" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Reception</p>
                      <p className="serif text-[10px] md:text-xs italic text-zinc-500">Dinner & Dancing</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

        </div>

        {/* Footer Info */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="text-center pt-12 pb-12 space-y-6"
        >
          <div className="flex items-center justify-center gap-6 text-sage/40">
            <div className="h-px w-16 bg-current" />
            <span className="text-xs uppercase tracking-[0.6em] font-medium">Est. 2025</span>
            <div className="h-px w-16 bg-current" />
          </div>
          <p className="serif italic text-zinc-500 text-xl max-w-lg mx-auto leading-relaxed">
            "Love is not just something you feel, it's something you do."
          </p>
          <p className="serif text-sage/60 text-sm italic">We can't wait to celebrate with you</p>
        </motion.footer>

      </motion.main>

      {/* Decorative Floating Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden opacity-40">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] left-[-5%] w-[40rem] h-[40rem] bg-sage/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-sage/5 rounded-full blur-[150px]"
        />
      </div>
    </div>
  );
}
