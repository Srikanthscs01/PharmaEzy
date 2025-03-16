
export interface ProductBatch {
  batchNo: string;
  billPrice: number;
  mrp: number;
  expiry: string;
  qty: number;
  qit: number;
  type?: string;
  purNo: string;
  purDate: string;
  rcvdDate: string;
  from: string;
  barCode?: string;
  purPrice?: number;
  scheme?: number;
  schemePct?: number;
  schAmt?: number;
  disPct?: number;
  addDisPct?: number;
  gstPct?: number;
  specialPrice?: number;
  stockistPrice?: number;
  costPrice?: number;
  acPrice?: number;
  retailerMarginPct?: number;
  marginPct?: number;
  invNo?: string;
  rNo?: string;
  freeQty?: number;
  supplier?: string;
  selected?: boolean;
}

export interface Product {
  code: string;
  name: string;
  rack?: string;
  totalQty: number;
  batches: ProductBatch[];
}

const products: Product[] = [
  {
    code: '006161',
    name: 'DOLO-250 MG SYR,1X60 ML',
    rack: '',
    totalQty: 23,
    batches: [
      {
        batchNo: 'DOTL645',
        billPrice: 30.64,
        mrp: 38.30,
        expiry: '08/2021',
        qty: 0.0,
        qit: 0.0,
        purNo: 'KT08551',
        purDate: '30/07/2019',
        rcvdDate: '30/07/2019',
        from: 'PU',
        barCode: '1896669',
        purPrice: 27.36,
        schemePct: 0.00,
        schAmt: 0.0000,
        disPct: 10.00,
        gstPct: 12.00,
        billPrice: 30.64,
        specialPrice: 30.64,
        stockistPrice: 0.00,
        costPrice: 27.579,
        acPrice: 25.072,
        retailerMarginPct: 20,
        marginPct: 9.99,
        invNo: 'KT08551',
        rNo: '19P0410',
        freeQty: 10.0,
        supplier: '000034-SIVA TEJA PHARMA'
      },
      {
        batchNo: 'BTS140',
        billPrice: 27.32,
        mrp: 31.50,
        expiry: '10/2020',
        qty: 0.0,
        qit: 0.0,
        purNo: 'LP01156',
        purDate: '20/06/2019',
        rcvdDate: '22/06/2019',
        from: 'PU'
      },
      {
        batchNo: 'DOTL-499',
        billPrice: 29.57,
        mrp: 36.96,
        expiry: '01/2020',
        qty: 0.0,
        qit: 0.0,
        purNo: 'AR01948',
        purDate: '11/10/2017',
        rcvdDate: '13/10/2017',
        from: 'PU'
      },
      {
        batchNo: 'DOTL479',
        billPrice: 28.52,
        mrp: 35.28,
        expiry: '07/2019',
        qty: 0.0,
        qit: 0.0,
        purNo: 'SIT0312',
        purDate: '11/07/2017',
        rcvdDate: '13/07/2017',
        from: 'PU'
      },
      {
        batchNo: 'DOTL468',
        billPrice: 28.52,
        mrp: 35.20,
        expiry: '05/2019',
        qty: 0.0,
        qit: 0.0,
        purNo: 'NK03093',
        purDate: '29/05/2017',
        rcvdDate: '31/05/2017',
        from: 'PU'
      }
    ]
  },
  {
    code: '007250',
    name: 'CROCIN 500MG TAB,1X15',
    totalQty: 45,
    batches: [
      {
        batchNo: 'BTC789',
        billPrice: 25.40,
        mrp: 32.15,
        expiry: '12/2022',
        qty: 10.0,
        qit: 2.0,
        purNo: 'CR47832',
        purDate: '15/01/2020',
        rcvdDate: '17/01/2020',
        from: 'GS'
      },
      {
        batchNo: 'BTC654',
        billPrice: 25.10,
        mrp: 31.90,
        expiry: '06/2022',
        qty: 15.0,
        qit: 3.0,
        purNo: 'CR45167',
        purDate: '05/08/2019',
        rcvdDate: '07/08/2019',
        from: 'GS'
      }
    ]
  },
  {
    code: '008943',
    name: 'ACILOC 150MG TAB,1X10',
    totalQty: 37,
    batches: [
      {
        batchNo: 'AC5643',
        billPrice: 18.75,
        mrp: 24.50,
        expiry: '09/2022',
        qty: 20.0,
        qit: 5.0,
        purNo: 'RL29384',
        purDate: '23/02/2020',
        rcvdDate: '25/02/2020',
        from: 'RL'
      },
      {
        batchNo: 'AC5142',
        billPrice: 18.25,
        mrp: 23.90,
        expiry: '04/2022',
        qty: 12.0,
        qit: 0.0,
        purNo: 'RL27645',
        purDate: '12/09/2019',
        rcvdDate: '14/09/2019',
        from: 'RL'
      }
    ]
  }
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductByCode = (code: string): Product | undefined => {
  return products.find(product => product.code === code);
};

export const searchProducts = (query: string): Product[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.code.toLowerCase().includes(lowerQuery) || 
      product.name.toLowerCase().includes(lowerQuery)
  );
};
