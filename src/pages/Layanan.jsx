import { useState, useEffect } from "react";



export default function Layanan() {

  const [layanan, setLayanan] = useState([]);



  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/layanan")

      .then(res => res.json())

      .then(data => setLayanan(data.data));

  }, []);



  return (

    <section>

      <h1>Layanan Desa</h1>



      {layanan.map(l => (

        <div key={l.id}>

          <h3>{l.nama_layanan}</h3>

          <p>{l.deskripsi}</p>

        </div>

      ))}

    </section>

  );

}