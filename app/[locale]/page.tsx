import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <footer className="glass-effect border-t border-white/10 py-12 text-center backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ERP Solutions
            </div>
            <p className="text-foreground/60">
              &copy; {new Date().getFullYear()} ERP Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#home" className="text-foreground/60 hover:text-primary transition-colors">Privacy</a>
              <a href="#home" className="text-foreground/60 hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
