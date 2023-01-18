async function signOut() {
  const res = await axios.get('http://localhost:8081/sign-out', {})
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

async function getUsers() {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none"
  
  formElement = document.forms.searchUser
  formData = new FormData(formElement)
  params = {email: formData.get('email')}

  const res = await axios.get('http://localhost:8081/user', {params: params});
  console.log(res)
  data = res.data

  return formatUsers(data)
}

function formatUsers(users) {
  console.log(users)
  return showUsers(users)
}

function showUsers(users) {
  result = ''
  for (user in users) {
    result += `
    <div class="card">
      <div class="portrait"><img class="recipe-img" src="https://img.freepik.com/vetores-premium/icone-do-usuario-simbolo-da-pessoa-humana-icone-de-perfil-social-sinal-de-login-do-avatar-simbolo-do-usuario-da-web-botao-da-web-da-interface-de-usuario-branco-neumorphic-ui-ux-neumorfismo-vetor-eps-10_399089-2757.jpg" alt=""></div>
      <div class="recipe-box">
        <div class="recipe-title"><h2>${users[user].email}</h2></div>
        <div><div class="item-actions" style="display: flex;" id="edit"><svg xmlns="http://www.w3.org/2000/svg" class="primary-button" onclick="editItem(${users[user].id})" height="32" width="32" viewbox="-5 0 58 58"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" onclick="deleteItem(${users[user].id})" class="secondary-button" height="32" width="32" viewbox="0 0 48 48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg></div> </div>
      </div>
      
    </div>
    `
  }
  cards = document.getElementById('cards')
  cards.innerHTML = result

}


async function deleteItem(id) {
  params = {id: id}
  
  const res = await axios.delete('http://localhost:8081/user', {params: params});
  return getUsers()
}

async function editItem(id) {
  itemToEdit = await axios.get('http://localhost:8081/user', {params: {id: id}});
  item = itemToEdit.data
  return overlay(item)
}

function overlay(item = null, action = "open") {
  let overlay = document.getElementById("overlay");
  if (item) {
    form = document.getElementById("user")
    form['id'].value = item.id
    form["email"].value = item.email
    form["password"].value = item.password
  }
  
  if (action == "open") {
    overlay.style.display = "grid";
  } else {
    overlay.style.display = "none";
  }
}

async function sendEdit() {
  debugger
  formElement = document.forms.user
  formData = new FormData(formElement)
  params = {id: formData.get('id'), email: formData.get('email'), password: formData.get('password')}

  const res = await axios.get('http://localhost:8081/editUser', {params}).then(getUsers())
}

recipes = getUsers()
