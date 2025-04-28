import { useState } from "react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router-dom"

function Login() {
    const { login } = useUser()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                login({ email })
                navigate("/")
            } else {
                alert(data.detail || "Erro ao fazer o login.")
            }
        } catch (error) {
            console.error("Erro na requisição:", error)
            alert("Erro de conexão com o servidor.")
        }
    }

    const handleRegisterNavigate = () => {
        navigate('/register')
    }

    return(
        <div className="pt-[12vh] pl-[30vh]">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <input 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">
                    Entrar
                </button>
            </form>
            <button onClick={handleRegisterNavigate}>
                Cadastre-se
            </button>
        </div>
    )
}

export default Login
