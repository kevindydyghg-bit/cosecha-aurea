"use client";

import { useMemo, useState } from "react";

type Product = { id: number; weight: string; count: string; price: number; image: string; badge?: string; tone: string };

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

const products: Product[] = [
  { id: 1, weight: "100 g", count: "20–24 vainas", price: 649, image: asset("vainilla-100g.webp"), badge: "Más vendido", tone: "Esmeralda" },
  { id: 2, weight: "250 g", count: "50–55 vainas", price: 1390, image: asset("vainilla-250g.webp"), tone: "Ámbar" },
  { id: 3, weight: "500 g", count: "100–110 vainas", price: 2490, image: asset("vainilla-500g.webp"), badge: "Ideal para chefs", tone: "Bosque" },
  { id: 4, weight: "1 kg", count: "220–225 vainas", price: 4690, image: asset("vainilla-1kg.webp"), badge: "Mayoreo", tone: "Oro" },
];

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 8.3h10.4l1 12H5.8l1-12Z"/><path d="M9.1 9V6a2.9 2.9 0 0 1 5.8 0v3"/></svg>;
}

function LeafMark() { return <span className="leaf-mark" aria-hidden="true">✦</span>; }

export default function Storefront() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
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
  function addToCart(product: Product) {
    setCart((items) => [...items, product]);
    setToast(`${product.weight} agregado a tu selección`);
    window.setTimeout(() => setToast(""), 2200);
  }
  function scrollTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="announcement">ENVÍO NACIONAL · VAINILLA 100% MEXICANA · COSECHA SELECCIONADA</div>
      <header className="nav-shell">
        <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Ir al inicio"><img src={asset("logo-optimized.png")} alt="Cosecha Áurea" /></button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal">
          <button onClick={() => scrollTo("catalogo")}>Tienda</button><button onClick={() => scrollTo("origen")}>Nuestra vainilla</button><button onClick={() => scrollTo("mayoreo")}>Mayoreo</button><button onClick={() => scrollTo("preguntas")}>Preguntas</button>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${cart.length} productos`}><BagIcon /><span>Carrito</span><b>{cart.length}</b></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><LeafMark /> De Papantla, Veracruz</p>
          <h1>El oro aromático<br/>de México.</h1>
          <p className="hero-lead">Vainas carnosas, flexibles y profundamente aromáticas, seleccionadas para quienes convierten cada receta en algo memorable.</p>
          <div className="hero-actions"><button className="primary" onClick={() => scrollTo("catalogo")}>Descubrir la cosecha <span>→</span></button><button className="text-link" onClick={() => scrollTo("origen")}>Conocer el origen</button></div>
          <div className="hero-proof"><span><b>100%</b> natural</span><i/><span><b>16–21 cm</b> selección premium</span><i/><span><b>Origen</b> Papantla</span></div>
        </div>
        <div className="hero-visual"><div className="hero-halo"/><img src={asset("vainilla-100g.webp")} alt="Presentación premium de vainas de vainilla Cosecha Áurea" /><div className="seal"><span>Cosecha</span><strong>2026</strong><span>Selección</span></div></div>
        <div className="scroll-cue">DESLIZA <span>↓</span></div>
      </section>

      <section className="trust-strip" aria-label="Características del producto">
        <div><span>01</span><p><b>Cultivo de origen</b>Directo de la región vainillera</p></div><div><span>02</span><p><b>Curado artesanal</b>Tiempo, cuidado y experiencia</p></div><div><span>03</span><p><b>Calidad sensorial</b>Aroma intenso y gran contenido</p></div><div><span>04</span><p><b>Envío nacional</b>Empaque protegido y hermético</p></div>
      </section>

      <section className="catalog section" id="catalogo">
        <div className="section-heading">
          <div><p className="eyebrow"><LeafMark /> Nuestra selección</p><h2>Una vaina para<br/>cada creación.</h2></div>
          <div className="catalog-intro"><p>Vainilla <i>planifolia</i> de calidad gourmet, clasificada y empacada para conservar su humedad, flexibilidad y extraordinario perfume.</p><label>Ordenar por<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Recomendados</option><option value="low">Menor precio</option><option value="high">Mayor precio</option></select></label></div>
        </div>
        <div className="product-grid">
          {shownProducts.map((product) => <article className="product-card" key={product.id}>
            <div className="product-image">{product.badge && <span className="product-badge">{product.badge}</span>}<span className="product-index">0{product.id}</span><img src={product.image} alt={`Vainas de vainilla, presentación ${product.weight}`} /><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Agregar presentación de ${product.weight}`}><span>Agregar</span> +</button></div>
            <div className="product-info"><div><p>Vainilla premium · {product.tone}</p><h3>Vainas de vainilla {product.weight}</h3><small>Aprox. {product.count}</small></div><strong>{money.format(product.price)}</strong></div>
          </article>)}
        </div>
        <p className="demo-note">Precios ilustrativos para fines de esta presentación escolar.</p>
      </section>

      <section className="origin section" id="origen">
        <div className="origin-image"><img src={asset("vainilla-etiqueta.webp")} alt="Detalle de la etiqueta Cosecha Áurea" /><span className="vertical-label">PAPANTLA · VERACRUZ · MÉXICO</span></div>
        <div className="origin-copy"><p className="eyebrow light"><LeafMark /> La historia en cada vaina</p><h2>Nace en la tierra.<br/>Se perfecciona<br/><em>con el tiempo.</em></h2><p>En el corazón de Veracruz, cada orquídea de vainilla se poliniza y cultiva con cuidado. Después de la cosecha comienza un lento proceso de beneficio que despierta cientos de compuestos aromáticos.</p>
          <div className="origin-steps"><div><b>01</b><span>Selección manual</span><small>Solo vainas maduras y sanas.</small></div><div><b>02</b><span>Curado paciente</span><small>Sol, sombra y reposo controlado.</small></div><div><b>03</b><span>Empaque fresco</span><small>El aroma se conserva intacto.</small></div></div>
        </div>
      </section>

      <section className="sensory section">
        <div className="sensory-title"><p className="eyebrow"><LeafMark /> Perfil sensorial</p><h2>Compleja por<br/>naturaleza.</h2></div>
        <div className="notes"><div className="note"><span>01</span><div className="note-orb vanilla"/><h3>Vainilla cremosa</h3><p>Dulce, redonda y envolvente.</p></div><div className="note"><span>02</span><div className="note-orb cacao"/><h3>Cacao & caramelo</h3><p>Matices cálidos y persistentes.</p></div><div className="note"><span>03</span><div className="note-orb floral"/><h3>Flores & madera</h3><p>Un final elegante y especiado.</p></div></div>
      </section>

      <section className="wholesale" id="mayoreo"><div className="wholesale-card"><div><p className="eyebrow light"><LeafMark /> Para profesionales</p><h2>Tu cocina merece<br/>una gran materia prima.</h2><p>Atendemos a restaurantes, reposterías, hoteles y distribuidores con presentaciones desde 500 g y condiciones especiales.</p></div><div className="wholesale-action"><span>¿Proyecto gastronómico?</span><a href="mailto:contacto@cosechaaurea.com">Solicitar cotización <b>↗</b></a><small>Respuesta estimada en 24–48 horas</small></div></div></section>

      <section className="faq section" id="preguntas">
        <div><p className="eyebrow"><LeafMark /> Lo esencial</p><h2>Preguntas<br/>frecuentes.</h2><p className="faq-lead">Todo lo que necesitas saber antes de elegir tu presentación.</p></div>
        <div className="faq-list">{[
          ["¿Cómo conservar las vainas?", "Guárdalas en un recipiente hermético, en un lugar fresco, seco y oscuro. Evita el refrigerador y ventílalas brevemente cada pocas semanas."],
          ["¿Qué significa calidad premium?", "Son vainas seleccionadas por tamaño, flexibilidad, humedad, integridad y perfil aromático; ideales para repostería, cocina y extracción."],
          ["¿Realizan envíos a todo México?", "Sí. Para esta demostración se contempla cobertura nacional con empaque protegido y seguimiento de envío."],
          ["¿Puedo comprar para mi negocio?", "Claro. Las presentaciones de 500 g y 1 kg están pensadas para uso profesional; también preparamos cotizaciones a medida."],
        ].map(([q, a], index) => <div className={openFaq === index ? "faq-item active" : "faq-item"} key={q}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span>{q}<b>{openFaq === index ? "−" : "+"}</b></button><div><p>{a}</p></div></div>)}</div>
      </section>

      <footer><div className="footer-main"><img src={asset("logo-optimized.png")} alt="Cosecha Áurea" /><p>Vainilla premium mexicana<br/>de Papantla, Veracruz.</p><div><a href="mailto:contacto@cosechaaurea.com">contacto@cosechaaurea.com</a><a href="#inicio">Instagram · @cosechaaurea</a></div></div><div className="footer-bottom"><span>© 2026 Cosecha Áurea</span><span>Sitio demostrativo · Proyecto escolar</span><button onClick={() => scrollTo("inicio")}>Volver arriba ↑</button></div></footer>

      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-hidden={!cartOpen}><div className="drawer-head"><div><p>Tu selección</p><span>{cart.length} {cart.length === 1 ? "producto" : "productos"}</span></div><button onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button></div><div className="drawer-items">
        {cart.length === 0 ? <div className="empty-cart"><BagIcon/><h3>Tu carrito está vacío</h3><p>Explora las presentaciones de nuestra cosecha.</p><button onClick={() => {setCartOpen(false); scrollTo("catalogo")}}>Ver productos</button></div> : cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt=""/><div><p>Vainas premium</p><h4>{item.weight}</h4><span>{money.format(item.price)}</span></div><button onClick={() => setCart((items) => items.filter((_, i) => i !== index))} aria-label="Quitar producto">×</button></div>)}
      </div>{cart.length > 0 && <div className="drawer-total"><div><span>Total estimado</span><strong>{money.format(total)}</strong></div><button onClick={() => setToast("Pago desactivado en esta demostración")}>Continuar al pago</button><small>Demostración escolar · No se procesarán pagos</small></div>}</aside>
      {cartOpen && <button className="backdrop" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"/>}{toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}
