function sendPayload() {
  let login = document.getElementById("input_login").value;
  let password = document.getElementById("input_password").value;
  let role = document.getElementById("input_role").value;

  let data = {
    login: login,
    role: role,
    password: password,
  };

  fetch("/handle_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output_token").value = data.token;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function sendToken() {
  let token = document.getElementById("input_token").value;

  fetch("/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => response.json())
    .then((data) => {
      let outputResult = document.getElementById("output_result");
      // Устанавливаем текст результата
      outputResult.value = data.decrypted;

      // Окрашиваем textarea в зависимости от is_successful
      if (data.is_successful) {
        // Если успешно — зелёный фон
        outputResult.style.backgroundColor = "#d4edda"; // светло-зелёный
        outputResult.style.color = "#155724"; // тёмно-зелёный текст
        outputResult.style.borderColor = "#c3e6cb"; // зелёная рамка
      } else {
        // Если неуспешно — красный фон
        outputResult.style.backgroundColor = "#f8d7da"; // светло-красный
        outputResult.style.color = "#721c24"; // тёмно-красный текст
        outputResult.style.borderColor = "#f5c6cb"; // красная рамка
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
