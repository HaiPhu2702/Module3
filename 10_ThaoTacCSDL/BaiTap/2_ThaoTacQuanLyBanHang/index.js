/*


select oID,oDate,oTotalPrice from `Order`;

select c.cName,p.pName
from Customer c
join `Order` o on c.cID=o.cID
join OrderDetail od on od.oID  = o.oID
join Product p on p.pID = od.pID;


select c.cName
from Customer c
where c.cName not in(select c.cName
from Customer c
join `Order` o on c.cID=o.cID
);

select o.oID,o.oDate,sum(od.odQTY*p.pPrice) as giaTIen
from `Order` o
join OrderDetail od on od.oID =o.oID
join Product p on p.pID = od.pID
group by o.oID

 */
