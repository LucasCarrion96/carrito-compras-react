import { useReducer } from 'react'
import { CarritoContext } from './CarritoContext'

const initialState = []

export const CarritoProvider = ({ children }) => {


    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[Carrito] Agregar Compra':
                // Verificar si el elemento ya está en el carrito
                const existingItem = state.find(item => item.id === action.payload.id);
                if (existingItem) {
                    // Si existe, incrementar la cantidad
                    return state.map(item => {
                        if (item.id === action.payload.id) {
                            return { ...item, cantidad: item.cantidad + 1 };
                        }
                        return item;
                    });
                } else {
                    // Si no existe, agregar el nuevo elemento
                    return [...state, { ...action.payload, cantidad: 1 }];
                }

            case '[Carrito] Aumentar Cantidad Compra':
                return state.map(item => {
                    const cant = item.cantidad + 1
                    if (item.id === action.payload) return { ...item, cantidad: cant }
                    return item
                })
            case '[Carrito] Disminuir Cantidad Compra':
                return state.map(item => {
                    const cant = item.cantidad - 1
                    if (item.id === action.payload && item.cantidad > 1) return { ...item, cantidad: cant }
                    return item
                })
            case '[Carrito] Eliminar Compra':
                return state.filter(compra => compra.id !== action.payload)

            default:
                return state
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)

    const agregarCompra = (compra) => {
        compra.cantidad = 1
        const action = {
            type: '[Carrito] Agregar Compra',
            payload: compra
        }
        dispatch(action)
    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[Carrito] Aumentar Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[Carrito] Disminuir Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const eliminarCompra = (id) => {
        const action = {
            type: '[Carrito] Eliminar Compra',
            payload: id
        }
        dispatch(action)
    }



    return (
        <CarritoContext.Provider
            value={{
                listaCompras,
                agregarCompra,
                aumentarCantidad,
                disminuirCantidad,
                eliminarCompra
            }}>
            {children}
        </CarritoContext.Provider>
    )
}


