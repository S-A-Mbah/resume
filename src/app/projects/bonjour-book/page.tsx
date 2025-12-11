'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Volume2, Sparkles, RefreshCcw, ArrowLeft } from 'lucide-react';

// --- Custom SVG Illustrations ---

const CatSitting = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <circle cx="100" cy="110" r="60" fill="#FB923C" /> {/* Body */}
        <circle cx="100" cy="70" r="40" fill="#FB923C" /> {/* Head */}
        <path d="M70 40 L80 70 L60 70 Z" fill="#FB923C" /> {/* Left Ear */}
        <path d="M130 40 L120 70 L140 70 Z" fill="#FB923C" /> {/* Right Ear */}
        <circle cx="90" cy="65" r="4" fill="#1F2937" /> {/* Eye */}
        <circle cx="110" cy="65" r="4" fill="#1F2937" /> {/* Eye */}
        <path d="M95 75 Q100 80 105 75" stroke="#1F2937" strokeWidth="2" fill="none" /> {/* Mouth */}
        <path d="M100 130 Q130 130 140 100" stroke="#F97316" strokeWidth="8" fill="none" strokeLinecap="round" /> {/* Tail */}
        <path d="M60 70 L30 65 M60 75 L30 75 M60 80 L30 85" stroke="#1F2937" strokeWidth="1" /> {/* Whiskers L */}
        <path d="M140 70 L170 65 M140 75 L170 75 M140 80 L170 85" stroke="#1F2937" strokeWidth="1" /> {/* Whiskers R */}
    </svg>
);

const CatStretched = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="130" rx="70" ry="30" fill="#FB923C" /> {/* Stretched Body */}
        <circle cx="50" cy="110" r="35" fill="#FB923C" /> {/* Head Low */}
        <path d="M30 85 L40 110 L20 110 Z" fill="#FB923C" />
        <path d="M70 85 L60 110 L80 110 Z" fill="#FB923C" />
        <circle cx="40" cy="105" r="3" fill="#1F2937" />
        <circle cx="60" cy="105" r="3" fill="#1F2937" />
        <path d="M160 130 Q180 100 170 80" stroke="#F97316" strokeWidth="8" fill="none" strokeLinecap="round" /> {/* Tail High */}
        <text x="100" y="50" textAnchor="middle" fontSize="20" fill="#1F2937" className="font-bold">Meow!</text>
    </svg>
);

const DogSitting = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <path d="M80 160 L120 160 L130 100 L70 100 Z" fill="#8B5CF6" /> {/* Body */}
        <circle cx="100" cy="80" r="40" fill="#A78BFA" /> {/* Head */}
        <ellipse cx="65" cy="80" rx="15" ry="35" fill="#8B5CF6" transform="rotate(-20 65 80)" /> {/* Ear L */}
        <ellipse cx="135" cy="80" rx="15" ry="35" fill="#8B5CF6" transform="rotate(20 135 80)" /> {/* Ear R */}
        <circle cx="90" cy="75" r="5" fill="white" /> <circle cx="90" cy="75" r="2" fill="black" />
        <circle cx="110" cy="75" r="5" fill="white" /> <circle cx="110" cy="75" r="2" fill="black" />
        <circle cx="100" cy="90" r="6" fill="#1F2937" /> {/* Nose */}
        <path d="M120 150 Q140 120 135 140" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" /> {/* Tail */}
    </svg>
);

const DogJumping = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <path d="M80 140 L120 120 L130 80 L90 100 Z" fill="#8B5CF6" transform="rotate(-15 100 100)" /> {/* Body */}
        <circle cx="110" cy="70" r="40" fill="#A78BFA" /> {/* Head */}
        <ellipse cx="75" cy="60" rx="15" ry="35" fill="#8B5CF6" transform="rotate(-60 75 60)" /> {/* Flying Ear */}
        <ellipse cx="145" cy="60" rx="15" ry="35" fill="#8B5CF6" transform="rotate(60 145 60)" />
        <circle cx="100" cy="65" r="5" fill="white" /><circle cx="100" cy="65" r="2" fill="black" />
        <circle cx="120" cy="65" r="5" fill="white" /><circle cx="120" cy="65" r="2" fill="black" />
        <path d="M100 85 Q110 95 120 85" stroke="#1F2937" strokeWidth="2" fill="none" />
        <path d="M40 160 L60 180" stroke="#1F2937" strokeWidth="2" /> {/* Motion lines */}
        <path d="M50 150 L70 170" stroke="#1F2937" strokeWidth="2" />
    </svg>
);

