import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Engineering from "./pages/Engineering.tsx";
import CV from "./pages/CV.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CommandPalette } from "@/components/CommandPalette";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CommandPalette />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/cv" element={<CV />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
