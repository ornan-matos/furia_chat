# ---------- FRONTEND BUILD STAGE ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ---------- BACKEND BUILD STAGE ----------
FROM python:3.11-slim AS backend-build
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# ---------- FINAL STAGE ----------
FROM python:3.11-slim

# Instala o Forego para rodar múltiplos processos
RUN apt-get update && apt-get install -y curl && \
    curl -L https://github.com/ddollar/forego/releases/download/v0.17.0/forego-linux-amd64 \
    -o /usr/local/bin/forego && chmod +x /usr/local/bin/forego && \
    apt-get remove -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Backend
WORKDIR /app
COPY --from=backend-build /app/backend /app/backend

# Frontend build (Next.js .next/static e afins)
COPY --from=frontend-build /app/frontend/.next /app/frontend/.next
COPY --from=frontend-build /app/frontend/public /app/frontend/public
COPY --from=frontend-build /app/frontend/node_modules /app/frontend/node_modules
COPY --from=frontend-build /app/frontend/package.json /app/frontend/package.json

# Arquivo Procfile para forego
COPY Procfile /app/Procfile

# Variáveis de ambiente para o Next.js
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=ws://localhost:8000/ws

EXPOSE 8000 3000

# Instala dependências do Node no ambiente final (se necessário)
RUN apt-get update && apt-get install -y nodejs npm && apt-get clean && rm -rf /var/lib/apt/lists/*

# Comando para rodar ambos os processos
CMD ["forego", "start", "-f", "Procfile"]
