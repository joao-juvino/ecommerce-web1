"use client";
import { useRef, useState } from "react";
import "./login.css";
import { useNotification } from "@/app/context/NotificationContext";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default function Login() {
    const { showNotification } = useNotification();

    const containerRef = useRef(null);

    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
    const [signinData, setSigninData] = useState({ email: "", password: "" });

    function handleActive() {
        containerRef.current.classList.add("active");
    }

    function handleDeactive() {
        containerRef.current.classList.remove("active");
    }

    async function handleSignup(e) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find(user => user.email === signupData.email)) {
            showNotification("Email já registrado!", "error");
            return;
        }

        const hashedPassword = await bcrypt.hash(signupData.password, 10);

        users.push({ ...signupData, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));
        showNotification("Conta criada com sucesso!", "success");
        setSignupData({ name: "", email: "", password: "" });
        handleDeactive();
    }


    async function handleSignin(e) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.email === signinData.email);

        if (user && await bcrypt.compare(signinData.password, user.password)) {
            showNotification(`Bem-vindo, ${user.name}!`, "success");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            redirect("/");
        } else {
            showNotification("Email ou senha incorretos!", "error");
        }

        setSigninData({ email: "", password: "" });
    }


    return (
        <div className="container" ref={containerRef}>
            <div className="form-container sign-up">
                <form onSubmit={handleSignup}>
                    <h1 className="mb-3">Criar conta</h1>
                    <span>ou use seu e-mail para se cadastrar</span>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={signupData.name}
                        onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={signupData.password}
                        onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                        required
                    />
                    <button type="submit">Cadastro</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={handleSignin}>
                    <h1 className="mb-3">Entrar</h1>
                    <span>use sua senha cadastrada previamente</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={signinData.email}
                        onChange={e => setSigninData({ ...signinData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={signinData.password}
                        onChange={e => setSigninData({ ...signinData, password: e.target.value })}
                        required
                    />
                    <button type="submit" className="bg-red-500">Entrar</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Bem-vindo de volta!</h1>
                        <p>Entre com seus dados para acessar as funcionalidades do site</p>
                        <button onClick={handleDeactive} className="bthidden">Entrar</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Olá!</h1>
                        <p>Entre com seus dados para acessar as funcionalidades do site</p>
                        <button onClick={handleActive} className="bthidden">Cadastro</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
