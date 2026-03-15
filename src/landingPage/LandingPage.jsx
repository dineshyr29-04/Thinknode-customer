import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Zap,
  Palette,
  Code,
  BarChart3,
  Smartphone,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navVariants = {
  rest: { scale: 1, backgroundColor: "rgba(143, 0, 255, 0)" },
  hover: { 
    scale: 1.05, 
    backgroundColor: "rgba(143, 0, 255, 0.1)", // Light Violet tint
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
      },
    }),
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const navHover = {
    rest: { opacity: 0, scaleX: 0 },
    hover: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  // Services data
  const services = [
    {
      id: 1,
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Frontend Applications',
      description: 'Responsive and interactive user interfaces',
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 3,
      icon: Palette,
      title: 'E-Poster Design',
      description: 'Creative visual designs and graphics for digital marketing',
      color: 'from-pink-400 to-pink-600',
    },
    {
      id: 4,
      icon: Zap,
      title: 'n8n Automation',
      description: 'Workflow automation and integration solutions',
      color: 'from-amber-400 to-amber-600',
    },
    {
      id: 5,
      icon: BarChart3,
      title: 'Video Editing',
      description: 'Professional video production and editing services',
      color: 'from-emerald-400 to-emerald-600',
    },
  ];

  // Steps data
  const steps = [
    {
      number: '01',
      title: 'Submit Your Project',
      description: 'Tell us about your project idea and requirements',
    },
    {
      number: '02',
      title: 'We Build Your Solution',
      description: 'Our expert team designs and develops your project',
    },
    {
      number: '03',
      title: 'Receive & Launch',
      description: 'Get your completed project and go live',
    },
  ];

  // Portfolio projects
  const portfolioProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab684c3c7?w=500&h=500&fit=crop',
    },
    {
      id: 2,
      title: 'Mobile App Design',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1512941691920-25bda097440d?w=500&h=500&fit=crop',
    },
    {
      id: 3,
      title: 'Marketing Campaign',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'Automation Workflow',
      category: 'Automation',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
    },
    {
      id: 5,
      title: 'Product Video',
      category: 'Video',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop',
    },
    {
      id: 6,
      title: 'Dashboard UI',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    },
  ];

  // Features data
  const features = [
    { icon: Zap, title: 'Fast Delivery', description: 'Quick turnaround times without compromising quality' },
    { icon: Check, title: 'Professional Quality', description: 'Excellence in every project we deliver' },
    { icon: Palette, title: 'Custom Solutions', description: 'Tailored to your unique business needs' },
    { icon: BarChart3, title: 'Affordable Pricing', description: 'Great value for premium services' },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Tech Startup',
      text: 'ThinkNode transformed our vision into reality. Absolutely phenomenal work!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      text: 'Professional, creative, and delivered on time. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Marketing Director',
      text: 'The design work was stunning. Our conversion rates increased significantly.',
      rating: 5,
    },
  ];

  return (
    <div className="parallax-surface bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: scrolled ? 'rgba(25, 24, 24, 0.19)' : 'rgba(255, 255, 255, 0)',
          boxShadow: scrolled ? '0 12px 30px rgba(15, 23, 42, 0.15)' : '0 0 0 rgba(0, 0, 0, 0)',
          borderColor: scrolled ? 'rgba(226, 232, 240, 0.31)' : 'rgba(255, 255, 255, 0.15)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src="/logo.jpeg" alt="ThinkNode" className="h-10 w-10 rounded-lg" />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                  : 'text-white drop-shadow-lg'
              }`}>
                THINKNODE
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'How It Works', 'Portfolio', 'Features'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.replace(/\s/g, '').toLowerCase()}`}
                  initial="rest"
                  animate="rest"
                  whileHover={{
                    y:-3,
                    color:"#1211134d",
                    textShadow: '0 0 8px 10px rgba(143, 0, 255, 0.3)',
                  }}
                  whileFocus="hover"
                  className={`relative px-3 py-2 rounded-full transition-colors duration-300 font-medium ${
                    scrolled
                      ? 'text-[#333333] hover:text-blue-600'
                      : 'text-white/90 hover:text-white hover:bounce'
                  }`}
                >
                  <motion.span
                    variants={navHover}
                    className={`absolute inset-0 rounded-full ${
                      scrolled
                        ? 'bg-blue-500/10'
                        : 'bg-white/15'
                    }`}
                  />
                  <span className="relative z-10">{item}</span>
                  <motion.span
                    variants={navHover}
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full ${
                      scrolled
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-white/80'
                    }`}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className={`hidden md:block px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
              }`}
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden transition-colors duration-300 ${
                scrolled ? 'text-slate-700' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden border-t transition-colors duration-300 ${
                  scrolled 
                    ? 'bg-white border-slate-200' 
                    : 'bg-white/10 backdrop-blur-md border-white/20'
                }`}
              >
                <div className="px-4 py-4 space-y-4">
                  {['Services', 'How It Works', 'Portfolio', 'Features'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.replace(/\s/g, '').toLowerCase()}`}
                      className={`block font-medium transition-colors duration-300 ${
                        scrolled
                          ? 'text-slate-700 hover:text-blue-600'
                          : 'text-white/90 hover:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle overlay for glassmorphism text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/20 via-black/10 to-black/20" />

        {/* Hero Content (glassmorphism) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12 shadow-xl">
            {/* Logo */}
            <motion.div variants={scaleIn} className="mb-6">
              <img src="/logo.jpeg" alt="ThinkNode" className="h-20 w-20 mx-auto rounded-2xl shadow-lg" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white leading-tight"
            >
              Build, Design, and{' '}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Automate</span>
              {' '}Your Digital Projects
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Professional freelance services for web development, design, and automation. Turn your ideas into reality with our expert team.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 18px 40px rgba(0,0,0,0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-white/12 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold text-lg hover:bg-white/16 transition-all"
              >
                Enter the Platform
                <ArrowRight className="inline ml-2 -mt-0.5" size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white/6 backdrop-blur-sm border border-white/20 text-white/90 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                View Services
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-12">
            <ChevronDown size={32} className="mx-auto text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={fadeInUp}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
                  <div className="relative bg-white rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} mb-6 text-white`}>
                      <Icon size={32} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>

                    {/* Description */}
                    <p className="text-slate-600 mb-6">{service.description}</p>

                    {/* Learn More */}
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: hoveredService === service.id ? 5 : 0 }}
                      className="flex items-center text-blue-600 font-semibold"
                    >
                      Learn more
                      <ArrowRight size={16} className="ml-2" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howitworks" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Simple, streamlined process for your project success
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="flex items-center justify-center mb-8 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Our Portfolio</h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Showcase of our latest projects and successful deliverables
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-slate-200">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-8"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-blue-200">{project.category}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* See All Projects Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-all"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Key features that set us apart from the competition
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6">
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Client Testimonials</h2>
            <p className="text-lg sm:text-xl text-slate-600">
              What our happy clients are saying about us
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                {/* Author */}
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50" />
        </motion.div>

        <div className="mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed"
          >
            Let's transform your ideas into reality. Get in touch with us today
            and discover what's possible.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Start Your Project
            <ArrowRight className="inline ml-2 -mt-1" size={20} />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.jpeg" alt="ThinkNode" className="h-8 w-8 rounded" />
                <span className="text-xl font-bold">THINKNODE</span>
              </div>
              <p className="text-slate-400">
                Your partner in digital transformation and innovation.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                {services.map((service) => (
                  <li key={service.id}>
                    <a href="#" className="hover:text-white transition-colors">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 THINKNODE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
