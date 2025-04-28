import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:8000/api/register", {
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
                alert("Cadastro realizado com sucesso.")
                navigate("/login")
            } else {
                alert(data.detail || "Erro ao realizar o cadastro.")
            }

        } catch (error) {
            console.error("Erro na requisição:", error)
            alert("Erro de conexão com o servidor.")
        }
    }

    const handleBackLogin = () => {
        navigate("/login")
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Enviar</button>
            </form>
            <div>
                <h2>Já é cadastrado? Faça o Log-in!</h2>
                <button onClick={handleBackLogin}>
                    Log-in
                </button>
            </div>
        </div>
    )
}

export default Register