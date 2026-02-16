import React, { useState, useEffect } from "react";
import { 
  CheckCircle as CheckCircleIcon, 
  XCircle as XCircleIcon, 
  ArrowRight as ArrowRightIcon, 
  RotateCcw as RotateCcwIcon,
  Trophy as TrophyIcon,
  Timer as TimerIcon,
  HelpCircle as HelpCircleIcon,
  ChevronLeft as ChevronLeftIcon
} from "lucide-react";
import { Button, Card, Badge, cn } from "../lms-ui";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  quizTitle: string;
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export const QuizPlayer = ({ quizTitle, questions, onComplete, onExit }: QuizProps) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question

  const currentQuestion = questions[currentQuestionIdx];

  useEffect(() => {
    if (showResult || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult, timeLeft]);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setShowResult(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    return <QuizResult 
      score={score} 
      total={questions.length} 
      onRetry={() => {
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
        setTimeLeft(questions.length * 60);
      }}
      onExit={() => onComplete(score, questions.length)}
    />;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeftIcon size={20} />
          <span>Exit Quiz</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold border border-indigo-100">
            <TimerIcon size={18} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">Question {currentQuestionIdx + 1} of {questions.length}</p>
            <h2 className="text-2xl font-bold text-slate-900">{quizTitle}</h2>
          </div>
          <p className="text-sm font-medium text-slate-500">Progress: {Math.round(((currentQuestionIdx) / questions.length) * 100)}%</p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600" 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 shadow-xl border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswer === idx;
                const isWrong = isSelected && !isCorrect;

                let stateClasses = "border-slate-100 hover:border-indigo-200 hover:bg-slate-50";
                if (isAnswered) {
                  if (isCorrect) stateClasses = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                  else if (isWrong) stateClasses = "border-red-500 bg-red-50 ring-1 ring-red-500";
                  else stateClasses = "opacity-50 border-slate-100";
                } else if (isSelected) {
                  stateClasses = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                      stateClasses
                    )}
                  >
                    <span className={cn(
                      "font-medium",
                      isAnswered && isCorrect ? "text-emerald-700" : 
                      isAnswered && isWrong ? "text-red-700" : 
                      isSelected ? "text-indigo-700" : "text-slate-700"
                    )}>
                      {option}
                    </span>
                    <div className="flex items-center gap-2">
                       {isAnswered && isCorrect && <CheckCircleIcon className="text-emerald-500" size={20} />}
                       {isAnswered && isWrong && <XCircleIcon className="text-red-500" size={20} />}
                       {!isAnswered && (
                         <div className={cn(
                           "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                           isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-200"
                         )}>
                           {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                         </div>
                       )}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-8 p-6 rounded-2xl border flex gap-4",
                  selectedOption === currentQuestion.correctAnswer ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  selectedOption === currentQuestion.correctAnswer ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                )}>
                  <HelpCircleIcon size={20} />
                </div>
                <div>
                  <h4 className={cn(
                    "font-bold mb-1",
                    selectedOption === currentQuestion.correctAnswer ? "text-emerald-900" : "text-amber-900"
                  )}>
                    {selectedOption === currentQuestion.correctAnswer ? "Correct!" : "Nice try!"}
                  </h4>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    selectedOption === currentQuestion.correctAnswer ? "text-emerald-700" : "text-amber-700"
                  )}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="mt-10 flex justify-end">
              {!isAnswered ? (
                <Button 
                  onClick={handleCheckAnswer} 
                  disabled={selectedOption === null}
                  className="px-8 py-6 text-lg rounded-2xl shadow-lg shadow-indigo-200"
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="px-8 py-6 text-lg rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  {currentQuestionIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  <ArrowRightIcon size={20} />
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const QuizResult = ({ score, total, onRetry, onExit }: { score: number, total: number, onRetry: () => void, onExit: () => void }) => {
  const percentage = Math.round((score / total) * 100);
  
  let title = "Keep learning!";
  let subtitle = "Practice makes perfect. Review the materials and try again.";
  let colorClass = "text-amber-600 bg-amber-50";
  let iconColor = "bg-amber-500";

  if (percentage >= 90) {
    title = "Excellent!";
    subtitle = "You've mastered this topic! Great job, expert.";
    colorClass = "text-emerald-600 bg-emerald-50";
    iconColor = "bg-emerald-500";
  } else if (percentage >= 70) {
    title = "Well done!";
    subtitle = "Great effort! You have a solid understanding of the basics.";
    colorClass = "text-indigo-600 bg-indigo-50";
    iconColor = "bg-indigo-600";
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl", iconColor)}>
          <TrophyIcon size={48} className="text-white" />
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-3">{title}</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">{subtitle}</p>

        <Card className="p-8 mb-10 bg-white shadow-2xl border-slate-100 flex flex-col md:flex-row items-center justify-around gap-8">
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Your Score</p>
            <p className="text-5xl font-black text-slate-900">{percentage}%</p>
          </div>
          <div className="h-12 w-px bg-slate-100 hidden md:block"></div>
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Correct</p>
              <p className="text-2xl font-bold text-emerald-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total</p>
              <p className="text-2xl font-bold text-slate-900">{total}</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="w-full sm:w-auto px-8 py-6 rounded-2xl flex items-center gap-2"
          >
            <RotateCcwIcon size={18} />
            Try Again
          </Button>
          <Button 
            onClick={onExit}
            className="w-full sm:w-auto px-10 py-6 rounded-2xl shadow-lg shadow-indigo-200"
          >
            Back to Course
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
