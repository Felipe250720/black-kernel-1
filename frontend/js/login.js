document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha }),
      });
  
      const data = await response.json();
      console.log(data.token);

    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
});