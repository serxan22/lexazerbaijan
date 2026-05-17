"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function LexJournalHomepage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${percent}%`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".lex-reveal, .lex-reveal-left, .lex-reveal-right").forEach((el) => observer.observe(el));

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    const slider = trackRef.current;
    if (!slider) return () => observer.disconnect();

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const down = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("is-dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const leave = () => {
      isDown = false;
      slider.classList.remove("is-dragging");
    };
    const move = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 1.3;
    };

    slider.addEventListener("mousedown", down);
    slider.addEventListener("mouseleave", leave);
    slider.addEventListener("mouseup", leave);
    slider.addEventListener("mousemove", move);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      slider.removeEventListener("mousedown", down);
      slider.removeEventListener("mouseleave", leave);
      slider.removeEventListener("mouseup", leave);
      slider.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <main className="lex-home">
      <div className="lex-progress"><div ref={progressRef} /></div>

      <nav className="lex-nav">
        <div className="lex-nav-inner">
          <Link className="lex-logo" href="/">Lex<span>Azerbaijan</span></Link>
          <div className="lex-nav-links">
            <Link href="/articles">Articles</Link>
            <Link href="/discussions">Discussions</Link>
            <Link href="/cases">Cases</Link>
            <Link href="/lexai">LexAI</Link>
            <Link href="/about">About</Link>
          </div>
          <Link className="lex-nav-cta" href="/articles/new">Submit Article</Link>
        </div>
      </nav>

      <section className="lex-hero">
        <div className="lex-container lex-hero-content">
          <p className="lex-eyebrow hero-load delay-1">Azerbaijan Legal Journal</p>
          <h1 className="hero-load delay-2">A premium space for <em>legal thought.</em></h1>
          <p className="lex-hero-lead hero-load delay-3">
            LexAzerbaijan connects legal articles, case analysis, discussions and LexAI into one refined research platform.
          </p>
          <div className="lex-actions hero-load delay-4">
            <Link className="lex-btn lex-btn-gold" href="/articles">Read Articles</Link>
            <Link className="lex-btn lex-btn-ghost" href="/lexai">Start with LexAI</Link>
          </div>
          <div className="lex-stats hero-load delay-5">
            <div><strong>120+</strong><span>Legal writings</span></div>
            <div><strong>3</strong><span>Languages</span></div>
            <div><strong>40+</strong><span>Case notes</span></div>
            <div><strong>AI</strong><span>Research assistant</span></div>
          </div>
        </div>
        <div className="lex-scroll-hint" />
      </section>

      <section className="lex-featured">
        <div className="lex-container lex-featured-grid">
          <div>
            <p className="lex-eyebrow lex-reveal">Featured Article</p>
            <span className="lex-tag lex-reveal delay-r1">AI Law</span>
            <h2 className="lex-reveal delay-r2">Artificial intelligence and the future of criminal liability</h2>
            <p className="lex-reveal delay-r3">
              A structured analysis of responsibility, intent, control and human decision-making in the age of autonomous systems.
            </p>
            <div className="lex-author lex-reveal delay-r3">
              <div>L</div>
              <section><strong>LexAzerbaijan Editorial</strong><small>6 min read · May 2026</small></section>
            </div>
            <Link className="lex-btn lex-btn-gold lex-reveal delay-r3" href="/articles">Open article</Link>
          </div>
          <article className="lex-feature-card lex-reveal-right">
            <h3>Law is not only text. It is reasoning, structure and public memory.</h3>
            <p>LexAzerbaijan makes legal knowledge visible, searchable and open to serious discussion.</p>
          </article>
        </div>
      </section>

      <section className="lex-frames">
        <div className="lex-container">
          <p className="lex-eyebrow lex-reveal">Scrolling Frames</p>
          <h2 className="lex-section-title lex-reveal delay-r1">A frame-by-frame journey through legal ideas.</h2>
          <p className="lex-section-subtitle lex-reveal delay-r2">
            Explore corporate law, EU law, case reasoning, private international law and AI-assisted research.
          </p>
          <div ref={trackRef} className="lex-frame-track lex-reveal delay-r3">
            {[
              ["01", "Corporate Law", "Fiduciary duties in corporate governance", "Directors’ duties, shareholder interests and modern accountability."],
              ["02", "EU Law", "Enforcement actions against Member States", "The role of the Commission and the Court under Articles 258–260 TFEU."],
              ["03", "Cases", "How to read a judgment properly", "Facts, ratio decidendi, obiter dicta and legal tests."],
              ["04", "Private International Law", "Applicable law in cross-border contracts", "Party autonomy, objective connection and public policy reservation."],
              ["05", "LexAI", "How AI can support legal research", "Summaries, issue spotting and clearer explanations."]
            ].map(([num, cat, title, text]) => (
              <article className="lex-frame-card" key={num}>
                <span>{num}</span>
                <small>{cat}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>5 min read</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lex-ai">
        <div className="lex-container lex-ai-grid">
          <div className="lex-reveal-left">
            <p className="lex-eyebrow">LexAI</p>
            <h2 className="lex-section-title">Start legal research with clarity.</h2>
            <p className="lex-section-subtitle">
              LexAI structures complex legal issues, summarizes cases and gives you a clear starting point for research.
            </p>
            <div className="lex-actions"><Link className="lex-btn lex-btn-gold" href="/lexai">Open LexAI</Link></div>
          </div>
          <div className="lex-chat lex-reveal-right">
            <div className="lex-chat-top"><span /> <strong>LexAI Assistant</strong></div>
            <div className="bubble user">Can parties choose applicable law orally?</div>
            <div className="bubble ai">Start with contract form, party autonomy, forum and public policy analysis.<i /></div>
          </div>
        </div>
      </section>

      <section className="lex-terms">
        <div className="lex-container">
          <p className="lex-eyebrow lex-reveal">Legal Terms of the Day</p>
          <h2 className="lex-section-title lex-reveal delay-r1">Understand one legal idea deeply.</h2>
          <div className="lex-term-grid">
            {[
              ["Legal Certainty", "LEGAL CERTAINTY", "People should be able to understand the legal consequences of their actions."],
              ["Proportionality", "PROPORTIONALITY", "State action should not go further than necessary to achieve a legitimate aim."],
              ["Public Policy", "PUBLIC POLICY", "Foreign law should not violate the fundamental values of the forum state."]
            ].map(([term, en, text], i) => (
              <article className={`lex-term-card lex-reveal delay-r${i}`} key={term}>
                <h3>{term}</h3><small>{en}</small><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lex-cta">
        <div className="lex-container lex-cta-inner">
          <div className="lex-divider lex-reveal" />
          <h2 className="lex-reveal delay-r1">Make your legal idea <em>visible.</em></h2>
          <p className="lex-reveal delay-r2">Publish articles, join discussions, explore cases and build your voice in the Azerbaijani legal community.</p>
          <div className="lex-actions lex-reveal delay-r3">
            <Link className="lex-btn lex-btn-gold" href="/articles/new">Submit Article</Link>
            <Link className="lex-btn lex-btn-ghost" href="/articles">Explore Platform</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
