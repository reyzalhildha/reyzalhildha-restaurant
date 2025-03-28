import { FormEvent, useEffect, useState } from "react";
import styles from "./CreateOrder.module.css";
import { createOrder, getAllMenu, getMenu } from "../../../services/order.service";
import { Link, useSearchParams } from "react-router-dom";
import CButton from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { CartItem, MenuItem } from "../../../types/order";
import { filters, tables } from "./CreateOrder.constants";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dialog } from "primereact/dialog";

const CreateOrder = () => {
  const [menu, setMenu] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(6);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await getMenu(searchParams.get("category") as string);
      setMenu(result.data);
      const allMenu = await getAllMenu();
      setTotalRecords(allMenu.metadata.total);

    };
    fetchMenu();
  }, [searchParams.get("category")]);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      console.log("You need to login first");
      setVisible(true);
    } else {
      const itemIsInCart = carts.find((item: CartItem) => item.id === id);
      if (type === "increment") {
        if (itemIsInCart) {
          setCarts(
            carts.map((item: CartItem) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
          );
        } else {
          setCarts([...carts, { id, name, quantity: 1 }]);
        }
      } else {
        if (itemIsInCart && itemIsInCart.quantity <= 1) {
          setCarts(carts.filter((item: CartItem) => item.id !== id));
        } else {
          setCarts(
            carts.map((item: CartItem) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          );
        }
      }
    }
  };

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: CartItem) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: "",
      })),
    };
    await createOrder(payload);
    window.location.href = "/orders";
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Konfirmasi</span>
    </div>
  );

  const footerContent = (
    <div className={styles.footerBtn}>
      <CButton type="submit" onClick={() => (window.location.href = "/login")}>
        Login
      </CButton>
    </div>
  );

  return (
    <>
      <div className={styles.create}>
        <div className={styles.menu}>
          <h1>Explore Our Best Menu</h1>
          <div className={styles.filter}>
            {filters.map(filter => (
              <CButton
                type="button"
                color={
                  (!searchParams.get("category") && filter === "All") ||
                  filter === searchParams.get("category")
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  setSearchParams(filter === "All" ? {} : { category: filter })
                }
                key={filter}>
                {filter}
              </CButton>
            ))}
          </div>
          <div className={styles.list}>
            {menu.map((item: MenuItem) => (
              <div className={styles.item} key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                />
                <h2>{item.name}</h2>
                <div className={styles.bottom}>
                  <p className={styles.price}>${item.price}</p>
                  <CButton
                    type="submit"
                    onClick={() =>
                      handleAddToCart("increment", item.id, item.name)
                    }>
                    Order
                  </CButton>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
            />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleOrder}>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>Customer Information</h2>
              <Link to="/orders">
                <CButton color="secondary">Cancel</CButton>
              </Link>
            </div>
            <div className={styles.input}>
              <Input
                id="name"
                label="Name"
                name="customerName"
                placeholder="Insert Name"
                required
              />
              <Select
                name="tableNumber"
                id="table"
                label="Table Number"
                options={tables}
              />
            </div>
          </div>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>Current Order</h2>
            </div>
            {carts.length > 0 ? (
              <div className={styles.cart}>
                {carts.map((item: CartItem) => (
                  <div className={styles.cartItem} key={item.id}>
                    <h4 className={styles.name}>{item.name}</h4>
                    <div className={styles.quantity}>
                      <CButton
                        type="button"
                        onClick={() =>
                          handleAddToCart("decrement", item.id, item.name)
                        }
                        color="secondary">
                        -
                      </CButton>
                      <div className={styles.number}>{item.quantity}</div>
                      <CButton
                        type="button"
                        onClick={() =>
                          handleAddToCart("increment", item.id, item.name)
                        }
                        color="secondary">
                        +
                      </CButton>
                    </div>
                  </div>
                ))}
                <CButton type="submit">Order</CButton>
              </div>
            ) : (
              <div className={styles.cart}>
                <h4>Cart is empty</h4>
              </div>
            )}
          </div>
        </form>
      </div>

      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}>
        <p className="m-0">
          Anda harus login terlebih dahulu untuk melakukan pemesanan.
        </p>
      </Dialog>
    </>
  );
};

export default CreateOrder;