const BearStanding = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="130" rx="60" ry="50" fill="#78350F" /> {/* Body */}
        <circle cx="100" cy="70" r="45" fill="#92400E" /> {/* Head */}
        <circle cx="60" cy="50" r="15" fill="#78350F" /> {/* Ear */}
        <circle cx="140" cy="50" r="15" fill="#78350F" /> {/* Ear */}
        <circle cx="85" cy="65" r="4" fill="black" />
        <circle cx="115" cy="65" r="4" fill="black" />
        <ellipse cx="100" cy="85" rx="15" ry="10" fill="#FCD34D" /> {/* Snout */}
        <circle cx="100" cy="80" r="4" fill="black" />
    </svg>
);

const BearTall = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        {/* Small Tree for scale */}
        <rect x="20" y="120" width="10" height="60" fill="#5D4037" />
        <circle cx="25" cy="110" r="20" fill="#10B981" />
        <circle cx="25" cy="90" r="15" fill="#10B981" />

        {/* Big Bear */}
        <rect x="70" y="60" width="80" height="120" rx="40" fill="#78350F" />
        <circle cx="110" cy="50" r="45" fill="#92400E" />
        <circle cx="70" cy="30" r="15" fill="#78350F" />
        <circle cx="150" cy="30" r="15" fill="#78350F" />
        <circle cx="95" cy="45" r="4" fill="black" />
        <circle cx="125" cy="45" r="4" fill="black" />
        <ellipse cx="110" cy="65" rx="15" ry="10" fill="#FCD34D" />
        <circle cx="110" cy="60" r="4" fill="black" />
        <path d="M150 100 L180 80" stroke="#78350F" strokeWidth="12" strokeLinecap="round" /> {/* Arm */}
    </svg>
);

const ApplePlain = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <path d="M60 100 C60 160 140 160 140 100 C140 60 100 60 100 80 C100 60 60 60 60 100 Z" fill="#EF4444" />
        <path d="M100 80 Q100 60 110 50" stroke="#78350F" strokeWidth="4" />
        <path d="M110 50 Q130 40 130 60 Q110 70 110 50" fill="#10B981" />
        <ellipse cx="80" cy="90" rx="5" ry="10" fill="white" fillOpacity="0.4" transform="rotate(20 80 90)" />
    </svg>
);

const AppleFace = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <path d="M50 100 C50 170 150 170 150 100 C150 50 100 50 100 80 C100 50 50 50 50 100 Z" fill="#EF4444" />
        <path d="M100 80 Q100 60 110 50" stroke="#78350F" strokeWidth="4" />
        <path d="M110 50 Q130 40 130 60 Q110 70 110 50" fill="#10B981" />
        {/* Face */}
        <circle cx="85" cy="110" r="5" fill="#1F2937" />
        <circle cx="115" cy="110" r="5" fill="#1F2937" />
        <path d="M90 125 Q100 135 110 125" stroke="#1F2937" strokeWidth="2" fill="none" />
        <circle cx="70" cy="115" r="4" fill="#FECACA" opacity="0.6" /> {/* Blush */}
        <circle cx="130" cy="115" r="4" fill="#FECACA" opacity="0.6" />
    </svg>
);

const Mirror = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <defs>
            <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="50%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
        </defs>
        <ellipse cx="100" cy="100" rx="60" ry="80" fill="#94A3B8" /> {/* Frame */}
        <ellipse cx="100" cy="100" rx="50" ry="70" fill="url(#mirrorGrad)" /> {/* Glass */}
        <path d="M80 60 L90 140 M110 50 L120 120" stroke="white" strokeWidth="2" opacity="0.5" />
        <rect x="90" y="180" width="20" height="20" fill="#94A3B8" /> {/* Stand */}
        <rect x="70" y="195" width="60" height="5" fill="#64748B" /> {/* Base */}
    </svg>
);

