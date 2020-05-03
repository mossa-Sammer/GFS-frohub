BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public; 

CREATE TYPE user_role AS ENUM ('admin','stylist');
CREATE TYPE pay_method AS ENUM ('cash','card','none');
CREATE TYPE salon_type as ENUM ('home','salon','mobile'); 
CREATE TYPE activity_status AS ENUM ('active','inactive');


CREATE TABLE "user"(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR NOT NULL,
  phone_number VARCHAR,
  role user_role NOT NULL
);


CREATE TABLE business (
  business_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id) on DELETE CASCADE,
  full_name VARCHAR(255),
  account_number  VARCHAR(12) UNIQUE,
  sort_code VARCHAR(12) UNIQUE,
  preferred_pay_method pay_method DEFAULT 'none'
);


CREATE TABLE salon (
  salon_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id) on DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  about VARCHAR,
  profile_image VARCHAR,
  cover_image VARCHAR,
  document VARCHAR,
  type salon_type NOT NULL,
  street VARCHAR(255),
  city VARCHAR(30) NOT NULL,
  country VARCHAR(2) NOT NULL, 
  postal_code VARCHAR(255)
);

CREATE TABLE salon_zone (
  salon_zone_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id) on DELETE CASCADE,
  from_zone INT NOT NULL,
  to_zone INT NOT NULL,
  price FLOAT(32) NOT NULL
);  

CREATE TABLE salon_opening_time (
  salon_opening_time_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id) on DELETE CASCADE,
  day INT NOT NULL,
  from_time TIME NOT NULL,
  to_time TIME NOT NULL
);


CREATE TABLE service (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  status activity_status NOT NULL DEFAULT 'inactive'
);

CREATE TABLE service_length (
  service_length_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  status activity_status NOT NULL
);

CREATE TABLE salon_service (
  salon_service_id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salon(salon_id) on DELETE CASCADE,
  user_id INT REFERENCES "user"(user_id) on DELETE CASCADE,
  service_id INT REFERENCES service(service_id) on DELETE CASCADE, 
  service_length_id INT REFERENCES service_length(service_length_id) on DELETE CASCADE,
  price FLOAT(32) NOT NULL,
  status activity_status NOT NULL
);

CREATE TABLE service_image (
  service_image_id SERIAL PRIMARY KEY,
  salon_service_id INT REFERENCES salon_service(salon_service_id) on DELETE CASCADE,
  image VARCHAR
);

CREATE TABLE finance (
  finance_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id),
  salon_service_id INT REFERENCES salon_service(salon_service_id),
  collected_deposit FLOAT(32),
  done DATE NOT NULL
);

COMMIT;
