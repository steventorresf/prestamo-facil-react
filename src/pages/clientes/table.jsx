import { Button, Table } from "react-bootstrap";
import { getByFilters } from "../shared/services/clienteService";
import { useEffect, useState } from "react";

const TableClientes = ({ filter, iCallTable, edit }) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getClientes();
    }, [iCallTable])

    const getClientes = () => {
        setDataSource([]);
        getByFilters(1, 5, filter).then(res => {
            if (res.isSuccess) {
                const data = res.data;
                setDataSource(data.docs || []);
            }
        });
    }

    return (
        <Table className="table">
            <thead>
                <tr className="table-light">
                    <th>Identificación</th>
                    <th>Nombre completo</th>
                    <th>Género</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {dataSource.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{item.identificacion.codigo + ' ' + item.identificacion.descripcion}</td>
                            <td>{item.nombreCompleto}</td>
                            <td>{item.genero.descripcion}</td>
                            <td>{item.telCel}</td>
                            <td>{item.direccion}</td>
                            <td>
                                <Button size="sm" onClick={() => edit(item)}>
                                    <i class="bi bi-pencil-square"></i>
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}
export default TableClientes;