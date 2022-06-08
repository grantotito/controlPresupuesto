import React, {useEffect, useState} from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() =>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setPrecio(gastoEditar.precio)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 400)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, precio, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        guardarGasto({nombre,precio,categoria, id, fecha})
    }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
            src={CerrarModal} 
            alt="cerrar modal"
            onClick={ocultarModal}
        />
      </div>

        <form
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje type='error'>{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input
                    id='nombre'
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="precio">Precio</label>

                <input
                    id='precio'
                    type="number" 
                    placeholder='Añade el precio'
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="tiempoLibre">Tiempo Libre</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input
                type="submit" 
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
            />

        </form>

    </div>
  )
}

export default Modal
