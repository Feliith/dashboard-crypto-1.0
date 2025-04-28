from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str


@app.get("/")
def read_root():
    return {"message": "API rodando."}



@app.get("/api/cryptos")
def get_cryptos():
    try:
        with open("data/cryptos.json", "r") as file:
            data = json.load(file)
        return data['cryptos']
    except FileNotFoundError:
        return {"error": "Arquivo cryptos.json não encontrado."}



@app.get("/api/news")
def get_news():
    try:
        with open("data/news.json", "r") as file:
            data = json.load(file)
        return data['data']
    except FileNotFoundError:
        return {"error": "Arquivo news.json não encontrado."}



@app.get("/api/wallet")
def get_wallet():
    try:
        with open("data/cryptos.json", "r") as file:
            cryptos_data = json.load(file)["cryptos"]
    except FileNotFoundError:
        return {"error": "Arquivo cryptos.json não encontrado."}
    
    portfolio = [
        {"symbol": "BTC", "quantity": 0},
        {"symbol": "ETH", "quantity": 0},
        {"symbol": "LTC", "quantity": 0}
    ]

    enriched_portfolio = []
    total_balance = 0

    for item in portfolio:
        symbol = item["symbol"]
        quantity = item["quantity"]
        crypto_info = next((c for c in cryptos_data if c["symbol"] == symbol), None)

        if crypto_info:
            price = crypto_info.get("current_price", 0)
            prices_list = crypto_info.get("prices", [])
        else:
            price = 0
            prices_list = []

        value = price * quantity
        total_balance += value
        enriched_portfolio.append({
            "symbol": symbol,
            "name": crypto_info.get("name", symbol) if crypto_info else symbol,
            "quantity": quantity,
            "price": price,
            "value": value,
            "prices": prices_list,
        })

    return {
        "total_balance": total_balance,
        "portfolio": enriched_portfolio
    }




@app.post("/api/login")
async def login(request: Request):
    try:
        data = await request.json()
        username = data.get("username")
        password = data.get("password")

        with open("data/users.json", "r") as file:
            users = json.load(file)

        user = next((user for user in users["users"] if user["username"] == username), None)

        if user and user["password"] == password:
            return {"message": "Login realizado com sucesso."}
        else:
            raise HTTPException(status_code=401, detail="Usuário ou senha incorretos.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")


    
@app.post("/api/register")
async def register(request: Request):
    try:
        data = await request.json()
        username = data.get("username")
        password = data.get("password")

        with open("data/users.json") as file:
            users = json.load(file)

        if any(user["username"] == username for user in users["users"]):
            raise HTTPException(status_code=400, detail="Usuário já existe.")
        
        novo_usuario = {
            "username": username,
            "password": password,
            "portfolio": [
                {"symbol": "BTC", "quantity": 0},
                {"symbol": "ETH", "quantity": 0},
                {"symbol": "LTC", "quantity": 0}
            ]
        }

        users["users"].append(novo_usuario)

        with open("data/users.json", "w") as file:
            json.dump(users, file, indent=4)

        return {"message": "Cadastro realizado com sucesso."}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Usuário já existe.")
