-- CREATE
create view customer_view as
select customerNumber,customerName,phone
from customers;
select * from customer_view;


-- UPdate
create or replace view customer_view as
select customerNumber,customerName,contactLastName,contactFirstName,phone
from customers
where city="Nantes";
select * from customer_view;




-- delete
drop view customer_view