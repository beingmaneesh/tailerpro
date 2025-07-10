'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scissors, Clock, Shield, Star, CheckCircle, Award, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Professional Uniform Tailoring Solutions
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Streamline your institution's uniform procurement with our comprehensive 
                ordering system. From standard sizes to custom measurements, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/order">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Order Uniforms
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                    Supervisor Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="fade-in">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional tailoring workspace"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-800">Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="fade-in">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="fade-in">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Happy Institutions</div>
            </div>
            <div className="fade-in">
              <div className="flex items-center justify-center mb-2">
                <Scissors className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-sm text-gray-600">Uniforms Tailored</div>
            </div>
            <div className="fade-in">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Why Choose TailorPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end uniform management solutions for schools and organizations with cutting-edge technology and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center card-hover border-0 shadow-lg fade-in">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Multi-User System</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Separate portals for supervisors and customers with role-based access and streamlined workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-hover border-0 shadow-lg fade-in">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Custom Tailoring</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Digital measurements, standard sizes, or in-person appointments - choose what works best for you
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-hover border-0 shadow-lg fade-in">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Turnaround</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Efficient workflow management with real-time order tracking and automated approvals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-hover border-0 shadow-lg fade-in">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Quality Assurance</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Supervisor approval system ensures all orders meet institutional standards and requirements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Simple steps to get your uniforms ordered and delivered with precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center fade-in">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-700 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-xl">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Model</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Choose from pre-approved uniform models published by your supervisor with detailed specifications and color options
              </p>
            </div>

            <div className="text-center fade-in">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-700 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-xl">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Choose Sizing</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pick standard sizes, take guided digital measurements, or book an in-person appointment for perfect fitting
              </p>
            </div>

            <div className="text-center fade-in">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-700 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-xl">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Get Approved</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Your order is reviewed and approved by your supervisor before production begins, ensuring quality and compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Trusted by hundreds of institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg card-hover fade-in">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  "TailorPro has revolutionized our uniform ordering process. The digital measurement system is incredibly accurate and saves us so much time."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Principal, Oakwood High School</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover fade-in">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  "The quality of uniforms is exceptional, and the approval system gives us complete control over what our students wear. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-600">Administrator, St. Mary's Academy</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover fade-in">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  "As a parent, I love how easy it is to order uniforms online. The measurement guide is so helpful, and the fit is always perfect."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Emily Rodriguez"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                    <div className="text-sm text-gray-600">Parent, Lincoln Elementary</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Transform Your Uniform Process?
            </h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Join hundreds of institutions that trust TailorPro for their uniform needs. Experience the difference of professional tailoring with modern technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/order">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <Heart className="h-5 w-5 mr-2" />
                  Start Your Order
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="border-2 border-white    hover:text-indigo-700 font-semibold px-10 py-4 rounded-xl transition-all duration-300">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}