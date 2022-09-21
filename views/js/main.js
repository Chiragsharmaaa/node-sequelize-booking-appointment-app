const baseURL = "http://localhost:3000";

const form = document.getElementById("form-control");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submit = document.getElementById("submitbtn");
submit.addEventListener("click", onSubmit);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(baseURL + "/show-users");
    for (let i = 0; i < response.data.length; i++) {
      console.log(response.data[i]);
      appendList(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

async function onSubmit(event) {
  event.preventDefault();
  try {
    if (
      !(
        nameInput.value == "" ||
        emailInput.value == "" ||
        phoneInput.value == ""
      )
    ) {
      myObj = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
      };
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";

      const response = await axios.get(baseURL + "/show-users");
      for (let i = 0; i < response.data.length; i++) {
        if (myObj.id == response.data[i].id) {
          let id = response.data[i].id;
          await axios.delete(baseURL + "/user/" + id);
        }
      }
      await axios.post(baseURL + "/add-user", myObj);

      appendList(myObj);
    } else {
      alert("Enter all values!");
    }
  } catch (error) {
    console.log(error);
  }
}

//Main Function:
function appendList(myObj) {
  const allh4inFront = document.getElementsByClassName("email-h4-class");
  for (let i = 0; i < allh4inFront.length; i++) {
    if (allh4inFront[i].innerHTML == myObj.email) {
      const toBeDeleted = allh4inFront[i].parentElement;
      toBeDeleted.remove();
    }
  }

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("inner-div", "card-body", "subheader", "bg-light");
  const nameContainerH4 = document.createElement("h4");
  nameContainerH4.classList.add("name-h4-class");
  const emailContainerH4 = document.createElement("h4");
  const phoneContainerH4 = document.createElement("h4");
  phoneContainerH4.classList.add("phone-h4-class");
  emailContainerH4.classList.add("email-h4-class");

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  editButton.classList.add("innerbtn", "editbtn", "btn", "btn-outline-success");
  deleteButton.classList.add("innerbtn", "dltbtn", "btn", "btn-outline-danger");

  editButton.innerHTML = "Edit";
  deleteButton.innerHTML = "Delete";
  nameContainerH4.innerHTML = myObj.name;
  emailContainerH4.innerHTML = myObj.email;
  phoneContainerH4.innerHTML = myObj.phone;

  innerDiv.appendChild(nameContainerH4);
  innerDiv.appendChild(emailContainerH4);
  innerDiv.appendChild(phoneContainerH4);
  innerDiv.appendChild(editButton);
  innerDiv.appendChild(deleteButton);

  const parentDiv = document.getElementById("total-items");
  parentDiv.appendChild(innerDiv);
  //---------------------------------------------------------------------------------
  deleteButton.addEventListener("click", deleteDivAndData);
  editButton.addEventListener("click", editFrontData);

  //Edit Button Function:
  async function editFrontData() {
    const targetname = editButton.previousSibling.previousSibling.previousSibling.innerHTML;
    const targetemail = editButton.previousSibling.previousSibling.innerHTML;
    const targetphoneInput = editButton.previousSibling.innerHTML;

    nameInput.value = targetname;
    emailInput.value = targetemail;
    phoneInput.value = targetphoneInput;

    deleteDivAndData();

    let updatedObj = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    appendList(updatedObj);
  }

  async function deleteDivAndData(e) {
    try {
      const emailforremovingfromlocal =
        deleteButton.previousSibling.previousSibling.previousSibling.innerHTML;
      const response = await axios.get(baseURL + "/show-users");
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].email === emailforremovingfromlocal) {
          let uId = response.data[i].id;
          await axios.delete(baseURL + `/user/${uId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
