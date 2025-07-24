import React, { useState, useRef, createContext, useContext } from "react";

import {
  Code,
  Cpu,
  ShieldCheck,
  Zap,
  ChevronDown,
  Server,
  BrainCircuit,
  Lightbulb,
  Sun,
  Moon,
} from "lucide-react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

// 1. Create a Theme Context

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark-blue"); // 'dark-blue' or 'black'

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark-blue" ? "black" : "dark-blue"
    );
  };

  const themeClasses = {
    "dark-blue": "from-[#020617] via-[#0a0a0a] to-black",

    black: "from-[#0a0a0a] to-black",
  };

  const backgroundClass =
    theme === "dark-blue"
      ? "bg-gradient-to-br from-[#020617] via-[#0a0a0a] to-black"
      : "bg-[#0a0a0a]";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundClass }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context

const useTheme = () => useContext(ThemeContext);

// Main App Component: The Landing Page

const AskSensei = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

const App = () => {
  const { backgroundClass } = useTheme();

  const analyzerRef = useRef(null);

  const featuresRef = useRef(null);

  const testimonialsRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`text-gray-300 font-sans transition-colors duration-500 ${backgroundClass}`}
    >
      <Navbar
        onAnalyzeClick={() => scrollTo(analyzerRef)}
        onFeaturesClick={() => scrollTo(featuresRef)}
        onTestimonialsClick={() => scrollTo(testimonialsRef)}
      />

      <HeroSection onAnalyzeClick={() => scrollTo(analyzerRef)} />

      <main>
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>

        <div ref={analyzerRef}>
          <AnalyzerSection />
        </div>

        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
};

// Navbar Component

