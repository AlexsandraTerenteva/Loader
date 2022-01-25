import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableRow from '../TableRow';

export default function Table() {
  const { data } = useSelector((state) => state.files);
  const [files, setFiles] = useState(data);

  useEffect(() => {
    setFiles(data);
  }, [data]);

  return (
    <table className="main-table">
      <tr>
        <th>Превью</th>
        <th>Название файла</th>
        <th>Размер</th>
        <th>Действия</th>
      </tr>
      {files && <TableRow data={files} /> }
    </table>
  );
}
