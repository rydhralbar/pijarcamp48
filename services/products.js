const db = require('./db');
const config = require('../config');

async function getData(){
  const data = await db.query(
    `SELECT id, nama_produk, keterangan, harga, jumlah
    FROM produk`
  );

  return {
    data,
  }
}

async function create(produk){
  const result = await db.query(
    `INSERT INTO produk 
    (nama_produk, keterangan, harga, jumlah) 
    VALUES 
    ('${produk.nama_produk}', '${produk.keterangan}', ${produk.harga}, ${produk.jumlah})`
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

async function update(id, produk){
  const result = await db.query(
    `UPDATE produk 
    SET nama_produk="${produk.nama_produk}", keterangan="${produk.keterangan}", harga=${produk.harga}, 
    jumlah=${produk.jumlah} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'Product updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM produk WHERE id=${id}`
  );

  let message = 'Error in deleting produk';

  if (result.affectedRows) {
    message = 'Produk deleted successfully';
  }

  return {message};
}

module.exports = {
  getData,
  create,
  update,
  remove
}