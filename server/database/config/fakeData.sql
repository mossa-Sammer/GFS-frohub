BEGIN;

INSERT INTO "user" (first_name, last_name, email, phone_number, role, country) VALUES ('rahel', 'tas', 'rahel@gmail.com', '123216789', 'admin','PS');

INSERT INTO "user" (first_name, last_name, email, phone_number, role, country) VALUES ('mossa', 'dababesh', 'mossa@gmail.com', '123456789', 'stylist','AL');

INSERT INTO "user" (first_name, last_name, email, phone_number, role, country) VALUES ('Ahmad', 'Ali', 'ahmad@gmail.com', '125556789', 'stylist','AU');

INSERT INTO "user" (first_name, last_name, email, phone_number, role, country) VALUES ('angham', 'abed', 'angham@gmail.com', '123456789', 'stylist','GB');

INSERT INTO business (user_id, account_number, sort_code, preferred_pay_method) VALUES (4, '26207729', '560029', 'card');

INSERT INTO salon (user_id, name, about,profile_image, cover_image,document,type,street,city,country,postal_code, status) VALUES (2, 'mossa salon', 'lorem ipsum is a cool text', 'profileImage', 'coverImage','document','home','omar el mukhtar','london','UK','23424','active');

INSERT INTO salon (user_id, name, about,profile_image, cover_image,document,type,street,city,country,postal_code,status) VALUES (3, 'ahmad salon', 'lorem ipsum is a cool text', 'profileImage', 'coverImage','document','salon','omar el mukhtar','gaza','PS','23424','inactive');

INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,2,531);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,2,3,731);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,3,1000);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (1,1,1,531);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,1,9,2031);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,7,9,631);
INSERT INTO salon_zone (salon_id,from_zone,to_zone,price) VALUES (2,8,9,431);

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (1,1,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (1,2,'09:00 am','05:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (1,3,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (1,3,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (2,1,'09:00 am','04:00 pm');

INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) values (2,3,'12:00 am','12:00 pm');

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

INSERT INTO finance (user_id, salon_service_id, collected_deposit, done) VALUES (2, 1, 200, '2020-05-04');

INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (1,'http://');
INSERT INTO service_image (salon_service_id,image) VALUES (2,'http://');

COMMIT;
