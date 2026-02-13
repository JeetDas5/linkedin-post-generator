"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  RefreshCcw,
  Linkedin,
  Briefcase,
  Target,
  Edit3,
  Maximize2,
  Check,
  X,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggler() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      )}
    </Button>
  );
}
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneratePost } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn, sanitizeResponse } from "@/lib/utils";
import toast from "react-hot-toast";

const TONES = [
  { id: "professional", label: "Professional", emoji: "👔" },
  { id: "casual", label: "Casual", emoji: "☕" },
  { id: "enthusiastic", label: "Enthusiastic", emoji: "🚀" },
  { id: "witty", label: "Witty", emoji: "💡" },
  { id: "storytelling", label: "Storytelling", emoji: "📖" },
];

const LENGTHS = ["Short", "Medium", "Long"];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("Medium");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for the post.");
      return;
    }
    if (!audience.trim()) {
      toast.error("Please specify the target audience.");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await GeneratePost({
        voice: tone,
        audience,
        topic,
        length: length.toLowerCase(),
      });
      console.log("Post result: ", result);
      if (!result) {
        setGeneratedPost("Failed to generate post. Please try again.");
      } else {
        toast.success("Post generated successfully!");
        setGeneratedPost(sanitizeResponse(result));
      }
    } catch (error: any) {
      let message = "Failed to generate post.";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background selection:bg-indigo-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                TrendMind
              </span>
            </div>
            <ThemeToggler />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Edit3 className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Create Post
              </h2>
            </div>

            <Card className="border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5 ring-1 ring-white/10">
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">What's on your mind?</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g. The importance of consistency in software development..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-25 bg-background/50 resize-none focus:bg-background transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="audience"
                      placeholder="e.g. Junior Developers, Tech Recruiters"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="pl-9 bg-background/50 focus:bg-background transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tone of Voice</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        className={cn(
                          "flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]",
                          tone === t.id
                            ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400 ring-1 ring-indigo-500/20"
                            : "bg-background/30 border-white/5 hover:bg-background/50 hover:border-white/10 text-muted-foreground"
                        )}
                      >
                        <span>{t.emoji}</span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Length</Label>
                  <div className="flex bg-background/30 p-1 rounded-lg border border-white/5">
                    {LENGTHS.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={cn(
                          "flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                          length === l
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-white/2 border-t border-white/5 p-6">
                <Button
                  onClick={handleGenerate}
                  disabled={!topic || isGenerating}
                  size="lg"
                  className="w-full relative overflow-hidden group"
                  variant="premium"
                >
                  <span
                    className={cn(
                      "flex items-center gap-2 transition-all",
                      isGenerating ? "opacity-0" : "opacity-100"
                    )}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Content
                  </span>

                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2 mb-2 lg:justify-between">
              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-blue-500" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Preview
                </h2>
              </div>
              <div className="hidden lg:flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground"
                  onClick={() => setIsFullScreen((prev) => !prev)}
                >
                  <Maximize2 className="w-3.5 h-3.5" />{" "}
                  {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                </Button>
              </div>
            </div>

            <Card
              className={cn(
                "border-white/5 bg-card/50 backdrop-blur-sm shadow-2xl transition-all duration-500",
                generatedPost
                  ? "ring-1 ring-indigo-500/20 shadow-indigo-500/5"
                  : "border-dashed opacity-80",
                isFullScreen &&
                  "fixed inset-0 z-100 bg-background/95 p-8 flex flex-col justify-center items-center max-w-none w-screen h-screen"
              )}
            >
              {isFullScreen && (
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="absolute top-6 right-6 z-101 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close Full Screen"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
              <CardContent className="p-0">
                <div className="p-4 sm:p-6 border-b border-white/5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center ring-2 ring-background">
                    <span className="text-lg font-bold text-white">JD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">
                      Jeet Das
                      <ShieldCheck className="w-4 h-4 inline-block ml-1" />{" "}
                      <span className="text-xs text-muted-foreground mx-1">
                        {"•"}
                      </span>
                      <span className="text-xs text-muted-foreground">1st</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      Software Developer at TrendMind
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      2h {"•"} <Globe className="w-3.5 h-3.5 inline-block" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 min-h-75 text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-foreground/90">
                  <AnimatePresence mode="wait">
                    {generatedPost ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="animate-in fade-in slide-in-from-bottom-2"
                      >
                        {generatedPost}
                      </motion.div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 space-y-4 min-h-62.5">
                        <Briefcase className="w-12 h-12 opacity-20" />
                        <p className="text-center max-w-50">
                          Your professional post will appear here ready to
                          publish.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-4 py-3 border-t border-white/5 flex justify-between items-center bg-white/2">
                  <div className="flex gap-4 text-muted-foreground text-xs font-medium">
                    <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                      👍 Like
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                      💬 Comment
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                      🔁 Repost
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => handleGenerate()}
                disabled={!generatedPost || isGenerating}
                className="gap-2"
              >
                <RefreshCcw
                  className={cn("w-4 h-4", isGenerating && "animate-spin")}
                />
                Regenerate
              </Button>
              <Button
                onClick={copyToClipboard}
                disabled={!generatedPost}
                className={cn(
                  "gap-2 min-w-25 transition-all",
                  copied ? "bg-green-600 hover:bg-green-700 text-white" : ""
                )}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy Text"}
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
