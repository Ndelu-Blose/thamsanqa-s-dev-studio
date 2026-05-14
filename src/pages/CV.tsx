import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CV = () => {
  return (
    <main className="min-h-screen bg-background py-6 sm:py-10 pb-24 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-5 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Curriculum Vitae</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Thamsanqa Ndelu Resume</h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Preview below or download. This PDF includes the <strong className="text-foreground/90 font-medium">completion letter</strong>{" "}
              together with the resume.
            </p>
          </div>

          <div className="hidden sm:flex flex-col sm:flex-row gap-3">
            <Button variant="heroOutline" asChild>
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </a>
            </Button>
            <Button variant="heroOutline" asChild>
              <a href="/cv.pdf" target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </a>
            </Button>
            <Button variant="hero" asChild>
              <a href="/cv.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
          <object
            data="/cv.pdf#view=FitH&toolbar=1&navpanes=0"
            type="application/pdf"
            className="w-full h-[75vh] min-h-[420px] sm:min-h-[560px]"
            aria-label="Thamsanqa Ndelu CV preview"
          >
            <div className="h-full min-h-[420px] sm:min-h-[560px] flex items-center justify-center p-6">
              <div className="max-w-md text-center space-y-4">
                <p className="text-sm text-secondary-foreground/85">
                  PDF preview is not available in this browser.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="heroOutline" asChild>
                    <a href="/cv.pdf" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open CV
                    </a>
                  </Button>
                  <Button variant="hero" asChild>
                    <a href="/cv.pdf" download>
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </object>
        </div>

        <p className="text-sm text-secondary-foreground/80 mt-4">
          If the preview does not load in your browser, use the Download CV button above.
        </p>
      </div>

      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-background/95 backdrop-blur-xl p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="container mx-auto px-1 flex gap-2">
          <Button variant="heroOutline" className="flex-1" asChild>
            <a href="/cv.pdf" target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </a>
          </Button>
          <Button variant="hero" className="flex-1" asChild>
            <a href="/cv.pdf" download>
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CV;
