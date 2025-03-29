import Hero from "@/components/Hero";
import Background from "@/components/Background";
import Skills from "@/components/Skills";
import VoiceoverPortfolio from "@/components/VoiceoverPortfolio";
import Contact from "@/components/Contact";
import Waitlist from "@/components/Waitlist";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollArea className="flex-1">
        <main className="flex-1">
          <Hero />
          <Background />
          <Skills />
          <VoiceoverPortfolio />
          <Waitlist />
          <Contact />
        </main>
        <footer className="py-6 border-t border-border bg-muted/50">
          <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Laolu Awogbade. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with HTML, CSS, and Vanilla JS
              <a 
                href="https://github.com/laoluawogbade/personal-showcase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 underline hover:text-primary"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </footer>
      </ScrollArea>
    </div>
  );
}
