const signupHttp = user => {
  const { username, email, password } = user;
  return fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then(res => res.json())
    .catch(err => err);
};

export default signupHttp;
