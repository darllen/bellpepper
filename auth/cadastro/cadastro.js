async function sendUser() {
  formElement = document.forms.user
  formData = new FormData(formElement)
  user = {email: formData.get('email'), password: formData.get('password')}

  const res = await axios.post('http://localhost:8081/user', user)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


}
