
async function signOut() {
  const res = await axios.get('http://localhost:8081/sign-out', {})
}

async function sendRecipe() {
  formElement = document.forms.recipe
  formData = new FormData(formElement)
  recipe = {title: formData.get('title'), level: formData.get('level'), description: formData.get('description'), imgLink: formData.get('imgLink')}

  const res = await axios.post('http://localhost:8081/recipe', recipe)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


}

async function auth() {

  const res = await axios.get('http://localhost:8081/verifyToken', {})
    .then(function (response) {
      console.log(response);
      redirect(response)
    })
    .catch(function (error) {
      console.log(error);
    });

}

function redirect(data) {
  if (data.data != 1) { window.location.href = "http://localhost:5500/auth/sign-in/sign-in.html"; }
}



auth()
