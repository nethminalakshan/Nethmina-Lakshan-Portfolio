import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/nethminalakshan',   icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nethmina-lakshan-692a52247/',  icon: '◈' },
  { label: 'Email',    href: 'mailto:nethminalakshan2018@gmail.com', icon: '✉' },
];

function Field({ label, id, type = 'text', rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 font-body text-sm font-medium transition-all duration-200 pointer-events-none ${
          focused ? '-top-5 text-xs text-accent' : 'top-3 text-white/35'
        }`}
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        rows={rows}
        required
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.target.value && setFocused(false)}
        className="w-full bg-transparent border-b-2 border-white/10 focus:border-accent outline-none text-white font-body py-3 text-sm resize-none transition-colors duration-200 placeholder-transparent"
        placeholder={label}
      />
      {/* Animated underline fill */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-cyan origin-left"
      />
    </div>
  );
}

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    
    // Web3Forms Access Key
    formData.append("access_key", "ae2e922a-9fa7-4135-9264-69a470c3da2f");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();
      
      if (data.success) {
        setSent(true);
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-surface overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[500px] h-64 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-accent font-display font-bold text-sm tracking-widest uppercase">04</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-accent/40 to-transparent" />
            <span className="text-white/30 text-sm font-body">Contact</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Let's <span className="text-gradient">work together</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 font-body mt-3 max-w-lg">
            Have a project in mind or just want to say hi? My inbox is always open.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="space-y-8"
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl glass border border-accent/20 flex items-center justify-center text-accent text-lg group-hover:border-accent/50 group-hover:glow-sm transition-all duration-300">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-white/35 font-body mb-0.5 uppercase tracking-wider">{s.label}</p>
                  <p className="text-white font-semibold font-body group-hover:text-accent transition-colors duration-200">
                    {s.href.replace('mailto:', '')}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                className="glass rounded-2xl p-10 text-center"
              >
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Message sent!</h3>
                <p className="text-white/50 font-body text-sm">I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <Field label="Name"  id="name"  />
                  <Field label="Email" id="email" type="email" />
                </div>
                <Field label="Subject" id="subject" />
                <Field label="Message" id="message" rows={4} />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-accent text-white font-semibold rounded-xl font-body glow-sm hover:glow-accent transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{loading ? 'Sending...' : 'Send Message →'}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
