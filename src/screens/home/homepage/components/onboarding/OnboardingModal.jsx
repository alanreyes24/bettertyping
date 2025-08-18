import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { ChevronRight } from "lucide-react"

const introSteps = [
  {
    title: "welcome to bettertyping!",
    description1: "learn how to use our platform in a few easy steps",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "choose your test",
    description1: "select from two test types: count or timed.",
    description2:
      "count tests are based on a total number of words, type them all to finish the test.",
    description3: "timed tests run for set a length of time!",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "start typing",
    description1: "when you're ready, click inside the box, and start typing! ",
    description2:
      "your test begins on your first keystroke, the timer will start automatically",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "view your results",
    description1: "after completing the test, see your wpm, accuracy, etc.",
    description2: "see how you rank on our leaderboard!",
    description3: "share your test to show off to your friends!",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "track and save your tests",
    description1:
      "for the best experience, create an account and keep track of your improvement over time!",
    description2: "",
    description3: "have fun! ",
    image: "/placeholder.svg?height=200&width=400",
  },
];

const analysisSteps = [
  {
    title: "analysis guide",
    description1: "a quick guide to understanding our analysis tool",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "the wpm graph",
    description1: "this graph shows your wpm over time",
    description2:
      "the green area is your true wpm, this based on correct/incorrect inputs ",
    description3:
      "the orange area is your raw wpm, a measure of every keystroke",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "statistics",
    description1:
      "this section shows a detailed look at your wpm, accuracy, and mistakes ",
    description2:
      "the badges are an idea of where you are among our other users",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "the heatmap",
    description1: "unique to bettertyping is our heatmap!",
    description2: "this allows your to visualize your fingers on the keyboard",
    description3:
      "find common finger mistakes by following the collections of red",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "track and save your tests",
    description1:
      "for the best experience, create an account and keep track of your improvement over time!",
    description2: "",
    description3: "have fun! ",
    image: "/placeholder.svg?height=200&width=400",
  },
];

function OnboardingModal({ type, onHide, user }) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visited, setVisited] = useState();
  const [firstTime, setFirstTime] = useState();

  // FIRST TIME COOKIE SAVING
  useEffect(() => {
    if (decodeURIComponent(document.cookie).includes("visit")) {
      setVisited(true);
      setFirstTime(false);
      onHide();
    } else {
      document.cookie = "visit";
      console.log("welcome to bettertyping!");
      setOpen(true);
      setFirstTime(true);
    }
  }, []);

  useEffect(() => {
    if (type == "analysis" && firstTime) {
      setFirstTime(false);
      setOpen(true);
    }
    setCurrentStep(0);
  }, [type]);

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      onHide();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        onHide();

        if (type == "analysis") {
          setFirstTime(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-[525px] p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-4">
            {type == "intro"
              ? introSteps[currentStep].title
              : analysisSteps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-md font-medium pb-2">
            {type == "intro"
              ? introSteps[currentStep].description1
              : analysisSteps[currentStep].description1}
          </DialogDescription>
          <DialogDescription className="text-md font-medium pb-2">
            {type == "intro"
              ? introSteps[currentStep].description2
              : analysisSteps[currentStep].description2}
          </DialogDescription>
          <DialogDescription className="text-md font-medium pb-2">
            {type == "intro"
              ? introSteps[currentStep].description3
              : analysisSteps[currentStep].description3}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">
            step {currentStep + 1} of {introSteps.length}
          </div>
          <Button onClick={handleNext} className="px-8">
            {currentStep === introSteps.length - 1 ? "get started" : "next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default OnboardingModal;
