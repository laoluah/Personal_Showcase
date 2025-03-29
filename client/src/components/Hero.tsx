import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background">
      <div 
        className={`container px-4 py-24 mx-auto flex flex-col items-center justify-center text-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="block">Hi, I'm</span>
          <span className="block text-primary mt-2">Laolu Awogbade</span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground">
          From law and acting to web development, with a passion for creating captivating voices.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button size="lg" onClick={scrollToWaitlist}>
            Join My Waitlist
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore My Work
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={() => document.getElementById('background')?.scrollIntoView({ behavior: 'smooth' })}>
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
