"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Phone, Scissors, Star } from "lucide-react";

type GalleryItem = { id: string; url: string; title: string; category: string };

const defaults: GalleryItem[] = [
  { id: "1", url: "https://lh3.googleusercontent.com/p/AF1QipM-example1", title: "Studio Fryzjerskie", category: "Salon" },
  { id: "2", url: "https://lh3.googleusercontent.com/p/AF1QipM-example2", title: "Wnętrze salonu", category: "Wnętrze" },
  { id: "3", url: "https://lh3.googleusercontent.com/p/AF1QipM-example3", title: "Fryzura", category: "Fryzury" }
];

const info = {
  name: "Studio Fryzjerskie",
  address: "Powstańców Śląskich 56a/1, 53-335 Wrocław",
  phone: "71 781 56 65",
  rating: "4,8",
  reviews: "213 opinii"
};

export default function Home() {
  const [gallery, setGallery] = useState<GalleryItem[]>(defaults);

  useEffect(() => {
    const saved = localStorage.getItem("studio-fryzjerskie-gallery");
    if (saved) {
      try { setGallery(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#start"><span>SF</span> Studio Fryzjerskie</a>
        <div className="navLinks">
          <a href="#o-nas">O salonie</a><a href="#galeria">Galeria</a><a href="#kontakt">Kontakt</a>
          <a className="adminLink" href="/admin">Panel właściciela</a>
        </div>
      </nav>
      <section className="hero" id="start">
        <div className="heroCopy">
          <p className="eyebrow">WROCŁAW · POWSTAŃCÓW ŚLĄSKICH</p>
          <h1>Włosy, które<br/><em>pasują do Ciebie.</em></h1>
          <p className="lead">Studio Fryzjerskie to kameralne miejsce, w którym liczy się dobra konsultacja, precyzja i efekt, z którym chce się wyjść z salonu.</p>
          <div className="heroActions"><a className="button primary" href="#kontakt">Umów wizytę <ArrowRight size={18}/></a><a className="button secondary" href="#galeria">Zobacz galerię</a></div>
          <div className="rating"><Star fill="currentColor" size={18}/><strong>{info.rating}</strong><span>na podstawie {info.reviews}</span></div>
        </div>
        <div className="heroCard">
          <div className="heroBadge"><Scissors size={18}/> STUDIO FRYZJERSKIE</div>
          <div className="heroPanel"><span>Godziny otwarcia</span><strong>Pon–Pt 08:00–20:00</strong><strong>Sob 08:00–14:00</strong><small>Niedziela zamknięte</small></div>
        </div>
      </section>
      <section className="infoStrip">
        <div><MapPin size={20}/><span><b>Adres</b>{info.address}</span></div>
        <div><Phone size={20}/><span><b>Telefon</b><a href="tel:+48717815665">{info.phone}</a></span></div>
        <div><Clock3 size={20}/><span><b>Dzisiaj</b>08:00–20:00</span></div>
      </section>
      <section className="section" id="o-nas">
        <div className="sectionHead"><p className="eyebrow">O SALONIE</p><h2>Profesjonalna fryzura<br/>zaczyna się od rozmowy.</h2></div>
        <div className="aboutText"><p>Każda wizyta zaczyna się od poznania Twoich oczekiwań. Doradzamy cięcie, kolor i pielęgnację tak, żeby efekt był wygodny także po wyjściu z salonu.</p><div className="miniFacts"><span><b>213+</b> opinii</span><span><b>4,8/5</b> ocena</span><span><b>6 dni</b> otwarcia</span></div></div>
      </section>
      <section className="gallery section" id="galeria">
        <div className="sectionHead"><p className="eyebrow">GALERIA</p><h2>Zobacz nasze<br/>studio i realizacje.</h2></div>
        <div className="galleryGrid">
          {gallery.map((item, i) => (
            <figure className={i === 0 ? "galleryItem featured" : "galleryItem"} key={item.id}>
              <img src={item.url} alt={item.title} onError={(e) => { e.currentTarget.style.opacity = "0"; }} />
              <figcaption><span>{item.category}</span><b>{item.title}</b></figcaption>
            </figure>
          ))}
        </div>
        <p className="galleryNote">Zdjęcia możesz wygodnie dodawać i edytować w panelu właściciela.</p>
      </section>
      <section className="contact section" id="kontakt">
        <div><p className="eyebrow">KONTAKT</p><h2>Do zobaczenia<br/><em>w Studio.</em></h2><p className="contactText">Powstańców Śląskich 56a/1<br/>53-335 Wrocław</p><div className="contactButtons"><a className="button primary" href="tel:+48717815665"><Phone size={18}/> Zadzwoń</a><a className="button secondary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/dir/?api=1&destination=Powsta%C5%84c%C3%B3w+%C5%9Al%C4%85skich+56a%2F1%2C+53-335+Wroc%C5%82aw">Wyznacz trasę <MapPin size={18}/></a></div></div>
        <div className="mapBox"><div className="mapPin"><MapPin size={24}/></div><span>Powstańców Śląskich 56a/1</span><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Powsta%C5%84c%C3%B3w+%C5%9Al%C4%85skich+56a%2F1%2C+53-335+Wroc%C5%82aw">Otwórz w Google Maps</a></div>
      </section>
      <footer><span>© {new Date().getFullYear()} Studio Fryzjerskie</span><span>Wrocław · Powstańców Śląskich</span><a href="/admin">Panel właściciela</a></footer>
    </main>
  );
}