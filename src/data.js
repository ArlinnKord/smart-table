export function initData() {
  const BASE_URL = "https://webinars.webdev.education-services.ru/sp7-api";

  let sellers;
  let customers;
  let lastResult;
  let lastQuery;

  const mapRecords = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => ({
      id: item.receipt_id,
      date: item.date,
      seller: sellers?.[item.seller_id] || item.seller_id,
      customer: customers?.[item.customer_id] || item.customer_id,
      total: item.total_amount,
    }));
  };

  const getIndexes = async () => {
    if (!sellers || !customers) {
      const [sellersData, customersData] = await Promise.all([
        fetch(`${BASE_URL}/sellers`).then((res) => res.json()),
        fetch(`${BASE_URL}/customers`).then((res) => res.json()),
      ]);

      sellers = sellersData;
      customers = customersData;
    }

    return { sellers, customers };
  };

const getRecords = async (query, isUpdated = false) => {
  const cleanQuery = {};
  Object.keys(query).forEach((key) => {
    if (
      query[key] !== undefined &&
      query[key] !== null &&
      query[key] !== ""
    ) {
      cleanQuery[key] = query[key];
    }
  });

  const qs = new URLSearchParams(cleanQuery);
  const nextQuery = qs.toString();

  console.log('Full URL:', `${BASE_URL}/records?${nextQuery}`);

  if (lastQuery === nextQuery && !isUpdated) {
    return lastResult;
  }

  try {
    const response = await fetch(`${BASE_URL}/records?${nextQuery}`);    
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log(' ERROR RESPONSE FROM SERVER:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const records = await response.json();

    lastQuery = nextQuery;
    lastResult = {
      total: records.total || 0,
      items: mapRecords(records.items || []),
    };

    return lastResult;
  } catch (error) {
    console.error("API request failed:", error);
    return {
      total: 0,
      items: [],
    };
  }
};

  return {
    getIndexes,
    getRecords,
  };
}