async function login() {
    formElement = document.getElementById('login-form')
    formData = new FormData(formElement)

    user = { email: formData.get('email'), password: formData.get('password') }
    const res = await axios.post('http://localhost:8081/sign-in', user)
        .then(function (response) {
            console.log(response);
            redirect(response)
        })
        .catch(function (error) {
            console.log(error);
        });

}

function redirect(data) {
    if(data.data == 1) { window.location.href = "http://localhost:5500/"; }
}
