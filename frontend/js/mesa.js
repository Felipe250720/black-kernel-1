document.getElementById('cadastroMesaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome_usuario = document.getElementById('nome_usuario').value;

    try {
      const response = await fetch('http://localhost:3000/mesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_usuario }),
      });

      const data = await response.json();
      console.log('Mesa cadastrada:', data);
    } catch (error) {
      console.error('Erro ao cadastrar mesa:', error);
    }
});