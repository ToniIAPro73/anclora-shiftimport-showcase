import brandLogo from '../../assets/brand/anclora-shiftimport.webp';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <div className="brand">
          <img className="brand-mark" src={brandLogo} alt="" width={46} height={46} decoding="async" />
          <span className="brand-name">Anclora ShiftImport</span>
          <span className="brand-badge">Demo de portfolio</span>
        </div>
        <p className="brand-tagline">Importa tu cuadrante · Revísalo · Pásalo al calendario</p>
      </div>
    </header>
  );
}
