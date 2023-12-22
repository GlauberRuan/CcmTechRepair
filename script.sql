-- Criação da tabela Client
CREATE TABLE Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255),
    cpf BIGINT,
    cnpj BIGINT,
    nome_razao VARCHAR(200),
    email VARCHAR(120),
    nome_responsavel VARCHAR(200),
    fone_responsavel VARCHAR(20),
    nome_contato_1 VARCHAR(20),
    fone_contato_1 VARCHAR(20),
    nome_contato_2 VARCHAR(20),
    fone_contato_2 VARCHAR(20)
);

-- Criação da tabela Address
CREATE TABLE Address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(15),
    logradouro VARCHAR(120),
    numero INT,
    complemento VARCHAR(75),
    bairro VARCHAR(75),
    cidade VARCHAR(50),
    uf VARCHAR(10),
    clientAd_id INT,
    FOREIGN KEY (clientAd_id) REFERENCES Client(id) ON DELETE CASCADE
);

-- Criação da tabela Client_Systems
CREATE TABLE Client_Systems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120),
    descricao VARCHAR(255),
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES Client(id) ON DELETE CASCADE
);

-- Criação da tabela Requests_clients
CREATE TABLE Requests_clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_client INT,
    data_abertura DATE,
    situation VARCHAR(255) DEFAULT 'EM ANDAMENTO'
);

-- Criação da tabela Request_items
CREATE TABLE Request_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_system INT,
    ocorrencia VARCHAR(300),
    analysisTech VARCHAR(120),
    closerequest VARCHAR(120),
    requests_clients_id INT,
    FOREIGN KEY (requests_clients_id) REFERENCES Requests_clients(id) ON DELETE CASCADE
);

-- Criação da tabela Technicians
CREATE TABLE Technicians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120),
    cpf BIGINT,
    cep INT,
    logradouro VARCHAR(75),
    numero INT,
    complemento VARCHAR(75),
    bairro VARCHAR(75),
    cidade VARCHAR(30),
    uf VARCHAR(10),
    fone_contato VARCHAR(20)
);

-- Criação da tabela Systems
CREATE TABLE Systems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200),
    descricao VARCHAR(300)
);
