function sendRecipe() {
  debugger
  formElement = document.forms.recipe
  formData = new FormData(formElement)
  recipe = {title: formData.get('title'), level: formData.get('level'), description: formData.get('description')}
  console.log(recipe)

  axios.post('http://localhost:8081/recipe', {title: formData.get('title'), level: formData.get('level'), description: formData.get('description')})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}
