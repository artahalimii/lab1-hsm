
const apiUrl = 'http://localhost:5038/api/authentication';  

export const login = async (username, password) => {

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username, Password: password }),
    });

    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token",data.token)
      localStorage.setItem("username",data.username.userName);
      

      alert(JSON.stringify(data) + " is logged in as " + data.role);
      return true;  
    } else {
      console.error('Login failed:', response.statusText);
      return false;  
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    return false;  
  }
};
