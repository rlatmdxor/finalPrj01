import Swal from 'sweetalert2';

const token = null;

const bloodPressureWrite = async () => {
  const resp = await fetch('http://127.0.0.1:80/api/bloodPressure/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ memberNo: '1' }),
  });
  const data = await resp.json();
  return data;
};

export { bloodPressureWrite };
