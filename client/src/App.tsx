import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "wouter";
import { getRouteMetadata } from "./lib/routeMetadata";

const Home = lazy(() => import("./pages/Home"));
const Member = lazy(() => import("./pages/Member"));
const Learning = lazy(() => import("./pages/Learning"));
const Campus = lazy(() => import("./pages/Campus"));
const FacilityRoom = lazy(() => import("./pages/FacilityRoom"));
const Orientation = lazy(() => import("./pages/Orientation"));
const AchievementArchive = lazy(() => import("./pages/AchievementArchive"));
const ArenaReadiness = lazy(() => import("./pages/ArenaReadiness"));
const CareDirectory = lazy(() => import("./pages/CareDirectory"));

/**
 * Rose Lacquer Learning House — dark editorial stage, restrained rose-gold detail,
 * and adult-learning clarity. Keep the global shell quiet so the learning content leads.
 */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/member"} component={Member} />
        <Route path={"/member/achievements"} component={AchievementArchive} />
        <Route path={"/care"} component={CareDirectory} />
        <Route path={"/campus/esports/readiness"} component={ArenaReadiness} />
        <Route path={"/orientation"} component={Orientation} />
        <Route path={"/learn"} component={Learning} />
        <Route path={"/campus/:facility"} component={FacilityRoom} />
        <Route path={"/campus"} component={Campus} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function RouteLoadingFallback() {
  return <main id="main-content" aria-busy="true" className="min-h-screen bg-[#061018] text-[#eff4f1]"><div className="mx-auto flex min-h-screen max-w-[1500px] items-center px-5 sm:px-8 lg:px-12"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e6c887]">Opening eCampus</p></div></main>;
}

function SkipToMainContent() {
  const [location] = useLocation();
  useEffect(() => {
    const assignMainTarget = () => document.querySelector("main")?.setAttribute("id", "main-content");
    assignMainTarget();
    const observer = new MutationObserver(assignMainTarget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location]);
  return <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] border border-[#e6c887] bg-[#061018] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4] shadow-[0_16px_36px_rgba(0,0,0,.5)] outline-none focus:not-sr-only focus:ring-2 focus:ring-[#e49aa9] focus:ring-offset-2 focus:ring-offset-[#061018]">Skip to main content</a>;
}

function RouteAnnouncement() {
  const [location] = useLocation();
  const { announcement, title } = getRouteMetadata(location);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <p className="sr-only" aria-live="polite" aria-atomic="true">Navigated to {announcement}</p>;
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
          <SkipToMainContent />
          <RouteAnnouncement />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