const KidsCheering = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        {/* Kid 1 */}
        <circle cx="60" cy="100" r="20" fill="#FDE047" />
        <path d="M50 95 Q60 105 70 95" stroke="#1F2937" strokeWidth="2" fill="none" />
        <circle cx="55" cy="90" r="2" fill="black" /> <circle cx="65" cy="90" r="2" fill="black" />

        {/* Kid 2 */}
        <circle cx="100" cy="80" r="25" fill="#FCA5A5" />
        <path d="M90 75 Q100 90 110 75" stroke="#1F2937" strokeWidth="2" fill="none" />
        <circle cx="92" cy="70" r="2" fill="black" /> <circle cx="108" cy="70" r="2" fill="black" />

        {/* Kid 3 */}
        <circle cx="140" cy="100" r="20" fill="#93C5FD" />
        <path d="M130 95 Q140 105 150 95" stroke="#1F2937" strokeWidth="2" fill="none" />
        <circle cx="135" cy="90" r="2" fill="black" /> <circle cx="145" cy="90" r="2" fill="black" />

        {/* Confetti */}
        <rect x="50" y="40" width="5" height="10" fill="red" transform="rotate(20)" />
        <rect x="120" y="30" width="5" height="10" fill="blue" transform="rotate(-20)" />
        <circle cx="90" cy="20" r="4" fill="green" />
    </svg>
);

const CoverArt = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
        <rect x="40" y="40" width="120" height="140" rx="5" fill="#FCD34D" stroke="#B45309" strokeWidth="4" />
        <text x="100" y="100" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#B45309">Bonjour!</text>
        <text x="100" y="130" textAnchor="middle" fontSize="14" fill="#78350F">Hello, my friends!</text>
        <circle cx="60" cy="160" r="10" fill="#EF4444" />
        <circle cx="140" cy="160" r="10" fill="#3B82F6" />
        <path d="M100 60 L110 50 L90 50 Z" fill="#B45309" />
    </svg>
);


// --- Data Structure ---

interface BookPageContent {
    en: string;
    fr: string;
    phonetic: string;
    Illustration: React.FC;
}

interface BookPage {
    type: 'cover' | 'spread';
    title?: string;
    subtitle?: string;
    Illustration?: React.FC;
    theme: string;
    id?: string;
    left?: BookPageContent;
    right?: BookPageContent;
}

const bookContent: BookPage[] = [
    {
        type: 'cover',
        title: "Bonjour, mes amis!",
        subtitle: "(Hello, my friends!)",
        Illustration: CoverArt,
        theme: "bg-yellow-50"
    },
    {
        type: 'spread',
        id: 'cat',
        theme: "bg-orange-50",
        left: {
            en: "This is a cat.",
            fr: "C’est un chat.",
            phonetic: "Say-tuhn shah",
            Illustration: CatSitting
        },
        right: {
            en: "The cat says: \"I am small.\"",
            fr: "Le chat dit : \"Je suis petit.\"",
            phonetic: "Zhuh swee puh-tee",
            Illustration: CatStretched
        }
    },
    {
        type: 'spread',
        id: 'dog',
        theme: "bg-purple-50",
        left: {
            en: "This is a dog.",
            fr: "C’est un chien.",
            phonetic: "Say-tuhn shee-ehn",
            Illustration: DogSitting
        },
        right: {
            en: "The dog says: \"I am happy!\"",
            fr: "Le chien dit : \"Je suis content!\"",
            phonetic: "Zhuh swee kohn-tahn",
            Illustration: DogJumping
        }
    },
    {
        type: 'spread',
        id: 'bear',
        theme: "bg-amber-50",
        left: {
            en: "This is a bear.",
            fr: "C’est un ours.",
            phonetic: "Say-tuhn noors",
            Illustration: BearStanding
        },
        right: {
            en: "The bear says: \"I am big.\"",
            fr: "L'ours dit : \"Je suis grand.\"",
            phonetic: "Zhuh swee grahn",
            Illustration: BearTall
        }
    },
    {
        type: 'spread',
        id: 'apple',
        theme: "bg-red-50",
        left: {
            en: "This is an apple.",
            fr: "C’est une pomme.",
            phonetic: "Set-oon pom",
            Illustration: ApplePlain
        },
        right: {
            en: "The apple says: \"I am red.\"",
            fr: "La pomme dit : \"Je suis rouge.\"",
            phonetic: "Zhuh swee roozh",
            Illustration: AppleFace
        }
    },
    {
        type: 'spread',
        id: 'you',
        theme: "bg-blue-50",
        left: {
            en: "And look! This is YOU!",
            fr: "C’est toi!",
            phonetic: "Say twah!",
            Illustration: Mirror
        },
        right: {
            en: "You say: \"I am ready!\"",
            fr: "Tu dis : \"Je suis prêt!\"",
            phonetic: "Zhuh swee prell",
            Illustration: KidsCheering
        }
    }
];

