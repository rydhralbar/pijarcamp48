let selectedId = null
let data = []

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "get",
    });
    const body = await response.json();
    console.log(body);
    data = body.data

    document.getElementById("listProduk").innerHTML = body.data
      .map(
        (item) =>
          `<div>
            <p>${item.nama_produk}</p>
            <button onclick="deleteProduct(${item.id})">HAPUS</button>
            <button onclick="openModalEdit(${item.id})" data-toggle="modal" data-target="#editProductModal">UBAH</button>
          </div>`
      )
      .join("");
  } catch (error) {
    alert(error);
  }
};

getData();

const deleteProduct = async(id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`,{
      method: "delete",
    })
    if (response) {
      getData()
    }
  } catch (error) {
    
  }
}

const addProduct = async(data) => {
  const nama_produk = document.getElementById("nama_produk").value
  const keterangan = document.getElementById("keterangan").value
  const harga = document.getElementById("harga").value
  const jumlah = document.getElementById("jumlah").value
  try {
    const response = await fetch("http://localhost:3000/products" , {
    headers: {'Content-Type': 'application/json'
  },  
    method: "post", 
      body: JSON.stringify({
        nama_produk,
        keterangan,
        harga,
        jumlah
      })
    })
    if (response.status === 200) {
      getData()
      document.getElementById("nama_produk").value=null
      document.getElementById("keterangan").value=null
      document.getElementById("harga").value=null
      document.getElementById("jumlah").value=null
    }
  } catch (error) {
    
  }
}

const editProduct = async() => {
  const nama_produk = document.getElementById("ubah_nama_produk").value
  const keterangan = document.getElementById("ubah_keterangan").value
  const harga = document.getElementById("ubah_harga").value
  const jumlah = document.getElementById("ubah_jumlah").value
  try {
    const response = await fetch(`http://localhost:3000/products/${selectedId}` , {
    headers: {'Content-Type': 'application/json'
  },  
    method: "put", 
      body: JSON.stringify({
        nama_produk,
        keterangan,
        harga,
        jumlah
      })
    })
    if (response.status === 200) {
      getData()
      selectedId = null
      document.getElementById("ubah_nama_produk").value=null
      document.getElementById("ubah_keterangan").value=null
      document.getElementById("ubah_harga").value=null
      document.getElementById("ubah_jumlah").value=null
    }
  } catch (error) {
    
  }
}

const openModalEdit = (id) => {
  console.log("Halo")
  selectedId = id
  const selectedData = data.find(item => item.id === id)
  document.getElementById("ubah_nama_produk").value=selectedData.nama_produk
  document.getElementById("ubah_keterangan").value=selectedData.keterangan
  document.getElementById("ubah_harga").value=selectedData.harga
  document.getElementById("ubah_jumlah").value=selectedData.jumlah
}