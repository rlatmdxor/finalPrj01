import React, { useEffect, useState } from 'react';
import Title from '../../../util/Title';
import Modal from '../../../util/Modal';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import InputTag from '../../../util/Input';
import MedisonTable from '../../../util/MedisonTable';
import Navi from '../../../util/Navi';
import ContentLayout from '../../../util/ContentLayout';
import DrugSearch from './DrugSearch';

const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  margin-left: 820px;
  margin-top: -15px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: -50px;
  margin-right: -25px;
  margin-top: -20px;
`;

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 400px;
  top: 20px;
  left: 40px;
  margin-bottom: 100px;
  grid-template-columns: 3fr 7fr;
`;

const Select = styled.select`
  width: 440px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid gray;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-top: 5px;
  display: flex;
`;

const Drug = () => {
  const dispatch = useDispatch();
  const initialInputData = { no: '', name: '', form: '', color1: '' };
  const initialCheckData = { no: '', memberNo: '1', notes: '' };
  const initialSearchData = [];
  const [inputData, setInputData] = useState(initialInputData);
  const [checkedItem, setCheckedItem] = useState(initialCheckData);
  const [drugVoList, setDrugVoList] = useState([]);
  const [drugSearchList, setDrugSearchList] = useState([]);
  const [num, setNum] = useState(0);
  const [drugColor, setDrugColor] = useState([]);
  const [drugForm, setDrugForm] = useState([]);
  const [drugDel, setDrugDel] = useState([]);
  const url = 'http://127.0.0.1:/api/drug';
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData),
  };
  const options2 = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkedItem),
  };

  useEffect(() => {
    fetch(`${url}/color`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDrugColor(data);
      });
    fetch(`${url}/form`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDrugForm(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${url}/list`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDrugVoList(data);
      });
  }, [num]);

  const handleChange = (e) => {
    setInputData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const reset = () => {
    setInputData(initialInputData);
    setDrugSearchList(initialSearchData);
  };

  const handleSubmit = (e) => {
    fetch(`${url}/find`, options)
      .then((resp) => resp.json())
      .then((data) => {
        setDrugSearchList(data);
      });
  };
  const handleAdd = (e) => {
    fetch(`${url}/write`, options2)
      .then((resp) => resp.json())
      .then((data) => {
        setNum(num + 1);
      });

    dispatch(close(e.target.title));
  };

  const handleDel = () => {
    const checkedDrug = drugDel.filter((item) => item.isChecked).map((item) => item.no);

    fetch(`${url}/del`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkedDrug),
    })
      .then((resp) => resp.text())
      .then((data) => {
        setNum(num + 1);
      });
    setDrugDel(
      (prev) =>
        prev
          .filter((item) => !checkedDrug.includes(item.no)) // 삭제된 항목 제외
          .map((item) => ({ ...item, isChecked: false })) // 나머지 체크 해제
    );
  };

  return (
    <>
      <Title>복용약</Title>
      <NaviContainer>
        <Navi target="drug" tag={'복용중'}></Navi>
        <Navi target="drug1" tag={'과거 먹은 약'}></Navi>
      </NaviContainer>

      <ContentLayout>
        <Modal ml={'950'} title={'복용약 검색'} type={'add'} width={'1000'}>
          <ModalContainer>
            <Btn
              title={'복용약 검색'}
              f={handleSubmit}
              str={'검색'}
              c={'#FF7F50'}
              fc={'white'}
              ml={'30'}
              mr={'30'}
            ></Btn>
          </ModalContainer>
          <InputTag
            name="name"
            value={inputData.name}
            type="select"
            title="이름"
            size={'size2'}
            mb={'10'}
            mt={'5'}
            f={handleChange}
          ></InputTag>
          형태
          <Select value={inputData.form} onChange={handleChange} name="form">
            <option value=""></option>;
            {drugForm.map(({ form, no }) => {
              return (
                <>
                  <option key={no} value={no}>
                    {form}
                  </option>
                </>
              );
            })}
          </Select>
          색
          <Select value={inputData.color1} onChange={handleChange} name="color1">
            <option value=""></option>
            {drugColor.map(({ color, no }) => {
              return (
                <>
                  <option key={no} value={no}>
                    {color}
                  </option>
                </>
              );
            })}
          </Select>
          <ModalContainer>
            <Btn
              title={'복용약 검색'}
              f={handleAdd}
              str={'등록'}
              c={'#FF7F50'}
              fc={'white'}
              ml={'30'}
              mr={'30'}
              mb={'0'}
            ></Btn>
          </ModalContainer>
          <DrugSearch onSelect={setCheckedItem} title="검색 결과" MediSonData={drugSearchList} />
        </Modal>
        <Modal title={'복용약 수정'} type={'edit'}>
          <InputTag name="submit" type="select" title="모양으로 등록" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="모양" size={'size3'} mb={'10'} mt={'5'}></InputTag>
          <InputTag type="select" title="색" size={'size3'} mb={'10'} mt={'5'}></InputTag>
        </Modal>

        <BtnContainer>
          <div
            onClick={() => {
              reset();
              dispatch(open({ title: '복용약 검색', value: 'block' }));
            }}
          >
            <Btn str={'검색'} c={'#FF7F50'} fc={'white'} ml={'30'} mr={'30'}></Btn>
          </div>

          <Btn str={'삭제'} c={'lightgray'} fc={'black'} f={handleDel}></Btn>
        </BtnContainer>

        <MedisonTable
          title="구승용 님의 현재 복용약"
          MediSonData={drugVoList}
          setDrugDel={setDrugDel}
          drugDel={drugDel}
        />
      </ContentLayout>
    </>
  );
};

export default Drug;
