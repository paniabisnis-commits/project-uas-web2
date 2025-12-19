import { useState, useEffect } from "react";



export default function Berita() {

  const [berita, setBerita] = useState([]);



  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/berita")

      .then(res => res.json())

      .then(data => setBerita(data.data));

  }, []);



  return (

    <section>

      <h1>Berita Desa</h1>



      {berita.map(item => (

        <article key={item.id}>

          <h3>{item.judul}</h3>

          <p>{item.isi}</p>

        </article>

      ))}

    </section>

  );

}


