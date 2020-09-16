drop database if exists batch_cooker;
create database batch_cooker;
use batch_cooker;

create table `user`
(
    id int auto_increment primary key,
    email varchar(45) unique not null,
    username varchar(30) unique not null,
    password varchar(30) not null
);

create table `ingredient`
(
    id int auto_increment primary key,
    name varchar(45) not null
);

create table `inventory`
(
    id int auto_increment primary key,
    user_id int,
    ingredient_id int,
    quantity float,
    foreign key (user_id) references user(id),
    foreign key (ingredient_id) references ingredient(id)
);

insert into `user`
(`email`, `username`, `password`)
values
('yligotmi@msn.com', 'youriligotmi', 'pouet');

insert into `ingredient`
(`name`)
values
('poivre');

insert into `inventory`
(`user_id`, `ingredient_id`, `quantity`)
values
(1, 1, 4);