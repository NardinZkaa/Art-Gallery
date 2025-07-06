import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Palette, 
  Hammer, 
  Theater as Theatre, 
  ShoppingBag,
  Star,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { artworks } from '../data/artworks';

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Art Collector",
      text: "Philip's work captures the essence of contemporary Egypt while honoring its rich artistic heritage. His paintings have become the centerpiece of our collection.",
      artwork: "Desert Convergence"
    },
    {
      name: "Mohamed Hassan",
      role: "Theater Director",
      text: "Working with Philip on our stage design was transformative. His vision brought our production to life in ways we never imagined possible.",
      artwork: "Pharaoh's Dream"
    },
    {
      name: "Layla Mansour",
      role: "Interior Designer",
      text: "Philip's sculptures add such depth and character to our spaces. His understanding of form and cultural narrative is exceptional.",
      artwork: "Eternal Forms"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Philip Boles
          </h1>
          <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
          <h2 className="font-playfair text-3xl md:text-4xl mb-6 text-gray-100 font-medium">
            Fusion Art
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Painting | Sculpture | Scenography | Costume Design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#commissions" 
              className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <span>Request Commission</span>
              <Palette className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" 
                alt="Philip Boles in his studio" 
                className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gray-900 rounded-lg opacity-10"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-900 rounded-lg opacity-10"></div>
            </div>
            
            <div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                About the Artist
              </h2>
              <div className="w-16 h-1 bg-gray-900 mb-8"></div>
              
              <div className="font-playfair text-lg text-gray-700 mb-8 leading-relaxed space-y-6">
                <p>
                  Philip Boles is a contemporary visual artist whose artistic journey spans over two decades. 
                  With a strong foundation from the Faculty of Fine Arts – Alexandria (1996) and membership 
                  in the Egyptian Plastic Arts Syndicate, Philip expresses deeply rooted cultural themes 
                  through a fusion of fine art disciplines.
                </p>
                <p>
                  His work seamlessly blends classical craftsmanship with a modern edge, resulting in 
                  emotionally resonant and visually powerful pieces that speak to both tradition and 
                  contemporary expression. Each creation tells a story of cultural heritage reimagined 
                  through contemporary vision.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2">Painting</h3>
                  <p className="text-gray-600 text-sm">Acrylic & Mixed Media</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hammer className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2">Sculpture</h3>
                  <p className="text-gray-600 text-sm">Clay, Resin & Stone</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Theatre className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2">Scenography</h3>
                  <p className="text-gray-600 text-sm">Stage Design</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2">Costume</h3>
                  <p className="text-gray-600 text-sm">Theatrical Design</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
                <h4 className="font-playfair text-xl font-semibold text-gray-900 mb-4">
                  Professional Credentials
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                    <span>Graduate, Faculty of Fine Arts - Alexandria (Class of 1996)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                    <span>Member, Egyptian Syndicate of Plastic Arts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3"></div>
                    <span>Over 25 years of professional artistic practice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Featured Works
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A selection of recent works showcasing the breadth of artistic expression
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {artworks.slice(0, 3).map((artwork) => (
              <div key={artwork.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg shadow-lg mb-4">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-playfair text-xl font-semibold text-gray-900">{artwork.title}</h3>
                  <p className="text-gray-600">{artwork.medium} | {artwork.size}</p>
                  <p className="text-gray-500 text-sm">{artwork.year}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Client Testimonials
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed font-playfair text-lg italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm mt-1">Purchased: {testimonial.artwork}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commissions Section */}
      <section id="commissions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Commissions
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Let's Create Something Unique Together
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Philip accepts custom work requests across all his disciplines. Whether you're looking for 
              a personal painting, sculptural piece, or complete stage design, each commission is approached 
              with the same dedication to artistic excellence and cultural authenticity.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="font-playfair text-3xl font-semibold text-gray-900 mb-8">
                Commission Services
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Paintings</h4>
                    <p className="text-gray-700">Personal portraits, landscapes, and abstract works tailored to your vision and space.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Hammer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sculptural Works</h4>
                    <p className="text-gray-700">Indoor and outdoor sculptures designed for residential, commercial, and public spaces.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Theatre className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stage & Costume Design</h4>
                    <p className="text-gray-700">Complete theatrical design services for productions, events, and performances.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-gray-50 rounded-lg">
                <h4 className="font-playfair text-xl font-semibold text-gray-900 mb-6">
                  Commission Process
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Initial Consultation</h5>
                      <p className="text-gray-700 text-sm">We discuss your vision, requirements, and project scope</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Concept Development</h5>
                      <p className="text-gray-700 text-sm">Sketches, proposals, timeline, and pricing provided</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Creation Process</h5>
                      <p className="text-gray-700 text-sm">Regular updates and collaboration throughout development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Completion & Delivery</h5>
                      <p className="text-gray-700 text-sm">Final presentation and professional installation if required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
                Request a Commission
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="project-type"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select project type</option>
                    <option value="painting">Custom Painting</option>
                    <option value="sculpture">Sculpture Commission</option>
                    <option value="stage-design">Stage Design</option>
                    <option value="costume-design">Costume Design</option>
                    <option value="mixed">Mixed Media Project</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-3000">$1,000 - $3,000</option>
                    <option value="3000-5000">$3,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Please describe your vision, requirements, dimensions, timeline, and any specific details..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Images/Links
                  </label>
                  <input
                    type="text"
                    id="reference"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Share any reference images or inspiration links"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Submit Commission Request</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Contact
            </h2>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your artistic vision? Get in touch to explore possibilities for collaboration, 
              commissions, or to learn more about available works.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="font-playfair text-3xl font-semibold text-gray-900 mb-8">
                Get in Touch
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">philip.boles.art@gmail.com</p>
                    <p className="text-gray-500 text-sm mt-1">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Studio Location</p>
                    <p className="text-gray-600">Alexandria, Egypt</p>
                    <p className="text-gray-500 text-sm mt-1">Studio visits by appointment</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">WhatsApp Business</p>
                    <p className="text-gray-600">+20 XXX XXX XXXX</p>
                    <p className="text-gray-500 text-sm mt-1">Quick inquiries and updates</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-playfair text-xl font-semibold text-gray-900 mb-6">
                  Follow My Artistic Journey
                </h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Follow for behind-the-scenes content, new works, and exhibition updates
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
                Send a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl font-semibold text-gray-900 mb-4">
              @philip.boles.art
            </h3>
            <p className="text-gray-600">Latest from Instagram</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artworks.slice(0, 6).map((artwork, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={artwork.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="#" 
              className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}