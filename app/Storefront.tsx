"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  weight: string;
  count: string;
  price: number;
  chf: string;
  image: string;
  badge?: string;
  tone: string;
  description: string;
};

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;
const products: Product[] = [
  { id: 1, weight: "100 g", count: "20–24 vainas", price: 1540, chf: "65.50 CHF", image: asset("vainilla-100g.webp"), badge: "Preventa", tone: "Selección", description: "Formato de introducción ideal para chocolaterías, reposterías y pruebas de producción." },
  { id: 2, weight: "250 g", count: "50–55 vainas", price: 3850, chf: "163.80 CHF", image: asset("vainilla-250g.webp"), tone: "Gourmet", description: "Presentación versátil para cocina profesional y producción artesanal de pequeña escala." },
  { id: 3, weight: "500 g", count: "100–110 vainas", price: 7700, chf: "327.60 CHF", image: asset("vainilla-500g.webp"), badge: "Profesional", tone: "Premium", description: "Volumen profesional para restaurantes, hoteles, pastelerías y fabricantes especializados." },
  { id: 4, weight: "1 kg", count: "220–225 vainas", price: 15400, chf: "655.30 CHF", image: asset("vainilla-1kg.webp"), badge: "Exportación", tone: "Mayoreo", description: "Formato de mayoreo preparado para compradores B2B y operaciones internacionales recurrentes." },
];

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 8.3h10.4l1 12H5.8l1-12Z"/><path d="M9.1 9V6a2.9 2.9 0 0 1 5.8 0v3"/></svg>;
}

function LeafMark() { return <span className="leaf-mark" aria-hidden="true">✦</span>; }

