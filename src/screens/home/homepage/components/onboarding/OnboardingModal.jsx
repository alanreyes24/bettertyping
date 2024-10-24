
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
// import { ChevronRight } from "lucide-react"

const introSteps = [
    {
        title: "Welcome to bettertyping!",
        description1: "Learn how to use our platform in a few easy steps.",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "Choose Your Test",
        description1: "Select from two test types: Count or Timed.",
        description2: "Count tests are based on a total number of words, type them all to finish the test.",
        description3: "Timed tests run for set a length of time!",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "Start Typing",
        description1: "When you're ready, click inside the box, and start typing! ",
        description2: "Your test begins on your first keystroke, the timer will start automatically",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "View Your Results",
        description1: "After completing the test, see your WPM, Accuracy, etc.",
        description2: "See how you rank on our Leaderboard!",
        description3: "Share your test to show off to your friends!",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "Track and Save Your Tests",
        description1: "For the best experience, create an account and keep track of your improvement over time!",
        description2: "",
        description3: "Have fun! ",
        image: "/placeholder.svg?height=200&width=400",
    },
]

const analysisSteps = [
    {
        title: "Analysis Guide",
        description1: "A quick guide to understanding our analysis tool",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "The WPM Graph",
        description1: "This graph shows your WPM over time",
        description2: "The green area is your TrueWPM, this based on correct/incorrect inputs ",
        description3: "The orange area is your RawWPM, a measure of every keystroke",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "Statistics",
        description1: "This section shows a detailed look at your WPM, Accuracy, and Mistakes ",
        description2: "The badges are an idea of where you are among our other users",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "The Heatmap",
        description1: "Unique to bettertyping is our heatmap!",
        description2: "This allows your to visualize your fingers on the keyboard",
        description3: "Find common finger mistakes by following the collections of red",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "Track and Save Your Tests",
        description1: "For the best experience, create an account and keep track of your improvement over time!",
        description2: "",
        description3: "Have fun! ",
        image: "/placeholder.svg?height=200&width=400",
    },
]

function OnboardingModal({ type, onHide, user, }) {
    const [open, setOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [visited, setVisited] = useState()

    // FIRST TIME COOKIE SAVING
    useEffect(() => {

        if (decodeURIComponent(document.cookie).includes("visit")) {
            setVisited(true)
            onHide()

        } else {
            document.cookie = "visit";
            console.log("Welcome to bettertyping!")
            setOpen(true)
        }


    }, [])


    useEffect(() => {
        // setOpen(true)
        setCurrentStep(0)

    }, [type])


    const handleNext = () => {
        if (currentStep < introSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            setOpen(false)
            onHide()
        }
    }

    return (
        <Dialog open={open} onOpenChange={(e) => {
            setOpen(e)
            onHide()
        }}>
            <DialogContent className="sm:max-w-[525px] p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-4">{type == "intro" ? introSteps[currentStep].title : analysisSteps[currentStep].title}</DialogTitle>
                    <DialogDescription className="text-md font-medium pb-2" >{type == "intro" ? introSteps[currentStep].description1 : analysisSteps[currentStep].description1}</DialogDescription>
                    <DialogDescription className="text-md font-medium pb-2" >{type == "intro" ? introSteps[currentStep].description2 : analysisSteps[currentStep].description2}</DialogDescription>
                    <DialogDescription className="text-md font-medium pb-2" >{type == "intro" ? introSteps[currentStep].description3 : analysisSteps[currentStep].description3}</DialogDescription>
                </DialogHeader>



                <DialogFooter className="flex justify-between items-center">
                    <div className="text-md text-muted-foreground">
                        Step {currentStep + 1} of {introSteps.length}
                    </div>
                    <Button onClick={handleNext} className="px-8">
                        {currentStep === introSteps.length - 1 ? "Get Started" : "Next"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OnboardingModal