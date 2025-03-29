import { useRef } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  Phone,
  MapPin 
} from 'lucide-react';
import { useInView } from '../lib/hooks';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 bg-muted/30"
    >
      <div className="container px-4 mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Get In <span className="text-primary">Touch</span>
        </h2>
        
        <p className={`text-center text-muted-foreground max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Whether you're interested in my web development services, need voiceover work, or just want to connect, I'd love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <ContactCard 
            icon={<Mail className="h-10 w-10 text-primary" />}
            title="Email"
            description="Drop me a message"
            link="mailto:contact@laoluawogbade.com"
            linkText="contact@laoluawogbade.com"
            isVisible={isInView}
            delay={0}
          />
          
          <ContactCard 
            icon={<Phone className="h-10 w-10 text-primary" />}
            title="Phone"
            description="Let's talk directly"
            link="tel:+1234567890"
            linkText="+1 (234) 567-890"
            isVisible={isInView}
            delay={150}
          />
          
          <ContactCard 
            icon={<MapPin className="h-10 w-10 text-primary" />}
            title="Location"
            description="Based in"
            link="https://maps.google.com"
            linkText="New York, NY"
            isVisible={isInView}
            delay={300}
          />
          
          <ContactCard 
            icon={<Github className="h-10 w-10 text-primary" />}
            title="GitHub"
            description="Check out my code"
            link="https://github.com/laoluawogbade"
            linkText="github.com/laoluawogbade"
            isVisible={isInView}
            delay={450}
          />
        </div>
        
        <div className={`flex justify-center mt-12 gap-6 transition-all duration-700 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a 
            href="https://twitter.com/laoluawogbade"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          
          <a 
            href="https://linkedin.com/in/laoluawogbade"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          
          <a 
            href="https://github.com/laoluawogbade"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  isVisible: boolean;
  delay: number;
}

function ContactCard({ icon, title, description, link, linkText, isVisible, delay }: ContactCardProps) {
  return (
    <Card 
      className={`transition-all duration-700 border-border ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline truncate block"
        >
          {linkText}
        </a>
      </CardContent>
    </Card>
  );
}
