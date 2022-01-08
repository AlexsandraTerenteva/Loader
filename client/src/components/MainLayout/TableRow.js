/* eslint-disable jsx-a11y/control-has-associated-label */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function TableRow({ data }) {
  if (data.length === 0) {
    return <h2>Файлов еще нет ..</h2>;
  }
  return data.map((el) => (
    <tr key={el.id}>
      <td><img src={`${el.src}`} alt="mini-foto" /></td>
      <td>{el.title}</td>
      <td>{el.weight}</td>
      <td>
        <button type="button"><EditOutlined /></button>
        <button type="button"><DeleteOutlined /></button>
      </td>
    </tr>
  ));
}
