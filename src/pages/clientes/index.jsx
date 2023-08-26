import { Button } from "react-bootstrap";
import { useState } from "react";
import FormCliente from "./Form";
import TableClientes from "./Table";

const IndexClientes = () => {
    const [textFilterInput, setTextFilterInput] = useState('');
    const [iCallTable, setiCallTable] = useState(0);
    const [modoForm, setModoForm] = useState(null);
    const [dataForm, setDataForm] = useState(null);

    const editarCliente = (element) => {
        setDataForm(element);
        setModoForm('E');
    }

    const refresh = () => {
        setiCallTable(iCallTable + 1);
    }

    return (
        <>
            <FormCliente data={dataForm} modoForm={modoForm} setModoForm={setModoForm} refresh={refresh} />
            <div className="row mt-5">
                <div className="col-12 offset-md-1 col-sm-10">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4">
                            <input className="form-control" value={textFilterInput} onChange={(e) => setTextFilterInput(e.target.value)} />
                        </div>
                        <div className="col-12 col-sm-3 col-md-4">
                            <Button onClick={() => setiCallTable(iCallTable + 1)}>Buscar</Button>
                        </div>
                        <div className="col-12 col-sm-3 col-md-4 text-end">
                            <Button onClick={() => setModoForm('A')}>Agregar</Button>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <TableClientes filter={textFilterInput} iCallTable={iCallTable} edit={editarCliente} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexClientes;