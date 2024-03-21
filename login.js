
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
 
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://192.168.35.140:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

      const data = await response.json();
      if (response.ok) {
          localStorage.setItem("username", username);
          document.getElementById('username').value = "";
          document.getElementById('password').value = "";
      document.getElementById('message').innerText = "Login Successful";
      // Redirect to another page
      setTimeout(() => {
        window.location.href = '/welcome.html'; // Redirect to dashboard or any other page
      }, 1000);
    } else {
      document.getElementById('message').innerText = data.message;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('message').innerText = 'An error occurred';
  }
});