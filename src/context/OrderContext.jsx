import { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext(null);

const initialOrder = {
  customerName: '',
  email: '',
  serviceType: '',
  projectTitle: '',
  description: '',
  customization: {},
  files: [],
  budget: '',
  deadline: '',
};

const initialState = {
  currentOrder: initialOrder,
  orders: [],
  loading: false,
  error: null,
  successMessage: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ORDER':
      return { ...state, currentOrder: { ...state.currentOrder, ...action.payload } };
    case 'RESET_ORDER':
      return { ...state, currentOrder: initialOrder, error: null, successMessage: null };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, successMessage: action.payload };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        updateOrder: (data) => dispatch({ type: 'UPDATE_ORDER', payload: data }),
        resetOrder: () => dispatch({ type: 'RESET_ORDER' }),
        setOrders: (orders) => dispatch({ type: 'SET_ORDERS', payload: orders }),
        setLoading: (v) => dispatch({ type: 'SET_LOADING', payload: v }),
        setError: (e) => dispatch({ type: 'SET_ERROR', payload: e }),
        setSuccess: (m) => dispatch({ type: 'SET_SUCCESS', payload: m }),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}
