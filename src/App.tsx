import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Products from './components/Products.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import Process from './components/Process.tsx';
import Testimonials from './components/Testimonials.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* Sticky Main Navigation */}
      <Navbar />

      <main className="relative">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Us Section & Stats */}
        <About />

        {/* 3. Products Grid & B2B Estimate Widget */}
        <Products />

        {/* 4. Why Choose JABEEL Feature Matrix */}
        <WhyChooseUs />

        {/* 5. Production Process Spec Timeline */}
        <Process />

        {/* 6. Dynamic Testimonials Feedback Terminal */}
        <Testimonials />

        {/* 7. Contact Info Forms & Uzbekistan Delivery Matrix */}
        <Contact />
      </main>

      {/* Corporate Cohesive Footer */}
      <Footer />
    </div>
  );
}
