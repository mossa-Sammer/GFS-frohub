BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public; 

CREATE TYPE user_role AS ENUM ('admin','hairstylist');

CREATE TABLE "user"(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR NOT NULL,
  phone_number VARCHAR,
  role user_role NOT NULL
);

CREATE TYPE pay_method AS ENUM ('cash','card','none');

CREATE TABLE business (
  business_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id),
  full_name VARCHAR(255),
  account_number  VARCHAR(6) UNIQUE,
  preferred_pay_method pay_method NOT NULL
);

CREATE TYPE salon_type as ENUM ('home','salon','mobile'); 

CREATE TABLE salon (
  salon_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id),
  name VARCHAR(255) NOT NULL,
  about VARCHAR,
  profile_image VARCHAR,
  cover_image VARCHAR,
  document VARCHAR,
  type salon_type NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(30) NOT NULL,
  country VARCHAR(2) NOT NULL, 
  postal_code VARCHAR(255)
);

CREATE TABLE salon_zone (
  salon_zone_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id),
  from_zone INT(1) NOT NULL,
  to_zone INT(1) NOT NULL,
  price FLOAT(32) NOT NULL
);  

CREATE TABLE salon_opening_time (
  salon_opening_time_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id),
  day VARCHAR(255) NOT NULL,
  from_time TIME NOT NULL,
  to_time TIME NOT NULL
);

CREATE TYPE activity_status AS ENUM ('active','inactive');

CREATE TABLE service (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status activity_status NOT NULL
);

CREATE TABLE service_length (
  service_length_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status activity_status NOT NULL
);

CREATE TABLE salon_service (
  salon_service_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id),
  user_id INT REFERENCES "user"(user_id),
  service_id INT REFERENCES service(service_id), 
  service_length_id INT REFERENCES service_length(service_length_id),
  price FLOAT(32) NOT NULL,
  status activity_status NOT NULL
);

CREATE TABLE salon_image (
  service_image_id SERIAL PRIMARY KEY,
  salon_service_id INT REFERENCES salon_service(salon_service_id),
  image_1 VARCHAR,
  image_2 VARCHAR,
  image_3 VARCHAR
);

CREATE TABLE finance (
  finance_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id),
  salon_service_id INT REFERENCES salon_service(salon_service_id),
  collected_deposit FLOAT(32),
  done DATE NOT NULL
);

COMMIT;
