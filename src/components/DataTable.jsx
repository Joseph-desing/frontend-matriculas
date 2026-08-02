import { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2 } from 'react-icons/fi';
import EmptyState from './EmptyState.jsx';
import SearchBar from './SearchBar.jsx';

function DataTable({ title, subtitle, rows, columns, onEditar, onEliminar, searchPlaceholder }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = useMemo(() => rows.filter((row) =>
    Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(query.toLowerCase()))
  ), [rows, query]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const updateQuery = (value) => { setQuery(value); setPage(1); };

  return (
    <section className="data-card">
      <div className="data-card-header">
        <div><h2>{title}</h2><p>{subtitle || `${rows.length} registros en total`}</p></div>
        <SearchBar value={query} onChange={updateQuery} placeholder={searchPlaceholder} />
      </div>
      {filtered.length === 0 ? <EmptyState /> : <>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th className="text-end">Acciones</th></tr></thead>
            <tbody>{visible.map((row) => <tr key={row.id}>
              {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
              <td><div className="table-actions">
                <button className="btn-action edit" onClick={() => onEditar(row)} title="Editar"><FiEdit2 /></button>
                <button className="btn-action delete" onClick={() => onEliminar(row.id)} title="Eliminar"><FiTrash2 /></button>
              </div></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Mostrando {visible.length} de {filtered.length} registros</span>
          <div className="pagination-compact">
            <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><FiChevronLeft /></button>
            <span>{currentPage} / {pages}</span>
            <button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><FiChevronRight /></button>
          </div>
        </div>
      </>}
    </section>
  );
}
export default DataTable;
