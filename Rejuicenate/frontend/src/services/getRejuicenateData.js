// Get array of all users
export function getAllUsers() {
    return fetch("http://localhost:5001/users")
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  // Get specific user by ID
export function getUserById(userId) {
    return fetch(`http://localhost:5001/users/${userId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.error(`Failed to fetch user details for ID: ${userId}. Status: ${res.status}`);
        throw new Error("Failed to fetch specific user details.");
      })
      .catch((err) => {
        console.error(`Error fetching user details for ID: ${userId}`, err);
        throw err;
      });
  }