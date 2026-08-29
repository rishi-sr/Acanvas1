import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  // Tanpura / Sitar meditative chord frequencies (C#, G#, C#, F)
  const baseFrequencies = [138.59, 207.65, 277.18, 349.23, 415.30, 554.37];

  const playPluck = (ctx, masterGain, freq, delay = 0, duration = 3.5) => {
    if (!ctx || ctx.state === 'suspended') return;

    setTimeout(() => {
      try {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Harmonics
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // String resonance decay
        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Safe fail
      }
    }, delay * 1000);
  };

  const startTanpuraLoop = (ctx, masterGain) => {
    let noteIdx = 0;
    const notesPattern = [
      { freq: baseFrequencies[1], delay: 0 },
      { freq: baseFrequencies[2], delay: 1.2 },
      { freq: baseFrequencies[2], delay: 2.4 },
      { freq: baseFrequencies[0], delay: 3.6 }
    ];

    const cycle = () => {
      notesPattern.forEach(n => playPluck(ctx, masterGain, n.freq, n.delay, 4.0));
      timerRef.current = setTimeout(cycle, 5000);
    };

    cycle();
  };

  const toggleAudio = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtxRef.current = new AudioContextClass();

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gainNode;
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      if (isPlaying) {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
        }
        setIsPlaying(false);
      } else {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime + 0.5);
        }
        startTanpuraLoop(audioCtxRef.current, gainNodeRef.current);
        setIsPlaying(true);
      }
    } catch {
      // Audio context handling
    }
  };

  const changeVolume = (newVol) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : volume, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        toggleAudio,
        changeVolume,
        toggleMute
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