const Navbar = ({ onAnalyzeClick, onFeaturesClick, onTestimonialsClick }) => {
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">Code Sensei</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onAnalyzeClick}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
            >
              Analyzer
            </button>

            <button
              onClick={onFeaturesClick}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
            >
              Features
            </button>

            <button
              onClick={onTestimonialsClick}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
            >
              Testimonials
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-300 hover:bg-gray-800 focus:outline-none"
          >
            {theme === "dark-blue" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section

const HeroSection = ({ onAnalyzeClick }) => {
  const { theme } = useTheme();

  const heroGradient =
    theme === "dark-blue"
      ? "from-[#020617] via-[#0a0a0a]/80 to-black"
      : "from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]";

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-b ${heroGradient}`}
      ></div>

      <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",

          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6 leading-tight">
          Unlock Supreme Code Intelligence
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Submit your code to the Sensei. Receive elite-level analysis, uncover
          hidden bugs, and elevate your programming craftsmanship instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onAnalyzeClick}
            className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            Analyze Your Code Now
          </button>

          <button
            onClick={onAnalyzeClick}
            className="bg-gray-800/50 border border-gray-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Learn More <ChevronDown className="inline-block h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Features Section

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-[#111111]/50 border border-gray-800 p-6 rounded-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#111111]">
    <div className="text-indigo-400 mb-4">{icon}</div>

    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

    <p className="text-gray-400">{children}</p>
  </div>
);

const FeaturesSection = () => (
  <section className="py-20 md:py-32 px-8 bg-transparent">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Why Use Code Sensei?
        </h2>

        <p className="text-lg text-gray-500 mt-4">
          Go beyond syntax. Understand the soul of your code.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<BrainCircuit size={32} />}
          title="Deep Complexity Analysis"
        >
          Get Big O notation for time and space complexity, helping you write
          more efficient algorithms.
        </FeatureCard>

        <FeatureCard
          icon={<Lightbulb size={32} />}
          title="Best Practice Suggestions"
        >
          Receive actionable advice on improving code structure, readability,
          and maintainability.
        </FeatureCard>

        <FeatureCard
          icon={<ShieldCheck size={32} />}
          title="Security Vulnerability Checks"
        >
          Our AI scans for common security pitfalls to keep your applications
          safe.
        </FeatureCard>

        <FeatureCard icon={<Zap size={32} />} title="Performance Optimization">
          Identify bottlenecks and get recommendations for performance
          enhancements.
        </FeatureCard>

        <FeatureCard icon={<Code size={32} />} title="Multi-Language Support">
          From Python to C++, our Sensei is fluent in a vast array of
          programming languages.
        </FeatureCard>

        <FeatureCard icon={<Server size={32} />} title="No Code Stored">
          Your privacy is paramount. We analyze your code in-memory and never
          store it.
        </FeatureCard>
      </div>
    </div>
  </section>
);

// The main Code Analyzer component

const AnalyzerSection = () => {
  const [code, setCode] = useState("");

  const [language, setLanguage] = useState("python");

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError("Please paste some code to analyze.");

      return;
    }

    setLoading(true);

    setAnalysis("");

    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ code, language }),
});

      if (!response.ok) {
        throw new Error(`The server responded with status: ${response.status}`);
      }

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to connect to the backend. Is the Python server running?"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 px-8 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Meet the Sensei
          </h2>

          <p className="text-lg text-gray-500 mt-4">
            Paste your code, choose the language, and receive your analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Your Code</h3>

            <textarea
              className="w-full p-4 rounded-lg bg-[#0a0a0a] text-gray-300 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 font-mono text-sm"
              rows={16}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`# Paste your ${language} code here...`}
            />

            <div className="flex items-center gap-4 mt-4">
              <select
                className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python</option>

                <option value="javascript">JavaScript</option>

                <option value="java">Java</option>

                <option value="c++">C++</option>

                <option value="c">C</option>

                <option value="go">Go</option>

                <option value="rust">Rust</option>

                <option value="typescript">TypeScript</option>
              </select>

              <button
                onClick={analyzeCode}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 w-full disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Cpu className="animate-spin h-5 w-5" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  "Ask the Sensei"
                )}
              </button>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>

          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 min-h-[500px]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sensei's Analysis
            </h3>

            <div className="prose prose-invert prose-sm md:prose-base max-w-none w-full h-full bg-[#0a0a0a] p-4 rounded-lg border border-gray-700 overflow-y-auto">
              {loading && (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-400">
                    The Sensei is contemplating...
                  </p>
                </div>
              )}

              {!loading && !analysis && (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">
                    Your analysis will appear here.
                  </p>
                </div>
              )}

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section

const HowItWorksSection = () => (
  <section className="py-20 md:py-32 px-8 bg-transparent">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          A Simple Path to Mastery
        </h2>

        <p className="text-lg text-gray-500 mt-4">
          Three easy steps to elevate your code.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-300 text-3xl font-bold mb-4">
            1
          </div>

          <h3 className="text-xl font-semibold text-white">Paste Code</h3>

          <p className="text-gray-400">
            Write or paste your code snippet into the editor.
          </p>
        </div>

        <div className="h-px md:h-auto w-full md:w-px bg-gray-700 flex-grow"></div>

        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-300 text-3xl font-bold mb-4">
            2
          </div>

          <h3 className="text-xl font-semibold text-white">Select Language</h3>

          <p className="text-gray-400">
            Choose the correct programming language.
          </p>
        </div>

        <div className="h-px md:h-auto w-full md:w-px bg-gray-700 flex-grow"></div>

        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-300 text-3xl font-bold mb-4">
            3
          </div>

          <h3 className="text-xl font-semibold text-white">Receive Wisdom</h3>

          <p className="text-gray-400">
            Get instant, expert feedback from the Sensei.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Testimonials Section

const TestimonialCard = ({ quote, name, title }) => (
  <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 h-full flex flex-col">
    <p className="text-gray-300 flex-grow">"{quote}"</p>

    <div className="mt-4">
      <p className="font-bold text-white">{name}</p>

      <p className="text-sm text-indigo-400">{title}</p>
    </div>
  </div>
);

// Footer Section

const Footer = () => (
  <footer className="bg-transparent border-t border-gray-900">
    <div className="max-w-6xl mx-auto py-12 px-8 text-center">
      <p className="text-2xl font-bold text-white">Code Sensei</p>

      <p className="text-gray-500 mt-2">
        Elevating code, one analysis at a time.
      </p>

      <div className="mt-6 text-gray-600">
        &copy; {new Date().getFullYear()} Code Sensei. All rights reserved.
      </div>
    </div>
  </footer>
);

export default AskSensei;
