create schema bigdata;
use bigdata;

create table user (
userId integer primary key auto_increment,
userName varchar(20),
email varchar(50) unique,
password varchar(20)
);

insert into user (userName, email, password) values 
("Dulara", "dularadinuli@gmail.com", "1234"),
("Dantha", "danthaekanayaka@gmail.com", "5678");

SELECT * FROM bigdata.user;

