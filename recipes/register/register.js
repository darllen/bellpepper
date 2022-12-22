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
