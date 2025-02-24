import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #4caf50;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #e8f5e9;
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #d3d3d3;
  padding: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const MedisonTable = ({ title, MediSonData, setDrugDel, drugDel }) => {
  return (
    <TableWrapper>
      <Title>{title}</Title>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>이미지</Th>
            <Th>약명</Th>
            <Th>효능</Th>
            <Th>복용법</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {MediSonData.map((medicine, index) => (
            <Row key={index}>
              <Td>{index + 1}</Td>
              <Td>
                <Image src={medicine.imageUrl} alt={`약물 ${medicine.name}`} />
              </Td>
              <Td>{medicine.name}</Td>
              <Td>
                {medicine.effect.split(/<br\s*\/?>/g).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Td>
              <Td>
                {medicine.dosage.split(/<br\s*\/?>/g).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Td>
              <Td>
                <input
                  type="checkbox"
                  checked={drugDel.some((item) => item.no === medicine.no && item.isChecked)}
                  onChange={(e) => {
                    setDrugDel((prev) => {
                      if (e.target.checked) {
                        return [...prev, { no: medicine.no, isChecked: true }];
                      } else {
                        return prev.map((item) => (item.no === medicine.no ? { ...item, isChecked: false } : item));
                      }
                    });
                  }}
                />
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default MedisonTable;
