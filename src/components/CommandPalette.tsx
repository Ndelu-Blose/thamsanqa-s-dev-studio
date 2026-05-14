import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  Boxes,
  FileDown,
  FolderKanban,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  Timer,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from "@/content/site-links";

function isTypingContext(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.closest("[role=\"textbox\"]")) return true;
  return false;
}

function scrollToId(id: string) {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const goToSection = useCallback(
    (id: string) => {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: id });
        window.setTimeout(() => scrollToId(id), 120);
      } else {
        window.history.replaceState(null, "", `#${id}`);
        scrollToId(id);
      }
    },
    [location.pathname, navigate],
  );

  const goCv = useCallback(() => {
    setOpen(false);
    navigate("/cv");
  }, [navigate]);

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const goEngineeringHash = useCallback(
    (id: string) => {
      setOpen(false);
      navigate(`/engineering#${id}`);
      window.setTimeout(() => scrollToId(id), 120);
    },
    [navigate],
  );

  const goEngineeringHome = useCallback(() => {
    setOpen(false);
    navigate("/engineering");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80);
  }, [navigate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.key.toLowerCase() !== "k") return;
      if (!openRef.current && isTypingContext(e.target)) return;
      e.preventDefault();
      setOpen((v) => !v);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Quick navigation</DialogTitle>
      <CommandInput placeholder="Jump to a section or open a link…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => goToSection("home")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => goToSection("projects")}>
            <FolderKanban className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => goToSection("architecture")}>
            <Boxes className="mr-2 h-4 w-4" />
            Architecture
          </CommandItem>
          <CommandItem onSelect={goEngineeringHome}>
            <Layers className="mr-2 h-4 w-4" />
            Engineering page
          </CommandItem>
          <CommandItem onSelect={() => goEngineeringHash("activity")}>
            <Activity className="mr-2 h-4 w-4" />
            Activity
          </CommandItem>
          <CommandItem onSelect={() => goEngineeringHash("skills")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Skills
          </CommandItem>
          <CommandItem onSelect={() => goToSection("contact")}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </CommandItem>
          <CommandItem onSelect={() => goEngineeringHash("now")}>
            <Timer className="mr-2 h-4 w-4" />
            Now
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => openExternal(SITE_GITHUB_URL)}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal(SITE_LINKEDIN_URL)}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={goCv}>
            <FileDown className="mr-2 h-4 w-4" />
            CV
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
