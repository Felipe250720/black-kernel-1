document.getElementById('adicionaProduto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_produto = document.getElementById('id').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;

    try {
      const response = await fetch(`http://localhost:3000/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_produto, quantidade, valor }),
      });

      const data = await response.json();
      console.log('Item adicionado ao banco de dados', data);
    } catch (error) {
      console.error('Erro ao adicionar item ao pedido:', error);
    }
});

document.getElementById('removeProduto').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id_produto = document.getElementById('id').value

  try {
    const response = await fetch('http://localhost:3000/produto/:id', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

  } catch (err) {
    console.error('Erro ao encontrar o produto indicado', err)
  }
})