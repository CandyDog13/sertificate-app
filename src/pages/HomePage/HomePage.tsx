import { useEffect, useState } from "react";
import "./HomePage.css";
import { getSertificatesData, setInfoUser } from "../../utils/Api";

import ContactForm, {
  IFormInput,
} from "../../components/ContactForm/ContactForm";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";

export interface IData {
  ID: number;
  TABLENAME: string;
  PRIMARYKEY: string;
  NAME: string;
  DESCRIPTION: string;
  PRICE: number;
  SUMMA: number;
  DISCOUNT: number;
  IMAGEURL: string;
  REC_SNO: string;
  REC_NAME: string;
  REC_SUM: number;
  REC_QUANTITY: number;
  REC_PAYMENT_METHOD: string;
  REC_PAYMENT_OBJECT: string;
  REC_TAX: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<IData[] | []>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [clientData, setClientData] = useState<IFormInput>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [payment, setPayment] = useState<{
    id: number;
    tableName: string;
    primaryKey: string;
    price: number;
    sum: number;
    sale: number;
    name: string;
  }>({
    id: 0,
    tableName: "",
    primaryKey: "",
    price: 0,
    sum: 0,
    sale: 0,
    name: "",
  });
  const fetchData = async () => {
    try {
      const result = await getSertificatesData();
      setData(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("fetchDone");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenPay = (
    id: number,
    tableName: string,
    primaryKey: string,
    price: number,
    sum: number,
    sale: number,
    name: string
  ) => {
    setPayment({ id, tableName, primaryKey, price, sum, sale, name });
  };

  const saveClientData = (clientData: IFormInput) => {
    setClientData(clientData);
    fetchSale();
  };

  const fetchSale = async () => {
    try {
      const res = await setInfoUser(
        payment.id,
        payment.tableName,
        payment.primaryKey,
        payment.price,
        payment.sum,
        clientData.name,
        clientData.phone,
        clientData.email,
        clientData.message
      );
      console.log(res.data);
      if (res.data.length === 1) {
        console.log("оплата");
        navigate('/pays');
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className="App">
      {isOpenForm ? (
        <div className={`main_content ${true ? "main_content_form" : ""}`}>
          <span className="sertificate_span">{payment.name}</span>
          <ContactForm
            escapeButton={() => setIsOpenForm(false)}
            submitClientData={saveClientData}
          ></ContactForm>
        </div>
      ) : (
        <div className="main_content">
          <Dropdown options={data} changeStatePay={handleOpenPay}></Dropdown>
          {payment.sum ? (
            <div className="payment">
              <span className="pay_sum active_sum">
                Ваша скидка: {Math.floor(payment.sale)}%
              </span>
              <span className="pay_sum active_sum">
                К оплате: {Math.floor(payment.sum)}
              </span>
              <button
                className="pay_button active_button"
                onClick={() => setIsOpenForm(true)}
              >
                Оплатить
              </button>
            </div>
          ) : (
            <div className="payment">
              <button className="pay_button" disabled>
                Оплатить
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
