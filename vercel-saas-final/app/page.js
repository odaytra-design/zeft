import Link from 'next/link';

const features = [
  {
    title: 'Strategy first',
    text: 'The app analyzes goal, audience, angle, objections, and CTA before writing anything.',
  },
  {
    title: 'Copy → Page flow',
    text: 'First generate persuasive copy, then shape it into a landing page preview you can refine.',
  },
  {
    title: 'OpenAI connected',
    text: 'Built to run on real OpenAI from day one with simple Vercel environment variables.',
  },
];

export default function HomePage() {
  return (
    <main className="marketing-page">
      <header className="marketing-nav">
        <div className="marketing-brand">LandingRodi AI</div>
        <div className="marketing-nav-actions">
          <Link href="/workspace" className="ghost-link">
            افتح المنصة
          </Link>
          <a href="#features" className="ghost-link">
            المميزات
          </a>
        </div>
      </header>

      <section className="hero-wrap">
        <div className="hero-copy">
          <div className="hero-badge">AI Landing Page SaaS</div>
          <h1>من فكرة قصيرة إلى صفحة هبوط جاهزة داخل مساحة عمل احترافية.</h1>
          <p>
            اكتب عرضك، خلّ النظام يحلل الهدف والجمهور والزاوية، ثم يولّد النص ويحوّله إلى صفحة هبوط
            قابلة للمعاينة فورًا. واجهة محترمة، مسار واضح، وOpenAI شغال مباشرة.
          </p>
          <div className="hero-actions">
            <Link href="/workspace" className="hero-primary">
              Launch Workspace
            </Link>
            <a href="#features" className="hero-secondary">
              Explore Features
            </a>
          </div>
          <div className="hero-meta">
            <span>Vercel ready</span>
            <span>OpenAI ready</span>
            <span>Arabic-first UX</span>
          </div>
        </div>

        <div className="hero-demo panel-card">
          <div className="demo-top">Live workflow preview</div>
          <div className="demo-card-stack">
            <div className="demo-card prompt">
              <div className="demo-label">Prompt</div>
              <div>اعمل صفحة هبوط لعيادة أسنان في عمان هدفها واتساب وتكون راقية ومقنعة</div>
            </div>
            <div className="demo-card strategy">
              <div className="demo-label">Strategy</div>
              <ul>
                <li>Goal: WhatsApp leads</li>
                <li>Angle: trust + comfort + premium result</li>
                <li>Audience: adults looking for quality dental care</li>
              </ul>
            </div>
            <div className="demo-card preview">
              <div className="demo-label">Preview</div>
              <div className="mini-preview">
                <strong>ابتسامة راقية بثقة أكبر</strong>
                <span>Premium copy and CTA ready for launch.</span>
                <button>احجز عبر واتساب</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="section-head">
          <span className="hero-badge">Why this version</span>
          <h2>قاعدة أنظف لمنصة SaaS حقيقية، مش مجرد تجربة شكلية.</h2>
          <p>
            جاهزة للنشر على Vercel، فيها API routes، توليد نصوص حقيقي، معاينة صفحة فعلية، وقابلة لاحقًا
            لإضافة auth وbilling وanalytics والدومينات.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card panel-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
