# Use a imagem oficial do Node.js com a versão 16
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o conteúdo da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 8080 (ou a porta que sua aplicação Vue usa)
EXPOSE 8080

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "serve"]
