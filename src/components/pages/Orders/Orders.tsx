import { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import {
  deleteOrder,
  getOrders,
  updateOrder,
} from '../../../services/order.service';
import CButton from '../../ui/CButton';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [refetchOrder, setRefetchOrder] = useState(true);

  useEffect(() => {
    if (refetchOrder) {
      const fetchMenu = async () => {
        const result = await getOrders();
        setOrders(result.data);
      };
      fetchMenu();
      setRefetchOrder(false);
    }
  }, [refetchOrder]);

  const handleCompleteOrder = async (id: string) => {
    await updateOrder(id, { status: 'COMPLETED' }).then(() => {
      setRefetchOrder(true);
    });
  };

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id).then(() => {
      setRefetchOrder(true);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  return (
    <main className={styles.order}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.button}>
          <Link to="/create">
            <CButton>Create Order</CButton>
          </Link>
          <CButton color="secondary" onClick={handleLogout}>
            Logout
          </CButton>
        </div>
      </section>
      <section>
        <table
          border={1}
          className={styles.table}
          cellSpacing={0}
          cellPadding={10}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Table</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index: number) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.table_number}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td className={styles.action}>
                  <Link to={`/orders/${order.id}`}>
                    <CButton>Detail</CButton>
                  </Link>
                  {order.status === 'PROCESSING' && (
                    <CButton
                      onClick={() => handleCompleteOrder(order.id)}
                      color="success"
                    >
                      Completed
                    </CButton>
                  )}
                  {order.status === 'COMPLETED' && (
                    <CButton
                      onClick={() => handleDeleteOrder(order.id)}
                      color="danger"
                    >
                      Delete
                    </CButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Orders;
