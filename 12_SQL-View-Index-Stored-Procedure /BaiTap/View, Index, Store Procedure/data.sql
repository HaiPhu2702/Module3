-- Bước 1: Tạo cơ sở dữ liệu demo ------------------------------------------------------------------------------

create database demo;


-- - -----------------------------------------------------------------------------------------------------------
/* Bước 2: Tạo bảng Products với các trường dữ liệu sau:
				Id  ,productCod,  productName,  productPrice, productAmount  ,productDescription,  productStatus
                                      Chèn một số dữ liệu mẫu cho bảng Products. */

create table demo.Products(
Id int primary key,
productCode int,
productName varchar(50),
productPrice int,
productAmount int,
productDescription varchar(100),
productStatus boolean
);
insert into demo.Products values
(1,12,"Vina",70,300,"hai suc khoe",1),
(2,13,"pho",30,100,"tot suc khoe",1),
(3,14,"kem",10,900,"mát suc khoe",1),
(4,15,"banh",25,400,"bùi suc khoe",1),
(5,16,"keo",45,90,"ngọt suc khoe",1)


 /* Bước 3:---------------------------------------------------------------------------------------------------
 Tạo Unique Index trên bảng Products (sử dụng cột productCode để tạo chỉ mục)*/

 create unique index product_code on demo.Products(productCode);
 show index from demo.Products;

-- Tạo Composite Index trên bảng Products (sử dụng 2 cột productName và productPrice)
create index Prpduct_name_price on demo.Products(productName,productPrice);
 show index from demo.Products;


-- Sử dụng câu lệnh EXPLAIN để biết được câu lệnh SQL của bạn thực thi như nào
  select productName,productPrice
from Products

-- So sánh câu truy vấn trước và sau khi tạo index
/*   trc khi su phai duyet het danh sach ms tim ra..... sau khi tao index chi duyet 5 rows*/




-- -------------------------------------------------------------------------------------------------------------------------
-- Bước 4--------------------
-- Tạo view lấy về các thông tin: productCode, productName, productPrice, productStatus từ bảng products.
create view product_view as
select productCode productName, productPrice, productStatus
from Products;
select * from product_view;

-- Tiến hành sửa đổi view
create or replace view product_view as
select productCode,productName
from Products;
select * from product_view;

-- Tiến hành xoá view
drop view product_view;



-- Bước 5:---------------------------------------------------------------------------------------------------------------
-- Tạo store procedure lấy tất cả thông tin của tất cả các sản phẩm trong bảng product
delimiter $$
create procedure All_Products()
begin
select * from demo.Products;
end;
 $$ delimiter ;

 call All_Products;


-- Tạo store procedure thêm một sản phẩm mới

delimiter $$
 create procedure add_product
(
in Id_ int,
in productCode_ int,
in productName_ varchar(50),
in productPrice_ int,
in productAmount_ int ,
in productDescription_ varchar(100),
in productStatus_ boolean
)
begin
insert into demo.Products
values(Id_,productCode_,productName_,productPrice_,productAmount_,productDescription_,productStatus_);
end;
$$ delimiter ;
call add_product(1,17,"Sua",200,5000,"đầy đủ dinh dưỡng",0)

-- Tạo store procedure sửa thông tin sản phẩm theo id
delimiter $$
create procedure updateProductByID
(
in id int,
in product_name varchar(50)
)
begin
update demo.Products set Products.productName=product_name where Products.Id=id;
end;
 $$ delimiter ;
 drop procedure if exists add_product;
 show procedure status;
call updateProductByID(2,'Pho');
call updateProductByID(3,'kem');
call updateProductByID(4,'banh');
call updateProductByID(5,'keo');

 -- Tạo store procedure xoá sản phẩm theo id
delimiter $$
create procedure deleteProductByID
(
in id int
)
begin
delete from demo.Products where Products.Id=id ;
end;

 $$ delimiter ;

call deleteProductByID(1)