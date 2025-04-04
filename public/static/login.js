async function fetchLogin() {
    const usernameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
            if (data.data?.token) {
                localStorage.setItem('token', data.data.token);
            }
            location.href = '/admin'
        } else {
            // 登录失败的处理逻辑
            usernameInput.value = ''
            passwordInput.value = ''
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const pwdInput = document.getElementById('password');
pwdInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchLogin()
    }
});