export default function Storefront() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sort, setSort] = useState("featured");

  const shownProducts = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setCartOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function addToCart(product: Product) {
    setCart((items) => [...items, product]);
    setSelectedProduct(null);
    setToast(`${product.weight} agregado a tu selección`);
    window.setTimeout(() => setToast(""), 2200);
  }

  function scrollTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="announcement">COMPRAS NACIONALES E INTERNACIONALES · ENVÍOS A SUIZA · VAINILLA 100% MEXICANA</div>
      <header className="nav-shell">
        <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Ir al inicio"><img src={asset("logo-optimized.png")} alt="Cosecha Áurea" /></button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal">
          <button onClick={() => scrollTo("catalogo")}>Tienda</button><button onClick={() => scrollTo("origen")}>Nuestra vainilla</button><button onClick={() => scrollTo("mayoreo")}>Exportación</button><button onClick={() => scrollTo("preguntas")}>Preguntas</button>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${cart.length} productos`}><BagIcon /><span>Carrito</span><b>{cart.length}</b></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><LeafMark /> De Papantla a Suiza</p>
          <h1>El oro aromático<br/>de México.</h1>
          <p className="hero-lead">Vainas Grado A, carnosas y flexibles, seleccionadas entre 15 y 17 cm. Empacadas al vacío para conservar su humedad, aroma y calidad durante el envío internacional.</p>
          <div className="hero-actions"><button className="primary" onClick={() => scrollTo("catalogo")}>Ver presentaciones <span>→</span></button><button className="text-link" onClick={() => scrollTo("mayoreo")}>Compra internacional</button></div>
          <div className="hero-proof"><span><b>15–17 cm</b> calidad premium</span><i/><span><b>25–28%</b> humedad controlada</span><i/><span><b>Origen</b> Papantla</span></div>
        </div>
        <div className="hero-visual"><div className="hero-halo"/><img src={asset("cultivo-hero.webp")} alt="Cultivo de vainilla planifolia con flores y vainas verdes en Papantla" /><div className="seal"><span>Grado A</span><strong>15–17</strong><span>centímetros</span></div></div>
        <div className="scroll-cue">DESLIZA <span>↓</span></div>
      </section>

      <section className="trust-strip" aria-label="Características del producto">
        <div><span>01</span><p><b>Origen protegido</b>Papantla, Veracruz, México</p></div><div><span>02</span><p><b>Sellado al vacío</b>Aroma y humedad protegidos</p></div><div><span>03</span><p><b>Grado A Gourmet</b>Vainas enteras de 15–17 cm</p></div><div><span>04</span><p><b>Compra internacional</b>Atención B2B México–Suiza</p></div>
      </section>

      <section className="catalog section" id="catalogo">
        <div className="section-heading">
          <div><p className="eyebrow"><LeafMark /> Nuevos empaques</p><h2>Una presentación<br/>para cada escala.</h2></div>
          <div className="catalog-intro"><p>Vainilla <i>planifolia</i> Grado A / Gourmet, clasificada por su longitud de 15 a 17 cm y empacada al vacío. Selecciona una presentación para ver el empaque y su ficha completa.</p><label>Ordenar por<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Recomendados</option><option value="low">Menor precio</option><option value="high">Mayor precio</option></select></label></div>
        </div>
        <div className="product-grid">
          {shownProducts.map((product) => <article className="product-card" key={product.id}>
            <div className="product-image">
              {product.badge && <span className="product-badge">{product.badge}</span>}<span className="product-index">0{product.id}</span>
              <button className="product-photo-button" onClick={() => setSelectedProduct(product)} aria-label={`Ver empaque de ${product.weight}`}><img src={product.image} alt={`Empaque al vacío de vainilla, presentación ${product.weight}`} /></button>
              <button className="quick-add" onClick={() => setSelectedProduct(product)}><span>Ver empaque</span> ↗</button>
            </div>
            <div className="product-info"><div><p>Vainilla {product.tone} · 15–17 cm</p><h3>Vainas de vainilla {product.weight}</h3><small>Aprox. {product.count}</small></div><div className="product-price"><strong>{money.format(product.price)}</strong><small>{product.chf}</small></div></div>
          </article>)}
        </div>
        <p className="demo-note">Precios de referencia del proyecto de exportación; el pedido internacional se confirma mediante cotización.</p>
      </section>

      <section className="origin section" id="origen">
        <div className="origin-image"><img src={asset("cultivo-vainas.webp")} alt="Vainas verdes creciendo en una planta de vainilla planifolia" /><span className="vertical-label">PAPANTLA · VERACRUZ · MÉXICO</span></div>
        <div className="origin-copy"><p className="eyebrow light"><LeafMark /> Del cultivo al empaque</p><h2>Nace en la tierra.<br/>Viaja protegida<br/><em>hasta su destino.</em></h2><p>Las vainas se polinizan manualmente y pasan por un proceso artesanal de escaldado, sudado, secado y curado. Solo las piezas enteras de 15 a 17 cm que cumplen con el perfil Grado A se seleccionan para el empaque premium.</p>
          <div className="origin-steps"><div><b>01</b><span>Selección manual</span><small>Longitud, flexibilidad y brillo.</small></div><div><b>02</b><span>Curado paciente</span><small>Aroma profundo y natural.</small></div><div><b>03</b><span>Sellado al vacío</span><small>Protección para exportación.</small></div></div>
        </div>
      </section>

      <section className="sensory section">
        <div className="sensory-title"><p className="eyebrow"><LeafMark /> Perfil sensorial</p><h2>Compleja por<br/>naturaleza.</h2></div>
        <div className="notes"><div className="note"><span>01</span><div className="note-orb vanilla"/><h3>Vainilla cremosa</h3><p>Dulce, redonda y envolvente.</p></div><div className="note"><span>02</span><div className="note-orb cacao"/><h3>Cacao & caramelo</h3><p>Matices cálidos y persistentes.</p></div><div className="note"><span>03</span><div className="note-orb floral"/><h3>Flores & madera</h3><p>Un final elegante y especiado.</p></div></div>
      </section>

      <section className="wholesale" id="mayoreo"><div className="wholesale-card" style={{ backgroundImage: `linear-gradient(110deg, rgba(8,35,25,.88), rgba(8,35,25,.58)), url('${asset("cultivo-panoramico.webp")}')` }}><div><p className="eyebrow light"><LeafMark /> Exportación B2B a Suiza</p><h2>De Papantla<br/>a tu negocio.</h2><p>Atendemos compras internacionales para chocolaterías, pastelerías, hoteles, restaurantes y fabricantes. El modelo contempla empaque al vacío, etiquetado bilingüe, seguimiento y entrega puerta a puerta en Zúrich bajo cotización.</p><div className="export-points"><span>15–17 cm</span><span>Empaque bilingüe</span><span>Seguimiento internacional</span></div></div><div className="wholesale-action"><span>¿Necesitas una cotización internacional?</span><a href="mailto:contacto@cosechaaurea.com?subject=Cotización%20internacional%20de%20vainilla">Cotizar exportación <b>↗</b></a><small>Pedidos nacionales e internacionales · Atención B2B</small></div></div></section>

      <section className="faq section" id="preguntas">
        <div><p className="eyebrow"><LeafMark /> Lo esencial</p><h2>Preguntas<br/>frecuentes.</h2><p className="faq-lead">Todo lo que necesitas saber antes de elegir tu presentación.</p></div>
        <div className="faq-list">{[
          ["¿Qué tamaño tienen las vainas premium?", "La selección Grado A / Gourmet está compuesta por vainas enteras de 15 a 17 cm, flexibles, carnosas y de color café oscuro a negro brillante."],
          ["¿Realizan compras y envíos internacionales?", "Sí. Atendemos pedidos B2B internacionales, especialmente hacia Zúrich, Suiza. Cada operación se confirma mediante cotización de producto, transporte y documentación."],
          ["¿Cómo se conserva el producto?", "El sellado al vacío protege los aceites esenciales y la humedad de 25% a 28%. Debe mantenerse en un lugar fresco, seco y oscuro, sin refrigeración."],
          ["¿Qué presentaciones están disponibles?", "Ofrecemos bolsas selladas al vacío de 100 g, 250 g, 500 g y 1 kg, con el número aproximado de vainas indicado en cada empaque."],
          ["¿Puedo comprar para mi negocio?", "Claro. Las presentaciones de 500 g y 1 kg están orientadas a hoteles, restaurantes, chocolaterías, reposterías y fabricantes especializados."],
        ].map(([q, a], index) => <div className={openFaq === index ? "faq-item active" : "faq-item"} key={q}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span>{q}<b>{openFaq === index ? "−" : "+"}</b></button><div><p>{a}</p></div></div>)}</div>
      </section>

      <footer><div className="footer-main"><img src={asset("logo-optimized.png")} alt="Cosecha Áurea" /><p>Vainilla premium mexicana<br/>de Papantla para el mundo.</p><div><a href="mailto:contacto@cosechaaurea.com">contacto@cosechaaurea.com</a><a href="#mayoreo">Exportación México → Suiza</a></div></div><div className="footer-bottom"><span>© 2026 Cosecha Áurea</span><span>Sitio demostrativo · Proyecto escolar</span><button onClick={() => scrollTo("inicio")}>Volver arriba ↑</button></div></footer>

      {selectedProduct && <div className="product-modal-layer">
        <button className="modal-backdrop" onClick={() => setSelectedProduct(null)} aria-label="Cerrar ficha del producto" />
        <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Cerrar">×</button>
          <div className="modal-product-image"><span>Empaque de exportación</span><img src={selectedProduct.image} alt={`Empaque Cosecha Áurea de ${selectedProduct.weight}`} /></div>
          <div className="modal-product-copy">
            <p className="eyebrow"><LeafMark /> México → Suiza</p><h2 id="product-modal-title">Vainas premium<br/>{selectedProduct.weight}</h2><p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-price"><strong>{money.format(selectedProduct.price)} MXN</strong><span>{selectedProduct.chf} · referencia internacional</span></div>
            <div className="modal-specs"><div><span>Calibre</span><b>15–17 cm</b></div><div><span>Contenido</span><b>{selectedProduct.count}</b></div><div><span>Humedad</span><b>25–28%</b></div><div><span>Empaque</span><b>Sellado al vacío</b></div></div>
            <p className="modal-origin">Vanilla planifolia · Papantla, Veracruz, México</p>
            <div className="modal-actions"><button onClick={() => addToCart(selectedProduct)}>Agregar al carrito <span>+</span></button><a href={`mailto:contacto@cosechaaurea.com?subject=Cotización%20internacional%20${encodeURIComponent(selectedProduct.weight)}`}>Cotizar envío internacional ↗</a></div>
          </div>
        </section>
      </div>}

      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen}><div className="drawer-head"><div><p>Tu selección</p><span>{cart.length} {cart.length === 1 ? "producto" : "productos"}</span></div><button onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button></div><div className="drawer-items">
        {cart.length === 0 ? <div className="empty-cart"><BagIcon/><h3>Tu carrito está vacío</h3><p>Explora las presentaciones de nuestra cosecha.</p><button onClick={() => {setCartOpen(false); scrollTo("catalogo")}}>Ver productos</button></div> : cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt=""/><div><p>Vainas premium · 15–17 cm</p><h4>{item.weight}</h4><span>{money.format(item.price)}</span></div><button onClick={() => setCart((items) => items.filter((_, i) => i !== index))} aria-label="Quitar producto">×</button></div>)}
      </div>{cart.length > 0 && <div className="drawer-total"><div><span>Total estimado</span><strong>{money.format(total)}</strong></div><button onClick={() => setToast("Pago desactivado en esta demostración")}>Solicitar pedido</button><small>Demostración escolar · Cotización internacional por separado</small></div>}</aside>
      {cartOpen && <button className="backdrop" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"/>}{toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}