// --- Components ---

// --- Components ---

const InteractiveText = ({ text, lang = 'fr-FR' }: { text: string, lang?: string }) => {
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const words = text.split(' ');

    const speakWord = (word: string, index: number) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            const cleanWord = word.replace(/[.,!?:;"«»]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanWord);
            utterance.lang = lang;
            utterance.rate = 0.8;
            
            setHighlightedIndex(index);
            utterance.onend = () => setHighlightedIndex(null);
            
            window.speechSynthesis.speak(utterance);
        }
    };

    const speechRef = React.useRef<SpeechSynthesisUtterance | null>(null);

    const speakFullSentence = (e?: React.MouseEvent) => {
         e?.stopPropagation();
         if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(true);
            
            const utterance = new SpeechSynthesisUtterance(text);
            speechRef.current = utterance; // Keep reference to prevent GC
            
            utterance.lang = lang;
            utterance.rate = 0.8; 

            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    const charIndex = event.charIndex;
                    // Simple logic: iterate words and track cumulative length
                    let currentLength = 0;
                    for (let i = 0; i < words.length; i++) {
                        // We assume single space separation for calculation
                        // word length + 1 for the space (except maybe usually works fine even for last word)
                        const wordLength = words[i].length + 1; 
                        
                        // Check if charIndex falls within this word's range
                        // We use a "fuzzy" match because charIndex points to start of word
                        if (charIndex >= currentLength && charIndex < currentLength + wordLength) {
                            setHighlightedIndex(i);
                            break;
                        }
                        currentLength += wordLength;
                    }
                }
            };
            
            utterance.onend = () => {
                setHighlightedIndex(null);
                setIsSpeaking(false);
                speechRef.current = null;
            };

            utterance.onerror = () => {
                 setHighlightedIndex(null);
                 setIsSpeaking(false);
                 speechRef.current = null;
            };
            
            window.speechSynthesis.speak(utterance);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-1 cursor-pointer select-none" onClick={speakFullSentence} title="Click sentence to read all">
                {words.map((word, index) => (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            speakWord(word, index);
                        }}
                        className={`transition-all duration-200 rounded px-1 ${
                            highlightedIndex === index 
                            ? 'bg-indigo-500 text-white scale-110 shadow-md font-bold z-10' 
                            : 'hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        {word}
                    </span>
                ))}
            </div>
            
            <button
                onClick={speakFullSentence}
                disabled={isSpeaking}
                className={`mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all border ${
                    isSpeaking 
                    ? 'bg-indigo-100 text-indigo-400 border-indigo-200 cursor-not-allowed' 
                    : 'bg-white/80 hover:bg-white text-blue-600 border-blue-100 hover:scale-105'
                }`}
                aria-label="Listen to pronunciation"
            >
                <Volume2 size={16} className={isSpeaking ? "animate-pulse" : ""} />
                <span className="text-xs uppercase tracking-wider">{isSpeaking ? 'Listening...' : 'Listen'}</span>
            </button>
        </div>
    );
};

const PageContent = ({ content, side }: { content: BookPageContent, side: string }) => {
    const Illustration = content.Illustration;
    return (
        <div className={`flex-1 flex flex-col items-center justify-center p-6 sm:p-8 h-full relative ${side === 'left' ? 'border-b sm:border-b-0 sm:border-r border-gray-200' : ''}`}>
            <div className="w-48 h-48 sm:w-56 sm:h-56 mb-6 transition-transform duration-500 hover:scale-105">
                <Illustration />
            </div>

            <div className="text-center space-y-4 max-w-sm">
                <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm">
                    <p className="text-gray-500 text-lg sm:text-xl font-medium font-serif italic mb-1 select-none">
                        {content.en}
                    </p>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                         <InteractiveText text={content.fr} lang="fr-FR" />
                    </div>
                    <p className="text-gray-400 text-sm font-mono mt-1 select-none">({content.phonetic})</p>
                </div>
            </div>

            <div className="absolute bottom-4 text-xs text-gray-300 font-mono select-none">
                {side === 'left' ? 'Page A' : 'Page B'}
            </div>
        </div>
    );
};

const CoverPage = ({ data, onStart }: { data: BookPage, onStart: () => void }) => {
    const Illustration = data.Illustration || (() => null);
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center p-8 text-center ${data.theme}`}>
            <div className="w-64 h-64 mb-8 animate-bounce-slow">
                <Illustration />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-800 tracking-tight mb-2">{data.title}</h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-serif italic mb-12">{data.subtitle}</p>

            <button
                onClick={onStart}
                className="group relative px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-3"
            >
                Open Book
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default function BonjourBook() {
    const [pageIndex, setPageIndex] = useState(0);

    const currentPage = bookContent[pageIndex];
    const isCover = currentPage.type === 'cover';
    const isLast = pageIndex === bookContent.length - 1;

    const nextPage = () => {
        if (pageIndex < bookContent.length - 1) {
            setPageIndex(p => p + 1);
        }
    };

    const prevPage = () => {
        if (pageIndex > 0) {
            setPageIndex(p => p - 1);
        }
    };

    const reset = () => {
        setPageIndex(0);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setPageIndex(current => Math.min(current + 1, bookContent.length - 1));
            }
            if (e.key === 'ArrowLeft') {
                setPageIndex(current => Math.max(current - 1, 0));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans relative">
            
            <Link 
                href="/#projects" 
                className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-slate-600 hover:text-blue-600 rounded-full shadow-sm hover:shadow-md transition-all font-medium text-sm"
            >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Projects</span>
                <span className="sm:hidden">Back</span>
            </Link>

            {/* Book Container */}
            <div className="relative w-full max-w-6xl aspect-[3/4] sm:aspect-[3/2] lg:aspect-[2/1] perspective-1000">

                <div className={`w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-500 flex flex-col sm:flex-row border-8 border-white ring-1 ring-gray-200`}>

                    {isCover ? (
                        <CoverPage data={currentPage} onStart={nextPage} />
                    ) : (
                        <>
                            {/* Left Page Area */}
                            <div className={`flex-1 h-1/2 sm:h-full relative overflow-hidden ${currentPage.theme} transition-colors duration-500`}>
                                {currentPage.left && <PageContent content={currentPage.left} side="left" />}
                            </div>

                            {/* Right Page Area */}
                            <div className={`flex-1 h-1/2 sm:h-full relative overflow-hidden ${currentPage.theme} transition-colors duration-500 border-l border-black/5`}>
                                {currentPage.right && <PageContent content={currentPage.right} side="right" />}
                            </div>
                        </>
                    )}

                    {/* Navigation Overlay (visible on hover or always on mobile) */}
                    {!isCover && (
                        <>
                            <button
                                onClick={prevPage}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-blue-600 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-10"
                                disabled={pageIndex === 0}
                            >
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={nextPage}
                                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 ${isLast ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/80 hover:bg-white text-blue-600'} rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-10`}
                                disabled={isLast && false} // Let them click to maybe restart?
                            >
                                {isLast ? <Sparkles size={32} /> : <ChevronRight size={32} />}
                            </button>

                            {isLast && (
                                <button
                                    onClick={reset}
                                    className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 px-4 py-2 bg-white/90 text-gray-600 rounded-lg shadow-md hover:bg-gray-50 flex items-center gap-2 text-sm font-bold z-20"
                                >
                                    <RefreshCcw size={16} /> Read Again
                                </button>
                            )}
                        </>
                    )}

                    {/* Spine effect */}
                    {!isCover && (
                        <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
                    )}
                </div>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        </div>
    );
}
