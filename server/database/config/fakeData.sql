BEGIN;

INSERT INTO "user" (first_name, last_name, email, phone_number, role) VALUES ('rahel', 'tas', 'rahel@gmail.com', '123216789', 'admin');

INSERT INTO "user" (first_name, last_name, email, phone_number, role) VALUES ('mossa', 'dababesh', 'mossa@gmail.com', '123456789', 'stylist');

INSERT INTO "user" (first_name, last_name, email, phone_number, role) VALUES ('Ahmad', 'Ali', 'ahmad@gmail.com', '125556789', 'stylist');

INSERT INTO "user" (first_name, last_name, email, phone_number, role) VALUES ('angham', 'abed', 'angham@gmail.com', '123456789', 'stylist');

INSERT INTO business (user_id, full_name, account_number, preferred_pay_method) VALUES (2, 'mossa dababesh', '123556789', 'cash');

INSERT INTO business (user_id, full_name, account_number, preferred_pay_method) VALUES (3,'ahmad ali', '123455689', 'card');

INSERT INTO business (user_id, full_name, account_number, preferred_pay_method) VALUES (4, 'angham abed', '1237349', 'none');


INSERT INTO salon (user_id, name, about,profile_image, cover_image,document,type,street,city,country,postal_code) VALUES (2, 'mossa salon', 'lorem ipsum is a cool text', 'profileImage', 'coverImage','document','home','omar el mukhtar','london','UK','23424');

INSERT INTO salon (user_id, name, about,profile_image, cover_image,document,type,street,city,country,postal_code) VALUES (3, 'ahmad salon', 'lorem ipsum is a cool text', 'profileImage', 'coverImage','document','salon','omar el mukhtar','gaza','PS','23424');

INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,2,531);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,2,3,731);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,3,1000);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,1,531);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,1,9,2031);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,7,9,631);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,8,9,431);

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (1,1,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (1,2,'09:00 am','05:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (1,3,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (1,3,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (2,1,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to__time) values (2,3,'12:00 am','12:00 pm');

INSERT INTO service (name,status) values ('service1','active');
INSERT INTO service (name,status) values ('service2','active');
INSERT INTO service (name,status) values ('service3','active');
INSERT INTO service (name,status) values ('service4','active');
INSERT INTO service (name,status) values ('service5','active');
INSERT INTO service (name,status) values ('service6','inactive');
INSERT INTO service (name,status) values ('service7','inactive');
INSERT INTO service (name,status) values ('service8','inactive');
INSERT INTO service (name,status) values ('service9','inactive');

INSERT INTO service_length (name,status) VALUES ('Shoulder length','active');
INSERT INTO service_length (name,status) VALUES ('mid back','active');
INSERT INTO service_length (name,status) VALUES ('waist','active');
INSERT INTO service_length (name,status) VALUES ('tail','active');
INSERT INTO service_length (name,status) VALUES ('mid2','active');
INSERT INTO service_length (name,status) VALUES ('mid3','inactive');
INSERT INTO service_length (name,status) VALUES ('mid4','inactive');
INSERT INTO service_length (name,status) VALUES ('mid5','inactive');

INSERT INTO salon_service (salon_id,user_id,service_id,service_length_id,price,status) VALUES (1,2,1,1,3000,'active');

INSERT INTO salon_service (salon_id,user_id,service_id,service_length_id,price,status) VALUES (2,3,1,2,4000,'active');

INSERT INTO salon_service (salon_id,user_id,service_id,service_length_id,price,status) VALUES (2,2,1,1,5000,'inactive');

INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (2,'http://');
