import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Member from "./pages/Member";
import Learning from "./pages/Learning";
import Campus from "./pages/Campus";
import FacilityRoom from "./pages/FacilityRoom";
import Orientation from "./pages/Orientation";
import AchievementArchive from "./pages/AchievementArchive";

/**
 * Rose Lacquer Learning House — dark editorial stage, restrained rose-gold detail,
 * and adult-learning clarity. Keep the global shell quiet so the learning content leads.
 */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/member"} component={Member} />
      <Route path={"/member/achievements"} component={AchievementArchive} />
      <Route path={"/orientation"} component={Orientation} />
      <Route path={"/learn"} component={Learning} />
      <Route path={"/campus/:facility"} component={FacilityRoom} />
      <Route path={"/campus"} component={Campus} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
