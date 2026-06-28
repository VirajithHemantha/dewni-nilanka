import React, { useState, ReactNode, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  HelpCircle,
  MapPin,
  Clock,
  Heart,
  CheckCircle2,
  Flower2,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Mail,
  User,
  Users,
  Coffee,
} from "lucide-react";

// FlipCard Component with 3D Tilt Effect + Premium Mobile Tap Hint
function FlipCard({
  front,
  back,
  className,
  containerClassName,
  rounded = "rounded-[2rem]",
  ...motionProps
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  containerClassName?: string;
  rounded?: string;
  [key: string]: any;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    const mql = window.matchMedia("(hover: none) and (pointer: coarse)");

    const update = () => setIsTouchDevice(mql.matches);
    update();

    // Safari iOS compatibility
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", update);
    else (mql as any).addListener?.(update);

    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", update);
      else (mql as any).removeListener?.(update);
    };
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    if (target?.closest("[data-no-flip]")) return;

    setIsFlipped((prev) => !prev);
  }

  return (
    <motion.div
      {...motionProps}
      ref={cardRef}
      className={`perspective-1000 cursor-pointer relative ${containerClassName || ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (!isTouchDevice) setIsFlipped(true);
      }}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX: isFlipped ? 0 : springRotateX,
        rotateY: isFlipped ? 0 : springRotateY,
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`w-full h-full transform-style-3d relative ${className || ""}`}
        style={{ WebkitTransformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 backface-hidden flip-face w-full h-full ${rounded} overflow-hidden shadow-2xl border border-white/40 ring-1 ring-black/5`}
          style={{ transform: "rotateY(0deg) translateZ(1px)", WebkitTransform: "rotateY(0deg) translateZ(1px)" }}
        >
          {front}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/30 rounded-tl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/30 rounded-br-lg" />
        </div>

        {/* Back */}
        <div
          style={{ transform: "rotateY(180deg) translateZ(1px)", WebkitTransform: "rotateY(180deg) translateZ(1px)" }}
          className={`absolute inset-0 backface-hidden flip-face w-full h-full bg-paper border border-sage/20 ${rounded} flex flex-col justify-center items-center text-center p-3 md:p-8 shadow-2xl overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
          <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-sage/10 rounded-tl-xl" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-sage/10 rounded-br-xl" />
          <div className="relative z-10 w-full h-full flex flex-col py-4 overflow-y-auto overflow-x-hidden ios-scroll">{back}</div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isTouchDevice && !isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.4 } }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-50"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 shadow-xl"
            >
              <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                <motion.span
                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-white/70"
                />
                <span className="relative w-2 h-2 rounded-full bg-white shadow-sm" />
              </span>
              <span
                className="text-white text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap"
                style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.18em" }}
              >
                Tap to reveal
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RealisticPetal({ size = 20, className = "" }: { size?: number; className?: string }) {
  const organicPetal = "M15 30C15 30 0 25 0 15C0 5 10 0 15 0C20 0 30 5 30 15C30 25 15 30 15 30Z";

  return (
    <motion.div
      animate={{
        rotateX: [0, 45, -45, 0],
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
      className={className}
    >
      <svg width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="petalGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4714A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9C8470" stopOpacity="0.65" />
          </radialGradient>
        </defs>
        <path
          d={organicPetal}
          fill="url(#petalGrad)"
          style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.05))" }}
        />
      </svg>
    </motion.div>
  );
}

type Attendance = "yes" | "no";
type PartyType = "individual" | "family";
type MealPreference = "veg" | "non-veg";

type GuestEntry = {
  name: string;
  meal: MealPreference;
};

function RSVPForm() {
  const endpoint = "https://script.google.com/macros/s/AKfycbzc1qJCp6E0EF7fHJW6ukCHaX34V5FbG_TnMY3zeQN1S3mBF2S3lFHq-kU131k21qs6/exec";

  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    dietary: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    if (!endpoint) {
      setSubmitError("RSVP saving is not configured yet.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        guests: formData.guests,
        dietary: formData.dietary,
        submittedAt: new Date().toISOString(),
      };

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        const fd = new FormData();
        fd.append("payload", JSON.stringify(payload));
        await fetch(endpoint, { method: "POST", mode: "no-cors", body: fd });
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', guests: '1', dietary: '' });
      }, 4000);
    } catch (error) {
      setSubmitError('Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F5EFE0] px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full mt-12 md:mt-24 rounded-[3rem] shadow-xl border border-sage/20">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -5 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="relative mx-auto mb-8 w-32 h-32 md:w-44 md:h-44 rounded-full border-8 border-white bg-white shadow-[0_20px_42px_rgba(212,175,55,0.15)] p-[2px] z-10 block"
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-sage/10">
              <Mail className="h-12 w-12 text-sage" />
            </div>

            <Sparkles className="absolute -top-2 -right-4 h-8 w-8 text-sage/70 animate-pulse" />
            <Sparkles className="absolute -bottom-4 -left-2 h-6 w-6 text-sage/50 animate-pulse" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/40 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md"
          >
            <Mail className="h-5 w-5 text-sage" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-sage">
              Join the Celebration
            </span>
          </motion.div>

          <h2 className="serif text-5xl font-medium tracking-tight text-umber md:text-7xl">
            You are <span className="relative inline-block text-sage">Invited</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-umber/80 leading-relaxed font-medium">
            Please respond by August 1, 2026. We would be honored to have you join our wedding celebration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="relative perspective-[1000px]"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-sage/30 bg-white/60 p-6 md:p-12 shadow-lg backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-8"
                >
                  <div className="grid grid-cols-1 gap-8">
                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                        <User className="h-4 w-4" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John & Jane Doe"
                        className="w-full rounded-2xl border border-sage/20 bg-white/65 px-5 py-4 text-umber placeholder-umber/40 outline-none transition-all duration-300 focus:border-sage focus:bg-white focus:shadow-md group-hover:bg-white/90"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                        <Users className="h-4 w-4" /> Guests
                      </label>
                      <div className="relative">
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-2xl border border-sage/20 bg-white/65 px-5 py-4 pr-12 text-umber outline-none transition-all duration-300 focus:border-sage focus:bg-white focus:shadow-md group-hover:bg-white/90 cursor-pointer"
                        >
                          <option value="1">1 Guest (Just Me)</option>
                          <option value="2">2 Guests (Couple)</option>
                          <option value="3">3 Guests (Plus One)</option>
                          <option value="4">4 Guests (Family)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sage">
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="group relative">
                      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                        <Coffee className="h-4 w-4" /> Dietary Notes
                      </label>
                      <input
                        type="text"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder="Allergies, Vegan, etc."
                        className="w-full rounded-2xl border border-sage/20 bg-white/65 px-5 py-4 text-umber placeholder-umber/40 outline-none transition-all duration-300 focus:border-sage focus:bg-white focus:shadow-md group-hover:bg-white/90"
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-center pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHoveringSubmit(true)}
                      onHoverEnd={() => setIsHoveringSubmit(false)}
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full bg-sage px-12 py-5 text-white shadow-lg transition-all hover:bg-[#b0912f] border border-sage hover:border-[#b0912f]"
                    >
                      <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-sm">
                        {isSubmitting ? 'Sending...' : 'Send RSVP'}
                      </span>

                      <motion.div
                        animate={isHoveringSubmit ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                      >
                        <Send className="h-5 w-5" />
                      </motion.div>
                    </motion.button>
                  </div>

                  {submitError && (
                    <p className="text-center text-sm font-medium text-red-600">{submitError}</p>
                  )}
                  {!endpoint && (
                    <p className="text-center text-[10px] text-zinc-500 leading-relaxed mt-2">
                      Admin setup needed: set VITE_RSVP_ENDPOINT to your Google Apps Script URL.
                    </p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="relative z-10 flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <Heart className="h-12 w-12 text-sage fill-sage/20" />
                  </motion.div>
                  <h3 className="serif text-4xl font-medium text-umber mb-4">
                    Yay! We got it
                  </h3>
                  <p className="max-w-md text-lg text-umber/80 font-medium">
                    Thank you so much for confirming, {formData.name || 'dear guest'}! We are so excited to celebrate with you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateSize = () => setIsSmallScreen(mediaQuery.matches);
    updateSize();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSize);
      return () => mediaQuery.removeEventListener("change", updateSize);
    }

    // iOS Safari < 14
    mediaQuery.addListener(updateSize);
    return () => mediaQuery.removeListener(updateSize);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotion();
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", updateMotion);
      return () => motionQuery.removeEventListener("change", updateMotion);
    }
    motionQuery.addListener(updateMotion);
    return () => motionQuery.removeListener(updateMotion);
  }, []);

  const isIOS =
    typeof navigator !== "undefined" &&
    (/iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1));

  const reduceEffects = prefersReducedMotion || isIOS;

  const handleOpen = () => {
    setIsFlapOpen(true);
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => { });
    }
    setTimeout(() => {
      setIsOpened(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;

    if (isMuted) {
      audio.pause();
      return;
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // iOS/Safari may block playback until a user gesture; the button tap will retry.
      });
    }
  }, [isMuted]);

  return (
    <div
      className="min-h-screen bg-paper text-zinc-800 selection:bg-sage/20 overflow-x-hidden relative"
    >
      <audio ref={audioRef} src="/song.mp3" loop autoPlay preload="auto" />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sage origin-left z-[1000]" style={{ scaleX }} />

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted((m) => !m)}
        className="fixed bottom-6 right-6 z-[500] w-12 h-12 rounded-full bg-sage text-white shadow-2xl flex items-center justify-center backdrop-blur-md border border-white/20"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src="/bg-chatgpt.png" alt="Background" className="w-full h-full object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="absolute top-40 md:top-24 left-0 right-0 text-center z-10 pointer-events-none"
            >
              <h1 className="serif text-4xl md:text-6xl text-[#c79957] font-bold tracking-[0.2em] drop-shadow-2xl">
                Dewni & Nilanka
              </h1>
              <p className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.6em] text-[#c79957]/90 font-bold drop-shadow-md">
                13 August 2026
              </p>
            </motion.div>

            {!reduceEffects && (
              <>
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

                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[80vw] md:w-[600px] h-[80vw] md:h-[600px] bg-sage/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"
                />
              </>
            )}

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  x: ["-10%", "10%", "-10%"],
                  y: ["-5%", "5%", "-5%"],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[30%] -left-[20%] w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(196,113,74,0.45)_0%,transparent_60%)] blur-3xl"
              />
              <motion.div
                animate={{
                  x: ["10%", "-10%", "10%"],
                  y: ["5%", "-5%", "5%"],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-[30%] -right-[20%] w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(156,132,112,0.4)_0%,transparent_60%)] blur-3xl"
              />

              {!reduceEffects &&
                [...Array(40)].map((_, i) => (
                  <motion.div
                    key={`dust-${i}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -Math.random() * 500 - 300],
                      x: [0, (Math.random() - 0.5) * 200],
                      rotate: [0, Math.random() * 360],
                      opacity: [0, Math.random() * 0.5 + 0.2, 0],
                      scale: [0.5, Math.random() * 1 + 0.5, 0.5],
                    }}
                    transition={{
                      duration: 10 + Math.random() * 20,
                      repeat: Infinity,
                      delay: Math.random() * 10,
                      ease: "easeInOut",
                    }}
                  >
                    {i % 4 === 0 ? (
                      <Flower2 className="text-sage/20 w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <div
                        className="rounded-full shadow-[0_0_15px_rgba(196,113,74,0.4)]"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#C4714A" : "#A84C2C",
                          width: Math.random() * 6 + 2 + "px",
                          height: Math.random() * 6 + 2 + "px",
                          filter: `blur(${Math.random() * 1}px)`,
                        }}
                      />
                    )}
                  </motion.div>
                ))}

              {!reduceEffects &&
                [...Array(20)].map((_, i) => {
                  const isHeart = i % 2 === 0;
                  const size = isHeart ? Math.random() * 20 + 10 : Math.random() * 25 + 15;
                  return (
                    <motion.div
                      key={`loading-falling-${i}`}
                      className="absolute pointer-events-none z-10"
                      initial={{ top: "-10%", left: `${Math.random() * 100}%`, rotate: 0, opacity: 0 }}
                      animate={{
                        top: "110%",
                        left: [
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100 + (Math.random() - 0.5) * 20}%`,
                          `${Math.random() * 100}%`,
                        ],
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 15 + Math.random() * 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear",
                      }}
                    >
                      {isHeart ? (
                        <Heart className="text-sage" fill="currentColor" size={size} />
                      ) : (
                        <RealisticPetal size={size} />
                      )}
                    </motion.div>
                  );
                })}

              {!reduceEffects &&
                [...Array(12)].map((_, i) => (
                  <motion.div
                    key={`bokeh-${i}`}
                    className="absolute rounded-full mix-blend-soft-light"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#9C8470" : "#F5EFE0",
                      opacity: 0.3,
                      width: Math.random() * 150 + 100 + "px",
                      height: Math.random() * 150 + 100 + "px",
                      left: `${Math.random() * 100}%`,
                      bottom: `-20%`,
                      filter: `blur(${Math.random() * 20 + 30}px)`,
                    }}
                    animate={{
                      y: [0, -1200],
                      x: [(Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 25 + Math.random() * 35,
                      repeat: Infinity,
                      delay: Math.random() * 20,
                      ease: "linear",
                    }}
                  />
                ))}
            </div>

            <motion.div
              layoutId="envelope-box"
              style={{ perspective: 1500 }}
              animate={!reduceEffects && !isFlapOpen ? { y: [0, -10, 0] } : {}}
              transition={!reduceEffects ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              className="relative w-full max-w-2xl h-80 md:h-[450px] rounded-[2.25rem] shadow-[0_34px_80px_-22px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center z-10 overflow-hidden"
            >
              <img src="/envelope-bg.png" alt="Envelope" className="absolute inset-0 w-full h-full object-contain rounded-[2.25rem] pointer-events-none" />

              {!isFlapOpen && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer"
                  onClick={handleOpen}
                >
                  {/* The visual seal has been removed, but this wrapper remains clickable over the whole envelope */}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/background1.png" alt="Background" className="w-full h-full object-cover opacity-[0.35] md:opacity-[0.45]" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper/40" />
      </div>

      <motion.main
        initial={false}
        animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="max-w-[1600px] mx-auto px-4 py-10 sm:py-12 md:px-12 md:py-24 flex flex-col gap-10 md:gap-16 relative z-10 min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="text-center space-y-4 md:space-y-8 mt-4 md:mt-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-4 text-sage/60"
          >
            <div className="h-px w-8 md:w-16 bg-current opacity-30" />
            <p className="text-[10px] md:text-sm uppercase tracking-[0.6em] font-bold">With joy in our hearts</p>
            <div className="h-px w-8 md:w-16 bg-current opacity-30" />
          </motion.div>

          <h1 className="flex flex-col items-center px-2">
            <span className="serif italic text-3xl sm:text-5xl md:text-[8rem] text-sage font-light leading-tight drop-shadow-sm mb-1 md:mb-6">
              KINDLY JOIN US
            </span>
            <span className="serif text-sm sm:text-base md:text-4xl text-umber tracking-[0.15em] md:tracking-[0.3em] uppercase font-light">
              to the wedding of
            </span>
          </h1>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-16 mt-4 md:mt-8 relative w-full px-2">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-sage/5 blur-3xl rounded-full" />

            <motion.h2 whileHover={{ scale: 1.05 }} className="script text-[15vw] sm:text-7xl md:text-[10rem] text-sage drop-shadow-2xl font-bold relative z-10 leading-none">
              Dewni
            </motion.h2>

            <div className="relative flex items-center justify-center shrink-0">
              <div className="h-px w-6 md:w-24 bg-sage/20 hidden md:block" />
              <div className="relative mx-1 md:mx-4">
                <Heart className="text-sage/40 w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 animate-pulse" fill="currentColor" />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-sage/20 blur-xl rounded-full"
                />
              </div>
              <div className="h-px w-6 md:w-24 bg-sage/20 hidden md:block" />
            </div>

            <motion.h2 whileHover={{ scale: 1.05 }} className="script text-[15vw] sm:text-7xl md:text-[10rem] text-sage drop-shadow-2xl font-bold relative z-10 leading-none">
              Nilanka
            </motion.h2>
          </div>

          <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Updated premium envelope section */}
        <div className="flex justify-center w-full mb-8 mt-12 md:mt-28">
          {!isOpened ? (
            <div className="w-full max-w-3xl relative h-[340px] sm:h-[380px] md:h-[460px]" />
          ) : (
            <motion.div
              layoutId="envelope-box"
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-4xl relative cursor-default"
              style={{
                height: isSmallScreen ? "520px" : "clamp(420px, 52vw, 620px)",
              }}
            >
              {/* ambient depth */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.28, 0.45, 0.28] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-6 sm:inset-x-10 top-[24%] h-44 sm:h-52 bg-sage/25 blur-[70px] rounded-full pointer-events-none z-0"
              />
              <div className="absolute inset-x-10 top-[18%] h-20 bg-sage/12 blur-[50px] rounded-full pointer-events-none z-0" />

              {/* floating dust glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`envelope-speck-${i}`}
                    className={`absolute rounded-full ${i % 2 === 0 ? "bg-sand" : "bg-sage"}`}
                    style={{
                      width: `${Math.random() * 6 + 3}px`,
                      height: `${Math.random() * 6 + 3}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 60 + 8}%`,
                      opacity: 0.12,
                      filter: "blur(1px)",
                    }}
                    animate={{
                      y: [0, -18, 0],
                      x: [0, (Math.random() - 0.5) * 14, 0],
                      opacity: [0.08, 0.2, 0.08],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* envelope body back */}
              <div className="absolute bottom-0 left-0 right-0 h-[64%] sm:h-[66%] md:h-[68%] rounded-b-[2.5rem] overflow-hidden z-10 shadow-[0_24px_70px_-12px_rgba(61,34,21,0.55)]">
                <div className="absolute inset-0 bg-gradient-to-b from-umber via-rust/35 to-sienna/55" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-umber/25" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-white/8" />
                <div className="absolute inset-x-10 top-3 h-px bg-sand/15" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                <div className="absolute top-0 bottom-0 left-0 w-px bg-white/8" />
                <div className="absolute top-0 bottom-0 right-0 w-px bg-white/8" />
                <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none">
                  <div className="w-16 h-px bg-sand/45" />
                  <p className="serif italic text-sand/55 text-[10px] tracking-[0.4em] uppercase">Official Invite · 2026</p>
                  <div className="w-16 h-px bg-sand/45" />
                </div>
              </div>

              {/* opened flap */}
              <div
                className="absolute left-0 right-0 z-10 pointer-events-none overflow-hidden"
                style={{
                  bottom: isSmallScreen ? "62.5%" : "66.2%",
                  height: isSmallScreen ? "33%" : "40%",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-umber/95 via-rust/70 to-sienna/75"
                  style={{
                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  }}
                >
                  <div className="absolute inset-0 opacity-25 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-transparent" />
                </div>

                <div
                  className="absolute inset-0 bg-gradient-to-b from-sage to-rust"
                  style={{
                    clipPath: "polygon(3% 100%, 50% 10%, 97% 100%)",
                  }}
                >
                  <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/0 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-umber/35 to-transparent" />
              </div>

              {/* invitation card */}
              <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={{
                  y: isSmallScreen ? -46 : -58,
                  opacity: 1,
                }}
                transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-3 right-3 sm:left-6 sm:right-6 md:left-16 md:right-16 z-20"
                style={{
                  bottom: isSmallScreen ? "30%" : "33%",
                  top: "auto",
                }}
              >
                <div className="absolute -bottom-4 left-6 right-6 h-10 bg-umber/20 blur-xl rounded-full" />

                <div className="relative bg-paper rounded-[1.6rem] md:rounded-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.16),0_10px_30px_rgba(0,0,0,0.08)] border border-sand/35 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-sage/12 blur-3xl rounded-full" />
                    <div className="absolute inset-[10px] border border-taupe/25 rounded-[1.1rem] md:rounded-xl" />
                    <div className="absolute inset-[16px] border border-sage/15 rounded-[0.9rem] md:rounded-lg" />

                    {[
                      ["top-3 left-3", "rotate-0"],
                      ["top-3 right-3", "rotate-90"],
                      ["bottom-3 left-3", "-rotate-90"],
                      ["bottom-3 right-3", "rotate-180"],
                    ].map(([pos, rot], i) => (
                      <div key={i} className={`absolute ${pos} w-7 h-7`}>
                        <svg viewBox="0 0 28 28" fill="none" className={`w-full h-full ${rot} opacity-40`}>
                          <path d="M2 2 C2 2, 14 2, 14 14" stroke="rgb(156 132 112)" strokeWidth="0.8" fill="none" />
                          <path d="M2 2 C8 2, 2 8, 2 14" stroke="rgb(156 132 112)" strokeWidth="0.8" fill="none" />
                          <circle cx="4" cy="4" r="1.2" fill="rgb(196 113 74)" opacity="0.5" />
                          <path d="M6 2 C6 2, 6 6, 10 6" stroke="rgb(196 113 74)" strokeWidth="0.6" fill="none" opacity="0.5" />
                        </svg>
                      </div>
                    ))}

                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 4.6, delay: 2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12"
                    />
                  </div>

                  {/* content */}
                  <div className="relative z-10 px-4 pt-6 pb-4 md:px-8 md:py-8 flex flex-col items-center text-center gap-3">

                    {/* top ornament */}
                    <div className="flex items-center gap-3 w-full max-w-[200px]">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-taupe/40" />
                      <Sparkles className="w-3 h-3 text-sage opacity-60" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-taupe/40" />
                    </div>

                    {/* couple names */}
                    <div className="flex flex-col items-center justify-center mt-2 mb-1">
                      <span className="script text-[42px] md:text-[60px] text-sage drop-shadow-md font-bold leading-none">
                        Dewni
                      </span>
                      <span className="text-taupe/40 text-sm md:text-base font-serif italic my-1">&amp;</span>
                      <span className="script text-[42px] md:text-[60px] text-sage drop-shadow-md font-bold leading-none">
                        Nilanka
                      </span>
                    </div>

                    <p className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-taupe font-medium max-w-[240px] leading-relaxed">
                      TOGETHER WITH THEIR FAMILIES, INVITE YOU TO CELEBRATE THEIR MARRIAGE
                    </p>

                    {/* date / time / venue */}
                    <div className="flex items-center justify-center gap-4 w-full mt-2">
                      <div className="flex-1 h-[1px] bg-taupe/20" />
                      <div className="flex flex-col items-center">
                        <span className="serif text-[18px] md:text-[24px] text-umber font-semibold leading-none">
                          13
                        </span>
                        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-taupe font-bold mt-1">
                          AUGUST
                        </span>
                      </div>
                      <div className="w-[1px] h-8 bg-taupe/20" />
                      <div className="flex flex-col items-center">
                        <span className="serif text-[18px] md:text-[24px] text-umber font-semibold leading-none">
                          2026
                        </span>
                        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-taupe font-bold mt-1">
                          THURSDAY
                        </span>
                      </div>
                      <div className="flex-1 h-[1px] bg-taupe/20" />
                    </div>

                    <div className="flex flex-col items-center gap-1 mt-1 mb-2">
                      <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-taupe font-bold">
                        9:00 AM ONWARDS
                      </span>
                      <span className="serif text-[9px] md:text-[11px] uppercase tracking-[0.15em] text-umber/90 font-bold">
                        SEETHAWAKA REGENCY, AWISSAWELLA
                      </span>
                    </div>

                    {/* bottom ornament */}
                    <div className="flex items-center gap-3 w-full max-w-[200px]">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-taupe/40" />
                      <Sparkles className="w-3 h-3 text-sage opacity-60" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-taupe/40" />
                    </div>

                  </div>
                </div>
              </motion.div>

              {/* front flaps */}
              <div className="absolute bottom-0 left-0 right-0 h-[64%] sm:h-[66%] md:h-[68%] z-30 rounded-b-[2.5rem] overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-umber via-rust/85 to-sienna/80"
                  style={{
                    clipPath: "polygon(0 0, 50% 55%, 0 100%)",
                  }}
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/6 to-transparent" />
                </div>

                <div
                  className="absolute inset-0 bg-gradient-to-bl from-umber via-rust/85 to-sienna/80"
                  style={{
                    clipPath: "polygon(100% 0, 50% 55%, 100% 100%)",
                  }}
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-white/6 to-transparent" />
                </div>

                <div
                  className="absolute inset-0 bg-umber/25"
                  style={{
                    clipPath: "polygon(45% 50%, 50% 55%, 55% 50%, 50% 48%)",
                  }}
                />

                <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-umber/25 to-transparent" />
              </div>
            </motion.div>
          )}
        </div>

        {/* New Blessed Union Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full flex justify-center relative perspective-[1000px] mb-12 md:mb-24 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative h-[420px] sm:h-[520px] md:h-[600px] w-full max-w-[420px] overflow-hidden rounded-[30px] md:rounded-t-[200px] md:rounded-b-[30px] border border-sage/60 shadow-[0_20px_50px_rgba(212,175,55,0.2)] bg-[#F5EFE0]"
          >
            <div className="absolute -inset-6 rounded-t-[220px] rounded-b-[40px] border border-sage/20 hidden md:block" />
            <div className="absolute -inset-3 rounded-t-[210px] rounded-b-[35px] border border-sage/40 hidden md:block" />

            <img
              src="/WhatsApp Image 2026-06-25 at 18.41.50.jpeg"
              alt="Dewni and Nilanka"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE0]/10 via-[#F5EFE0]/60 to-[#F5EFE0]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_48%)]" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.55) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-12 px-8 text-center text-[#5A453D]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#5A453D]/20 bg-white/50 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#5A453D]" />
                <p className="text-[9px] uppercase tracking-[0.32em] text-[#5A453D] drop-shadow-sm font-medium">Blessed Union</p>
              </div>
              <h3 className="mt-4 serif text-3xl text-[#5A453D] drop-shadow-md font-light">
                Dewni <span className="text-[#5A453D]">&amp;</span> Nilanka
              </h3>
              <p className="mt-3 text-xs leading-6 text-[#5A453D] font-light max-w-[260px]">
                "Love is patient, love is kind." Join us as we exchange vows in faith, gratitude, and joy.
              </p>
              <div className="mt-6 h-px w-24 bg-[#5A453D]/30" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-[#5A453D] font-medium">13 August 2026</p>
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 sm:-right-6 md:-right-10 top-20 md:top-40 flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full border border-sage/40 bg-white/90 shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-md"
            >
              <div className="text-center">
                <Heart className="mx-auto h-6 w-6 md:h-8 md:w-8 text-sage fill-sage/20" />
                <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-umber">Forever</span>
              </div>
            </motion.div>

            {/* Sparkle effects */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute left-10 top-20 h-3 w-3 rounded-full bg-sage blur-[2px]"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute right-20 bottom-32 h-4 w-4 rounded-full bg-sage blur-[2px]"
            />
          </motion.div>
        </motion.div>

        {/* Bento Grid Layout - Flipped Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full col-span-2 lg:col-span-4"
          >
            <div className="w-full h-[220px] md:h-[350px] lg:h-[350px] relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/40 ring-1 ring-black/5">
              <div className="w-full h-full bg-[#F5EFE0] p-2 md:p-8 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 relative group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-40 pointer-events-none" />
                <div className="relative z-10 space-y-2 md:space-y-8 scale-[0.9] md:scale-100">
                  <div className="space-y-1">
                    <span className="serif italic text-[14px] md:text-2xl text-sage/70">Our Wedding Date</span>
                    <div className="w-full h-px bg-sage/20" />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-[8px] md:text-xs uppercase tracking-[0.4em] text-zinc-400 font-black mb-1 md:mb-2">Thursday</p>
                    <div className="relative inline-block px-6 md:px-8 py-1 md:py-2 border-y border-sage/30">
                      <p className="serif text-5xl md:text-8xl font-medium text-sage leading-none">13</p>
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 text-[#A84C2C]"
                      >
                        <Sparkles size={12} className="md:w-4 md:h-4" />
                      </motion.div>
                    </div>
                    <p className="serif text-sm md:text-2xl font-light tracking-[0.2em] mt-2 md:mt-3">AUGUST</p>
                  </div>

                  <div className="pt-1">
                    <p className="text-[7px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-sage/40">
                      Twenty Twenty Six
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-paper clip-path-[polygon(0%_100%,_5%_80%,_10%_100%,_15%_80%,_20%_100%,_25%_80%,_30%_100%,_35%_80%,_40%_100%,_45%_80%,_50%_100%,_55%_80%,_60%_100%,_65%_80%,_70%_100%,_75%_80%,_80%_100%,_85%_80%,_90%_100%,_95%_80%,_100%_100%)] opacity-50" />
              </div>
            </div>
          </motion.div>





          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full h-full col-span-2 lg:col-span-2"
          >
            <FlipCard
              containerClassName="w-full h-[300px] md:h-[350px] lg:h-[350px]"
              front={
                <div className="w-full h-full relative group">
                  <img
                    src="/WhatsApp Image 2026-06-25 at 18.44.02.jpeg"
                    alt="Seethawaka Regency"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/60 backdrop-blur-md p-4 md:p-8 border border-white/60 rounded-2xl group-hover:bg-white/80 transition-all duration-700 shadow-xl">
                    <p className="serif text-[8px] md:text-xs uppercase tracking-[0.4em] text-sage/80 mb-2 flex items-center gap-2">
                      <span className="w-4 h-px bg-sage/30" />
                      The Location
                    </p>
                    <h3 className="serif text-2xl md:text-5xl text-sage leading-tight drop-shadow-sm font-medium">
                      Seethawaka
                      <br />
                      Regency
                    </h3>

                    <motion.button
                      data-no-flip
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open("https://maps.app.goo.gl/z6cc6t5wNV8yrtMP9", "_blank")}
                      className="mt-3 md:mt-5 px-5 py-2 md:px-7 md:py-3 bg-sage text-white rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                      View Map
                    </motion.button>
                  </div>

                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-sage flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-lg">
                    <MapPin className="text-sage animate-bounce" size={16} />
                    <p className="serif text-[10px] md:text-sm tracking-[0.2em] font-bold uppercase">Awissawella</p>
                  </div>
                </div>
              }
              back={
                <>
                  <MapPin size={24} className="text-sage mb-4 md:mb-6 opacity-70 md:w-9 md:h-9" />
                  <h4 className="serif text-2xl md:text-4xl text-sage mb-2 md:mb-4">Seethawaka Regency</h4>
                  <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest leading-loose mb-4 md:mb-6">
                    Seethawaka Regency
                    <br />
                    Awissawella
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open("https://maps.app.goo.gl/z6cc6t5wNV8yrtMP9", "_blank")}
                    className="px-6 py-2 md:px-8 md:py-3 bg-sage text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    View Map
                  </motion.button>
                </>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full h-full col-span-2 lg:col-span-2"
          >
            <FlipCard
              containerClassName="w-full h-[300px] md:h-[350px] lg:h-[350px]"
              front={
                <div className="w-full h-full relative group overflow-hidden">
                  <img
                    src="/time.png"
                    alt="Timeline"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} className="bg-white/10 backdrop-blur-lg p-6 rounded-full border border-white/20">
                      <Clock size={32} className="text-white" />
                    </motion.div>
                    <p className="serif text-white text-3xl md:text-5xl italic tracking-widest mt-6 bg-black/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-2xl">Event Timeline</p>
                    <div className="mt-4 flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-0 bottom-0 left-4 w-px bg-white/20" />
                  <div className="absolute top-0 bottom-0 left-6 w-px bg-white/10" />
                  <div className="absolute top-0 bottom-0 right-4 w-px bg-white/20" />
                  <div className="absolute top-0 bottom-0 right-6 w-px bg-white/10" />
                </div>
              }
              back={
                <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-8">
                  <Clock size={24} className="text-sage mb-4 md:mb-6 opacity-70 md:w-8 md:h-8" />
                  <h4 className="serif text-3xl md:text-4xl text-sage mb-4 md:mb-8 font-bold">Timeline</h4>

                  <div className="w-full max-w-sm space-y-6 md:space-y-8 text-left">
                    <div className="flex items-start gap-3 md:gap-5">
                      <span className="serif text-sage font-bold text-sm md:text-lg w-16 md:w-24 text-right shrink-0 pt-1">9:00 AM</span>
                      <div className="w-px h-full bg-sage/30 relative mt-2 -ml-[1px] md:-ml-2 shrink-0">
                        <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-sage" />
                      </div>
                      <div className="pb-4">
                        <p className="text-xs md:text-sm font-bold uppercase tracking-wider">Welcome</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:gap-5">
                      <span className="serif text-sage font-bold text-sm md:text-lg w-16 md:w-24 text-right shrink-0 pt-1">9:53 AM</span>
                      <div className="w-px h-full bg-sage/30 relative mt-2 -ml-[1px] md:-ml-2 shrink-0">
                        <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full bg-sage" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#A84C2C]">Poruwa Ceremony</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>

        <RSVPForm />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="relative overflow-hidden bg-[#F5EFE0] border-t border-sage/20 pt-20 pb-8 text-umber"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_52%)]" />
          <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />

          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-16 grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col justify-center text-center"
              >
                <div className="mb-5 inline-flex items-center justify-center gap-2 self-center rounded-full border border-sage/35 bg-white/50 px-4 py-2 backdrop-blur-sm shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-sage" />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-sage font-bold">Thank You For Your Blessings</span>
                </div>

                <h2 className="mb-6 font-serif text-5xl font-medium tracking-wide text-sage md:text-6xl drop-shadow-sm">
                  D <span className="text-3xl text-umber">&amp;</span> N
                </h2>
                <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-umber/80">
                  We look forward to sharing our joy and celebrating our holy union surrounded by the people we love most.
                </p>
                <a
                  href="https://maps.app.goo.gl/z6cc6t5wNV8yrtMP9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 self-center rounded-full border border-sage/45 bg-white/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-sage transition-colors hover:bg-sage/10 shadow-sm"
                >
                  <MapPin className="h-4 w-4" />
                  Seethawaka Regency
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="group relative mb-10 flex w-full items-center justify-center overflow-hidden border-y border-sage/20 py-10"
            >
              <div className="absolute inset-0 w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-sage/10 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite]" />

              <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-center font-medium tracking-wide bg-gradient-to-r from-umber/60 via-sage to-umber/60 text-transparent bg-clip-text">
                A New Chapter Begins
              </p>
            </motion.div>

            <div className="flex flex-col items-center justify-between gap-4 px-4 text-center text-[10px] font-bold tracking-[0.1em] text-sage md:flex-row md:text-left">
              <div className="space-y-2">
                <p className="!text-sage">
                  &copy; {new Date().getFullYear()} DEWNI &amp; NILANKA. All rights reserved.
                </p>
                <p className="!text-sage">
                  Design and created by <span className="!text-sage font-black">InviteMint</span> | Connect WhatsApp: <a href="https://wa.me/94707819074" target="_blank" rel="noopener noreferrer" className="!text-sage hover:underline">+94 70 781 9074</a>
                </p>
              </div>
              <p className="flex items-center justify-center gap-1.5 whitespace-nowrap text-umber font-medium">
                Crafted with <Heart className="h-3 w-3 fill-sage text-sage animate-pulse" /> for our special day
              </p>
            </div>

          </div>
        </motion.footer>
      </motion.main>

      {/* Heavy background motion removed for iOS stability */}
    </div>
  );
}