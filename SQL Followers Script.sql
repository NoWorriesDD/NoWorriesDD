use bigdata;

create table followers (
    followerId INT PRIMARY KEY AUTO_INCREMENT,
    userEmail varchar(50),
    userFollowingEmail varchar(50),
    FOREIGN KEY (userEmail) REFERENCES user(email),
    FOREIGN KEY (userFollowingEmail) REFERENCES user(email)
);

insert into followers(userEmail, userFollowingEmail) values
("dularadinuli@gmail.com","danthaEkanayaka@gmail.com"),
("danthaEkanayaka@gmail.com", "dularadinuli@gmail.com");

select * from followers;