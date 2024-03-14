use bigdata;

create table recommend(
    recommendId INT PRIMARY KEY AUTO_INCREMENT,
    userEmail varchar(50),
    merchantId varchar(30),
    FOREIGN KEY (userEmail) REFERENCES user(email)
);

insert into recommend(userEmail, merchantId) values
("dularadinuli@gmail.com","a47abB5cC5b47a8"),
("dularadinuli@gmail.com","D76BB12E5eE165B"),
("dularadinuli@gmail.com", "ad19ebCB2BB7eE5"),
("danthaEkanayaka@gmail.com", "10D5f8e3B8d31B0"),
("danthaEkanayaka@gmail.com", "06Df66C7ec45CF9");

select * from recommend;