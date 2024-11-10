const baseUrl = "https://sycret.ru/service/api/api";
const searchParams = new URLSearchParams({
  ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
  MethodName: "OSGetGoodList",
});

export function getSertificatesData() {
  return fetch(`${baseUrl}?${searchParams.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred!");
      }
      return response.json();
    })
    .then((results) => {
      return results;
    })
    .catch((err) => console.log(err));
}

export function setInfoUser(
  id: number,
  tableName: string,
  primaryKey: string,
  price: number,
  summa: number,
  clientName: string,
  phone:string,
  email: string,
  message: string
) {
  const postParams = new URLSearchParams({
    ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
    MethodName: "OSSale",
    Id: `${id}`,
    TableName: tableName,
    PrimaryKey: primaryKey,
    Price: `${price}`,
    Summa: `${summa}`,
    ClientName: clientName,
    Phone: phone,
    Email: email,
    PaymentTypeId: '2',
    UseDelivery: '0',
    DeliveryAddress: '',
    IsGift: '0',
    MSGText: message,
    PName: clientName,
    PPhone: phone,
  });
  return fetch(`${baseUrl}?${postParams.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred!");
      }
      return response.json();
    })
    .then((results) => {
      return results;
    })
    .catch((err) => console.log(err));
}
