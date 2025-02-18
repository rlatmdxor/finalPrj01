import React from "react";
import { BigCard } from "./Diet";
import { IconButton, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const MyBmi = () => {
  return (
    <>
      <BigCard>
        <div>
          나의 BMI
          <Tooltip title="BMI = 체중(kg) / (키(m)× 키(m))">
            <IconButton>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          표준체중
          <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
            <IconButton>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          권장섭취칼로리
          <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
            <IconButton>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          권장섭취물양
          <Tooltip title="BMI= 체중(kg) / (키(m)× 키(m))">
            <IconButton>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </BigCard>
    </>
  );
};

export default MyBmi;
