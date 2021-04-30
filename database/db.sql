CREATE DATABASE delilah_resto;
USE delilah_resto;
--users table
CREATE TABLE users(
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  adress VARCHAR(255) NOT NULL,
  admin tinyint(1) NOT NULL DEFAULT 0,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
---AGREGANDO ADMIN
INSERT INTO
  users(
    username,
    name,
    lastname,
    email,
    phone,
    adress,
    admin,
    password
  )
VALUES
  (
    "admin",
    "Matias",
    "Juarez",
    "matiasjuarez899@gmail.com",
    12345,
    "callefalsa123",
    1,
    "admin123"
  );
CREATE TABLE products(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR (255) NOT NULL,
    price FLOAT NOT NULL,
    img VARCHAR(2083) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  products(name, price, img)
VALUES
  (
    "Hamburgesa clasica",
    510,
    "https://images.rappi.com.ar/products/tmp17204366706989120201085238.png?d=400x400&e=webp"
  ),(
    "Hamburgesa BigMac",
    399,
    "https://images.rappi.com.ar/products/tmp172236418004664899969398072.png?d=400x400&e=webp"
  ),
  (
    "Bagel de salmon",
    450,
    "https://images.rappi.com.ar/products/316979-1544190417.png?d=400x400&e=webp"
  ),(
    "Sandiwch veggie",
    390,
    "https://images.rappi.com.ar/products/sandwich-veggie-sabij-1573582186209.png?d=400x400&e=webp"
  ),(
    "Ensalada veggie",
    340,
    "https://images.rappi.com.ar/products/67c89fde-88f6-46bf-906b-dafca9180cee-1604116951752.jpeg?d=400x400&e=webp"
  ),
  (
    "Sandwich focaccia",
    440,
    "https://images.rappi.com.ar/products/f73ad3c7-5f03-433c-93cc-2e60c10df550-1612362376352.jpeg?d=400x400&e=webp"
  ),
  (
    "Papas cheddar",
    270,
    "https://images.rappi.com.ar/products/1479382-1598906722966.png?d=400x400&e=webp"
  );
CREATE TABLE pedidos(
  id INT(11) NOT NULL AUTO_INCREMENT ,
  
)
